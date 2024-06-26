import React from "react";
import "./Log.css";
import useAppState, { muscles } from "../../../../stores/useAppState";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Log: React.FC = () => {
   const loadSession = useAppState((state) => state.loadSession);
   const excercises = useAppState((state) => state.excercises);
   const lastFive = useAppState((state) =>
      state.sessions.slice(0, 5).sort((a, b) => (a.start > b.start ? 1 : -1))
   );

   return (
      <div className="diary__log">
         {lastFive.map((session) => (
            <div
               key={session.id}
               className="diary__log-session"
               onClick={() => loadSession(session)}
            >
               <div className="diary__log-session-day">
                  <div>{new Date(session.start)?.getDate()}</div>
                  <div>{weekday[new Date(session.start)?.getDay()]}</div>
               </div>
               <div className="diary__log-session-day-excs">
                  <div>{pickDominant(session.excercises, excercises)}</div>
                  <div>
                     {session.excercises
                        .map((exc) => excercises.find((e) => e.id === exc.excercise_id)?.name)
                        .slice(0, 4)
                        .join(", ")}
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Log;

type Frequencies = Record<Muscles[number], number>;

const pickDominant = (mexcs: MeasuredExcercise[], excercises: Excercise[]): string => {
   const frequencies: Frequencies = muscles.reduce((acc, curr) => {
      acc[curr] = 0;
      return acc;
   }, {} as Frequencies);

   for (let i = 0; i < mexcs.length; i++) {
      const exc = excercises.find((e) => e.id === mexcs[i].excercise_id);
      exc?.muscles.forEach((e) => {
         frequencies[e] += 1;
      });
   }

   for (let i = 0; i < muscles.length; i++) {
      if (frequencies[muscles[i]] === 0) {
         delete frequencies[muscles[i]];
      }
   }

   return Object.entries(frequencies).sort((a, b) => (a[1] < b[1] ? 1 : -1))[0][0];
};
