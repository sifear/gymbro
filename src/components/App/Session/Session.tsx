import React, { Fragment, useState } from "react";
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
   const [minimized, setMinimized] = useState(false);
   const [sessionClosing, setSessionClosing] = useState(false);
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
      <Drawer
         height="high"
         onMinimize={() => setMinimized(true)}
         minimized={minimized}
         closing={sessionClosing}
         onClose={() => {
            setSessionClosing(false);
            finishSession();
         }}
         header={
            <div
               className="session__content-header"
               style={{
                  height: minimized
                     ? "100%"
                     : getComputedStyle(document.documentElement).getPropertyValue(
                          "--drawer-header-height"
                       ),
               }}
               onClick={() => {
                  if (minimized) {
                     setMinimized(false);
                  }
               }}
            >
               {!session.end ? (
                  <>
                     <Timer />
                     <button
                        className="session__content-finish"
                        onClick={() => setSessionClosing(true)}
                     >
                        Finish
                     </button>
                  </>
               ) : (
                  <button
                     className="session__content-close"
                     onClick={() => setSessionClosing(true)}
                  >
                     Close
                  </button>
               )}
            </div>
         }
      >
         <div className={`session__content`}>
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
