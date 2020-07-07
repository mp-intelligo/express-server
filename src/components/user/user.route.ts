import { Router } from 'express';
import { UserController } from './user.controller';

const UserRouter = Router();

UserRouter.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const result = await UserController.signup({ username, email, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
});

UserRouter.post('/signin', async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const result = await UserController.signin({ username, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
});


export { UserRouter };