import React from "react";

interface Props {
   date: Date;
}

const DayOverview: React.FC<Props> = ({ date }) => {
   return <div>{date.toDateString()}</div>;
};

export default DayOverview;
