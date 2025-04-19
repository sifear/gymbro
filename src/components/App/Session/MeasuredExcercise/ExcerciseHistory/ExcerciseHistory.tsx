import React, { Fragment, useState } from "react";
import Drawer from "../../../../ui/Drawer/Drawer";
import useAppState from "../../../../../stores/useAppState";
import "./ExcerciseHistory.css";
import Graph from "../../../../Graph";

interface Props {
   historyOf: number;
   onClose: () => void;
}

const ExcerciseHistory: React.FC<Props> = ({ historyOf, onClose }) => {
   const sessions = useAppState((state) => state.sessions);
   const [closing, setClosing] = useState(false);

   const past = sessions
      .slice()
      .sort((s1, s2) => (s1.start < s2.start ? 1 : -1))
      .map((session) => ({
         date: session.start,
         mexcs: session.excercises.filter((exc) => exc.excercise_id === historyOf),
      }))
      .filter((s) => s.mexcs.length > 0);

   return (
      <Drawer
         onBackdropTap={() => setClosing(true)}
         onClose={() => {
            setClosing(false);
            onClose();
         }}
         closing={closing}
         height="high"
         resizable
      >
         <Graph excercise_id={historyOf} />
         <div
            className="excercise-history"
            style={{
               padding: "0.5rem",
               display: "grid",
               gridTemplateColumns: "1fr 1fr 1.5fr 1.5fr",
               textAlign: "end",
            }}
         >
            <div>Weigth</div>
            <div>Reps</div>
            <div>Total reps</div>
            <div>Total Volume</div>
            {past.map((session) => (
               <Fragment key={new Date(session.date).getMilliseconds()}>
                  <div
                     className="excercise-history__sundry"
                     style={{
                        gridColumn: "1 / 3",
                        justifySelf: "start",
                        backgroundColor: "white",
                        width: "100%",
                     }}
                  >
                     {new Date(session.date).toLocaleDateString("hu-HU")}
                  </div>
                  <div className="excercise-history__sundry">{totalReps(session.mexcs[0].sets)}</div>
                  <div className="excercise-history__sundry">{totalVolume(session.mexcs[0].sets)}</div>
                  {session.mexcs[0].sets.map((set, i) => (
                     <Fragment key={set.id}>
                        <div className="excercise-history__resistance" data-even={i % 2}>
                           {set.resistance}
                        </div>
                        <div className="excercise-history__reps" data-even={i % 2}>
                           {set.reps}
                        </div>
                        <div></div>
                        <div></div>
                     </Fragment>
                  ))}
               </Fragment>
            ))}
         </div>
      </Drawer>
   );
};

export default ExcerciseHistory;

const totalReps = (sets: ExcerciseSet[]): number => {
   return sets.reduce((acc, curr) => {
      acc += +curr.reps;

      return acc;
   }, 0);
};

const totalVolume = (sets: ExcerciseSet[]): number => {
   return sets.reduce((acc, curr) => {
      acc += +curr.reps * +curr.resistance;

      return acc;
   }, 0);
};
