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
        const user = await UserDAL.getUser(username);

        let isMatch = false;

        if (user) {
            isMatch = await UserService.checkPassword(password, user.password);
        }

        if (!isMatch) {
            return {
                success: false,
                msg: 'Your authentication information is incorrect. Please try again'
            };
        }

        const token = await UserService.createToken(user);

        return {
            success: true,
            token
        };
    }
};