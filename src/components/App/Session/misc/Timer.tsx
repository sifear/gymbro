import React, { useEffect, useRef, useState } from "react";
import useAppState from "../../../../stores/useAppState";

let interval: NodeJS.Timeout | null = null;

const Timer: React.FC = () => {
   const timerRef = useRef<HTMLDivElement>(null);
   console.log("render");

   useEffect(() => {
      console.log("effect");
      if (!interval) {
         interval = setInterval(() => {
            console.log(2);

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
         console.log("clear");
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
