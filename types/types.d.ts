type Excercise = {
   id: number;
   name: string;
};

type ExcerciseSet = {
   id: number;
   position: number;
   reps: string;
   resistance: string;
};

interface MeasuredExcercise extends Excercise {
   position: number;
   sets: ExcerciseSet[];
}

type Session = {
   start: Date | null;
   end: Date | null;
   excercises: MeasuredExcercise[];
};
