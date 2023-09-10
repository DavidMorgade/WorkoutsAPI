import { Request, Response } from "express";
import User from "../models/user";

import bcrypt from 'bcryptjs';


export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        // verify if email exists
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                message: "User / Password are not correct - email"
            })
        }
        // verify if user is active
        if(!user.status) {
            return res.status(400).json({
                message: "User / Password are not correct - status: false"
            })
        }
        // verify password
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) {
            return res.status(400).json({
                message: "User / Password are not correct - password"
            })
        }
        // generate JWT

        return res.json({
            message: "Login API - Controller",
            email,
            password
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
        })
    }


}

