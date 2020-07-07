export type User = {
    id: number,
    username: string,
    email: string
};

export interface DbUser extends User {
    password: string
};

export interface InsertUserResult {
    success: boolean,
    msg?: string,
    id?: number
};