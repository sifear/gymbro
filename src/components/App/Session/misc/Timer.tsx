import React, { useEffect, useRef } from "react";
import useAppState from "../../../../stores/useAppState";

const Timer: React.FC = () => {
   const timerRef = useRef<HTMLDivElement>(null);
   const intervalRef = useRef<NodeJS.Timeout>();

   useEffect(() => {
      if (!intervalRef.current) {
         intervalRef.current = setInterval(() => {
            let elapsedSeconds = timerRef.current!.dataset["elapsedSeconds"]!;
            let elapsedMinutes = timerRef.current!.dataset["elapsedMinutes"]!;
            let elapsedHours = timerRef.current!.dataset["elapsedHours"]!;

            if (elapsedSeconds === "59") {
               elapsedSeconds = "0";

               if (elapsedMinutes === "59") {
                  elapsedMinutes = "0";
                  elapsedHours = (+elapsedHours + 1).toString();
               } else {
                  elapsedMinutes = (+elapsedMinutes + 1).toString();
               }
            } else {
               elapsedSeconds = (+elapsedSeconds + 1).toString();
            }

            let hh = elapsedHours.length === 1 ? `0${elapsedHours}` : elapsedHours;
            let mm = elapsedMinutes.length === 1 ? `0${elapsedMinutes}` : elapsedMinutes;
            let ss = elapsedSeconds.length === 1 ? `0${elapsedSeconds}` : elapsedSeconds;

            timerRef.current!.dataset["elapsedSeconds"] = elapsedSeconds.toString();
            timerRef.current!.dataset["elapsedMinutes"] = elapsedMinutes.toString();
            timerRef.current!.dataset["elapsedHours"] = elapsedHours.toString();

            timerRef.current!.textContent = `${hh}:${mm}:${ss}`;
         }, 1000);
      }

      return () => {
         clearInterval(intervalRef.current);
      };
   }, []);

   return (
      <div ref={timerRef} data-elapsed-seconds="0" data-elapsed-minutes="0" data-elapsed-hours="0">
         0
      </div>
   );
};

export default Timer;
