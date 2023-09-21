import { NextFunction, Request, Response } from "express"
import { requestValidator } from "./validateRoles";
import { arrayContains} from "../helpers/globalHelpers";
// import { muscleGroup } from "../types/workoutTypes";

// Validate the request muscleGroup
const validateMuscleGroup = (...muscleGroups : any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        requestValidator(req, res);
        const muscleGroupName : string[] = req.body.muscleGroups;
        if(!arrayContains(muscleGroups, muscleGroupName) || muscleGroupName.length === 0) {
            return res.status(401).json({
                msg: `This muscleGroup doesn't exists on the database`
            })
        }

        return next();
    }
}


export {validateMuscleGroup}