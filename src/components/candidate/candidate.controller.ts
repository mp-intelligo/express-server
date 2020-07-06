import { CandidateDAL } from './candidate.dal'

const getAll = () => {
    return CandidateDAL.getAll();
};

export const CandidateController = {
    getAll
};