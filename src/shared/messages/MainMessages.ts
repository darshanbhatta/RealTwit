/**
 * Messages for managing the user's open tabs list
 */
export default interface MainMessages {
    isVerifiedUser: (data: { username: string }) => boolean;
    isVerifiedUserBulk: (data: { usernames: string[] }) => { [username: string]: boolean };
}
