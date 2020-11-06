export interface IGameControl {
    oneStepForward: () => void
    togglePause: () => boolean
    restartGame: () => boolean
    changeFillPercentage: () => number
}

