import express from "express";
import { IUserEntry } from "../userTypes";
import { MuscleGroupEntry } from "../workoutTypes";

declare global{
    namespace Express {
        interface Request {
            user: IUserEntry
            id_token: string
            muscleGroups: string[]
            muscleGroupComplete: MuscleGroupEntry
        }
        interface Response {
            user: IUserEntry
        }
    }
}