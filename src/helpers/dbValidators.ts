import Role from '../models/role';
import User from '../models/user';

export const validateRole = async (role: string) => {
    const rolExists = await Role.findOne({role});
    if(!rolExists) {
        throw new Error(`Role ${role} does not exist`);
    }
}

export const validateEmail = async (email: string) => {
    const emailExists = await User.findOne({email});
    if(emailExists) {
        throw new Error(`Email ${email} already exists in database`);
    }
}

export const validateUserId = async (id: string) => {
    const userExists = await User.findById(id);
    if(!userExists) {
        throw new Error(`Id ${id} does not exist in database`);
    }
}