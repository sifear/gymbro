import React from "react";
import ThumbButton from "./ThumbButton/ThumbButton";
import useAppState from "../../stores/useAppState";

const StartButton: React.FC = () => {
   const setPage = useAppState((state) => state.setPage);

   return (
      <ThumbButton
         onClick={() => {
            console.log("click");
            setPage("session");
         }}
      />
   );
};

export default StartButton;
