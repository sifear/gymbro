import React, { useEffect, useRef, useState } from "react";
import useAppState from "../stores/useAppState";
import Main from "./App/Main/Main";

const App: React.FC = () => {
   const idb = useAppState((state) => state.idb);
   const initIdb = useAppState((state) => state.initIdb);

   useEffect(() => {
      initIdb();
   }, []);

   console.log(idb);

   if (!idb) return <div>Loading...</div>;

   return (
      <>
         <div className="main__portal-slot"></div>
         <Main />
      </>
   );
};

export default App;
