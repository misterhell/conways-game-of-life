

class GameControlButton {

    private defaultTitle: string

    title: string
    element: HTMLElement

    constructor(initTitle: string, params: {} = {}) {
        this.defaultTitle = this.title = initTitle
        this.element = this.createHtmlElement()
        this.handleParams(params)
    }

    private handleParams(params: {} = {}) {

        for (let key of Object.keys(params)) {
            if (key == 'click') {
                /** @ts-ignore */
                this.addClickEvent(params[key])
            }
        }
    }

    private createHtmlElement() {
        const btn = this.appendAttributes(document.createElement('button'))
        btn.innerText = this.title
        return btn
    }


    private appendAttributes(btn: HTMLElement) {
        return btn
    }


    addClickEvent(eventHandler: () => void) {
        this.element.addEventListener('click', eventHandler)
    }

    refresh() {
        this.title = this.defaultTitle
        this.element.innerText = this.title
    }
}



export default GameControlButton