import React, { CSSProperties, useEffect, useState } from "react";
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

const menuItems = ["history", "delete", "trim"] as const;
export type MenuItems = typeof menuItems;

const MeasuredMexcercise: React.FC<Props> = ({ mexc }) => {
   const [historyOf, setHistoryOf] = useState<number | null>(null);
   const addSet = useAppState((state) => state.addSet);
   const deleteMeasuredExc = useAppState((state) => state.deleteMeasuredExc);
   const trimMexc = useAppState((state) => state.trimMexc);
   const saveLazy = useSaveLazy(0);
   const excercise = useAppState((state) => state.excercises.find((e) => e.id === mexc.excercise_id)!);

   const onSelectOveflowItem = (mi: MenuItems[number]) => {
      switch (mi) {
         case "history": {
            setHistoryOf(mexc.excercise_id);
            break;
         }
         case "delete": {
            saveLazy(() => deleteMeasuredExc(mexc));
            break;
         }
         case "trim": {
            trimMexc(mexc)
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
               onSelect={(mi) => onSelectOveflowItem(mi)}
            />
         </div>
         <div
            style={{
               display: "flex",
               flexDirection: "column",
               gap: "0.25rem",
            }}
         >
            <div className="measured-excercise__grid">
               <div>Set</div>
               <div className="measured-excercise__grid-previous-header">Previous</div>
               <div>Weight</div>
               <div>Reps</div>
            </div>
            <div>
               {mexc.sets.map((set, i) => (
                  <div key={set.id}>
                     <div className={'measured-excercise__grid'}>
                        <div>{i}.</div>
                        <div className="measured-excercise__grid-previous-resistance">
                           {set.targetResistance}
                        </div>
                        <div className="measured-excercise__grid-previous-reos">{set.targetRep}</div>
                        <Resistance mexc={mexc} set={set} />
                        <Reps mexc={mexc} set={set} />
                     </div>
                  </div>
               ))}
            </div>
         </div>
         <button className="add-set-button" onClick={() => saveLazy(() => addSet(mexc.id))}>
            Add set
         </button>
         {historyOf && <ExcerciseHistory historyOf={historyOf} onClose={() => setHistoryOf(null)} />}
      </div>
   );
};

export default MeasuredMexcercise;
