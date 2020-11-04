import { IGameElement } from "./IGameElement";


class GameElement implements IGameElement {

    isAlive: boolean
    generation: number
    color?: string

    constructor ({ isAlive, generation = 0, color }: IGameElement) {
        this.isAlive = isAlive
        this.generation = generation
        this.color = color
    }
}

export default GameElement