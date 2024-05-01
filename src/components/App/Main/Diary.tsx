import React from "react";
import useAppState from "../../../stores/useAppState";

const Diary: React.FC = () => {
   const sessions = useAppState((state) => state.sessions);

   if (!sessions) return <div>Loading...</div>;

   return (
      <div>
         {sessions.map((session) => (
            <div key={session.id}>{session.start.toDateString()}</div>
         ))}
      </div>
   );
};

export default Diary;
