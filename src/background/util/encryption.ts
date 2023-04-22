/* eslint-disable no-param-reassign */
import crypto from 'crypto';

function encrypt(text: any, ENCRYPTION_KEY: string): string {
    if (!text) return text;
    text = JSON.stringify(text);
    const iv = Buffer.alloc(16);
    const cipher = crypto.createCipheriv('aes-128-ctr', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decrypt(text: any, ENCRYPTION_KEY: string): any {
    const hexRegex = /^[0-9A-Fa-f]+$/g;
    if (!(typeof text === 'string' || text instanceof String)) return text;
    if (!hexRegex.test(text as string)) return text;
    try {
        const iv = Buffer.alloc(16);
        const encryptedText = Buffer.from(text, 'hex');
        const decipher = crypto.createDecipheriv('aes-128-ctr', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return JSON.parse(decrypted.toString());
    } catch (err) {
        return text;
    }
}

export { encrypt, decrypt };
