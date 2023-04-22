import { MessageListener } from 'chrome-extension-toolkit';
import { BACKGROUND_MESSAGES, tabMessenger } from 'src/shared/messages';
import onInstall from './events/onInstall';
import onServiceWorkerAlive from './events/onServiceWorkerAlive';
import onUpdate from './events/onUpdate';
import browserActionHandler from './handler/browserActionHandler';
import hotReloadingHandler from './handler/hotReloadingHandler';
import tabManagementHandler from './handler/tabManagementHandler';
import mainHandler from './handler/mainHandler';

onServiceWorkerAlive();

/**
 * will be triggered on either install or update
 * (will also be triggered on a user's sync'd browsers (on other devices)))
 */
chrome.runtime.onInstalled.addListener(details => {
    switch (details.reason) {
        case 'install':
            onInstall();
            break;
        case 'update':
            onUpdate();
            break;
        default:
            break;
    }
});

// initialize the message listener that will listen for messages from the content script
const messageListener = new MessageListener<BACKGROUND_MESSAGES>({
    ...browserActionHandler,
    ...hotReloadingHandler,
    ...tabManagementHandler,
    ...mainHandler,
});

messageListener.listen();

// listen for tab updates to know when the page has changed (useful for single page apps that don't reinject the content script)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        console.log('tab updated', tabId);
        tabMessenger.reAnalyzePage({ url: changeInfo.url! }, tabId);
    }
});
