import { useRef } from "react";
import useAppState from "../stores/useAppState";

const useSaveLazy = (delay: number) => {
   console.log('lazy with ', delay)

    const saveSessionToDB = useAppState((state) => state.saveSessionToDB);
 
    let timerRef = useRef<NodeJS.Timeout>(setTimeout(() => {}, delay));
 
    const onChange = (ephemeralSaver: (...args: any[]) => void) => {
       if (timerRef.current) {
          clearTimeout(timerRef.current);
       }

       ephemeralSaver();
  
       timerRef.current = setTimeout(() => {
          console.log("saving...");
          saveSessionToDB();
       }, delay);
    };

    return onChange
}

export default useSaveLazy