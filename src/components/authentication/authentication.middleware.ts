import { NextFunction, Request, Response } from 'express';
import { AuthenticationService } from './authentication.service';

export const AuthenticationMiddleware = {

    envalidateUser: async (req: Request, res: Response, next: NextFunction) => {
        
        const { path, headers: { authorization = '' } } = req;

        const unprotectedPaths = [
            '/api/auth/signin',
            '/api/auth/signup'
        ];

        if (unprotectedPaths.includes(path)) {
            return next();
        }

        try {
            const user = await AuthenticationService.parseAuthHeader(authorization);

            (req as any).user = user;
            
            return next();
            
        } catch (error) {

            console.error(error);

            res.status(401).json({
                success: false,
                msg: '401 Unauthorized'
            });
        }
    }
}