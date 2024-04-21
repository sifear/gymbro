import { create } from "zustand";
import { produce } from "immer";

type PageOption = null | "session";

interface AppState {
   idb: IDBDatabase | null;
   page: PageOption;
   excercises: Excercise[];
   session: Session | null;
   markedExcercises: Excercise[];
   initIdb: () => void;
   setPage: (page: PageOption) => void;
   setExcercises: (excercises: Excercise[]) => void;
   createSession: () => void;
   toggleMarkExcercise: (excercise: Excercise) => void;
   addMarkedToSession: () => void;
   addNewExcercise: (excercise: Excercise) => void;
   addToSession: (excercise: Excercise) => void;
}

const simultedState: Pick<AppState, "page"> = {
   page: "session",
};

const useAppState = create<AppState>((set, get) => ({
   idb: null,
   excercises: [],
   markedExcercises: [],
   session: null,
   ...simultedState,
   initIdb: async () => {
      const db = await initDatabase();
      const excs = await loadExcercises(db);

      set(
         produce<AppState>((state) => {
            state.idb = db;
            state.excercises = excs;
         })
      );
   },
   createSession: () =>
      set(
         produce<AppState>((state) => {
            state.session = { excercises: [], start: new Date(), end: null };
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
   addToSession: (excercise) =>
      set(
         produce<AppState>((state) => {
            state.session?.excercises.push({
               ...excercise,
               position: 0,
               sets: [{ id: 0, position: 0, reps: "0", resistance: "0" }],
            });
         })
      ),
   toggleMarkExcercise: (excercise) =>
      set(
         produce<AppState>((state) => {
            if (state.markedExcercises.find((me) => me.id === excercise.id)) {
               state.markedExcercises = state.markedExcercises.filter(
                  (me) => me.id !== excercise.id
               );
            } else {
               state.markedExcercises.push(excercise);
            }
         })
      ),
   addMarkedToSession: () =>
      set(
         produce<AppState>((state) => {
            for (const markedExcercise of state.markedExcercises) {
               let position = state.session!.excercises.length + 1;
               state.session!.excercises.push({
                  ...markedExcercise,
                  position,
                  sets: [{ id: 0, position: 0, reps: "0", resistance: "0" }],
               });
            }

            state.markedExcercises = [];
         })
      ),
   addNewExcercise: (excercise) =>
      set(
         produce<AppState>((state) => {
            state.excercises.push(excercise);
         })
      ),
}));

export default useAppState;

const initDatabase = (): Promise<IDBDatabase> => {
   return new Promise((resolve, reject) => {
      const request = window.indexedDB.open("gymbro", 1);

      request.onupgradeneeded = (event) => {
         const db: IDBDatabase = (event.target as IDBOpenDBRequest).result;

         const objectStore = db.createObjectStore("excercises", {
            keyPath: "name",
         });

         objectStore.createIndex("excercise_name_idx", "name", {
            unique: true,
         });

         resolve(db);
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

const loadExcercises = (idb: IDBDatabase): Promise<Excercise[]> => {
   return new Promise<Excercise[]>((resolve, reject) => {
      const transaction = idb.transaction(["excercises"], "readonly");

      const objectStore = transaction.objectStore("excercises");
      const request: IDBRequest<Excercise[]> = objectStore.getAll();
      request.onsuccess = (event) => {
         resolve(request.result);
      };

      request.onerror = (event) => {
         console.log(request.error);
         reject();
      };
   });
};
