import { useEffect, useState } from "react";

const useBecomesActive = (handler: () => void) => {
   const [isSet, setIsSet] = useState(false);

   useEffect(() => {
      if (!isSet) {
         document.addEventListener("visibilitychange", handler);
         setIsSet(true);
      }
   }, []);
};

export default useBecomesActive;
