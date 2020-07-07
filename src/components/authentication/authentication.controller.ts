import { AuthenticationService } from "./authentication.service";
import { UserDAL } from "../user/user.dal";
import { ViewUser } from "../user/user.types";


export const AuthenticationController = {

    signup: async ({ username, email, password }) => {

        const passwordHash = await AuthenticationService.hashPassword(password);
        
        const { success, id, msg } = await UserDAL.insertUser({ username, passwordHash, email });

        if (!success) {
            return {
                success: false,
                msg
            };
        }

        const token = await AuthenticationService.createToken({ id, username, email });

        return {
            success: true,
            token
        };
    },

    signin: async ({ username, password}) => {
        const user = await UserDAL.getUser(username);

        let isMatch = false;

        if (user) {
            isMatch = await AuthenticationService.checkPassword(password, user.password);
        }

        if (!isMatch) {
            return {
                success: false,
                msg: 'Your authentication information is incorrect. Please try again'
            };
        }

        const { id, email }: ViewUser = user;
        const token = await AuthenticationService.createToken({ id, username, email});

        return {
            success: true,
            token
        };
    }
};