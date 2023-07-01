import { NewWorkoutEntry} from '../types/workoutTypes';
import { MuscleGroup, Mood } from '../types/workoutEnums';

// parse functions
const parseComment = (commentFromRequest: any): string => {
    if(!isString(commentFromRequest)) {
        throw new Error('Incorrect or missing comment: ' + commentFromRequest);
    }
    return commentFromRequest;
}
const parseDate = (dateFromRequest: any): string => {
    if(!isDate(dateFromRequest) || !isString(dateFromRequest)) {
        throw new Error('Incorrect or missing date: ' + dateFromRequest);
    }
    return dateFromRequest;
}
const parseMuscleGroup = (muscleGroupFromRequest: any): MuscleGroup => {
    if(!isString(muscleGroupFromRequest) || !isMuscleGroup(muscleGroupFromRequest)) {
        throw new Error('Incorrect or missing muscle group: ' + muscleGroupFromRequest);
    }
    return muscleGroupFromRequest;
}
const parseMood = (moodFromRequest: any): Mood => {
    if(!isString(moodFromRequest) || !isMood(moodFromRequest)) {
        throw new Error('Incorrect or missing mood: ' + moodFromRequest);
    }
    return moodFromRequest;
}
const parseDuration = (durationFromRequest: any): number => {
    if(!isNumber(durationFromRequest)) {
        throw new Error('Incorrect or missing duration: ' + durationFromRequest);
    }
    return durationFromRequest;
}

// type guard
const isString = (string: string) : boolean => {
    return typeof string === 'string';
}
const isNumber = (number: number): boolean => {
    return typeof number === 'number';
}
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
const isMuscleGroup = (muscleGroup: MuscleGroup): boolean => {
    return Object.values(MuscleGroup).includes(muscleGroup);
}
const isMood = (mood: Mood): boolean => {
    return Object.values(Mood).includes(mood);
}


const toNewWorkoutEntry = (object: any): NewWorkoutEntry => {
    const newEntry: NewWorkoutEntry = {
        comment: parseComment(object.comment),
        date: parseDate(object.date),
        muscleGroup: parseMuscleGroup(object.muscleGroup),
        mood: parseMood(object.mood),
        duration: parseDuration(object.duration)
    };
    return newEntry;
}

export default toNewWorkoutEntry;