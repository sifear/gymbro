import React, { useEffect } from "react";
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

   useEffect(() => {
      (async () => {
         try {
            const res = await fetch("/check_update");
            const json_res = await res.json();
            console.log(json_res);
            if (json_res.reload === true) {
               console.log('need to reload');
               location.reload();
            }
         } catch (e) {
            console.log("cannot update.", e);
         }
      })();
   }, []);

   return (
      <Drawer height="full">
         <div className={`main`}>
            <StartButton />
            <Diary />
            <div className="main__children">{page === "session" && <Session />}</div>21
         </div>
      </Drawer>
   );
};

export default Main;
