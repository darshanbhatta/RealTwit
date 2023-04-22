/**
 * Messages for managing the user's open tabs list
 */
export default interface MainMessages {
    /** checks to see if a single user is verified or not */
    isVerifiedUser: (data: { username: string }) => boolean;
    /** checks to see if multiple user names are verified or not */
    isVerifiedUserBulk: (data: { usernames: string[] }) => { [username: string]: boolean };
}
