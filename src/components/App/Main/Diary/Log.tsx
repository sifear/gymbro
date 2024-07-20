import React from "react";
import "./Log.css";
import useAppState, { muscles } from "../../../../stores/useAppState";

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Log: React.FC = () => {
   const loadSession = useAppState((state) => state.loadSession);
   const excercises = useAppState((state) => state.excercises);
   const lastFive = useAppState((state) =>
      state.sessions
         .toSorted((a, b) => (new Date(a.start) < new Date(b.start) ? 1 : -1))
         .slice(0, 7)
   );

   return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
         {lastFive.map((session) => (
            <div
               key={session.id}
               style={{ display: "flex", gap: "1rem", alignItems: "center" }}
               onClick={() => loadSession(session)}
            >
               <div
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     gap: "2px",
                     backgroundColor: "var(--primary-comp-bg)",
                     color: "var(--primary-comp)",
                     borderRadius: "5px",
                     padding: "3px",
                     fontSize: '14px',
                     maxWidth: '80px',
                     minWidth: '80px'
                  }}
               >
                  <div>
                     {new Date(session.start).getMonth() + 1}.{new Date(session.start)?.getDate()}
                  </div>
                  <div>{weekday[new Date(session.start)?.getDay()]}</div>
               </div>
               <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <div
                     style={{
                        color: "var(--secondary-comp)",
                        backgroundColor: "var(--secondary-comp-bg)",
                        padding: "4px 8px",
                        borderRadius: "5px",
                     }}
                  >
                     {pickDominant(session.excercises, excercises)}
                  </div>
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
   if (mexcs.length === 0) {
      return "";
   }

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
