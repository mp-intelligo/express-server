import { db } from "../../db/database";
import { InsertUserResult, DBUser } from "./user.types";

const TABLE_NAME = 'user';

export const UserDAL = {

    insertUser: ({
        username,
        passwordHash,
        email
    }) => new Promise<InsertUserResult>((resolve, reject) => {

        const stmt = db.prepare(
            `INSERT into ${TABLE_NAME} (username, email, password) VALUES (?, ?, ?)`
        );

        stmt.run(
            [
                username,
                email,
                passwordHash
            ],
            function (error) {
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

    getUser: (username: string) => new Promise<DBUser>((resolve, reject) => {
        const stmt = db.prepare(
            `SELECT * FROM ${TABLE_NAME} WHERE username = ?`
        );

        stmt.get(
            [
                username
            ],
            (error, user) => {
                if (error) {
                    return reject(error);
                }

                resolve(user);
            });
    })
};