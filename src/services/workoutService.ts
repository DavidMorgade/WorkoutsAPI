import { WorkoutEntry, NoCommentWorkoutEntry, NewWorkoutEntry } from '../types/workoutTypes';
import workoutData from './workouts.json';

const workouts: WorkoutEntry[] = workoutData as WorkoutEntry[];

export const getAllWorkouts = (): WorkoutEntry[] => {
    return workouts;
}

export const findWorkoutById = (id: number): WorkoutEntry | undefined => {
    const workout = workouts.find(workout => workout.id === id);
    if(typeof workout !== 'undefined') {
        return workout;
    } else {
        throw new Error('Workout not found');
    }
}

export const getWorkoutsWithoutComment = () : NoCommentWorkoutEntry[] => {
    // return workouts without comment
    return workouts.map(({comment, ...rest}) => rest);  
}

export const addWorkoutEntry = (newWorkoutEntry: NewWorkoutEntry) => {
    const newWorkout: WorkoutEntry = {        
        id: Math.max(...workouts.map(workout => workout.id)) + 1,
        ...newWorkoutEntry
    };
    workouts.push(newWorkout);
    return newWorkout;
}
