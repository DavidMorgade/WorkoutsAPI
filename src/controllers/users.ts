import { Request, Response } from "express";


export const getUsers = (req: Request, res: Response) => {
    const query = req.query;

    res.json({
        message: "Get API - Controller",
        query
    });
}

export const putUsers = (req: Request, res: Response) => {
    const id = req.params.id;

    res.json({
        message: "Put API - Controller",
        id
    });
}

export const postUsers = (_req: Request, res: Response) => {
    res.json({
        message: "Post API - Controller",
    });
}

export const deleteUsers = (_req: Request, res: Response) => {
    res.json({
        message: "Delete API - Controller"
    });
}

export const patchUsers = (_req: Request, res: Response) => {
    res.json({
        message: "Patch API -  Controller"
    });
}