import React, { useEffect, useRef, useState } from "react";
import useExcerciseOptions from "../hooks/useExcerciseOptions";
import useAppState from "./App/appState";
import Session from "./App/Session/Session";
import Main from "./App/Main/Main";

const App: React.FC = () => {
   const page = useAppState((state) => state.page);
   const idb = useAppState((state) => state.idb);
   const initIdb = useAppState((state) => state.initIdb);

   useEffect(() => {
      initIdb();
   }, []);

   if (!idb) return <div>Loading...</div>

   return (
      <>
         <Main />
         {page === "session" && <Session />}
      </>
   );
};

export default App;
