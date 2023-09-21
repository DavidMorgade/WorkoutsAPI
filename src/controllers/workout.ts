import {Request, Response} from "express";
import { MuscleGroup, User, Workout } from "../models";


export const postWorkout = async (req: Request, res: Response) => {
    const workoutName = req.body.workoutName.toUpperCase();
    // GET PARAMETERS FROM THE BODY
    const {time, mood, comment, shared, muscleGroups: muscleGroupsNames} = req.body;
    // GET USER ID
    const user = await User.findById(req.user._id);
    // GET MUSCLEGROUP ID (ARRAY OF IDS)
    const muscleGroups = await MuscleGroup.find({status: true, name: muscleGroupsNames});
    
    const workout = new Workout({workoutName, muscleGroups, time, mood, comment, shared, user});
    

    // save user in database
    await workout.save();

    return res.json({
        message: "Post API - Controller",
        workoutName,
        muscleGroups,
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