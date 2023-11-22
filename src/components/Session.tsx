import React, { useContext, useEffect, useRef, useState } from "react";
import ExcerciseSelector from "./Session/ExcerciseSelector";
import AppContext from "./AppContext";

const Session: React.FC = () => {
    const selectorDrawerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [drawerInDOM, setDrawerInDOM] = useState(false);
    const appContext = useContext(AppContext);

    const onDrawerInDOM = () => {
      console.log('adding attributes')
      selectorDrawerRef.current!.dataset["open"] = "true";
      buttonRef.current!.dataset["active"] = "true";
    }

    const toggleButton = () => {
        if (drawerInDOM) {
            closeDrawer();
        } else {
            setDrawerInDOM(true);
        }
    };

    const onAnimationEndHandler = (event: TransitionEvent) => {
        selectorDrawerRef.current!.removeEventListener("transitionend", onAnimationEndHandler);
        setDrawerInDOM(false);
    };

    const closeDrawer = () => {
        selectorDrawerRef.current!.dataset["open"] = "false";
        buttonRef.current!.dataset["active"] = "false";
        selectorDrawerRef.current!.addEventListener("transitionend", onAnimationEndHandler);
    };

    return (
        <div className="session-page">
            <p>New session started</p>
            <div ref={buttonRef} className="session-page__add-button" onClick={toggleButton}>
                +
            </div>
            {drawerInDOM && <ExcerciseSelector ref={selectorDrawerRef} onDrawerInDOM={onDrawerInDOM} />}
        </div>
    );
};

export default Session;
