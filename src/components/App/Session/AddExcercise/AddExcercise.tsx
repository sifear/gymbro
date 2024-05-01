import React, { useEffect, useRef } from "react";
import useAppState from "../../../../stores/useAppState";
import useSaveLazy from "../../../../hooks/useSaveLazy";

interface Props {
   onClose: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddExcercise: React.FC<Props> = ({ onClose }) => {
   const excercises = useAppState((state) => state.excercises);
   const saveLazy = useSaveLazy(0);
   const addMeasuredExc = useAppState((state) => state.addMeasuredExc);

   const _addToSession = (exc: Excercise) => {
      addMeasuredExc(exc);
      onClose(false);
   };

   return (
      <div>
         {excercises.map((exc) => (
            <div key={exc.id} onClick={() => saveLazy(() => _addToSession(exc))}>
               {exc.name}
            </div>
         ))}
      </div>
   );
};

export default AddExcercise;
