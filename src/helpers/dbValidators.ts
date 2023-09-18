import {Role, User, MuscleGroup} from "../models";

/**
 * 
 *  validate roles directly on the database
 */

export const validateRole = async (role: string) => {
    const rolExists = await Role.findOne({role});
    if(!rolExists) {
        throw new Error(`Role ${role} does not exist`);
    }
}

/**
 * 
 *  validate email directly on the database
 * 
 */

export const validateEmail = async (email: string) => {
    const emailExists = await User.findOne({email});
    if(emailExists) {
        throw new Error(`Email ${email} already exists in database`);
    }
}

/**
 * 
 *  validate user directly on the database
 * 
 */

export const validateUserId = async (id: string) => {
    const userExists = await User.findById(id);
    if(!userExists) {
        throw new Error(`Id ${id} does not exist in database`);
    }
}

/**
 * 
 *  validate musclegroup directly on the database
 * 
 */

export const validateMuscleGroupId = async (id: string) => {
    const muscleGroupExists = await MuscleGroup.findById(id);
    if(!muscleGroupExists) {
        throw new Error(`Id ${id} does not exist in database`);
    }
}