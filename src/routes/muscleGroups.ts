import { Response } from 'express';
import express from 'express';
import { isAdminRole, validateFields, validateJWT } from '../middlewares';
import { check } from 'express-validator';
import { createMuscleGroup } from '../controllers/muscleGroups';



const router = express.Router();


// Optain all Muscle group - public
router.get("/", (_, res: Response) => {
    res.json({
        msg: "GET"
    });
});
// Get only one MuscleGroup with id - public
router.get("/:id", (_, res: Response) => {
    res.json({
        msg: "GET - id"
    });
});
// Create new MuscleGroup - private - only admin
router.post("/", [
    validateJWT,
    check("name", "The name is required").not().isEmpty(),
    validateFields,
    isAdminRole
], createMuscleGroup);
// Update MuscleGroup - private - only admin
router.put("/:id", (_, res: Response) => {
    res.json({
        msg: "PUT"
    });
});
// Delete MuscleGroup - only admin
router.delete("/:id", (_, res: Response) => {
    res.json({
        msg: "Delete"
    });
});

export default router;

