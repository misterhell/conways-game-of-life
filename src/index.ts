import Canvas from './Drawers/Canvas';
import { IDrawer } from './Drawers/IDrawer';
import { IDrawerParams } from './Drawers/IDrawerParams';
import Game from './Game';


const drawerParams: IDrawerParams = {
    size: {
        x: 10,
        y: 10,
    }
}

const drawer: IDrawer = new Canvas(drawerParams);

const game = new Game();