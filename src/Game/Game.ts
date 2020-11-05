import { IDrawer } from "../Drawers/IDrawer"
import GameElement from "./GameElement";


class Game {
    drawer: IDrawer
    speed: number 
    percentageFilling: number

    elements: GameElement[][]

    constructor(drawer: IDrawer, speed: number = 150, percentageFilling: number = 20, control?: {}) {
        this.drawer = drawer
        this.speed = speed
        this.percentageFilling = percentageFilling

        this.elements = this.generateElements()

        // first draw
        this.drawElements();
        setInterval(() => {
            this.updateElements()
            this.drawElements()
        }, speed)
        console.log('Game created!')
    }


    generateElements(): GameElement[][] {
        const elements: GameElement[][] = []

        // testing elements
        // const elements = [
        //     [new GameElement({ isAlive: false, generation: 0 }), new GameElement({ isAlive: true, generation: 0 }), new GameElement({ isAlive: false, generation: 0 })],
        //     [new GameElement({ isAlive: true, generation: 0 }), new GameElement({ isAlive: false, generation: 0 }), new GameElement({ isAlive: true, generation: 0 })],
        //     [new GameElement({ isAlive: false, generation: 0 }), new GameElement({ isAlive: true, generation: 0 }), new GameElement({ isAlive: false, generation: 0 })]
        // ]

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
            row.push(new GameElement({ isAlive: ((Math.random() * 100) < 20 /** 20% field filling */), generation: 0 }))
        }

        return row;
    }

    updateElements(): void {
        const currentElements: GameElement[][] = this.elements;
        const nextGenerationElements: GameElement[][] = [];
        // going row by row
        for (let row: number = 0; row < currentElements.length; row++) {
            // going throw elements
            for (let elemI: number = 0; elemI < currentElements[row].length; elemI++) {
                const cell: GameElement = currentElements[row][elemI];

                if (!nextGenerationElements[row]) {
                    nextGenerationElements[row] = [];
                }
                nextGenerationElements[row][elemI] = this.nextStepElement(cell.isAlive, row, elemI)
            }
        }

        this.elements = nextGenerationElements;
    }

    nextStepElement(isLiveCell: boolean, row: number, elemI: number): GameElement {
        // take -1 row -1 index, -1 row current index, -1 row +1 index
        // take  this row -1 index, this row +1 index
        // take  +1 row -1 index, +1 row index, +1 row +1 index

        const getLiveNum = (element: GameElement): number => {
            return element.isAlive ? 1 : 0;
        }

        const getLiveInRowByIndex =
            (row: number, elemI: number, selfRow: boolean = false): number => {
                let countOfLive = 0;
                if (this.elements[row]) {
                    const prevElemI = elemI - 1,
                        nextElemI = elemI + 1

                    // do not count self row and self coordinate
                    if (!selfRow) {
                        countOfLive += getLiveNum(this.elements[row][elemI])
                    }
                    if (this.elements[row][nextElemI]) {
                        countOfLive += getLiveNum(this.elements[row][nextElemI])
                    }
                    if (this.elements[row][prevElemI]) {
                        countOfLive += getLiveNum(this.elements[row][prevElemI])
                    }
                }

                return countOfLive
            }

        let liveNeighbors: number =
            [
                getLiveInRowByIndex(row - 1, elemI),
                getLiveInRowByIndex(row, elemI, true),
                getLiveInRowByIndex(row + 1, elemI),
            ]
                .reduce((c, v) => c + v, 0)

        const isLive = (nCount: number, isLiveCell: boolean): boolean => {
            // Any live cell with two or three live neighbours survives.
            if (isLiveCell && (nCount == 2 || nCount == 3)) {
                return true
            }
            // Any dead cell with three live neighbours becomes a live cell
            else if (!isLiveCell && nCount == 3) {
                return true
            }
            // All other live cells die in the next generation. Similarly, all other dead cells stay dead
            else {
                return false
            }
        }

        return new GameElement({ isAlive: isLive(liveNeighbors, isLiveCell), generation: 0 })
    }


    drawElements(): void {
        this.drawer.draw(this.elements)
    }

}



export default Game