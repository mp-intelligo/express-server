import * as express from 'express';
import * as cors from 'cors';
import { generalErrorHandler } from './utils/general-error-handler';
import { onShutdown } from './utils/shutdown.util';
import * as appConfig from './utils/config';
import { CandidateRouter } from './components/candidate/cadidate.route';
import { AuthenticationMiddleware } from './components/authentication/authentication.middleware';
import { AuthenticationRouter } from './components/authentication/authentication.route';

const PORT = process.env.PORT || 8080;


express()
    .disable('x-powered-by')
    .use(cors({
        origin: appConfig.ORIGIN,
        methods: ['POST', 'GET', 'OPTIONS']
    }))
    .use(express.json())
    .use(AuthenticationMiddleware.envalidateUser)
    .use('/api/candidates', CandidateRouter)
    .use('/api/auth', AuthenticationRouter)
    .use(generalErrorHandler)
    .listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });

onShutdown();