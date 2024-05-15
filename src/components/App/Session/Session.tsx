import React, { useEffect, useRef, useState } from "react";
import "./Session.css";
import Drawer from "../../ui/Drawer/Drawer";
import useAppState from "../../../stores/useAppState";
import AddNew from "./AddNew/AddNew";
import AddExcercise from "./AddExcercise/AddExcercise";
import MeasuredMexcercise from "./MeasuredExcercise/MeasuredExcercise";
import ExcerciseList from "./ExcerciseList/ExcerciseList";
import Timer from "./misc/Timer";

interface Props {}

const Session: React.FC<Props> = ({}) => {
   const [newExcerciseOpen, setNewExcerciseOpen] = useState(false);
   const [addExcerciseOpen, setAddExcerciseOpen] = useState(false);
   const setPage = useAppState((state) => state.setPage);
   const session = useAppState((state) => state.session);
   const finishSession = useAppState((state) => state.finishSession);

   if (!session) return <div>Loading...</div>;

   return (
      <Drawer onRetract={() => setPage(null)} height="full">
         <div className={`session__content`}>
            {!session.end && (
               <div>
                  {!session.end && <Timer />}
                  <button onClick={finishSession}>Finish</button>
               </div>
            )}
            <div>
               <ExcerciseList>
                  {session.excercises.map((mexc) => (
                     <MeasuredMexcercise key={mexc.id} mexc={mexc} />
                  ))}
               </ExcerciseList>
            </div>
            <div className="session__content__page-buttons">
               <div className="session__content__btn" onClick={() => setAddExcerciseOpen(true)}>
                  Add excercise
               </div>
               <div className="session__content__btn" onClick={() => setNewExcerciseOpen(true)}>
                  Add new excercise
               </div>
            </div>

            {newExcerciseOpen && (
               <div>
                  <Drawer height="low" onRetract={() => setNewExcerciseOpen(false)}>
                     <AddNew />
                  </Drawer>
               </div>
            )}
            {addExcerciseOpen && (
               <div>
                  <Drawer height="low" onRetract={() => setAddExcerciseOpen(false)}>
                     <AddExcercise
                        onClose={() => {
                           console.log("click");
                           setAddExcerciseOpen(false);
                        }}
                     />
                  </Drawer>
               </div>
            )}
         </div>
      </Drawer>
   );
};

export default Session;
