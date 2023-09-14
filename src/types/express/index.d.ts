import express from "express";
import { IUserEntry } from "../userTypes";

declare global{
    namespace Express {
        interface Request {
            uid?: Record<string,any> 
            user?: IUserEntry  
 
              
        }
        interface Response {
        }
    }
}