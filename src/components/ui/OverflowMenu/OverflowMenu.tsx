import React, { useLayoutEffect, useRef, useState, PropsWithChildren, ReactElement } from "react";

// svg is inline element by default, height is line height, therefore the need to
// change this to block to fit container div

interface Props<T extends any[]> {
   menuItems: T;
   onSelect?: (mi: T[number]) => void;
   width?: number;
   height?: number;
   dotRadius?: number;
}

const yPadding = 5;
const OverflowMenu = <T extends any[]>({
   menuItems,
   width = 20,
   height = 20,
   dotRadius = 1,
   onSelect,
}: Props<T>): React.ReactElement => {
   const xPos = width / 2 - dotRadius / 2;
   const ypos1 = yPadding;
   const ypos2 = height / 2;
   const ypos3 = height - yPadding;

   const [open, setOpen] = useState(false);
   const [overflowHeight, setOverflowHeight] = useState(0);
   const listRef = useRef(null);

   useLayoutEffect(() => {
      if (listRef.current) {
         setOverflowHeight((listRef.current! as HTMLDivElement).getBoundingClientRect().height);
      }
   }, [open]);

   return (
      <div onClick={() => setOpen((prev) => !prev)} style={{ position: "relative" }}>
         <svg
            className="overflow-menu"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            style={{ display: "block" }}
         >
            <circle cx={xPos} cy={ypos1} r={dotRadius} />
            <circle cx={xPos} cy={ypos2} r={dotRadius} />
            <circle cx={xPos} cy={ypos3} r={dotRadius} />
         </svg>
         {open && (
            <div
               ref={listRef}
               style={{
                  position: "absolute",
                  bottom: 0 - overflowHeight,
                  right: 0,
                  backgroundColor: "white",
                  padding: "2px",
               }}
            >
               {menuItems.map((mi) => (
                  <div key={mi} onClick={() => onSelect!(mi)}>
                     {mi}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default OverflowMenu;
