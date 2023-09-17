import express from 'express';
// middlewares
import { hasMuscleGroup, isAdminRole, validateFields, validateJWT } from '../middlewares';
// express validator
import { check } from 'express-validator';
// Controlers
import { createMuscleGroup, deleteMuscleGroup, getMuscleGroup, getMuscleGroups, putMuscleGroup } from '../controllers/muscleGroups';



const router = express.Router();


// Optain all Muscle group - public
router.get("/",getMuscleGroups);
// Get only one MuscleGroup with id - public
router.get("/:id",  [
    check("id").custom(hasMuscleGroup),
    check("id", "is not a valid Id")
    .isMongoId(),
    validateFields
], getMuscleGroup);
// Create new MuscleGroup - private - only admin
router.post("/", [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    validateFields,
    isAdminRole
], createMuscleGroup);
// Update MuscleGroup - private - only admin
router.put("/:id", [
    check("id", "Id is not valid").isMongoId(),
    validateFields
],putMuscleGroup);
// Delete MuscleGroup - only admin
router.delete("/:id", deleteMuscleGroup);

export default router;

