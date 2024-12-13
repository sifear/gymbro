import React, { useEffect } from "react";
import StartButton from "../../ui/StartButton";
import "./Main.css";
import useAppState from "../../../stores/useAppState";
import Session from "../Session/Session";
import Diary from "./Diary";
import Drawer from "../../ui/Drawer/Drawer";
import Tally from "./Tally";

interface Props {
   children?: React.ReactNode;
}

const Main: React.FC<Props> = ({ children }) => {
   const page = useAppState((state) => state.page);
   const syncData = useAppState((state) => state.syncData);

   useEffect(() => {
      (async () => {
         try {
            const res = await fetch("/check_update_sq");
            const json_res = await res.json();
            console.log(json_res);
            if (json_res.reload === true) {
               console.log("need to reload");
               location.reload();
            } else {
               console.log("no need to update ", json_res);
            }
         } catch (e) {
            console.log("cannot update.", e);
         } finally {
            // console.log("sync");
            // syncData();
         }
      })();
   }, []);

   return (
      <Drawer height="full">
         <div
            style={{
               position: "fixed",
               height: "100%",
               width: '100%',
               top: "0",
               display: "flex",
               flexDirection: "column",
            }}
         >
               
               <div style={{padding: '8px 8px 0 8px', position: 'relative', display: "flex", flexDirection: "column", flexGrow: 1 }}>
               <Diary />
               <Tally />
               <StartButton />
               <div className="main__children">{page === "session" && <Session />}</div>
            </div>
            <div
               style={{
                  alignSelf: "center",
                  fontSize: "12px",
               }}
            >
               v0.0.88
            </div>
         </div>
      </Drawer>
   );
};

export default Main;
