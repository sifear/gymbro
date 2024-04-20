import React, { useEffect, useRef, useState } from "react";
import "./Drawer.css";

export type DrawerHeight = "low" | "middle" | "high" | "full";

interface Props {
    backplateRef: React.MutableRefObject<HTMLDivElement | null>;
    onRetract: () => void;
    height?: DrawerHeight;
}

const Drawer: React.FC<Props> = ({ backplateRef, height = "full", onRetract }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!open) {
            setOpen(true);

            if (backplateRef.current) {
                backplateRef.current.classList.add("blurred");
            }
        }
    }, []);

    const closeDrawer = () => {
        setOpen(false);
        backplateRef.current?.classList.remove("blurred");

        setTimeout(() => {
            onRetract();
        }, 200);
    };

    return (
        <div className={`drawer  ${open && "open"}`}>
            <div ref={ref} className={`drawer__content ${height} ${open && "open"}`}>
                <button onClick={closeDrawer}>Close</button>
            </div>
        </div>
    );
};

export default Drawer;
