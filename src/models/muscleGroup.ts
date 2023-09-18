import { Schema, model } from "mongoose";

const MuscleGroupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

MuscleGroupSchema.methods.toJSON = function() {
    const {__v, status, ...data} = this.toObject();
    return data;
}

export default model('MuscleGroup', MuscleGroupSchema);