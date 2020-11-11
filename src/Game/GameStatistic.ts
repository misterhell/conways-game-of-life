import Game from "./Game";
import GameElement from "./GameElement";
import { IGameElement } from "./Interfaces/IGameElement";
import { IGameUI } from "./Interfaces/IGameUI";


class GameStatistic implements IGameUI {
    game: Game

    element: HTMLElement

    constructor(game: Game) {
        this.game = game

        this.element = document.createElement('div')
        document.body.appendChild(this.element)
    }

    refresh() {

    }

    update() {
        this.element.innerHTML = `Alive cells: ${this.countOfLiveElements} | Biggest generation: ${this.maxGeneration}`
    }

    get countOfLiveElements(): number {
        return this.game.elements.reduce((counter: number, elementsRow: IGameElement[]) => {
            const rowCount = elementsRow.reduce((rowCounter: number, element: IGameElement) => {
                return rowCounter += element.isAlive ? 1 : 0
            }, 0);
            return counter += rowCount
        }, 0)
    }

    get maxGeneration(): number {
        let currentNumber = 0

        for (let r = 0; r < this.game.elements.length; r++) {
            for (let i = 0; i < this.game.elements[r].length; i++) {
                if (this.game.elements[r][i].generation > currentNumber) {
                    currentNumber = this.game.elements[r][i].generation
                }
            }
        }

        return currentNumber
    }
}

export default GameStatistic