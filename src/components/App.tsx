import React, { useEffect, useRef, useState } from "react";
import useExcerciseOptions from "../hooks/useExcerciseOptions";
import useAppState from "./App/appState";
import Session from "./App/Session/Session";
import Main from "./App/Main/Main";

const App: React.FC = () => {
    const mainRef = useRef<HTMLDivElement>(null)
    const page = useAppState((state) => state.page);

    return (
        <>
            <Main mainRef={mainRef} />
            {page === "session" && <Session backplateRef={mainRef}/>}
        </>
    );
};

export default App;
