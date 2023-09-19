import {Request, Response} from "express";
import { Workout } from "../models";


export const postWorkout = async (req: Request, res: Response) => {
    const name = req.body.name.toUpperCase();
    const {time, mood, comment, shared} = req.body;

    const workout = new Workout({name, time, mood, comment, shared});
    

    // save user in database
    await workout.save();

    return res.json({
        message: "Post API - Controller",
        workout,
        user: req.user._id,
        muscleGroup: req.body.muscleGroup //TODO
    });
}

// Delete MuscleGroup (set status: false)
export const deleteWorkout = async (req: Request, res: Response) => {
    const {id} = req.params;

    // disables muscleGroup from database
    const workout = await Workout.findByIdAndUpdate(id, {status: false}, {new: true});


    return res.status(200).json(
            workout,
        );
}