import { IDrawerSize } from "./IDrawerParams";

export interface IDrawer {
    draw: () => void;
    clear: () => void;

    size: IDrawerSize
}
