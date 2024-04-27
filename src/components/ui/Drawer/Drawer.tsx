import React, { useEffect, useRef, useState } from "react";
import "./Drawer.css";

export type DrawerHeight = "low" | "middle" | "high" | "full";

interface Props {
   onRetract: () => void;
   height?: DrawerHeight;
   children?: React.ReactNode;
}

const Drawer: React.FC<Props> = ({ height = "full", onRetract, children }) => {
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

   const contentClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
      console.log("content click");
      e.stopPropagation();
      e.preventDefault();
   };

   return (
      <div className={`drawer`}>
         <div className="drawer__backdrop" onClick={onRetract}></div>
         <div className={`drawer__content ${height}`}>{children}</div>
      </div>
   );
};

export default Drawer;
