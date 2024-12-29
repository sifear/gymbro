import { create } from "zustand";
import { produce } from "immer";

type PageOption = null | "session" | "dayoverview";
type RepProps = "resistance" | "reps";

export const muscles: Muscles = [
   "neck",
   "bicpes",
   "triceps",
   "traps",
   "lats",
   "back",
   "glutes",
   "front delts",
   "lateral delts",
   "rear delts",
   "quads",
   "hamstring",
   "calfs",
   "pecks",
] as const;

interface AppState {
   idb: IDBDatabase | null;
   page: PageOption;
   excercises: Excercise[];
   sessions: Session[];
   session: Session | null;
   markedExcercises: Excercise[];
   initIdb: () => void;
   setPage: (page: PageOption) => void;
   setExcercises: (excercises: Excercise[]) => void;
   addNewExcercise: (name: string, muscles: Muscles[number][]) => void;
   createNewSession: () => void;
   loadSession: (session?: Session) => void;
   addMeasuredExc: (excercise: Excercise) => void;
   deleteMeasuredExc: (excercise: MeasuredExcercise) => void;
   deleteSet: (mexc: MeasuredExcercise, index: number) => void;
   saveSessionToDB: () => void;
   deleteSessionFromDB: (id: number) => void;
   finishSession: () => void;
   deleteSession: (id: number) => void;
   setSetProp: (mexcId: number, setId: number, propKey: RepProps, propVal: string) => void;
   addSet: (mexc: number) => void;
   closeSession: () => void;
   syncData: () => void;
   loadInProgress: () => void;
}

const simultedState: Pick<AppState, "page"> = {
   page: null,
};

const useAppState = create<AppState>((set, get) => ({
   idb: null,
   excercises: [],
   markedExcercises: [],
   sessions: [],
   session: null,
   ...simultedState,
   initIdb: async () => {
      const db = await initDatabase();
      const { excercises, sessions } = await loadData(db);

      set(
         produce<AppState>((state) => {
            state.idb = db;
            state.excercises = excercises;
            state.sessions = sessions;
         })
      );
   },
   createNewSession: () => {
      set(
         produce<AppState>((state) => {
            const id = nextId(state.sessions!, "id");

            state.session = { id, excercises: [], start: new Date(), end: null };
         })
      );
      set(
         produce<AppState>((state) => {
            get().saveSessionToDB();

            state.page = "session";
         })
      );
   },
   loadSession: (session) =>
      set(
         produce<AppState>((state) => {
            if (session) {
               const sessionToLoad: Session= JSON.parse(JSON.stringify(session));
               console.log(sessionToLoad)
               console.log(state.sessions)
               state.session = state.sessions.find(s => s.id === sessionToLoad.id)!
            } else {
               const last = state.sessions.length > 0 ? state.sessions[state.sessions.length - 1] : null;
               const lastInProgress = !last?.end;

               if (last && lastInProgress) {
                  state.session = last;
               } else {
                  //
               }
            }

            state.page = "session";
         })
      ),
   finishSession: () => {
      set(
         produce((state) => {
            state.session.end = new Date();
         })
      );
      set(
         produce<AppState>((state) => {
            get().saveSessionToDB();

            const currentSessionIx = state.sessions.findIndex((s) => s.id == state.session?.id)
            if (currentSessionIx) {
               state.sessions.push(state.session!);
            } else {
               state.sessions.splice(currentSessionIx, 1, state.session!)
            }
            state.session = null;
            state.page = null;
         })
      );
   },
   deleteSession: (id) => {
      get().deleteSessionFromDB(id);
      set(
         produce<AppState>((state) => {
            state.sessions = state.sessions.filter((s) => s.id !== id);
            state.session = null;
            state.page = null;
         })
      );
   },
   closeSession: () =>
      set(
         produce<AppState>((state) => {
            state.session = null;
            state.page = null;
         })
      ),
   addSet: (mexcId) =>
      set(
         produce<AppState>((state) => {
            const mexc = state.session!.excercises.find((m) => m.id == mexcId);
            const id = nextId(mexc!.sets, "id");
            const position = nextId(mexc!.sets, "position");
            mexc!.sets.push({ id, position, reps: "0", resistance: "0" });
         })
      ),
   setSetProp: (mexcId, setId, propKey, propVal) =>
      set(
         produce<AppState>((state) => {
            let mexc = state.session!.excercises.find((exc) => exc.id == mexcId)!;
            let set = mexc.sets.find((s) => s.id == setId)!;
            set[propKey] = propVal;
         })
      ),
   setPage: (page) =>
      set(
         produce<AppState>((state) => {
            state.page = page;
         })
      ),
   setExcercises: (excercises) =>
      set(
         produce<AppState>((state) => {
            state.excercises = excercises;
         })
      ),
   addMeasuredExc: (excercise) =>
      set(
         produce<AppState>((state) => {
            const id = nextId(state.session!.excercises, "id");
            const position = nextId(state.session!.excercises, "position");

            state.session!.excercises.push({
               id,
               position,
               excercise_id: excercise.id,
               sets: setsWithTarget(excercise, state.sessions),
            });
         })
      ),
   deleteMeasuredExc: (mexc) =>
      set(
         produce<AppState>((state) => {
            const index = state.session!.excercises.findIndex((_mexc) => _mexc.id === mexc.id);
            state.session!.excercises.splice(index, 1);
         })
      ),
   deleteSet: (mexc, index) =>
      set(
         produce<AppState>((state) => {
            const index = state.session!.excercises.findIndex((_mexc) => _mexc.id === mexc.id);
            state.session!.excercises[index].sets.splice(index, 1);
         })
      ),
   addNewExcercise: (name, muscles) =>
      set(
         produce<AppState>((state) => {
            const transaction = state.idb!.transaction(["excercises"], "readwrite");

            transaction.oncomplete = (event) => {
               console.log(event);
            };

            const objectStore = transaction.objectStore("excercises");
            const exc = { id: nextId(state.excercises, "id"), name, muscles };

            objectStore.add(exc);
            state.excercises.push(exc);
         })
      ),
   saveSessionToDB: () => {
      const db = get().idb;
      const transaction = db!.transaction("sessions", "readwrite");
      const sesionStore = transaction.objectStore("sessions");
      sesionStore.put(get().session);
   },
   deleteSessionFromDB: (id) => {
      const db = get().idb;
      const transaction = db!.transaction("sessions", "readwrite");
      const sesionStore = transaction.objectStore("sessions");
      sesionStore.delete(id);
   },
   syncData: async () => {
      const db = get().idb;
      const transaction = db!.transaction("sessions", "readwrite");
      const sessionStorage = transaction.objectStore("sessions");
      const request = sessionStorage.getAll();

      request.onsuccess = async (event) => {
         const result = (event.target as IDBOpenDBRequest).result;
         console.log("fetch here", result);

         const res = await fetch("http://localhost:3000/sync_data", {
            method: "POST",
            body: JSON.stringify(result),
            headers: { "Content-Type": "application/json" },
         });
      };
   },
   loadInProgress: () =>
      set(
         produce<AppState>((state) => {
            const last = state.sessions.findLast((i) => true);
            if (last?.end === null) {
               console.log(last.start);
               state.session = last;
               state.page = "session";
            }
         })
      ),
}));

export default useAppState;

const initDatabase = (): Promise<IDBDatabase> => {
   return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("gymbro", 1);

      request.onupgradeneeded = (event) => {
         const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

         const excerciseStore = db.createObjectStore("excercises", {
            keyPath: "name",
         });

         excerciseStore.createIndex("excercise_name_idx", "name", {
            unique: true,
         });

         const sessionsStore = db.createObjectStore("sessions", {
            keyPath: "id",
         });

         sessionsStore.createIndex("sessions_id_idx", "id", {
            unique: true,
         });
      };

      request.onerror = (event) => {
         console.log(event);
         reject();
      };

      request.onsuccess = (event) => {
         const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;
         resolve(db);
      };
   });
};

const loadData = async (idb: IDBDatabase) => {
   const transaction = idb.transaction(["excercises", "sessions"], "readonly");

   const excercises = await loadExcercises(transaction);
   const sessions = await loadSessions(transaction);

   return { excercises, sessions };
};

const loadExcercises = (transaction: IDBTransaction): Promise<Excercise[]> => {
   return new Promise((resolve, reject) => {
      const excerciseStore = transaction.objectStore("excercises");
      const excRequest: IDBRequest<Excercise[]> = excerciseStore.getAll();

      excRequest.onsuccess = (event) => {
         resolve(excRequest.result);
      };

      excRequest.onerror = (event) => {
         console.log(excRequest.error);
         reject();
      };
   });
};

const loadSessions = (transaction: IDBTransaction): Promise<Session[]> => {
   return new Promise((resolve, reject) => {
      const sessionsStore = transaction.objectStore("sessions");
      const sessionsRequest: IDBRequest<Session[]> = sessionsStore.getAll();

      sessionsRequest.onsuccess = (event) => {
         resolve(sessionsRequest.result);
      };

      sessionsRequest.onerror = (event) => {
         console.log(sessionsRequest.error);
         reject();
      };
   });
};

const setsWithTarget = (excercise: Excercise, sessions: Session[]): ExcerciseSet[] => {
   let lastExcercise: MeasuredExcercise | undefined = undefined;

   for (let i = sessions.length - 1; i >= 0; i--) {
      lastExcercise = sessions[i].excercises.find((exc) => exc.excercise_id === excercise.id);

      if (lastExcercise) {
         break;
      }
   }

   if (lastExcercise) {
      return lastExcercise.sets.reduce((acc, curr, index) => {
         if (curr.reps !== "0") {
            acc.push({
               id: curr.id,
               position: curr.position,
               resistance: curr.resistance,
               reps: "0",
               targetResistance: curr.resistance,
               targetRep: curr.reps,
            });
         }
         return acc;
      }, [] as ExcerciseSet[]);
   } else {
      return [{ id: 0, position: 0, reps: "0", resistance: "0" }];
   }
};

type NumberKeysOf<T> = {
   [K in keyof T]: T[K] extends number ? K : never;
}[keyof T];

const nextId = <T extends { [key: string]: any }, K extends keyof T>(
   iterableObjects: T[],
   key: NumberKeysOf<T>
) => {
   return (
      iterableObjects.reduce((acc, curr) => {
         if (curr[key] > acc) {
            acc = curr[key];
         }
         return acc;
      }, 0) + 1
   );
};
