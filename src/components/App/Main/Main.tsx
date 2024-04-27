import React, { useContext, useState, useSyncExternalStore } from "react";
import StartButton from "../../ui/StartButton";
import "./Main.css";
import useAppState from "../../../stores/useAppState";
import Session from "../Session/Session";

interface Props {
   children?: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
   const page = useAppState((state) => state.page);

   return (
      <div className={`main`}>
         <StartButton />
         <div>Main page</div>
         <div className="main__children">
            {page === "session" && <Session />}
         </div>
      </div>
   );
};

export default Main;
