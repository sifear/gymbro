import React, { useEffect, useRef, useState } from "react";
import "./Session.css";
import Drawer from "../../ui/Drawer/Drawer";
import useAppState from "../../../stores/useAppState";
import AddNew from "./AddNew/AddNew";
import Add from "./Add/Add";
import MeasuredMexcercise from "./MeasuredExcercise/MeasuredExcercise";
import ExcerciseList from "./ExcerciseList/ExcerciseList";

interface Props {}

const Session: React.FC<Props> = ({}) => {
   const backplate = useRef(null);
   const [newExcerciseOpen, setNewExcerciseOpen] = useState(false);
   const [addExcerciseOpen, setAddExcerciseOpen] = useState(false);
   const setPage = useAppState((state) => state.setPage);
   const session = useAppState((state) => state.session);
   const saveSessionToDB = useAppState((state) => state.saveSessionToDB);
   const initSession = useAppState((state) => state.initSession);

   useEffect(() => {
      if (!session) {
         initSession();
      }
   }, []);

   if (!session) return <div>Loading...</div>;

   return (
      <Drawer onRetract={() => setPage(null)} height="full">
         <button onClick={() => saveSessionToDB(session)}>Save to db</button>
         <ExcerciseList>
            {session.excercises.map((mexc) => (
               <MeasuredMexcercise key={mexc.id} mexc={mexc} />
            ))}
         </ExcerciseList>
         <div className={`session__content`} ref={backplate}>
            <div className="session__content__btn" onClick={() => setNewExcerciseOpen(true)}>
               Add new excercise
            </div>
            <div className="session__content__btn" onClick={() => setAddExcerciseOpen(true)}>
               Add excercise
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
                  <Add
                     onClose={() => {
                        console.log("click");
                        setAddExcerciseOpen(false);
                     }}
                  />
               </Drawer>
            </div>
         )}
      </Drawer>
   );
};

export default Session;
