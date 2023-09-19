import {Request, Response} from "express";
import { User, Workout } from "../models";


export const postWorkout = async (req: Request, res: Response) => {
    const workoutName = req.body.workoutName.toUpperCase();
    const {time, mood, comment, shared} = req.body;
    const user = await User.findById(req.user._id);
    const name = user?.name;
    const workout = new Workout({workoutName, time, mood, comment, shared, user});
    

    // save user in database
    await workout.save();

    return res.json({
        message: "Post API - Controller",
        workoutName,
        name,
        muscleGroup: req.body.muscleGroup,
        time,
        comment,
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