import React, { Fragment, useState } from "react";
import "./MeasuredExcercise.css";
import Resistance from "./MeasuredExcercise/Resistance";
import Reps from "./MeasuredExcercise/Reps";
import useAppState from "../../../../stores/useAppState";
import useSaveLazy from "../../../../hooks/useSaveLazy";
import OverflowMenu from "../../../ui/OverflowMenu/OverflowMenu";
import ExcerciseHistory from "./ExcerciseHistory/ExcerciseHistory";

interface Props {
   mexc: MeasuredExcercise;
}

const menuItems = ["history", "else", "delete"] as const;
export type MenuItems = typeof menuItems;

const MeasuredMexcercise: React.FC<Props> = ({ mexc }) => {
   const [historyOf, setHistoryOf] = useState<number | null>(null);
   const addSet = useAppState((state) => state.addSet);
   const deleteMeasuredExc = useAppState((state) => state.deleteMeasuredExc);
   const saveLazy = useSaveLazy(0);
   const excercise = useAppState(
      (state) => state.excercises.find((e) => e.id === mexc.excercise_id)!
   );

   const onSelectOveflowItem = (mi: MenuItems[number], excId: number) => {
      console.log(mi);
      switch (mi) {
         case "history": {
            setHistoryOf(excId);
            break;
         }
         case "delete": {
            saveLazy(() => deleteMeasuredExc(mexc))
            break;
         }
         case "else": {
            break;
         }
      }
   };

   return (
      <div key={mexc.id} className="measured-excercise">
         <div className="measured-excercise__header">
            <div>{excercise.name}</div>
            <OverflowMenu
               menuItems={menuItems}
               onSelect={(mi) => onSelectOveflowItem(mi, mexc.excercise_id)}
            />
         </div>
         <div className="measured-excercise__grid">
            <div>Set</div>
            <div className="measured-excercise__grid-previous-header">Previous</div>
            <div>Weight</div>
            <div>Reps</div>
            {mexc.sets.map((set, i) => (
               <Fragment key={set.id}>
                  <div>{i}.</div>
                  <div className="measured-excercise__grid-previous-resistance">
                     {set.targetResistance}
                  </div>
                  <div className="measured-excercise__grid-previous-reos">{set.targetRep}</div>
                  <Resistance mexc={mexc} set={set} />
                  <Reps mexc={mexc} set={set} />
               </Fragment>
            ))}
         </div>
         <button className="add-set-button" onClick={() => saveLazy(() => addSet(mexc.id))}>
            Add set
         </button>
         {historyOf && (
            <ExcerciseHistory historyOf={historyOf} onClose={() => setHistoryOf(null)} />
         )}
      </div>
   );
};

export default MeasuredMexcercise;
