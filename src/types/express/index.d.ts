import express from "express";
import { IUserEntry } from "../userTypes";

declare global{
    namespace Express {
        interface Request {
            user: IUserEntry
            id_token: string
        }
        interface Response {
            user: IUserEntry
        }
    }
}