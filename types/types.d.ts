type Excercise = {
   id: number;
   name: string;
};

type ExcerciseSet = {
   id: number;
   position: number;
   reps: string;
   resistance: string;
   targetRep?: string;
   targetResistance?: string;
};

interface MeasuredExcercise {
   id: number;
   excercise_id: number;
   position: number;
   sets: ExcerciseSet[];
}

type Session = {
   id: number;
   start: Date;
   end: Date | null;
   excercises: MeasuredExcercise[];
};
