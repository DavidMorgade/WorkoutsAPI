import { Request, Response } from "express";
import User from "../models/user";

import bcrypt from 'bcryptjs';
import generateJWT from "../helpers/generateJWT";
import { googleVerify } from "../helpers/googleVerify";


const login = async (req: Request, res: Response) => {
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
        const token = await generateJWT(user.id);


        return res.json({
            message: "Login API - Controller",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
        })
    }
}

const googleSignIn = async(req: Request, res: Response) => {
    const {id_token} = req.body;

    try {
        const {name, img, email} = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if(!user) {
            // Create user because doesnt exists
            const data = {
                name,
                img,
                email,
                password: ":p",
                google: true
            };
            user = new User(data);
            await user.save();
        }
        // if user is "deleted"
        if(!user.status) {
            return res.status(404).json({
                msg: "Talk with and admin, user blocked"
            })
        }
        // Generate JWT
        const token = await generateJWT(user.id);

        return res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "The token couldnt be verified"
        })
    }
}

export {login, googleSignIn}
