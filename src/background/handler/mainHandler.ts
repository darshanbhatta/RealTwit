import { MessageHandler } from 'chrome-extension-toolkit';
import MainMessages from 'src/shared/messages/MainMessages';
import isVerifiedUser from '../util/isVerifiedUser';

const mainHandler: MessageHandler<MainMessages> = {
    isVerifiedUser: async ({ data, sendResponse }) => {
        sendResponse(isVerifiedUser(data.username));
    },
    isVerifiedUserBulk: async ({ data, sendResponse }) => {
        const verifiedUsers = (data.usernames as unknown as string[]).reduce((acc, username) => {
            if (acc[username] !== undefined) return acc; // skip if already verified (to avoid unnecessary calls
            acc[username] = isVerifiedUser(username);
            return acc;
        }, {} as { [username: string]: boolean });
        sendResponse(verifiedUsers);
    },
};

export default mainHandler;
