import React from "react";
import useAppState from "../appState";

interface Props {
    excercise: MeasuredExcercise;
}

const SessionExcercise: React.FC<Props> = ({ excercise }) => {
    return (
        <div>
            <div>{excercise.name}</div>
            <div className="measured-excercise__sets">
                {excercise.sets.map((es) => (
                    <div key={es.position} className="measured-excercise__sets-row">
                        <input type="number" />
                        <input type="number" />
                    </div>
                ))}
            </div>
            <div className="measured-excercise__add-set">Add set</div>
        </div>
    );
};

export default SessionExcercise;
