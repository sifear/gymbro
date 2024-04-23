import React from "react";
import "./ExcerciseList.css";

interface Props {
   children: React.ReactNode;
}

const ExcerciseList: React.FC<Props> = ({ children }) => {
   return <div className="session__excercise-list">{children}</div>;
};

export default ExcerciseList;
