import { Request, Response } from "express"
import { MuscleGroup } from "../models";


const createMuscleGroup = async (req: Request, res: Response) => {

    const name = req.body.name.toUpperCase();

    const dbMuscleGroup = await MuscleGroup.findOne({name});

    if(dbMuscleGroup) {
        return res.status(400).json({
            msg: `The musclegroup ${dbMuscleGroup}, already exits`
        })
    }
    // Generate data to save
    const data = {
        name,
        user: req.user._id
    }
    // Save on db
    const muscleGroup = await new MuscleGroup(data);
    await muscleGroup.save();

     return res.status(201).json(muscleGroup);
}



export {createMuscleGroup};