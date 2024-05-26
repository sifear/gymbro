import React, { useEffect, useRef, useState } from "react";
import "./Drawer.css";
import { createPortal } from "react-dom";

export type DrawerHeight = "low" | "middle" | "high" | "full";

interface Props {
   id?: string;
   onRetract: () => void;
   height?: DrawerHeight;
   children?: React.ReactNode;
}

const Drawer: React.FC<Props> = ({ id, height = "full", onRetract, children }) => {
   const backdropRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);

   const slot = document.querySelector("div.main__portal-slot") as HTMLDivElement;
   useEffect(() => {
      setTimeout(() => {
         contentRef.current!.classList.add(height);
         backdropRef.current!.classList.add("active");
      }, 1);
   }, [parent]);

   const onClose = () => {
      contentRef.current!.classList.remove(height);
      backdropRef.current!.classList.remove("active");

      setTimeout(() => {
         onRetract();
      }, 200);
   };

   if (slot) {
      return createPortal(
         <div className={`drawer`}>
            <div ref={backdropRef} className="drawer__backdrop" onClick={onClose}></div>
            <div ref={contentRef} className={`drawer__content`}>
               {children}
            </div>
         </div>,
         slot
      );
   } else {
      return null;
   }
};

export default Drawer;
