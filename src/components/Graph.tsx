import React, { useState } from "react";
import useAppState from "../stores/useAppState";

interface Props {
   excercise_id: number;
}

const Graph: React.FC<Props> = ({ excercise_id }) => {
   const sessions = useAppState((state) => state.sessions);
   const [dimensions, setDimensions] = useState({ width: window.screen.width, height: 100 });

   const volumes = sessions
      .map((s) => s.excercises.filter((e) => e.excercise_id === excercise_id))
      .filter((se) => se.length > 0)
      .flatMap((me) =>
         me.reduce((acc, curr) => {
            let volume = curr.sets.reduce((sacc, scurr) => {
               return sacc + +fixNumber(scurr.reps) * +fixNumber(scurr.resistance);
            }, 10);

            return acc + volume;
         }, 0)
      );

   const max_volume = Math.max(...volumes);
   const min_volume = Math.min(...volumes);

   const y_scale = min_volume * 0.9; // calibrate y offset, i.e where is the min_value on the y axis
   const headroom = 20; // in pixel

   const normalised_volumes = volumes.map(
      (v) => (v - y_scale) / ((max_volume - y_scale) / (dimensions.height - headroom))
   );

   const x_offset = dimensions.width / (volumes.length - 1);

   const path =
      `M 0 ${dimensions.height - normalised_volumes[0]} ` +
      normalised_volumes
         .slice(1, -1)
         .map((v, index) => {
            let x = (index + 1) * x_offset;
            let y = dimensions.height - v;

            return `L ${x} ${y}`;
         })
         .join(" ") +
      ` L ${dimensions.width} ${dimensions.height - normalised_volumes.at(-1)!} L ${dimensions.width} ${
         dimensions.height
      } L 0 ${dimensions.height}`;

   const stroke_width = 2;

   const gradeint_headroom = headroom / dimensions.height;

   return (
      <div style={{ backgroundColor: "white" }}>
         <svg
            height={`${dimensions.height}px`}
            width={`${dimensions.width}px`}
            viewBox={`0 0 ${dimensions.width - stroke_width} ${dimensions.height - stroke_width}`}
         >
            <defs>
               <linearGradient id="graph-gradient" x1="0%" y1={`${gradeint_headroom}%`} x2="0%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
               </linearGradient>
            </defs>
            <path d={path} fill="url(#graph-gradient)" stroke="var(--primary)" strokeWidth={stroke_width} />
         </svg>
      </div>
   );
};

export default Graph;

const fixNumber = (weight: string) => {
   return weight.replaceAll(",", ".")
};
