import { createContext } from "react";

const AppContext = createContext<AppState & AppStateSetters>({
    page: "main",
    excercises: [],
    setPage: (page: PageOption) => {},
    setExcercises: (excercises: Excercise[]) => {},
});

export default AppContext;
