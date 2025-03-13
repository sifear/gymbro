import React, { useLayoutEffect, useState } from "react";
import Drawer from "./ui/Drawer/Drawer";
import useAppState from "../stores/useAppState";

const Graph: React.FC = () => {
   const sessions = useAppState((state) => state.sessions);
   const [dimensions, setDimensions] = useState({ width: window.screen.width, height: 200 });

   const excercise_id = 1;

   const volumes = sessions
      .map((s) => s.excercises.filter((e) => e.excercise_id === excercise_id))
      .flatMap((me) =>
         me.reduce((acc, curr) => {
            let volume = curr.sets.reduce((sacc, scurr) => {
               return sacc + +scurr.reps * +scurr.resistance;
            }, 10);

            return acc + volume;
         }, 0)
      );

   const maxVolume = Math.max(...volumes);

   const normalisedVolumes = volumes.map((v) => v / (maxVolume / dimensions.height));

   console.log(volumes);
   console.log(normalisedVolumes);

   const x_offset = dimensions.width / (volumes.length - 1);

   const path =
      `M 0 ${dimensions.height - normalisedVolumes[0]} ` +
      normalisedVolumes
         .slice(1, -1)
         .map((v, index) => {
            let x = (index + 1) * x_offset;
            let y = dimensions.height - v;

            return `L ${x} ${y}`;
         })
         .join(" ") +
      ` L ${dimensions.width} ${dimensions.height - normalisedVolumes.at(-1)!} L ${dimensions.width} ${
         dimensions.height
      } L 0 ${dimensions.height}`;

   console.log(normalisedVolumes[0]);

   const stroke_width = 2

   return (
      <Drawer>
         <div style={{ backgroundColor: "white" }}>
            {dimensions.width}
            <svg
               height={`${dimensions.height}px`}
               width={`${dimensions.width}px`}
               viewBox={`0 0 ${dimensions.width - stroke_width} ${dimensions.height - stroke_width}`}
            >
               <defs>
                  <linearGradient id="graph-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                     <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.38" />
                     <stop offset="53%" stopColor="white" stopOpacity="0" />
                  </linearGradient>
               </defs>
               <path d={path} fill="url(#graph-gradient)" stroke="var(--primary)" strokeWidth={stroke_width}/>
            </svg>
         </div>
      </Drawer>
   );
};

export default Graph;
