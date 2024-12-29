import React from "react";
import ThumbButton from "../../../ui/ThumbButton/ThumbButton";
import useAppState from "../../../../stores/useAppState";

const StartButton: React.FC = () => {
   const createNewSession = useAppState((state) => state.createNewSession);

   return <ThumbButton onClick={createNewSession} />;
};

export default StartButton;
