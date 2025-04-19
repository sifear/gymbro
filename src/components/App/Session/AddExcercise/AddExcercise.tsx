import React, { useState } from "react";
import useAppState from "../../../../stores/useAppState";
import useSaveLazy from "../../../../hooks/useSaveLazy";

interface Props {
   onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const images = ["bench_press", "deadlift"];

const AddExcercise: React.FC<Props> = ({ onClose }) => {
   const [filter, setFilter] = useState<string | null>(null);
   const excercises = useAppState((state) => filterAndOrder(state.excercises, filter));
   const saveLazy = useSaveLazy(0);
   const addMeasuredExc = useAppState((state) => state.addMeasuredExc);

   const _addToSession = (exc: Excercise) => {
      addMeasuredExc(exc);
      onClose(false);
   };

   const close = () => {
      onClose(false);
   };

   return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", padding: "16px" }}>
         <input
            style={{ fontSize: "16px" }}
            type="text"
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value)}
         />
         <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {excercises.map((exc) => (
               <div
                  key={exc.id}
                  style={{
                     display: "flex",
                     gap: "8px",
                     alignItems: 'center'
                  }}
                  onClick={() => saveLazy(() => _addToSession(exc))}
               >
                  <div>
                     {images.includes(filename(exc.name)) ? (
                        <img
                           style={{
                              width: "32px",
                              height: "32px",
                           }}
                           src={`./images/${filename(exc.name)}.png`}
                           alt=""
                        />
                     ) : (
                        <div
                           style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "32px",
                              height: "32px",
                              backgroundColor: randomColor(),
                           }}
                        >
                           {exc.name[0].toUpperCase()}
                        </div>
                     )}
                  </div>
                  <div>{exc.name}</div>
               </div>
            ))}
         </div>
         <button className="add-set-button" onClick={close}>
            Cancel
         </button>
      </div>
   );
};

export default AddExcercise;

const filename = (name: string) =>
   name
      .split(" ")
      .map((w) => w.toLowerCase())
      .join("_");

const randomColor = () => {
   const colors = ["#FFFBDA", "#FFEC9E", "#FFBB70", "#ED9455"];

   return colors[Math.floor(Math.random() * 10) % 4];
};

type NamedObject = {
   name: string;
   [key: string]: any;
};

const filterAndOrder = <T extends NamedObject>(list: T[], filter: string | null): T[] => {
   if (filter === null || filter === "") return list;

   const filterWords = filter.toLocaleLowerCase().split(" ");

   return list.filter((exc) =>
      filterWords.every((fw) =>
         exc.name
            .toLowerCase()
            .split(" ")
            .some((ew) => ew.includes(fw))
      )
   );
};
