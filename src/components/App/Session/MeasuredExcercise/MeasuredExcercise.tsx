import React, { useEffect, useRef, useSyncExternalStore } from "react";
import "./MeasuredExcercise.css";
import useAppState from "../../../../stores/useAppState";
import useSessionState from "../../../../stores/useSessionState";
import Resistance from "./MeasuredExcercise/Resistance";
import Reps from "./MeasuredExcercise/Reps";

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
            <div key={set.id} className="measured-excercise__set">
               <div>{i}.</div>
               <div>
                  <Resistance mexc={mexc} set={set} />
                  <Reps mexc={mexc} set={set} />
               </div>
            </div>
         ))}
      </div>
   );
};

export default MeasuredMexcercise;
