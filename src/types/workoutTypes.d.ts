import { MuscleGroup, Mood } from "./workoutEnums";

// Full WorkoutEntry
export interface WorkoutEntry {
    id: number;
    date: string;
    muscleGroup: MuscleGroup;
    mood: Mood;
    duration: number;
    comment: string;
}
// Full WorkoutEntry
export interface MuscleGroupEntry {
    _id: number;
    name: string;
    date: string;
    muscleGroup: WorkoutEntry;
    mood: Mood;
    duration: number;
    comment: string;
}
// WorkoutEntry without the comment field
export type NoCommentWorkoutEntry = Omit<WorkoutEntry, "comment">;
// WorkoutEntry without the id field
export type NewWorkoutEntry = Omit<WorkoutEntry, "id">;

export type muscleGroup = string[];