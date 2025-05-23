import React from "react";

interface Props {
   onClick: (...args: any) => void;
}

const ThumbButton: React.FC<Props> = ({ onClick }) => {
   return (
      <div
         style={{
            width: "50px",
            height: "50px",
            borderRadius: "5px",
            backgroundColor: "var(--primary-comp-bg)",
            color: "var(--primary-comp)",
            boxShadow: "0 0 8px 2px var(--button-shadow)",
            fontSize: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gridArea: 'start-btn'
         }}
         onClick={onClick}
      >
         {/* <svg width="50" height="50" viewBox="0 0 50 50"xmlns="http://www.w3.org/2000/svg">
            <path
               style={{ fill: "none", stroke: "green", strokeWidth: 1 }}
               d=""
            />
         </svg> */}
         +
      </div>
   );
};

export default ThumbButton;
