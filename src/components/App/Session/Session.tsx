import React, { useEffect, useRef, useState } from "react";
import "./Session.css";
import Drawer from "../../ui/Drawer/Drawer";
import useAppState from "../appState";
import AddNew from "./AddNew/AddNew";
import Add from "./AddNew/Add";
import MeasuredExcercise from "./MeasuredExcercise/MeasuredExcercise";
import MeasuredMexcercise from "./MeasuredExcercise/MeasuredExcercise";

interface Props {}

const Session: React.FC<Props> = ({}) => {
   const backplate = useRef(null);
   const [newExcerciseOpen, setNewExcerciseOpen] = useState(false);
   const [addExcerciseOpen, setAddExcerciseOpen] = useState(false);
   const setPage = useAppState((state) => state.setPage);
   const session = useAppState((state) => state.session);
   const createSession = useAppState((state) => state.createSession);

   useEffect(() => {
      if (!session) {
         createSession();
      }
   }, []);

   if (!session) return <div>Loading...</div>;

   return (
      <>
         <div className={`session`}>
            <Drawer onRetract={() => setPage(null)} height="full">
               {session.excercises.map((mexc) => (
                  <MeasuredMexcercise mexc={mexc} />
               ))}
               <div className={`session__content`} ref={backplate}>
                  <div className="session__content__btn" onClick={() => setNewExcerciseOpen(true)}>
                     Add new excercise
                  </div>
                  <div className="session__content__btn" onClick={() => setAddExcerciseOpen(true)}>
                     Add excercise
                  </div>
               </div>
            </Drawer>
         </div>
         {newExcerciseOpen && (
            <div>
               <Drawer height="low" onRetract={() => {}}>
                  <AddNew />
               </Drawer>
            </div>
         )}
         {addExcerciseOpen && (
            <div>
               <Drawer height="low" onRetract={() => {}}>
                  <Add onClose={setAddExcerciseOpen} />
               </Drawer>
            </div>
         )}
      </>
   );
};

export default Session;
