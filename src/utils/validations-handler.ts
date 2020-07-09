
import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validationsHandler = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(v => v.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.json({
            success: false,
            msg: errors.array().map(({ param, msg}) => `${param}: ${msg}`).join('; ')
        });
    }
};