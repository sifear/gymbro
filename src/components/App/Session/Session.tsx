import React, { useRef, useState } from "react";
import "./Session.css";
import Drawer from "../../ui/Drawer/Drawer";
import useAppState from "../appState";

interface Props {
   backplateRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Session: React.FC<Props> = ({ backplateRef }) => {
   const backplate = useRef(null);
   const [newExcerciseOpen, setNewExcerciseOpen] = useState(false);
   const setPage = useAppState((state) => state.setPage);

   const openAddNewDrawer = () => {};

   return (
      <div className={`session__main drawer-backplate ${newExcerciseOpen  && 'blurred'}`}>
         <Drawer
            backplateRef={backplateRef}
            onRetract={() => setPage(null)}
            height="full"
         >
            <div className={`session__content`} ref={backplate}>
               <div
                  className="session__content__add_new"
                  onClick={() => setNewExcerciseOpen(true)}
               >
                  Add new excercise
               </div>
               {newExcerciseOpen && (
                  <Drawer
                     height="low"
                     backplateRef={backplate}
                     onRetract={() => {}}
                  >
                    Add new stuff here
                  </Drawer>
               )}
            </div>
         </Drawer>
      </div>
   );
};

export default Session;
