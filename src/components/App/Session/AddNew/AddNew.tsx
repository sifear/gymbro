import React, { useRef } from "react";
import useAppState from "../../appState";

const AddNew: React.FC = () => {
   const nameRef = useRef<HTMLInputElement>(null);
   const idb = useAppState(state => state.idb!)

   const addExcercise = () => {
      const transaction = idb.transaction(['excercises'], 'readwrite');

      transaction.oncomplete = (event) => {
         console.log(event)
      }

      const objectStore = transaction.objectStore('excercises');

      objectStore.add(
         { id: nameRef.current!.value, name: nameRef.current!.value }
      );
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
