import { IGame } from "./Interfaces/IGame"
import { IGameControl } from "./Interfaces/IGameControl"



class GameControls implements IGameControl {

    game: IGame

    constructor(game: IGame) {
        this.game = game
        this.createHtmlElements()
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
        // TODO
        return 20
    }

    private createHtmlElements() {

    }

}


export default GameControls