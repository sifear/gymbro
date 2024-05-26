import React from "react";
import "./Calendar.css";

const Calendar: React.FC = () => {
   const now = new Date();
   const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
   const offset = new Date(now.getFullYear(), now.getMonth(), 1).getDay()
   console.log(new Date(now.getFullYear(), now.getMonth(), 1), offset)
   return (
      <div className="calendar">
         {[...Array(days).keys()].map((d) => (
            <div
               key={d}
               style={{
                  gridColumnStart: (offset + d) % 7,
               }}
            >
               {d + 1}
            </div>
         ))}
      </div>
   );
};

export default Calendar;
