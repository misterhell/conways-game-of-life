import { IDrawerSize } from "./IDrawerParams"
import { IGameElement } from '../Game/Interfaces/IGameElement'

export interface IDrawer {
    draw: (elements: IGameElement[][]) => void
    clear: () => void
    init: () => boolean

    size: IDrawerSize
    elementSize: number

}