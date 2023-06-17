import express from 'express';
import * as workoutService from '../services/workoutService'
import toNewWorkoutEntry from '../utils/workoutUtils';


const router = express.Router();

router.get("/", (_req, res) => {
    res.send(workoutService.getWorkoutsWithoutComment());
});

router.get("/:id", (req, res) => {
    const workout = workoutService.findWorkoutById(parseInt(req.params.id));
    return workout !== undefined ? res.json(workout) : res.sendStatus(404);
});

router.post("/", (req, res) => {
    try {
        const newWorkoutEntry = toNewWorkoutEntry(req.body);
        const addedWorkoutEntry = workoutService.addWorkoutEntry(newWorkoutEntry);
        res.json(addedWorkoutEntry);    
    } catch (err: unknown) {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        }
    }

});


export default router;

