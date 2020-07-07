import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { ViewUser } from '../user/user.types';
import * as appConfig from '../../utils/config';


export const AuthenticationService = {

    hashPassword: async (password: string) => {
        const salt = await bcryptjs.genSalt();
        const passwordHash = await bcryptjs.hash(password, salt);
        return passwordHash;
    },

    checkPassword: async (password: string, passwordHash: string) => {
        const isMatched = await bcryptjs.compare(password, passwordHash);
        return isMatched;
    },

    createToken: (user: ViewUser) => new Promise<string>((resolve, reject) => {
        jwt.sign(
            user,
            appConfig.SECRET,
            {
                expiresIn: '7d',
                algorithm: 'HS256'
            },
            (error, token) => {
                if (error) {
                    return reject(error);
                }

                resolve(token);
            }
        );
    }),

    parseAuthHeader: (authHeader: string = 'Bearer '): Promise<ViewUser> =>
        new Promise((resolve, reject) => {
            const token = authHeader.split(' ')[1];
            jwt.verify(
                token,
                appConfig.SECRET,
                (error, user: ViewUser) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(user);
                });
        })

};