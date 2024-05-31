import React from "react";
import "./Log.css";
import useAppState from "../../../../stores/useAppState";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Log: React.FC = () => {
   const excercises = useAppState((state) => state.excercises);
   const lastFive = useAppState((state) => state.sessions.slice(0, 5));
   return (
      <div className="diary__log">
         {lastFive.map((session) => (
            <div key={session.id} className="diary__log-session">
               <div className="diary__log-session-day">
                  <div>{session.start?.getDate()}</div>
                  <div>{weekday[session.start?.getDay()]}</div>
               </div>
               <div>
                  {session.excercises
                     .map((exc) => excercises.find((e) => e.id === exc.id)?.name)
                     .join(", ")}
               </div>
            </div>
         ))}
      </div>
   );
};

export default Log;
