import React, { useEffect, useRef } from "react";
import useAppState from "../../appState";

interface Props {
   onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const Add: React.FC<Props> = ({ onClose }) => {
   const excercises = useAppState((state) => state.excercises);
   const addToSession = useAppState((state) => state.addToSession);

   const _addToSession = (exc: Excercise) => {
      addToSession(exc);
      onClose(false);
   };

   return (
      <div>
         {excercises.map((exc) => (
            <div key={exc.id} onClick={() => _addToSession(exc)}>
               {exc.name}
            </div>
         ))}
      </div>
   );
};

export default Add;
