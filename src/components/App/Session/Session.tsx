import React from "react";
import "./Session.css";
import Drawer from "../../ui/Drawer/Drawer";
import useAppState from "../appState";

interface Props {
    backplateRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Session: React.FC<Props> = ({ backplateRef }) => {
    const setPage = useAppState((state) => state.setPage);

    return (
        <div className="session__main">
            <Drawer backplateRef={backplateRef} onRetract={() => setPage(null)} height="low" />
        </div>
    );
};

export default Session;
