import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as expressJwt from 'express-jwt';
import { User } from './User';
import * as appConfig from '../../utils/config';


export const UserService = {

    hashPassword: async (password: string) => {
        const salt = await bcryptjs.genSalt();
        const passwordHash = await bcryptjs.hash(password, salt);
        return passwordHash;
    },

    checkPassword: async (username: string, password: string) => {
        // const isMatched = await bcryptjs.compare(password, )
    },

    createToken: (user: User) => new Promise((resolve, reject) => {
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

    validateToken: expressJwt({
        secret: appConfig.SECRET,
        algorithms: ['HS256'],
    })
        .unless({
            path: [
                '/api/auth/signin',
                '/api/auth/signup'
            ]
        }),

    unauthorizedErrorHandler: (err, req, res, next) => {
        if (err instanceof expressJwt.UnauthorizedError) {
            return res.json({
                success: false,
                msg: '401 Unauthorized'
            });
        }

        next();
    }

};