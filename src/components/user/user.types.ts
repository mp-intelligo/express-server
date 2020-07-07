export type ViewUser = {
    id: number,
    username: string,
    email: string
};

export interface DBUser extends ViewUser {
    password: string
};

export interface InsertUserResult {
    success: boolean,
    msg?: string,
    id?: number
};