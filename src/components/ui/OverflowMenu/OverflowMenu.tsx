import React, { useState } from "react";

// svg is inline element by default, height is line height, therefore the need to
// change this to block to fit container div

interface Props {
   menuItems: string[];
   onSelect?: () => void;
   onClick?: () => void;
   width?: number;
   height?: number;
   dotRadius?: number;
}

const yPadding = 5;

const OverflowMenu: React.FC<Props> = ({
   menuItems,
   onClick,
   onSelect,
   width = 25,
   height = 25,
   dotRadius = 1,
}) => {
   const xPos = width / 2 - dotRadius / 2;
   const ypos1 = yPadding;
   const ypos2 = height / 2;
   const ypos3 = height - yPadding;

   const [open, setOpen] = useState(false);

   return (
      <div onClick={() => setOpen((prev) => !prev)} style={{ position: 'relative' }}>
         <svg
            className="overflow-menu"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            style={{ display: 'block', border: "1px black solid" }}
         >
            <circle cx={xPos} cy={ypos1} r={dotRadius} />
            <circle cx={xPos} cy={ypos2} r={dotRadius} />
            <circle cx={xPos} cy={ypos3} r={dotRadius} />
         </svg>
         {open && (
            <div style={{position: 'absolute', bottom: 0, right: 0, backgroundColor: 'white', padding: '2px'}}>
               {menuItems.map((mi) => (
                  <div key={mi}>{mi}</div>
               ))}
            </div>
         )}
      </div>
   );
};

export default OverflowMenu;