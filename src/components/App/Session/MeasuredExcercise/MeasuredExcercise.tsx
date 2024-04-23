import React from "react";
import "./MeasuredExcercise.css";

interface Props {
   mexc: MeasuredExcercise;
}

const MeasuredMexcercise: React.FC<Props> = ({ mexc }) => {
   return (
      <div key={mexc.id} className="measured-excercise">
         <div>{mexc.name}</div>
         <div className="measured-excercise__header">
            <div>Set</div>
            <div className="measured-excercise__header-labels">
               <div className="input-label">Weight</div>
               <div className="input-label">Reps</div>
            </div>
         </div>
         {mexc.sets.map((set, i) => (
            <div key={set.position} className="measured-excercise__set">
               <div>{i}.</div>
               <div>
                  <input type="text" name="resistance" id={`${mexc.id}_${set.id}_resistance`} />
                  <input type="text" name="reps" id={`${mexc.id}_${set.id}_reps`} />
               </div>
            </div>
         ))}
      </div>
   );
};

export default MeasuredMexcercise;
