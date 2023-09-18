import { Schema, model } from "mongoose";

const WorkOutSchema = new Schema({
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
    },
    time: {
        type: Number,
        default: 0
    },
    mood: {
        type: String,
        default: "Good"
    },
    comment: {
        type: String,
        required: [true, "Comment is required"],
    },
    shared: {
        type: Boolean,
        default: false,
        required: true,
    },
    muscleGroup: {
        type: Schema.Types.ObjectId,
        ref: "MuscleGroup",
        required: true
    }
});

WorkOutSchema.methods.toJSON = function() {
    const {__v, status, ...data} = this.toObject();
    return data;
}

export default model('Workout', WorkOutSchema);