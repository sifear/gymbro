import React, { Dispatch, useEffect, useRef, useState } from "react";
import "./Drawer.css";
import { createPortal } from "react-dom";

export type DrawerHeight = "low" | "middle" | "high" | "full";

interface Props {
   id?: string;
   height?: DrawerHeight;
   children?: React.ReactNode;
   minimized?: boolean;
   onMinimize?: Dispatch<React.SetStateAction<boolean>>;
   closing?: boolean;
   onClose?: () => void;
}

const Drawer: React.FC<Props> = ({
   id,
   height = "full",
   children,
   minimized,
   onMinimize,
   closing,
   onClose,
}) => {
   const backdropRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);

   const slot = document.querySelector("div.main__portal-slot") as HTMLDivElement;

   useEffect(() => {
      if (closing) {
         contentRef.current!.classList.remove(height);
         contentRef.current!.classList.add("closing");
         backdropRef.current!.classList.remove("active");
         setTimeout(() => {
            if (onClose) {
               onClose();
            }
         }, 200);
      } else {
         if (minimized) {
            contentRef.current!.classList.remove(height);
            contentRef.current!.classList.add("minimized");
            backdropRef.current!.classList.remove("active");
            setTimeout(() => {
               backdropRef.current!.style.display = "none";
            }, 200);
         } else {
            setTimeout(() => {
               contentRef.current!.classList.add(height);
               contentRef.current!.classList.remove("minimized");
               backdropRef.current!.classList.add("active");
               backdropRef.current!.style.display = "block";
            });
         }
      }
   }, [minimized, closing]);

   if (slot) {
      return createPortal(
         <div className={`drawer`}>
            <div
               ref={backdropRef}
               className="drawer__backdrop"
               onClick={() => {
                  if (onMinimize) {
                     onMinimize(true);
                  }
               }}
            ></div>
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
