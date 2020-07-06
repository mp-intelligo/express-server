import { Request, Response, NextFunction } from 'express';

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { path } = req;

    const unprotectedRoutes = [
        '/api/auth/signin',
        '/api/auth/signup'
    ];

    if (unprotectedRoutes.includes(path)) {
        return next();
    }

    
    // validateToken()...

    return next();
};