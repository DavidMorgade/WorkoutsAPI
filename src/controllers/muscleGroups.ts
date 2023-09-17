import { Request, Response } from "express"
import { MuscleGroup } from "../models";




// Obtain MuscleGroups - pagination - total 
const getMuscleGroups = async (req: Request, res: Response) => {
    const {limit = 5, from = 0} = req.query;
    if(isNaN(+limit) || isNaN(+from)) {
        return res.status(400).json({
            message: "Limit and from must be numbers"
        });
    }
    // Executes both promises at the same time
    const [total, muscleGroups] = await Promise.all(
        [
            MuscleGroup
            .countDocuments()
            .where({status: true}),
            MuscleGroup
            .find({status: true})
            .populate("user")
        ]);

    return res.json({
        total,
        muscleGroups
    });
}
// Obtain muscleGroup by id - populate;
const getMuscleGroup = async (req: Request, res: Response) => {
    const {id} = req.params;

    const muscleGroup = await MuscleGroup.findById(id).populate("user");
    return res.status(202).json(muscleGroup)
}
// Update muscleGroup
const putMuscleGroup =async (req: Request, res: Response) => {
    const { id } = req.params;
    const {_id, ...rest} = req.body;

    const muscleGroup = await MuscleGroup.findByIdAndUpdate(id, rest);

    return res.json(muscleGroup);
}
// Create MuscleGroup
const createMuscleGroup = async (req: Request, res: Response) => {

    const name = req.body.name.toUpperCase();

    const dbMuscleGroup = await MuscleGroup.findOne({name});

    if(dbMuscleGroup) {
        return res.status(400).json({
            msg: `The musclegroup ${dbMuscleGroup.name}, already exits`
        })
    }
    // Generate data to save
    const data = {
        name,
        user: req.user._id
    }
    // Save on db
    const muscleGroup = await new MuscleGroup(data);
    await muscleGroup.save();

     return res.status(201).json(muscleGroup);
}
// Delete MuscleGroup (set status: false)
const deleteMuscleGroup = async (req: Request, res: Response) => {
    const {id} = req.params;

    // disables muscleGroup from database
    const muscleGroup = await MuscleGroup.findByIdAndUpdate(id, {status: false});


    return res.json(
        muscleGroup,
        );
}



export {getMuscleGroups, createMuscleGroup, getMuscleGroup, putMuscleGroup, deleteMuscleGroup};