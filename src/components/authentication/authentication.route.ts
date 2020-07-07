import { Router } from 'express';
import { AuthenticationController } from './authentication.controller';

const AuthenticationRouter = Router();

AuthenticationRouter.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    
    try {
        const result = await AuthenticationController.signup({ username, email, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
});

AuthenticationRouter.post('/signin', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const result = await AuthenticationController.signin({ username, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
});


export { AuthenticationRouter };