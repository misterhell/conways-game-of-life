import GameControlButton from "./GameControlButton"
import { IGame } from "./Interfaces/IGame"
import { IGameUI } from "./Interfaces/IGameUI"
import { IGameControl } from "./Interfaces/IGameControl"


class GameControls implements IGameControl, IGameUI {

    game: IGame

    private buttons: GameControlButton[] = []

    private panel: HTMLElement


    constructor(game: IGame) {
        this.game = game
        this.panel = document.createElement('div');

        if (game.withControl) {
            this.insertHtmlElements()
        }
    }

    oneStepForward(): void {
        this.game.oneStepForward()
    }

    togglePause(): boolean {
        return this.game.isPaused = !this.game.isPaused
    }

    restartGame(): boolean {
        this.game.restart()

        return true
    }

    changeFillPercentage(): number {
        // this.game.
        return 20
    }


    private createControlPanel(): HTMLElement {
        this.addStylesToPanel()
        this.addButtonsToPane()

        return this.panel;
    }

    private addStylesToPanel() {
        this.panel.style.display = 'flex'
        this.panel.style.justifyContent = 'space-between'
        this.panel.style.width = `${this.game.drawer.size.x.toString()}px`
    }

    private addButtonsToPane() {
        this.buttons = [
            this.createPauseButton(),
            this.createNextStepButton(),
            this.createRestartButton()
        ];

        this.buttons.forEach((btn: GameControlButton) => this.panel?.appendChild(btn.element))
    }

    private insertHtmlElements() {
        document.body.appendChild(this.createControlPanel())
    }


    private createNextStepButton() {
        return new GameControlButton('Press for next step', {
            click: (e: any) => {
                this.game.oneStepForward()
            }
        })
    }

    private createPauseButton() {
        return new GameControlButton('Click to start', {
            click: (e: any) => {
                const toggleResult: boolean = this.togglePause()
                if (e.target) {
                    e.target.innerText = `Click to ${toggleResult ? 'unpause' : 'pause'}`
                }
            }
        })
    }

    private createRestartButton() {
        return new GameControlButton('Restart', {
            click: () => this.restartGame()
        })
    }

    refresh() {
        this.buttons.forEach((btn: GameControlButton) => btn.refresh())
    }

    update() {

    }
}


export default GameControls