import { game } from "../../game";
import { ref, onMounted, onUnmounted } from "../../../../src/index";

/**
 * 键盘移动
 * @param x 初始化 x 坐标值
 * @param y 初始化 y 坐标值
 * @param speed 移动速度
 */

const commandType = {
  upAndDown: "upAndDown",
  leftAndRight: "leftAndRight",
};

export const useKeyboardMove = ({ x, y, speed }) => {
  const moveX = ref(x);
  const moveY = ref(y);

  const moveCommands = [];

  const downCommand = {
    type: commandType.upAndDown,
    dir: 1,
    id: 1,
  };

  const upCommand = {
    type: commandType.upAndDown,
    dir: -1,
    id: 2,
  };

  const leftCommand = {
    type: commandType.leftAndRight,
    dir: -1,
    id: 3,
  };

  const rightCommand = {
    type: commandType.leftAndRight,
    dir: 1,
    id: 4,
  };

  const findUpAndDownCommand = () =>
    moveCommands.find((command) => command.type === commandType.upAndDown);

  const findLeftAndRightCommand = () =>
    moveCommands.find((command) => command.type === commandType.leftAndRight);

  const isExistCommand = (command) => {
    const id = command.id;
    const result = moveCommands.find((c) => c.id === id);
    if (result) return true;
    return false;
  };

  const removeCommand = (command) => {
    const id = command.id;
    const index = moveCommands.findIndex((c) => c.id === id);
    moveCommands.splice(index, 1);
  };

  const handleTicker = () => {
    const upAndDownCommand = findUpAndDownCommand();
    if (upAndDownCommand) {
      moveY.value += speed * upAndDownCommand.dir;
    }

    const leftAndRightCommand = findLeftAndRightCommand();
    if (leftAndRightCommand) {
      moveX.value += speed * leftAndRightCommand.dir;
    }
  };

  const commandMap = {
    ArrowLeft: leftCommand,
    ArrowRight: rightCommand,
    ArrowUp: upCommand,
    ArrowDown: downCommand,
  };

  const handleKeydown = (e) => {
    const command = commandMap[e.code];
    if (command && !isExistCommand(command)) {
      moveCommands.unshift(command);
    }
  };

  const handleKeyup = (e) => {
    const command = commandMap[e.code];
    if (command) {
      removeCommand(command);
    }
  };

  onMounted(() => {
    game.ticker.add(handleTicker);
    window.addEventListener("keydown", handleKeydown);
    window.addEventListener("keyup", handleKeyup);
  });

  onUnmounted(() => {
    game.ticker.remove(handleTicker);
    window.removeEventListener("keydown", handleKeydown);
    window.removeEventListener("keyup", handleKeyup);
  });

  return {
    x: moveX,
    y: moveY,
  };
};
