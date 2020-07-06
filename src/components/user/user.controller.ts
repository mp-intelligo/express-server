import { UserService } from "./user.service";
import { UserDAL } from "./user.dal";


export const UserController = {
    signup: async ({ username, email, password }) => {
        const passwordHash = await UserService.hashPassword(password);
        const { success, id, msg } = await UserDAL.insertUser({ username, passwordHash, email });

        if (!success) {
            return {
                success: false,
                msg
            };
        }

        const token = await UserService.createToken({ id, username, email });

        return {
            success: true,
            token
        };
    },

    signin: async ({ username, password}) => {

    }
};