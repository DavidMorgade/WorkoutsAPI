import bcryptjs from 'bcryptjs';
import { IUserEntry } from '../types/userTypes';


//Hash password
export const hashPassword = (password: string, rest: IUserEntry) => {
        // encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
}

        