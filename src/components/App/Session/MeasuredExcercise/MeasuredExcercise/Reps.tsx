import React, { useRef } from "react";
import useAppState from "../../../../../stores/useAppState";
import useSaveLazy from "../../../../../hooks/useSaveLazy";

interface Props {
   mexc: MeasuredExcercise;
   set: ExcerciseSet;
}

const Reps: React.FC<Props> = ({ mexc, set }) => {
   const repRef = useRef(null);
   const setSetProp = useAppState((state) => state.setSetProp);
   const lazySaver = useSaveLazy();

   return (
      <input
         ref={repRef}
         defaultValue={set.reps}
         type="text"
         name="reps"
         id={`${mexc.id}_${set.id}_reps`}
         onChange={(e) =>
            lazySaver(() => {
               setSetProp(mexc.id, set.id, "reps", e.target.value);
            })
         }
      />
   );
};

export default Reps;
