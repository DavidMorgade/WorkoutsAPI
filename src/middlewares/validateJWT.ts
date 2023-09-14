// types for req, res, next
import { Request, Response, NextFunction } from "express";
// jwt
import jsonwebtoken from "jsonwebtoken";
// model
import User from '../models/user';
import { IUserEntry } from "../types/userTypes";



const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const privateKey = process.env.SECRETORPRIVATEKEY || "";
    const token = req.headers["x-token"] as string;
    if(!token) {
        return res.status(401).json({
            msg: "No token in the request",
        })
    }
    try {
        // TODO:
        // any type that need changes in future
        const {uid} = jsonwebtoken.verify(token, privateKey) as any;
        
        // User that correspond to uid
        const userAuth = await User.findById(uid);
        req.user = userAuth as IUserEntry;

        return next();

    } catch (error) {
        return res.status(401).json({
            msg: "Not a valid token"
        })        
    }
}


export default validateJWT;