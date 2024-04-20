import React, { useContext, useState, useSyncExternalStore } from "react";
import StartButton from "../../ui/StartButton";
import "./Main.css";
import useAppState from "../appState";

interface Props {
    mainRef: React.MutableRefObject<HTMLDivElement | null>
}

const Main: React.FC<Props> = ({mainRef}) => {
    const page = useAppState((state) => state.page);

    return (
        <div ref={mainRef} className={`main drawer-backplate`}>
            <div className="main__content">
                <div>Main page</div>
                <StartButton />
            </div>
        </div>
    );
};

export default Main;
