import { create } from "zustand";
import { produce } from "immer";

type PageOption = null | "session";

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
    // addNewExcercise: () => void
}

const simultedState: Pick<AppState, "page" | "session"> = {
    page: null,
    session: {
        excercises: [],
    },
};

const useAppState = create<AppState>((set, get) => ({
    excercises: [],
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
                state.page = page;
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
