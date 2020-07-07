import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

export const generalErrorHandler: ErrorRequestHandler = (
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(error.stack);

    res.status(500).json({
        success: false,
        msg: 'Internal server error'
    });
};
