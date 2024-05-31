import React from "react";
import "./Calendar.css";

interface Props {
   onPick: (date: Date) => void;
}

const Calendar: React.FC<Props> = ({ onPick }) => {
   const now = new Date();
   const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
   const offset = new Date(now.getFullYear(), now.getMonth(), 1).getDay();

   return (
      <div className="calendar">
         {[...Array(days).keys()].map((d) => (
            <div
               key={d}
               className="calendar__day"
               style={{
                  gridColumnStart: (offset + d) % 7,
               }}
               onClick={() => onPick(new Date(now.getFullYear(), now.getMonth(), d + 1))}
            >
               {d + 1}
            </div>
         ))}
      </div>
   );
};

export default Calendar;
