import { db } from "../../db/database";
import { InsertUserResult, DBUser } from "./user.types";

const TABLE_NAME = 'user';

const createInsertCallback = (resolve, reject) => function (error: Error) {
    if (error) {
        if (error.message.includes('UNIQUE constraint failed: user.email')) {
            return resolve({
                success: false,
                msg: 'Email already exists'
            });
        }

        if (error.message.includes('UNIQUE constraint failed: user.username')) {
            return resolve({
                success: false,
                msg: 'Username already exists'
            });
        }

        return reject(error);
    }

    const id = this.lastID;
    resolve({
        success: true,
        id
    });
};


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
            createInsertCallback(resolve, reject)
        );
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
