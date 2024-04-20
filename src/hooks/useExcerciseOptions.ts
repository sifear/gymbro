import { useEffect, useState } from "react";

const useExcerciseOptions = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [excercises, setExcercises] = useState<Excercise[]>([]);

   useEffect(() => {
      let ignore = false;

      (async () => {
         const _res = await fetch("/excercises");
         const res = await _res.json();

         if (!ignore) {
            setExcercises(res);
         }
      })();

      return () => {
         ignore = true;
      };
   }, []);

   return { isLoading, excercises };
};

export default useExcerciseOptions;
