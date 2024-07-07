import React from "react";
import useAppState from "../../../stores/useAppState";

const Tally: React.FC = () => {
   const sessions = useAppState((state) =>
      state.sessions
         .toSorted((a, b) => (new Date(a.start) < new Date(b.start) ? 1 : -1))
         .slice(0, 7)
   );

   const excercises = useAppState((state) => state.excercises);
   const pecIds: number[] = excercises.reduce((acc, curr) => {
      if (curr.muscles.includes("pecks")) {
         acc.push(curr.id);
      }

      return acc;
   }, [] as number[]);


   const peckSets: number = sessions.reduce((acc, currSession) => {
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

   return <div>Pec volume: {peckSets}</div>;
};

export default Tally;
