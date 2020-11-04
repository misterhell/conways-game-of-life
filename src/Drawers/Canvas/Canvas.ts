import { IGameElement } from '../../Game/IGameElement';
import { IDrawer } from '../IDrawer'
import { IDrawerParams, IDrawerSize } from '../IDrawerParams';

class Canvas implements IDrawer {

    size: IDrawerSize
    elementSize: number

    ctx: CanvasRenderingContext2D

    constructor({ size, elementSize }: IDrawerParams) {
        this.size = size
        this.elementSize = elementSize

        const ctx = this.insertCanvasElement().getContext('2d')

        if (!ctx) throw new Error("No canvas 2D context support")

        this.ctx = ctx
        this.init()
    }

    init() {
        try {
            this.setCtxParams();

            return true
        } catch (e) {
            console.error(e)
            return false
        }
    }

    setCtxParams() {
        // TODO: move params to params parser
        this.ctx.imageSmoothingEnabled = true
        this.ctx.lineWidth = 0.1
        this.ctx.strokeStyle = "#000000";
    }

    insertCanvasElement() {
        const canvas: HTMLCanvasElement = document.createElement('canvas')

        canvas.width = this.size.x
        canvas.height = this.size.y
        canvas.style.border = "1px solid #d3d3d3"

        document.body.appendChild(canvas)

        return canvas;
    }

    drawGrid() {
        const { x, y } = this.size
        const xLines = this.getGridLinesCount(x)
        const yLines = this.getGridLinesCount(y)

        // begin path needed for not to repeating path between frames
        this.ctx.beginPath();
        for (let i = 0; i < xLines; i++) {
            this.ctx.moveTo(i * this.elementSize, 0)
            this.ctx.lineTo(i * this.elementSize, y)
        }
        for (let i = 0; i < yLines; i++) {
            this.ctx.moveTo(0, i * this.elementSize)
            this.ctx.lineTo(x, i * this.elementSize)
        }
        this.ctx.stroke();
    }

    getGridLinesCount(axisLength: number) {
        return Math.ceil(axisLength / this.elementSize)
    }

    draw(elements: IGameElement[][]) {
        this.clear()
        this.drawGrid()
        this.drawElements(elements)
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    drawElements(elements: IGameElement[][]) {
        const s = this.elementSize;

        elements.forEach((line: IGameElement[], lineNum: number) => {
            line.forEach((elem: IGameElement, elemNum: number) => {
                if (elem.isAlive) {
                    this.ctx.fillStyle = elem.color || '#000000';
                    this.ctx.fillRect(
                        elemNum * this.elementSize,
                        lineNum * s,
                        s,
                        s
                    );
                }
            })
        })

    }
}


export default Canvas