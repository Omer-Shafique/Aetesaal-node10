import * as crypto from 'crypto';
import * as config from '../config';

const algorithm = 'aes-256-ctr';
const password = 'd6F3Efeq';


/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
const sha512 = (password: string, salt: string) => {
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt,
        passwordHash: value
    };
};

export const saltHashPassword = (password: string) => {
    const passwordData = sha512(password, config.default.server.passwordSalt);
    return passwordData.passwordHash;
};

export const createHash = (text: string): string => {
    const cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
};

export const decryptHash = (text: string): string => {
    const decipher = crypto.createDecipher(algorithm, password);
    let dec = decipher.update(text, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
