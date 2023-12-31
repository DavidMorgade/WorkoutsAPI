import express from "express";


import { deleteWorkout, getSharedWorkouts, getUserWorkouts, getWorkout, postWorkout, putLikesWorkout, putWorkout } from "../controllers/workout";
import { isAdminRole, validateFields, validateJWT, validateMuscleGroup } from "../middlewares";
import { check } from "express-validator";
import { validateWorkoutId } from "../helpers/dbValidators";
import { MuscleGroup } from "../types/workoutEnums";



const router = express.Router();


// POST new Workout 
router.post("/", [
    validateJWT,
    check("workoutName", "The name is required").not().isEmpty(),
    check("comment", "The comment of the post is required and has to be at least 20 chars, max 240").isLength({min: 20, max: 240}),
    validateMuscleGroup(...Object.keys(MuscleGroup)),
    check("muscleGroups", "You need to specify the muscles that you worked on").not().isEmpty(),
    validateFields
] ,postWorkout )
// DELETE WORKOUT WITH ID
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check("id", "is not a valid Id").isMongoId(),
    check("id").custom(validateWorkoutId),
    validateFields
],deleteWorkout);
// GET SHARED WORKOUTS
router.get("/shared", getSharedWorkouts)
// GET WORKOUTS FORM USER
router.get("/user", [
    validateJWT,
    validateFields
], getUserWorkouts);
// GET WORKOUT WITH ID
router.get("/:id", [
    check("id", "is not a valid id").isMongoId(),
    check("id").custom(validateWorkoutId),
    validateFields
], getWorkout)

// put likes id
router.put("/likes/:id", [
    check("id", "Id is not valid").isMongoId(),
    check("id").custom( validateWorkoutId ),
    validateFields
],  putLikesWorkout);
// put workout id
router.put("/:id", [
    validateJWT,
    check("id", "Id is not valid").isMongoId(),
    check("id").custom( validateWorkoutId ),
    validateFields
],  putWorkout);


export default router;