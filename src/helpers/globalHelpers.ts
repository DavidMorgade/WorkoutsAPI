import bcryptjs from 'bcryptjs';
import { IUserEntry } from '../types/userTypes';


//Hash password
export const hashPassword = (password: string, rest: IUserEntry) => {
        // encrypt password
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync(password, salt);
}

export function arrayContains(arr1: any[], arr2: any[]): boolean {
        return arr2.every( ai => arr1.includes(ai) );
    }