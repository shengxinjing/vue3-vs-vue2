import { initRuntimeCanvas } from "../../src/index";
import gameComponent from "./src/component/GameContainer";
import { game } from "./game";

const { renderer } = initRuntimeCanvas();

// root component 作为游戏的根容器
const root = renderer.createApp(gameComponent);
root.mount(game.stage);
