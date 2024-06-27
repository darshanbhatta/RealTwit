import React from 'react';
import { ContextInvalidated, onContextInvalidated } from 'chrome-extension-toolkit';
import { createRoot } from 'react-dom/client';
import { Main } from './components/Main/Main';

const TWITTER_URLS = ['https://twitter.com', 'https://x.com'];

// inject our app if they are on twitter
if (TWITTER_URLS.some(url => window.location.href.startsWith(url))) {
    injectReact();
}

async function injectReact() {
    const div = document.createElement('div');
    div.id = 'realtwit-root';
    document.body.appendChild(div);
    createRoot(div).render(<Main />);
}

if (process.env.NODE_ENV === 'development') {
    onContextInvalidated(() => {
        const div = document.createElement('div');
        div.id = 'context-invalidated-container';
        document.body.appendChild(div);
        createRoot(div).render(<ContextInvalidated color='black' backgroundColor='orange' />);
    });
}
