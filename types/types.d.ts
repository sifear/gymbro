
type AppState = {
    page: PageOption;
    excercises: Excercise[]
}

type AppStateSetters = {
    setPage: (page: PageOption) => void,
    setExcercises: (excercises: Excercise[]) => void
}

type PageOption = 'main' | "session"

type Excercise = {
    id: number,
    name: string
}