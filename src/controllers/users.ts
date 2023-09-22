import { Request, Response } from "express";
import User from "../models/user";

// hash password helper function
import { hashPassword } from "../helpers/globalHelpers";
// express validator




export const getUsers = async (req: Request, res: Response) => {
    const {limit = 5, from = 0} = req.query;
    if(isNaN(+limit) || isNaN(+from)) {
        return res.status(400).json({
            message: "Limit and from must be numbers"
        });
    }
    // Executes both promises at the same time
    const [total, users] = await Promise.all([User.countDocuments().where({status: true}),User.find({status: true})]);

    return res.json({
        total,
        users
    });
}

export const putUsers = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {_id, password, google, email, ...rest} = req.body;
    // TODO: VALIDATE TO DATABASE
    if(password) {
        // encrypt password
       hashPassword(password, rest);
    }
    const user = await User.findByIdAndUpdate(id, rest);

    res.json(user);
}

export const postUsers = async (req: Request, res: Response) => {
    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});
    // encrypt password
    hashPassword(password, user);
    // save user in database
    await user.save();

    return res.json({
        message: "Post API - Controller",
        user
    });
}

export const deleteUsers = async (req: Request, res: Response) => {
    const {id} = req.params;

    // delete user from database
    const user = await User.findByIdAndUpdate(id, {status: false});


    return res.json(
        user,
        );
}

// TODO
export const patchUsers = (_req: Request, res: Response) => {
    res.json({
        message: "Patch API -  Controller"
    });
}