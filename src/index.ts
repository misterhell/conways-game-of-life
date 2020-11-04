import Canvas from './Drawers/Canvas';
import { IDrawer } from './Drawers/IDrawer';
import { IDrawerParams } from './Drawers/IDrawerParams';
import Game from './Game';


const drawerParams: IDrawerParams = {
    size: {
        x: 600,
        y: 400,
    },
    elementSize: 100
}

const drawer: IDrawer = new Canvas(drawerParams);

const game = new Game(drawer);