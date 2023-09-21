import { Schema, model } from "mongoose";

const WorkOutSchema = new Schema({
    workoutName: {
        type: String,
        required: [true, 'Name is required'],
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
    },
    date: {
        type: Date,
        default: Date.now,
    },
    likes : {
        type: Number,
        default: 0
    },
    muscleGroups: [{
        type: Schema.Types.ObjectId,
        ref: "MuscleGroup",
    }]
});

WorkOutSchema.methods.toJSON = function() {
    const {__v, status, ...data} = this.toObject();
    return data;
}

export default model('Workout', WorkOutSchema);