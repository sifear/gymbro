import React, { useEffect, useRef, useState } from "react";
import "./Drawer.css";

export type DrawerHeight = "low" | "middle" | "high" | "full";

interface Props {
   onRetract: () => void;
   height?: DrawerHeight;
   children?: React.ReactNode;
}

const Drawer: React.FC<Props> = ({ height = "full", onRetract, children }) => {
   const ref = useRef<HTMLDivElement>(null);
   const [open, setOpen] = useState(false);

   useEffect(() => {
      if (!open) {
         setOpen(true);
      }
   }, []);

   const onBack = () => {
      setOpen(false);

      setTimeout(() => {
         onRetract();
      }, 200);
   };

   return (
      <div className={`drawer ${open && "open"}`}>
         <div
            ref={ref}
            className={`drawer__content ${height} ${open && "open"}`}
         >
            {children}
         </div>
      </div>
   );
};

export default Drawer;
