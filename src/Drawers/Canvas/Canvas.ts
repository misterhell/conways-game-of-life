import { IDrawer } from '../IDrawer'
import { IDrawerParams, IDrawerSize } from '../IDrawerParams';

class Canvas implements IDrawer {

    size: IDrawerSize

    constructor({ size }: IDrawerParams) {
        this.size = size
    }

    draw() {

    }

    clear() {

    }
}


export default Canvas;