import React, { useRef } from "react";
import useAppState from "../../../../../stores/useAppState";
import useSaveLazy from "../../../../../hooks/useSaveLazy";

interface Props {
   mexc: MeasuredExcercise;
   set: ExcerciseSet;
}

const Resistance: React.FC<Props> = ({ mexc, set }) => {
   const resRef = useRef<HTMLInputElement>(null);
   const setSetProp = useAppState((state) => state.setSetProp);
   const lazySaver = useSaveLazy(1000);

   const selectFull = () => {
      resRef.current!.select();
   };

   return (
      <input
         id={`${mexc.id}_${set.id}_resistance`}
         ref={resRef}
         defaultValue={set.resistance}
         type="text"
         name="resistance"
         inputMode="numeric"
         onClick={selectFull}
         onChange={(e) =>
            lazySaver(() => {
               setSetProp(mexc.id, set.id, "resistance", e.target.value);
            })
         }
      />
   );
};

export default Resistance;
