
import { Request, Response, NextFunction } from 'express';

export const headerMiddleware = (req: Request, res: Response, next: NextFunction) => {

    // res.header('Access-Control-Allow-Credentials', 'true');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    // res.header('Access-Control-Expose-Headers', 'Authorization');
    // res.header(
    //     'Access-Control-Allow-Headers',
    //     [
    //         'Set-Cookie',
    //         'Origin',
    //         'X-Requested-With',
    //         'Content-Type',
    //         'Accept',
    //         'Authorization',
    //         'responseType',
    //         'ResponseType',
    //         'ResponseContentType',
    //         'Content-Disposition'
    //     ]
    // );
    // res.header('Access-Control-Allow-Origin', req.get('Origin'));

    if (req.method !== 'OPTIONS') {
        return next();
    }

    res.sendStatus(200);
};