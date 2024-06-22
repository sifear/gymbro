import React from "react";
import useAppState from "../../../../stores/useAppState";
import useSaveLazy from "../../../../hooks/useSaveLazy";
import "./AddExcercise.css";

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

   const close = () => {
      onClose(false);
   };

   return (
      <div className="add-excercise">
         {excercises.map((exc) => (
            <div
               key={exc.id}
               className="add-excercise__item"
               onClick={() => saveLazy(() => _addToSession(exc))}
            >
               <div>
                  <img src={`./images/${filename(exc.name)}.png`} alt="" />
               </div>
               <div>{exc.name}</div>
            </div>
         ))}
         <button onClick={close}>Cancel</button>
      </div>
   );
};

export default AddExcercise;

const filename = (name: string) =>
   name
      .split(" ")
      .map((w) => w.toLowerCase())
      .join("_");
