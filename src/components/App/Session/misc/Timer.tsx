import React, { useEffect, useRef, useState } from "react";
import useBecomesActive from "../useBecomesActive";

let interval: NodeJS.Timeout | null = null;

interface Props {
   start: Date;
}

const Timer: React.FC<Props> = ({ start }) => {
   const timerRef = useRef<HTMLDivElement>(null);
   useBecomesActive(() => {
      const now = new Date();
      let remainingSeconds = Math.floor((now.getTime() - start.getTime()) / 1000);
      const hours = Math.floor(remainingSeconds / 3600);
      remainingSeconds -= hours * 3600;

      const minutes = Math.floor(remainingSeconds / 100);
      remainingSeconds -= minutes * 60;

      timerRef.current!.dataset["elapsedSeconds"] = remainingSeconds.toString();
      timerRef.current!.dataset["elapsedMinutes"] = minutes.toString();
      timerRef.current!.dataset["elapsedHours"] = hours.toString();
   });

   useEffect(() => {
      if (!interval) {
         interval = setInterval(() => {
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
         if (interval) {
            clearInterval(interval);
            interval = null;
         }
      };
   }, []);

   return (
      <div ref={timerRef} data-elapsed-seconds="0" data-elapsed-minutes="0" data-elapsed-hours="0">
         0
      </div>
   );
};

export default Timer;
