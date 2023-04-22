import { createStore } from 'chrome-extension-toolkit';

interface ISyncStore {}

export const syncStore = createStore<ISyncStore>(
    'SYNC_STORE',
    {},
    {
        area: 'sync',
        isEncrypted: false,
    }
);
