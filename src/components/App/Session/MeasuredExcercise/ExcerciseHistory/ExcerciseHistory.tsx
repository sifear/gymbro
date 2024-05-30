import React from "react";
import Drawer from "../../../../ui/Drawer/Drawer";

interface Props {
   onClose: () => void;
}

const ExcerciseHistory: React.FC<Props> = ({ onClose }) => {
   return (
      <Drawer onRetract={onClose} height="middle">
         <div style={{ backgroundColor: "green" }}>Excercise history</div>
      </Drawer>
   );
};

export default ExcerciseHistory;
