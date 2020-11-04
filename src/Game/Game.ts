import { IDrawer } from "../Drawers/IDrawer"
import GameElement from "./GameElement";


class Game {
    drawer: IDrawer
    elements: GameElement[][]

    constructor(drawer: IDrawer, control?: {}) {
        this.drawer = drawer;
        this.elements = this.generateElements()

        this.drawElements();
        setInterval(() => {
            this.updateElements()
            this.drawElements()
        }, 300)
        console.log('Game created')
    }


    generateElements(): GameElement[][] {
        const elements = []

        const
            horizontalCount: number = this.drawer.size.x / this.drawer.elementSize,
            verticalCount: number = this.drawer.size.y / this.drawer.elementSize

        for (let i = 0; i < verticalCount; i++) {
            elements.push(this.generateRowOfElements(horizontalCount))
        }

        return elements
    }

    generateRowOfElements(horizontalCount: number): GameElement[] {
        const row: GameElement[] = [];

        for (let i = 0; i < horizontalCount; i++) {
            row.push(new GameElement({ isAlive: ((Math.random() * 100) < 30 /** 30% field filling */), generation: 0 }))
        }

        return row;
    }

    updateElements() {

    }


    drawElements() {
        this.drawer.draw(this.elements)
    }

}



export default Game