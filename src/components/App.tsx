import React, { useEffect, useRef, useState } from "react";
import useAppState from "../stores/useAppState";
import Main from "./App/Main/Main";

const App: React.FC = () => {
   const idb = useAppState((state) => state.idb);
   const initIdb = useAppState((state) => state.initIdb);

   useEffect(() => {
      initIdb();
   }, []);

   if (!idb) return <div>Loading...</div>;

   return (
      <>
         <Main />
      </>
   );
};

export default App;
