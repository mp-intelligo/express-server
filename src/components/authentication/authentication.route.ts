import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthenticationController } from './authentication.controller';
import { validationsHandler } from '../../utils/validations-handler';

const AuthenticationRouter = Router();

const signupValidations = [
    body('username').trim().notEmpty(),
    body('email').trim().isEmail().withMessage('Email is not valid'),
    body('password').trim()
        .isLength({ min: 6 }).withMessage('Password length must be at least 6 characters')
        .matches(/\d/).withMessage('Password must contain at least one number')
        .matches(/[A-z]/).withMessage('Password must contain at least one letter')
]

AuthenticationRouter.post('/signup', validationsHandler(signupValidations), async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const result = await AuthenticationController.signup({ username, email, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
});

const signinValidations = [
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty()
];

AuthenticationRouter.post('/signin', validationsHandler(signinValidations), async (req, res, next) => {
    const { username, password } = req.body;

    try {
        const result = await AuthenticationController.signin({ username, password });
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export { AuthenticationRouter };
