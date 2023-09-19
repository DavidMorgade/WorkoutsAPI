import express from "express";

import { Response } from "express";
import { deleteWorkout, postWorkout } from "../controllers/workout";
import { isAdminRole, validateFields, validateJWT } from "../middlewares";
import { check } from "express-validator";
import { validateWorkoutId } from "../helpers/dbValidators";

const router = express.Router();


// GET ALL WORKOUTS TODO::
router.get("/", (_, res: Response) => {
    res.json({
        msg: "OK GET - WORKOUT"
    })
});
// POST new Workout 
router.post("/", [
    validateJWT,
    check("workoutName", "The name is required").not().isEmpty(),
    check("comment", "The comment of the post is required and has to be at least 20 chars, max 240").isLength({min: 20, max: 240}),
    validateFields,
    check("muscleGroup", "You need to specify the muscles that you worked on").not().isEmpty()
] ,postWorkout )
// DELETE WORKOUT WITH ID
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check("id", "is not a valid Id").isMongoId(),
    check("id").custom(validateWorkoutId),
    validateFields
],deleteWorkout);


export default router;