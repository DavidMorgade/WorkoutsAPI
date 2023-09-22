import {Request, Response} from "express";
import { MuscleGroup, User, Workout } from "../models";

// create a new workout post
export const postWorkout = async (req: Request, res: Response) => {
    const workoutName = req.body.workoutName.toUpperCase();
    // GET PARAMETERS FROM THE BODY
    const {time, mood, comment, shared, muscleGroups: muscleGroupsNames, likes} = req.body;
    // GET USER ID
    const user = await User.findById(req.user._id);
    // GET MUSCLEGROUP ID (ARRAY OF IDS)
    const muscleGroups = await MuscleGroup.find({status: true, name: muscleGroupsNames});
    // CREATE THE WORKOUT
    const workout = new Workout({workoutName, muscleGroups, time, mood, comment, shared, user, likes});
    

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
// get workout by id controller
export const getWorkout = async (req: Request, res: Response) => {
    const {id} = req.params;
    // populate both user and musclegroup to get specific musclegroup info + username
    const workOut = await Workout.findById(id).populate("user", "name").populate("muscleGroups", "name");
    return res.status(202).json(workOut)
}
// get all workouts user:
export const getUserWorkouts = async (req: Request, res: Response) => {
    const {limit = 5, from = 0} = req.query;
    const reqUserId = req.user._id;
    if(isNaN(+limit) || isNaN(+from)) {
        return res.status(400).json({
            message: "Limit and from must be numbers"
        });
    }
    const dbUserId = await User.findById(reqUserId);
    // Executes both promises at the same time
    const [total, workouts] = await Promise.all(
        [
            Workout
            .countDocuments()
            .where({status: true, user: dbUserId}),
            Workout
            .find({status: true})
            .populate("user", "name").populate("muscleGroups", "name")
        ]);

    return res.json({
        total,
        workouts
    });
}
// get all workouts (shared):
export const getSharedWorkouts = async (req: Request, res: Response) => {
    const {limit = 5, from = 0} = req.query;
    if(isNaN(+limit) || isNaN(+from)) {
        return res.status(400).json({
            message: "Limit and from must be numbers"
        });
    }
    // Executes both promises at the same time
    const [total, workouts] = await Promise.all(
        [
            Workout
            .countDocuments()
            .where({status: true, shared: true}),
            Workout
            .find({status: true, shared: true})
            .populate("user", "name").populate("muscleGroups", "name")
        ]);

    return res.json({
        total,
        workouts
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
// PUT CHANGES ON WORKOUT   
export const putWorkout = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {_id, status, user, __v, muscleGroups, date, likes, ...rest} = req.body;
    const workoutUpdated = await Workout.findByIdAndUpdate(id, rest, {new: true});

    res.json(workoutUpdated);
}
// UPDATE LIKES
export const putLikesWorkout = async (req: Request, res: Response) => {
    const { id } = req.params;
    let {likes, ...rest} = req.body;

    const workoutFound = await Workout.findByIdAndUpdate(id, rest, {new: true, $inc: {quantity: -2}, "likes": 1});

    return res.json(workoutFound);
}