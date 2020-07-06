import { db } from '../../db/database';
import { Candidate } from "./candidate";

const TABLE_NAME = 'candidate';

export const CandidateDAL = {

    getAll: () => {
        return new Promise<Candidate[]>((resolve, reject) => {
            const query = `select * from ${TABLE_NAME}`;

            db.all(
                query,
                (error, value) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve(value);
                }
            )
        });
    }

};