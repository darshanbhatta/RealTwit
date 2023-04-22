/** list derived from https://github.com/thansen0/verified_twitters */
import VerifiedUsersObject from '../data/verified_users.json';

/**
 * Checks if the user is verified using the verified users list
 */
export default function isVerifiedUser(username: string): boolean {
    // make sure the user name is lower case
    const lowerCaseUsername = username.toLowerCase();

    // check if the user is verified
    return !!VerifiedUsersObject[lowerCaseUsername];
}
