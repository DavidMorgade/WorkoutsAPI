import express from "express";
import { IUserEntry } from "../userTypes";

declare global{
    namespace Express {
        interface Request {
            user: IUserEntry
 
              
        }
        interface Response {
            user: IUserEntry
        }
    }
}