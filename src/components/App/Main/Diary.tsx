import React from "react";
import useAppState from "../../../stores/useAppState";

const Diary: React.FC = () => {
   const sessions = useAppState((state) => state.sessions);
   const loadSession = useAppState((state) => state.loadSession);
   const setPage = useAppState((state) => state.setPage);

   const _loadSession = (session: Session) => {
      setPage("session");
      loadSession(session);
   };
   console.log(sessions)
   if (!sessions) return <div>Loading...</div>;

   console.log(sessions);

   return (
      <div>
         {sessions.map((session) => (
            <div key={session.id} onClick={() => _loadSession(session)}>
               {session.id}
            </div>
         ))}
      </div>
   );
};

export default Diary;
