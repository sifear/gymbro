import React, { useState } from "react";
import useAppState from "../../../stores/useAppState";
import Calendar from "./Diary/Calendar";
import Drawer from "../../ui/Drawer/Drawer";
import DayOverview from "./DayOverview";
import Log from "./Diary/Log";

const Diary: React.FC = () => {
   const sessions = useAppState((state) => state.sessions);
   const loadSession = useAppState((state) => state.loadSession);
   const setPage = useAppState((state) => state.setPage);
   const page = useAppState((state) => state.page);
   const [selectedDate, setSelectedDate] = useState(new Date());

   const _loadSession = (session: Session) => {
      setPage("session");
      loadSession(session);
   };
   if (!sessions) return <div>Loading...</div>;

   return (
      <div>
         {/* <Calendar
            onPick={(e) => {
               setPage("dayoverview");
               setSelectedDate(e);
            }}
         /> */}
         <Log />
         {page === "dayoverview" && (
            <Drawer height="high">
               <DayOverview date={selectedDate} />
            </Drawer>
         )}
      </div>
   );
};

export default Diary;
