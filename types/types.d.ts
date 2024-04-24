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
   id: number;
   start: Date | null;
   end: Date | null;
   excercises: MeasuredExcercise[];
};
