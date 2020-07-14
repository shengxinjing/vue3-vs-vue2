import Bullet from "./Bullet.js";
import Plane from "./Plane.js";
import Map from "./Map.js";
import EnemyPlane from "./EnemyPlane";
import { game } from "../../game";
import { hitTestRectangle } from "../utils";
import { h, reactive, ref } from "../../../../src/index.js";
import { moveBullets } from "../moveBullets";
import { moveEnemyPlane } from "../moveEnemyPlane";
import { stage } from "../config/index.js";

let hashCode = 0;
const createHashCode = () => {
  return hashCode++;
};

export default {
  setup() {
    //生产敌机
    const createEnemyPlaneData = (x) => {
      return {
        x,
        y: -200,
        width: 217,
        height: 263,
        life: 3,
      };
    };
    const selfBullets = reactive([]);
    const enemyPlanes = reactive([]);
    const enemyPlaneBullets = reactive([]);

    setInterval(() => {
      const x = Math.floor((1 + stage.width) * Math.random());
      enemyPlanes.push(createEnemyPlaneData(x));
    }, 1000);

    const handleBulletDestroy = ({ id }) => {
      const index = selfBullets.findIndex((info) => info.id == id);
      if (index !== -1) {
        selfBullets.splice(index, 1);
      }
    };

    const handlePlaneAttack = ({ x, y }) => {
      const id = createHashCode();
      const width = 26;
      const height = 37;
      const dir = -1;
      selfBullets.push({ x, y, id, width, height, dir });
    };

    const handleEnemyPlaneAttack = ({ x, y }) => {
      const id = createHashCode();
      const width = 26;
      const height = 37;
      const dir = 1;
      enemyPlaneBullets.push({ x, y, id, width, height, dir });
    };

    game.ticker.add(() => {
      moveBullets(selfBullets);
      moveBullets(enemyPlaneBullets);
      moveEnemyPlane(enemyPlanes);

      // 先遍历所有的子弹
      selfBullets.forEach((bullet, selfIndex) => {
        // 检测我方子弹是否碰到了敌机
        enemyPlanes.forEach((enemyPlane, enemyPlaneIndex) => {
          const isIntersect = hitTestRectangle(bullet, enemyPlane);
          if (isIntersect) {
            selfBullets.splice(selfIndex, 1);

            // 敌机需要减血
            enemyPlane.life--;
            if (enemyPlane.life <= 0) {
              // todo
              // 可以让实例发消息过来在销毁
              // 因为需要在销毁之前播放销毁动画
              enemyPlanes.splice(enemyPlaneIndex, 1);
            }
          }
        });

        // 检测是否碰到了敌方子弹
        enemyPlaneBullets.forEach((enemyBullet, enemyBulletIndex) => {
          const isIntersect = hitTestRectangle(bullet, enemyBullet);
          if (isIntersect) {
            selfBullets.splice(selfIndex, 1);
            enemyPlaneBullets.splice(enemyBulletIndex, 1);
          }
        });
      });
    });

    return {
      enemyPlanes,
      selfBullets,
      enemyPlaneBullets,
      handleBulletDestroy,
      handlePlaneAttack,
      handleEnemyPlaneAttack,
    };
  },

  render(ctx) {
    const createBullet = (info, index) => {
      return h(Bullet, {
        key: "Bullet" + info.id,
        x: info.x,
        y: info.y,
        id: info.id,
        width: info.width,
        height: info.height,
        onDestroy: ctx.handleBulletDestroy,
      });
    };

    const createEnemyPlane = (info, index) => {
      return h(EnemyPlane, {
        key: "EnemyPlane" + index,
        x: info.x,
        y: info.y,
        height: info.height,
        width: info.width,
        onAttack: ctx.handleEnemyPlaneAttack,
      });
    };

    return h("Container", [
      h(Map),
      h(Plane, {
        onAttack: ctx.handlePlaneAttack,
      }),
      ...ctx.selfBullets.map(createBullet),
      ...ctx.enemyPlaneBullets.map(createBullet),
      ...ctx.enemyPlanes.map(createEnemyPlane),
    ]);
  },
};
