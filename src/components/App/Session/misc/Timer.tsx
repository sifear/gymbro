import React, { useEffect, useRef, useState } from "react";
import useBecomesActive from "../useBecomesActive";

let interval: NodeJS.Timeout | null = null;

interface Props {
   start: Date;
}

const Timer: React.FC<Props> = ({ start }) => {
   const timerRef = useRef<HTMLDivElement>(null);
   let initialValue = "";
   let ih = "0"
   let im = "0"
   let is = "0"

   const now = new Date();
   let remainingSeconds = Math.floor((now.getTime() - new Date(start).getTime()) / 1000);
   const hours = Math.floor(remainingSeconds / 3600);
   remainingSeconds -= hours * 3600;

   const minutes = Math.floor(remainingSeconds / 60);
   remainingSeconds -= minutes * 60;

   initialValue = formatElapsetData(hours.toString(), minutes.toString(), remainingSeconds.toString());
   ih = hours.toString()
   im = minutes.toString()
   is = remainingSeconds.toString()

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

            timerRef.current!.dataset["elapsedSeconds"] = elapsedSeconds.toString();
            timerRef.current!.dataset["elapsedMinutes"] = elapsedMinutes.toString();
            timerRef.current!.dataset["elapsedHours"] = elapsedHours.toString();

            timerRef.current!.textContent = formatElapsetData(elapsedHours, elapsedMinutes, elapsedSeconds);
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
      <div ref={timerRef} data-elapsed-seconds={is} data-elapsed-minutes={im} data-elapsed-hours={ih}>
         {initialValue}
      </div>
   );
};

export default Timer;

const formatElapsetData = (elapsedHours: string, elapsedMinutes: string, elapsedSeconds: string) => {
   let hh = elapsedHours.length === 1 ? `0${elapsedHours}` : elapsedHours;
   let mm = elapsedMinutes.length === 1 ? `0${elapsedMinutes}` : elapsedMinutes;
   let ss = elapsedSeconds.length === 1 ? `0${elapsedSeconds}` : elapsedSeconds;

   return `${hh}:${mm}:${ss}`;
};
