import { Router } from 'express';
import { CandidateController } from './candidate.controller';

const CandidateRouter = Router();

CandidateRouter.get('/', async (req, res, next) => {

    try {
        const candidates = await CandidateController.getAll();

        res.json({
            success: true,
            candidates
        });
        
    } catch (error) {
        next(error);
    }
});

export { CandidateRouter };