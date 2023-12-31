import { Schema, model } from "mongoose";
import { IUserEntry } from "../types/userTypes";
import { Role } from "../types/userEnums";

const userSchema = new Schema<IUserEntry>({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        enum: [Role.ADMIN_ROLE, Role.USER_ROLE, Role.PREMIUM_ROLE],
        default: Role.USER_ROLE
    },
    status: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

// remove __v and password from the response
// get _id as uid and return with user
userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

export default model<IUserEntry>('User', userSchema);