import React, { useRef } from "react";
import useAppState, { muscles } from "../../../../stores/useAppState";

interface Props {
   onClose: () => void;
}

const AddNew: React.FC<Props> = ({ onClose }) => {
   const nameRef = useRef<HTMLInputElement>(null);
   const musclesRef = useRef<HTMLDivElement>(null);
   const addNewExcercise = useAppState((state) => state.addNewExcercise);

   const addExcercise = () => {
      const container = musclesRef.current!.querySelectorAll("input")!;
      let muscles: Muscles = [];
      container.forEach((input) => {
         if ((input as HTMLInputElement).checked) {
            muscles.push(input.value as Muscles[number]);
         }
      });

      addNewExcercise(nameRef.current!.value, muscles);
      console.log("onClose");
      onClose();
   };

   return (
      <div style={{ padding: "0.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
         <div style={{ display: "flex", gap: "0.5rem", alignItems: "stretch" }}>
            <label style={{ display: "flex", alignItems: "center" }} htmlFor="name">
               Name
            </label>
            <input ref={nameRef} type="text" name="name" id="name" />
            <button className="button primary" onClick={addExcercise}>
               Add
            </button>
            <button className="button secondary" onClick={onClose}>
               Cancel
            </button>
         </div>
         <div
            style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
            ref={musclesRef}
         >
            {muscles.map((muscle) => (
               <div key={muscle}>
                  <input id={muscle} type="checkbox" value={muscle} />
                  <label htmlFor={muscle} style={{whiteSpace: 'pre'}}>{muscle}</label>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AddNew;
