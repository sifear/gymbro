import React from "react";
import "./MeasuredExcercise.css";
import Resistance from "./MeasuredExcercise/Resistance";
import Reps from "./MeasuredExcercise/Reps";
import useAppState from "../../../../stores/useAppState";
import useSaveLazy from "../../../../hooks/useSaveLazy";

interface Props {
   mexc: MeasuredExcercise;
}

const MeasuredMexcercise: React.FC<Props> = ({ mexc }) => {
   const addSet = useAppState((state) => state.addSet);
   const saveLazy = useSaveLazy(0);
   const excercise = useAppState(
      (state) => state.excercises.find((e) => e.id === mexc.excercise_id)!
   );

   return (
      <div key={mexc.id} className="measured-excercise">
         <div>{excercise.name}</div>
         <div className="measured-excercise__header">
            <div>Set</div>
            <div className="measured-excercise__header-labels">
               <div className="input-label">Weight</div>
               <div className="input-label">Reps</div>
            </div>
         </div>
         {mexc.sets.map((set, i) => (
            <div key={set.id} className="measured-excercise__set">
               <div>{i}.</div>
               <div>
                  <Resistance mexc={mexc} set={set} />
                  <Reps mexc={mexc} set={set} />
               </div>
            </div>
         ))}
         <button onClick={() => saveLazy(() => addSet(mexc.id))}>Add set</button>
      </div>
   );
};

export default MeasuredMexcercise;
