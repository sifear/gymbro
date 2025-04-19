import React, { Dispatch, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type DrawerHeight = "low" | "middle" | "high" | "full";

const HEIGHTS = { low: 25, middle: 50, high: 98, full: 100 };

interface Props {
   id?: string;
   height?: DrawerHeight;
   resizable?: boolean;
   children?: React.ReactNode;
   minimized?: boolean;
   closing?: boolean;
   onClose?: () => void;
   header?: JSX.Element;
   onMinimize?: Dispatch<React.SetStateAction<boolean>>;
   onBackdropTap?: () => void;
}

const Drawer: React.FC<Props> = ({
   id,
   height = "full",
   resizable = false,
   children,
   minimized,
   closing,
   onClose,
   header,
   onMinimize,
   onBackdropTap,
}) => {
   const backdropRef = useRef<HTMLDivElement>(null);
   const contentRef = useRef<HTMLDivElement>(null);

   const slot = document.querySelector("div.main__portal-slot") as HTMLDivElement;

   useEffect(() => {
      if (closing) {
         contentRef.current!.style.height = "0";
         backdropRef.current!.style.backgroundColor = "rgba(0, 0, 0, 0)";
         setTimeout(() => {
            if (onClose) {
               onClose();
            }
         }, 200);
      } else {
         if (minimized) {
            contentRef.current!.style.height = "calc(var(--drawer-header-height) + 8px)";
            backdropRef.current!.style.backgroundColor = "rgba(0, 0, 0, 0)";
            setTimeout(() => {
               backdropRef.current!.style.display = "none";
            }, 200);
         } else {
            setTimeout(() => {
               // contentRef.current!.classList.add(height);
               contentRef.current!.style.height = `${HEIGHTS[height]}%`;
               backdropRef.current!.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
               backdropRef.current!.style.display = "block";
            });
         }
      }
   }, [minimized, closing]);

   const userResize: React.TouchEventHandler<HTMLDivElement> = (e) => {
      const item = e.nativeEvent.changedTouches.item(0);

      contentRef.current!.style.height = `${window.screen.height - item!.pageY}px`;
   };

   if (slot) {
      return createPortal(
         <div
            className="drawer"
            style={{
               width: "100%",
               height: "100%",
               position: "absolute",
               bottom: "0",
               left: "0",
               backgroundColor: "transparent",
            }}
         >
            <div
               ref={backdropRef}
               style={{
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  transition: "background-color 0.2s cubic-bezier(0.03, 1.01, 0.41, 0.97)",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  bottom: "0",
               }}
               onClick={() => {
                  if (onMinimize) {
                     onMinimize(true);
                  }
                  if (onBackdropTap) {
                     onBackdropTap();
                  }
               }}
            ></div>
            <div
               ref={contentRef}
               style={{
                  position: "absolute",
                  width: "100%",
                  height: "0",
                  bottom: "0",
                  backgroundColor: "var(--primary-bg)",
                  transition: "height 0.2s cubic-bezier(0.03, 1.01, 0.41, 0.97)",
                  overflow: "scroll",
               }}
            >
               {resizable && (
                  <div
                     style={{
                        height: "10px",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        touchAction: "none"
                     }}
                     onTouchMove={userResize}
                  >
                     <div
                        style={{
                           backgroundColor: "rgba(0,0,0,0.2)",
                           borderRadius: "5px",
                           height: "5px",
                           width: "100px",
                        }}
                     ></div>
                  </div>
               )}
               {header}
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
