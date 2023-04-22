import React from 'react';
import { ContextInvalidated, onContextInvalidated } from 'chrome-extension-toolkit';
import { createRoot } from 'react-dom/client';
import { Main } from './components/Main/Main';

if (window.location.href.includes('https://twitter.com')) {
    injectReact();
}

async function injectReact() {
    // create div to render <Main> and add css in it
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
