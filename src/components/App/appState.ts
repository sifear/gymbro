import { create } from "zustand";
import { produce } from "immer";

type PageOption = "main" | "session";

interface AppState {
    page: PageOption;
    excercises: Excercise[];
    session: Session | null;
    markedExcercises: Excercise[];
    setPage: (page: PageOption) => void;
    setExcercises: (excercises: Excercise[]) => void;
    createSession: () => void;
    toggleMarkExcercise: (excercise: Excercise) => void;
    addMarkedToSession: () => void;
}

const simultedState: Pick<AppState, "page" | "session"> = {
    page: "session",
    session: {
        excercises: [{ id: 1, name: "Bench press", position: 0, sets: [{ position: 0, reps: 2, resistance: 0 }] }],
    },
};

const useAppState = create<AppState>((set, get) => ({
    page: "main",
    excercises: [],
    session: null,
    markedExcercises: [],
    ...simultedState, 
    createSession: () =>
        set(
            produce<AppState>((state) => {
                state.session = { excercises: [] };
            })
        ),
    setPage: (page) =>
        set(
            produce<AppState>((state) => {
                if (page === "session") {
                    state.page = page;
                    state.session = { excercises: [] };
                }
            })
        ),
    setExcercises: (excercises) =>
        set(
            produce<AppState>((state) => {
                state.excercises = excercises;
            })
        ),
    toggleMarkExcercise: (excercise) =>
        set(
            produce<AppState>((state) => {
                if (state.markedExcercises.find((me) => me.id === excercise.id)) {
                    state.markedExcercises = state.markedExcercises.filter((me) => me.id !== excercise.id);
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
                        sets: [{ position: 0, reps: 0, resistance: 0 }],
                    });
                }

                state.markedExcercises = [];
            })
        ),
}));

export default useAppState;
