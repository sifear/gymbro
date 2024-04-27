import React, { useRef } from "react";
import useAppState from "../../../../stores/useAppState";

const AddNew: React.FC = () => {
   const nameRef = useRef<HTMLInputElement>(null);
   const addNewExcercise = useAppState((state) => state.addNewExcercise);

   const addExcercise = () => {
      addNewExcercise(nameRef.current!.value);
   };

   return (
      <div>
         <label htmlFor="name">Excercise</label>
         <input ref={nameRef} type="text" name="name" id="name" />
         <button onClick={addExcercise}>Add</button>
      </div>
   );
};

export default AddNew;
