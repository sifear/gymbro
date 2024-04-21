import React, { useContext, useState, useSyncExternalStore } from "react";
import StartButton from "../../ui/StartButton";
import "./Main.css";
import useAppState from "../appState";

interface Props {
   children?: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
   const page = useAppState((state) => state.page);

   return (
      <div className={`main`}>
         <div>Main page</div>
         <div className="main__children">{children}</div>
         <StartButton />
      </div>
   );
};

export default Main;
