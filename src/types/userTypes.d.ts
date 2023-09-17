import { Role } from "./userEnums";

export interface IUserEntry {
    name: string;
    email: string;
    _id: string;
    password: string;
    img?: string;
    role: string;
    status: boolean;
    google: boolean;
    uid: string;
}
export type RoleType = string;