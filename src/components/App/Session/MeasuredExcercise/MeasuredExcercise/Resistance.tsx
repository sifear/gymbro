import React, { useRef } from "react";
import useAppState from "../../../../../stores/useAppState";

interface Props {
   mexc: MeasuredExcercise;
   set: ExcerciseSet;
}

const Resistance: React.FC<Props> = ({ mexc, set }) => {
   const resRef = useRef(null);
   const setSetProp = useAppState((state) => state.setSetProp);

   return (
      <input
         ref={resRef}
         defaultValue={set.resistance}
         type="text"
         name="resistance"
         id={`${mexc.id}_${set.id}_resistance`}
         onChange={(e) => setSetProp(mexc.id, set.id, "resistance", e.target.value)}
      />
   );
};

export default Resistance;
