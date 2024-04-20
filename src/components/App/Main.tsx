import React, { useContext } from "react";
import useAppState from "./appState";

const Main: React.FC = () => {
    const setPage = useAppState((state) => state.setPage);

    return (
        <div>
            <h1>Main page</h1>
            <div onClick={() => setPage("session")} className="main-page__new-session">
                Click
            </div>
        </div>
    );
};

export default Main;
