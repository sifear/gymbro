import React, { useRef } from "react";
import useAppState, { muscles } from "../../../../stores/useAppState";
import "./AddNew.css";

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
      <div>
         <label htmlFor="name">Excercise</label>
         <input ref={nameRef} type="text" name="name" id="name" />
         <button onClick={addExcercise}>Add</button>
         <div className="add-new__muscles" ref={musclesRef}>
            {muscles.map((muscle) => (
               <div key={muscle}>
                  <input id={muscle} type="checkbox" value={muscle} />
                  <label htmlFor={muscle}>{muscle}</label>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AddNew;
