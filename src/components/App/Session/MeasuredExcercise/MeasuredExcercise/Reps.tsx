import React, { useRef } from "react";
import useAppState from "../../../../../stores/useAppState";
import useSaveLazy from "../../../../../hooks/useSaveLazy";

interface Props {
   mexc: MeasuredExcercise;
   set: ExcerciseSet;
}

const Reps: React.FC<Props> = ({ mexc, set }) => {
   const repRef = useRef<HTMLInputElement>(null);
   const setSetProp = useAppState((state) => state.setSetProp);
   const lazySaver = useSaveLazy(1000);

   const selectFull = () => {
      repRef.current!.select();
   };

   return (
      <input
         id={`${mexc.id}_${set.id}_reps`}
         className="textinput"
         ref={repRef}
         defaultValue={set.reps}
         type="text"
         name="reps"
         inputMode="numeric"
         onClick={selectFull}
         onChange={(e) =>
            lazySaver(() => {
               setSetProp(mexc.id, set.id, "reps", e.target.value);
            })
         }
      />
   );
};

export default Reps;
