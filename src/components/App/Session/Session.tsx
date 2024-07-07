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
   const session = useAppState((state) => state.session);
   const finishSession = useAppState((state) => state.finishSession);
   const closeSession = useAppState((state) => state.closeSession);
   const deleteSession = useAppState((state) => state.deleteSession);

   if (!session) return <div>Loading...</div>;

   return (
      <Drawer
         height="high"
         onMinimize={() => setMinimized(true)}
         minimized={minimized}
         closing={sessionClosing}
         onClose={() => {
            if (session.end === null) {
               finishSession();
            } else {
               closeSession();
            }
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
                     <Timer start={session.start} />
                     <div
                        className="session__content-finish"
                        onClick={() => setSessionClosing(true)}
                     >
                        Finish
                     </div>
                  </>
               ) : (
                  <>
                     <div
                        className="session__content-close"
                        onClick={() => setSessionClosing(true)}
                     >
                        Close
                     </div>
                     <div
                        style={{ display: "flex", gap: "0.5rem" }}
                        onClick={() => deleteSession(session.id)}
                     >
                        <div
                           className="button"
                           style={{
                              backgroundColor: "#df0000",
                              color: "white",
                           }}
                        >
                           Delete
                        </div>
                        <div className="button secondary">Edit</div>
                     </div>
                  </>
               )}
            </div>
         }
      >
         <div className={`session__content`}>
            <ExcerciseList>
               {session.excercises.map((mexc) => (
                  <Fragment key={mexc.id}>
                     <MeasuredMexcercise key={mexc.id} mexc={mexc} />
                     <hr style={{ margin: "1rem 0", color: "gray" }} />
                  </Fragment>
               ))}
            </ExcerciseList>
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
                     height="high"
                     closing={addExcerciseIsClosing}
                     onClose={() => {
                        setAddExcerciseIsClosing(false);
                        setAddExcerciseOpen(false);
                     }}
                     onBackdropTap={() => {
                        setAddExcerciseIsClosing(true);
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
                     height="high"
                     closing={newExcerciseIsClosing}
                     onClose={() => {
                        setNewExcerciseIsClosing(false);
                        setNewExcerciseOpen(false);
                     }}
                     onBackdropTap={() => {
                        setNewExcerciseIsClosing(true);
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
