import express from 'express';
// middlewares
import {  isAdminRole, validateFields, validateJWT } from '../middlewares';
// express validator
import { check } from 'express-validator';
// custom db validator
import { validateMuscleGroupId } from '../helpers/dbValidators';
// Controlers
import { createMuscleGroup, deleteMuscleGroup, getMuscleGroup, getMuscleGroups, putMuscleGroup } from '../controllers/muscleGroups';



const router = express.Router();


// Optain all Muscle group - public
router.get("/",getMuscleGroups);
// Get only one MuscleGroup with id - public
router.get("/:id",  [
    check("id", "is not a valid Id").isMongoId(),
    check("id").custom(validateMuscleGroupId),
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
    validateJWT,
    isAdminRole,
    check("name", "The name is required").not().isEmpty(),
    check("id", "Id is not valid").isMongoId(),
    check("id").custom(validateMuscleGroupId),
    validateFields
],putMuscleGroup);
// Delete MuscleGroup - only admin
router.delete("/:id", [
    validateJWT,
    isAdminRole,
    check("id", "is not a valid Id").isMongoId(),
    check("id").custom(validateMuscleGroupId),
    validateFields
],deleteMuscleGroup);

export default router;

