import { devStore } from 'src/shared/storage/devStore';

/**
 * A list of websites that we don't want to reload when the extension reloads (because it'd be hella annoying)
 */
const HOT_RELOADING_WHITELIST = [
    'youtube.com',
    'twitch.tv',
    'github.dev',
    'figma.com',
    'netflix.com',
    'disneyplus.com',
    'hbomax.com',
    'spotify.com',
    'localhost:6006',
    'docs.google.com',
    'reddit.com',
    'gmail.com',
    'photopea.com',
];

/**
 * Reloads the tab that was open when the extension was reloaded
 * @returns a promise that resolves when the tab is reloaded
 */
export async function hotReloadTab(): Promise<void> {
    const { getIsTabReloading, getReloadTabId } = devStore;

    const [isTabReloading, reloadTabId] = await Promise.all([getIsTabReloading(), getReloadTabId()]);

    if (!isTabReloading || !reloadTabId) return;

    chrome.tabs.get(reloadTabId, tab => {
        if (!tab?.id) return;
        if (!HOT_RELOADING_WHITELIST.find(url => tab.url?.includes(url))) {
            chrome.tabs.reload(tab.id);
        }
    });
}
