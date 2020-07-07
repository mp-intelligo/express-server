import { db } from "../../db/database";
import { InsertUserResult, DbUser } from "./User";

const TABLE_NAME = 'user';

export const UserDAL = {
    
    insertUser: ({
        username,
        passwordHash,
        email
    }) => new Promise<InsertUserResult>((resolve, reject) => {

        const query =
            `INSERT into ${TABLE_NAME} (username, email, password) VALUES ('${username}', '${email}', '${passwordHash}')`;

        db.run(query, function (error) {
            if (error) {
                if (error.message.includes('SQLITE_CONSTRAINT: UNIQUE constraint failed: user.email')) {
                    resolve({
                        success: false,
                        msg: 'Your authentication information is incorrect. Please try again.'
                    });
                }

                return reject(error);
            }

            const id = this.lastID;
            resolve({
                success: true,
                id
            });
        });
    }),

    getUser: (username: string) => new Promise<DbUser>((resolve, reject) => {
        const query = 
            `SELECT * FROM ${TABLE_NAME} WHERE username = '${username}'`;

        db.get(query, (error, user) => {
            if (error) {
                return reject(error);
            }

            resolve(user);
        });
    })
};