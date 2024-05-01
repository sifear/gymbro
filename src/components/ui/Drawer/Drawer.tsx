import React, { useEffect, useRef, useState } from "react";
import "./Drawer.css";

export type DrawerHeight = "low" | "middle" | "high" | "full";

interface Props {
   onRetract: () => void;
   height?: DrawerHeight;
   children?: React.ReactNode;
}

const Drawer: React.FC<Props> = ({ height = "full", onRetract, children }) => {
   const backdropRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      setTimeout(() => {
         contentRef.current!.classList.add(height);
         backdropRef.current!.classList.add('active');
      }, 0);
   }, []);

   const onClose = () => {
      contentRef.current!.classList.remove(height);
      backdropRef.current!.classList.remove('active');

      setTimeout(() => {
         onRetract()
      }, 200)
   }

   return (
      <div className={`drawer`}>
         <div ref={backdropRef} className="drawer__backdrop" onClick={onClose}></div>
         <div ref={contentRef} className={`drawer__content`}>
            {children}
         </div>
      </div>
   );
};

export default Drawer;
