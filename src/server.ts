import * as express from 'express';
import * as cors from 'cors';
import { json, urlencoded } from 'body-parser';
// import { authenticationMiddleware } from './middlewares/authentication.middleware';
import * as jwt from 'express-jwt';
import { errorHandler } from './utils/error-handler';
import { onShutdown } from './utils/shutdown.util';
import { CandidateRouter } from './components/candidate/cadidate.route';
import { UserRouter } from './components/user/user.route';
import * as appConfig from './utils/config';
import { UserService } from './components/user/user.service';

const PORT = process.env.PORT || 8080;


express()
    .disable('x-powered-by')
    .use(cors({
        origin: appConfig.ORIGIN,
        methods: ['POST', 'GET', 'OPTIONS']
    }))
    .use(json({ limit: '1mb' }))
    // .use(urlencoded({ extended: true }))
    .use(
        UserService.validateToken,
        UserService.unauthorizedErrorHandler
    )
    .use('/api/candidates', CandidateRouter)
    .use('/api/auth', UserRouter)
    .use(errorHandler)
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

onShutdown();