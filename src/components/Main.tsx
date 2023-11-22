import React, { useContext } from "react";
import AppContext from "./AppContext";

const Main: React.FC = () => {
    const context = useContext(AppContext);

    return (
        <div>
            <h1>Main page</h1>
            <div onClick={() => context.setPage("session")} className="main-page__new-session">
                Click
            </div>
        </div>
    );
};

export default Main;
