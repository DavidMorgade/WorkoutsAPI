import { Request, Response } from "express";


const hasMuscleGroup = async (res: Response, req: Request) => {
    const query = req.query;
    return res.json(query)
}

export {hasMuscleGroup};