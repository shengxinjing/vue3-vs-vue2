import { stage } from "./config";

export const moveEnemyPlane = (enemyPlanes) => {
  enemyPlanes.forEach((enemyPlane, index) => {
    if (!enemyPlane.moveInfo) {
      enemyPlane.moveInfo = {};
      enemyPlane.moveInfo.dir = 1;
      enemyPlane.moveInfo.count = 0;
    }

    enemyPlane.y++;
    enemyPlane.x += 1 * enemyPlane.moveInfo.dir;
    enemyPlane.moveInfo.count++;
    if (enemyPlane.moveInfo.count > 120) {
      const factor = Math.random() > 0.5 ? 1 : -1;
      // 随机转换方向
      enemyPlane.moveInfo.dir = enemyPlane.moveInfo.dir * factor;
      enemyPlane.moveInfo.count = 0;
    }

    // 检测是否到边界了
    if (isArrivedRightBorder(enemyPlane)) {
      enemyPlane.x = stage.width - enemyPlane.width;
    }
    if (isArrivedLeftBorder(enemyPlane)) {
      enemyPlane.x = 0;
    }
  });
};

function isArrivedLeftBorder(enemyPlane) {
  return enemyPlane.x <= 0;
}

function isArrivedRightBorder(enemyPlane) {
  return enemyPlane.x + enemyPlane.width >= stage.width;
}
