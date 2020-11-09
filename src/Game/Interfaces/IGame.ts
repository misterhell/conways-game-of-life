import { IDrawer } from "../../Drawers/IDrawer";

export interface IGame {
    drawer: IDrawer,
    isPaused: boolean,
    withControl: boolean,
    oneStepForward: () => void
    restart: () => void
}

