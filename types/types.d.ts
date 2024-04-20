type Excercise = {
    id: number;
    name: string;
};

type ExcerciseSet = {
    position: number,
    reps: number,
    resistance: number,
}

interface MeasuredExcercise extends Excercise {
    position: number;
    sets: ExcerciseSet[]
}

type Session = {
    excercises: MeasuredExcercise[];
};
