import React, { useRef } from "react";
import useAppState from "../../../../../stores/useAppState";
import useSaveLazy from "../../../../../hooks/useSaveLazy";

interface Props {
   mexc: MeasuredExcercise;
   set: ExcerciseSet;
}

const Resistance: React.FC<Props> = ({ mexc, set }) => {
   const resRef = useRef(null);
   const setSetProp = useAppState((state) => state.setSetProp);
   const lazySaver = useSaveLazy(1000);

   return (
      <input
         ref={resRef}
         defaultValue={set.resistance}
         type="text"
         name="resistance"
         id={`${mexc.id}_${set.id}_resistance`}
         onChange={(e) =>
            lazySaver(() => {
               setSetProp(mexc.id, set.id, "resistance", e.target.value);
            })
         }
      />
   );
};

export default Resistance;
