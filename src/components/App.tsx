import React, { useEffect, useState } from "react";
import Session from "./Session";
import AppContext from "./AppContext";
import Main from "./Main";
import useExcerciseOptions from "./Session/useExcerciseOptions";

const App: React.FC = () => {
    const [appState, setAppState] = useState<AppState>({
        page: "main",
        excercises: [],
    });
    const { excercises, isLoading } = useExcerciseOptions();

    const setPage = (page: PageOption) => {
        setAppState((prev) => ({ ...prev, page }));
    };

    const setExcercises = (excercises: Excercise[]) => {
        setAppState((prev) => ({ ...prev, excercises }));
    };

    useEffect(() => {
        if (appState.excercises.length === 0 && excercises.length > 0) {
            setExcercises(excercises);
        }
    }, [excercises]);

    if (!excercises) return null;

    return (
        <div>
            <AppContext.Provider
                value={{
                    page: appState.page,
                    excercises: appState.excercises,
                    setPage,
                    setExcercises,
                }}
            >
                {appState.page === "main" && <Main />}
                {appState.page === "session" && <Session />}
            </AppContext.Provider>
        </div>
    );
};

export default App;
