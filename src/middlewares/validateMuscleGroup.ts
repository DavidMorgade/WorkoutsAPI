import { NextFunction, Request, Response } from "express"
import { requestValidator } from "./validateRoles";
// import { muscleGroup } from "../types/workoutTypes";


const validateMuscleGroup = (...muscleGroups : any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        requestValidator(req, res);
        // TODO TIENE QUE QUE BUSCAR EN ARRAY, INCLUDES NO SIRVE YA QUE COMPARA ARRAY CON ARRAY.
        const muscleGroupName : string[] = req.muscleGroups;
        if(!muscleGroups.includes(muscleGroupName)) {
            return res.status(401).json({
                msg: `This muscleGroup can't be added`
            })
        }

        return next();
    }
}


export {validateMuscleGroup}