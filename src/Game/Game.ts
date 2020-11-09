import { IDrawer } from "../Drawers/IDrawer"
import GameControls from "./GameControls"
import GameElement from "./GameElement"
import GameStatistic from "./GameStatistic"
import { IGame } from "./Interfaces/IGame"
import { IGameElement } from "./Interfaces/IGameElement"
// import { IGame } from "./Interfaces/IGame";


class Game implements IGame {
    drawer: IDrawer
    speed: number
    percentageFilling: number

    isPaused: boolean

    elements: IGameElement[][]

    withStatistic: boolean
    statistic: GameStatistic

    withControl: boolean
    control: GameControls

    constructor(drawer: IDrawer, speed: number = 150, percentageFilling: number = 20) {
        // default values
        this.isPaused = true
        this.drawer = drawer
        this.speed = speed
        this.percentageFilling = percentageFilling

        // controls
        this.withControl = true
        this.control = new GameControls(this)

        // statistic
        this.withStatistic = true
        this.statistic = new GameStatistic(this)

        // random elements filling
        this.elements = this.generateElements()

        // first draw
        this.drawElements();
        this.updateUI();
        setInterval(() => {
            if (!this.isPaused) {
                this.stepForward()
            }
        }, speed)

        console.log('Game created!')
    }

    restart() {
        this.isPaused = true
        this.elements = this.generateElements()
        this.drawElements()

        this.control.refresh()
        this.statistic.refresh()
    }

    oneStepForward() {
        this.stepForward()
    }

    protected stepForward() {
        this.updateElements()
        this.drawElements()
        this.updateUI()
    }

    protected updateUI() {
        this.control.update()
        this.statistic.update()
    }

    protected generateElements(): GameElement[][] {
        const elements: GameElement[][] = [],
            horizontalCount: number = this.drawer.size.x / this.drawer.elementSize,
            verticalCount: number = this.drawer.size.y / this.drawer.elementSize

        for (let i = 0; i < verticalCount; i++) {
            elements.push(this.generateRowOfElements(horizontalCount))
        }

        return elements
    }

    protected generateRowOfElements(horizontalCount: number): GameElement[] {
        const row: GameElement[] = [];

        for (let i = 0; i < horizontalCount; i++) {
            row.push(new GameElement({ isAlive: ((Math.random() * 100) < 20 /** 20% field filling */), generation: 0 }))
        }

        return row;
    }

    protected updateElements(): void {
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

    protected nextStepElement(isLiveCell: boolean, row: number, elemI: number): GameElement {
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


    private drawElements(): void {
        this.drawer.draw(this.elements)
    }

}



export default Game