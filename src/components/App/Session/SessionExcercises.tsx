import React from "react";
import useAppState from "../appState";
import SessionExcercise from "./SessionExcercise";

const SessionExcercises: React.FC = () => {
    const session = useAppState((state) => state.session);

    return (
        <div>
            {session?.excercises.map((excercise) => (
                <SessionExcercise key={excercise.id} excercise={excercise} />
            ))}
        </div>
    );
};

export default SessionExcercises;
