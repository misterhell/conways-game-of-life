import GameControlButton from "./GameControlButton"
import { IGame } from "./Interfaces/IGame"
import { IGameUI } from "./Interfaces/IGameUI"
import { IGameControl } from "./Interfaces/IGameControl"


class GameControls implements IGameControl, IGameUI {

    game: IGame

    private buttons: GameControlButton[] = []

    constructor(game: IGame) {
        this.game = game

        if (game.withControl) {
            this.insertHtmlElements()
        }
        this.restartGame()
    }

    oneStepForward(): void {
        this.game.oneStepForward()
    }

    togglePause(): boolean {
        return this.game.isPaused = !this.game.isPaused
    }

    restartGame(): boolean {
        // TODO
        return true
    }

    changeFillPercentage(): number {
        // this.game.pe
        return 20
    }

    get panelClasses() {
        return {
            panel: 'game-panel',
            button: 'game-control__button'
        }
    }

    private createControlPanel(): HTMLElement {
        const panel: HTMLElement = document.createElement('div');

        panel.classList.add(this.panelClasses.panel)

        this.buttons = [
            this.createPauseButton(),
            this.createNextStepButton() 
        ];

        this.buttons.forEach((btn: GameControlButton) => panel.appendChild(btn.element))

        return panel;
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
        return new GameControlButton('Click for start', {
            click: (e: any) => {
                const toggleResult: boolean = this.togglePause()
                if (e.target) {
                    e.target.innerText = toggleResult ? 'Click for unpause' : 'Click for pause'
                }
            }
        })
    }


    refresh () {

    }

    update () {

    }
}


export default GameControls