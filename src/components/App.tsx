import React, { useEffect, useState } from "react";
import Session from "./App/Session";
import Main from "./App/Main";
import useExcerciseOptions from "../hooks/useExcerciseOptions";
import useAppState from "./App/appState";

const App: React.FC = () => {
    const page = useAppState((state) => state.page);
    const loadedExcercises = useAppState((state) => state.excercises);
    const setExcercises = useAppState((state) => state.setExcercises);
    const { excercises, isLoading } = useExcerciseOptions();

    useEffect(() => {
        if (loadedExcercises.length === 0 && excercises.length > 0) {
            setExcercises(excercises);
        }
    }, [excercises]);

    if (!excercises) return null;

    return (
        <div>
            {page === "main" && <Main />}
            {page === "session" && <Session />}
        </div>
    );
};

export default App;
