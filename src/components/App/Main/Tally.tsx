import React, { useCallback } from "react";
import useAppState from "../../../stores/useAppState";

const talliedMuscles: Muscles = ["pecks", "traps", "bicpes", "triceps", "lateral delts", "rear delts"];

const fromDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 7 * 24);

const Tally: React.FC = () => {
   const sessions = useAppState((state) =>
      state.sessions
         .filter((s) => s.start > fromDate)
         .toSorted((a, b) => (new Date(a.start) < new Date(b.start) ? 1 : -1))
         .slice(0, 7)
   );

   const excercises = useAppState((state) => state.excercises);

   const musclesSets = useCallback(() => {
      return talliedMuscles.reduce((totalAcc, muscle) => {
         const pecIds: number[] = excercises.reduce((acc, curr) => {
            if (curr.muscles.includes(muscle)) {
               acc.push(curr.id);
            }

            return acc;
         }, [] as number[]);

         const muscleSets: number = sessions.reduce((acc, currSession) => {
            const pecMexcsNumber = currSession.excercises.reduce((_acc, _curr) => {
               if (pecIds.includes(_curr.excercise_id)) {
                  acc += _curr.sets.reduce((__acc, __curr) => {
                     if (+__curr.reps > 0) {
                        __acc += 1;
                     }

                     return __acc;
                  }, 0);
               }

               return _acc;
            }, 0);

            acc += pecMexcsNumber;

            return acc;
         }, 0);

         return { ...totalAcc, [muscle]: muscleSets };
      }, {});
   }, [excercises, sessions]);

   return (
      <div
         style={{
            backgroundColor: "#ffde95",
            borderRadius: "5px",
            padding: '8px',
            gridArea: 'tally'
         }}
      >
         <div style={{ fontWeight: "600", color: "var(--secondary-comp)", padding: "0.5rem 0" }}>
            7 days total sets
         </div>
         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {Object.entries(musclesSets()).map((m) => (
               <div key={m[0]} style={{ color: "var(--secondary-comp)" }}>{`${m[0]}: ${m[1]}`}</div>
            ))}
         </div>
      </div>
   );
};

export default Tally;
