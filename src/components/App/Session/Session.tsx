import React, { Fragment, useState } from "react";
import "./Session.css";
import Drawer from "../../ui/Drawer/Drawer";
import useAppState from "../../../stores/useAppState";
import AddNew from "./AddNew/AddNew";
import AddExcercise from "./AddExcercise/AddExcercise";
import MeasuredMexcercise from "./MeasuredExcercise/MeasuredExcercise";
import ExcerciseList from "./ExcerciseList/ExcerciseList";
import Timer from "./misc/Timer";

interface Props {
   onMaximize: () => void;
}

const Session: React.FC<Props> = ({ onMaximize }) => {
   const [minimized, setMinimized] = useState(false);
   const [addExcerciseOpen, setAddExcerciseOpen] = useState(false);
   const [addExcerciseIsClosing, setAddExcerciseIsClosing] = useState(false);
   const [newExcerciseOpen, setNewExcerciseOpen] = useState(false);
   const [newExcerciseIsClosing, setNewExcerciseIsClosing] = useState(false);
   const setPage = useAppState((state) => state.setPage);
   const session = useAppState((state) => state.session);
   const finishSession = useAppState((state) => state.finishSession);
   const closeSession = useAppState((state) => state.closeSession);

   if (!session) return <div>Loading...</div>;

   return (
      <Drawer onMinimize={() => setMinimized(true)} minimized={minimized} height="high">
         <div className={`session__content`}>
            {!session.end ? (
               <div
                  className="session__content-header"
                  onClick={() => {
                     if (minimized) {
                        setMinimized(false);
                     }
                  }}
               >
                  <>
                     <Timer />
                     <button className="session__content-finish" onClick={finishSession}>
                        Finish
                     </button>
                  </>
               </div>
            ) : (
               <button className="session__content-close" onClick={() => closeSession()}>
                  Close
               </button>
            )}
            <div>
               <ExcerciseList>
                  {session.excercises.map((mexc) => (
                     <Fragment key={mexc.id}>
                        <MeasuredMexcercise key={mexc.id} mexc={mexc} />
                        <hr style={{ margin: "1rem 0", color: "gray" }} />
                     </Fragment>
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
            {addExcerciseOpen && (
               <div>
                  <Drawer
                     height="low"
                     closing={addExcerciseIsClosing}
                     onClose={() => {
                        setAddExcerciseIsClosing(false);
                        setAddExcerciseOpen(false);
                     }}
                  >
                     <AddExcercise
                        onClose={() => {
                           setAddExcerciseIsClosing(true);
                        }}
                     />
                  </Drawer>
               </div>
            )}
            {newExcerciseOpen && (
               <div>
                  <Drawer
                     height="low"
                     closing={newExcerciseIsClosing}
                     onClose={() => {
                        setNewExcerciseIsClosing(false);
                        setNewExcerciseOpen(false);
                     }}
                  >
                     <AddNew
                        onClose={() => {
                           console.log("1");
                           setNewExcerciseIsClosing(true);
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
