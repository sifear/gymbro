import React from "react";
import Drawer from "../../../../ui/Drawer/Drawer";
import useAppState from "../../../../../stores/useAppState";

interface Props {
   historyOf: number;
   onClose: () => void;
}

const ExcerciseHistory: React.FC<Props> = ({ historyOf, onClose }) => {
   const sessions = useAppState((state) => state.sessions);

   const past = sessions.flatMap((session) =>
      session.excercises.filter((exc) => exc.excercise_id === historyOf)
   );

   return (
      <Drawer onRetract={onClose} height="middle">
         <div style={{ backgroundColor: "green" }}>
            {past.map((mexc) => (
               <>
                  <div>
                     {mexc.sets.map((set) => (
                        <div>
                           {set.resistance} {set.reps}
                        </div>
                     ))}
                  </div>
               </>
            ))}
         </div>
      </Drawer>
   );
};

export default ExcerciseHistory;
