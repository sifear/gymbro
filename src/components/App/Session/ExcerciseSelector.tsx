import React, { forwardRef, useContext, useEffect, useRef, useState } from "react";
import useAppState from "../appState";

interface Props {
    onDrawerInDOM: () => void;
}

const ExcerciseSelector = forwardRef<HTMLDivElement, Props>((props, ref) => {
    const { onDrawerInDOM } = props;
    const [putIntoDOM, setPutIntoDOM] = useState(false);
    const excercises = useAppState((state) => state.excercises);
    const toggleMarkExcercise = useAppState((state) => state.toggleMarkExcercise);

    useEffect(() => {
        if (putIntoDOM) {
            onDrawerInDOM();
        }
    }, [putIntoDOM]);

    useEffect(() => {
        if (!putIntoDOM) {
            setPutIntoDOM(true);
        }
    }, []);

    const onChange = (exc: Excercise) => {
        toggleMarkExcercise(exc)
    };

    return (
        <div className="excercise-selector__container" ref={ref}>
            <div className="excercise-selector">
                <div className="excercise-selector__list">
                    {excercises.map((exc) => (
                        <div className="excercise-selector__list-element" key={exc.id}>
                            <input id={`excercise_${exc.id}`} type="checkbox" onChange={(_) => onChange(exc)} />
                            <label id={`excercise_label_${exc.id}`} htmlFor={`excercise_${exc.id}`}>
                                {exc.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

export default ExcerciseSelector;
