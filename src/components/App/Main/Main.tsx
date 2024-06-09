import React, { useContext, useState, useSyncExternalStore } from "react";
import StartButton from "../../ui/StartButton";
import "./Main.css";
import useAppState from "../../../stores/useAppState";
import Session from "../Session/Session";
import Diary from "./Diary";
import Drawer from "../../ui/Drawer/Drawer";

interface Props {
   children?: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
   const page = useAppState((state) => state.page);

   return (
      <Drawer onRetract={() => {}} height="full">
         <div className={`main`}>
            <StartButton />
            <Diary />
            <div className="main__children">{page === "session" && <Session />}</div>
         </div>
      </Drawer>
   );
};

export default Main;
