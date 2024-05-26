import React, { Fragment } from "react";
import "./MeasuredExcercise.css";
import Resistance from "./MeasuredExcercise/Resistance";
import Reps from "./MeasuredExcercise/Reps";
import useAppState from "../../../../stores/useAppState";
import useSaveLazy from "../../../../hooks/useSaveLazy";
import OverflowMenu from "../../../ui/OverflowMenu/OverflowMenu";

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
         <div className="measured-excercise__header">
            <div>{excercise.name}</div>
            <OverflowMenu menuItems={["history"]} />
         </div>
         <div className="measured-excercise__grid">
            <div>Set</div>
            <div className="measured-excercise__grid-previous-header">Previous</div>
            <div>Weight</div>
            <div>Reps</div>
            {mexc.sets.map((set, i) => (
               <Fragment key={set.id}>
                  <div>{i}.</div>
                  <div className="measured-excercise__grid-previous-resistance">{set.targetResistance}</div>
                  <div className="measured-excercise__grid-previous-reos">{set.targetRep}</div>
                  <Resistance mexc={mexc} set={set} />
                  <Reps mexc={mexc} set={set} />
               </Fragment>
            ))}
         </div>
         <button className="add-set-button" onClick={() => saveLazy(() => addSet(mexc.id))}>
            Add set
         </button>
      </div>
   );
};

export default MeasuredMexcercise;
