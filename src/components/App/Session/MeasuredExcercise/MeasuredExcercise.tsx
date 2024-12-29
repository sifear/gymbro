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

const menuItems = ["history", "else", "delete"] as const;
export type MenuItems = typeof menuItems;

const MeasuredMexcercise: React.FC<Props> = ({ mexc }) => {
   const [historyOf, setHistoryOf] = useState<number | null>(null);
   const [holdSelected, setHoldSelected] = useState<null | number>(null);
   const addSet = useAppState((state) => state.addSet);
   const deleteMeasuredExc = useAppState((state) => state.deleteMeasuredExc);
   const deleteSet = useAppState((state) => state.deleteSet);
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
            saveLazy(() => deleteMeasuredExc(mexc));
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
                  <HoldSelect
                     key={set.id}
                     onSelect={() => {
                        deleteSet(mexc, i);
                        setHoldSelected(null);
                     }}
                     onTarget={() => setHoldSelected(i)}
                     onCancel={() => setHoldSelected(null)}
                  >
                     <div className={`measured-excercise__grid ${holdSelected === i && "selected"}`}>
                        <div>{i}.</div>
                        <div className="measured-excercise__grid-previous-resistance">
                           {set.targetResistance}
                        </div>
                        <div className="measured-excercise__grid-previous-reos">
                           {set.targetRep}
                        </div>
                        <Resistance mexc={mexc} set={set} />
                        <Reps mexc={mexc} set={set} />
                     </div>
                  </HoldSelect>
               ))}
            </div>
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

type HoldSelectProps = {
   onSelect: () => void;
   onTarget: () => void;
   onCancel: () => void;
   className?: string;
   style?: CSSProperties;
   children?: React.ReactNode;
};

const HoldSelect: React.FC<HoldSelectProps> = ({
   onSelect,
   onTarget,
   onCancel,
   className,
   style,
   children,
}) => {
   const [timer, setTimer] = useState<NodeJS.Timeout>();

   useEffect(() => {
      return () => {
         clearTimeout(timer);
      };
   });

   return (
      <div
         style={style ? style : {}}
         className={className ? className : "hold-select"}
         onPointerDown={() => {
            onTarget();
            setTimer(
               setTimeout(() => {
                  onSelect();
               }, 1000)
            );
         }}
         onPointerUp={() => {
            clearTimeout(timer);
            onCancel()
         }}
      >
         {children}
      </div>
   );
};
