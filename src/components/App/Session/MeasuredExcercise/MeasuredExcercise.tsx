import React from "react";

interface Props {
   mexc: MeasuredExcercise;
}

const MeasuredMexcercise: React.FC<Props> = ({ mexc }) => {
   return (
      <div key={mexc.id} className="measured-excercise">
         <div>{mexc.name}</div>
         <div>
            {mexc.sets.map((set) => (
               <div key={set.position} className="measured-excercise__set">
                  <input type="text" name="resistance" id={`${mexc.id}_${set.id}_resistance`} />
                  <input type="text" name="reps" id={`${mexc.id}_${set.id}_reps`} />
               </div>
            ))}
         </div>
      </div>
   );
};

export default MeasuredMexcercise;
