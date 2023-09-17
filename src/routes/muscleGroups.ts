import { Response } from 'express';
import express from 'express';



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
router.post("/", (_, res: Response) => {
    res.json({
        msg: "POST - ONLY ADMIN"
    });
});
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

