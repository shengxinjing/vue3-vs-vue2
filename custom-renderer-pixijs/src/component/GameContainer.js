import Bullet from "./Bullet.js";
import Plane from "./Plane.js";
import Map from "./Map.js";
import EnemyPlane from "./EnemyPlane";
import { game } from "../../game";
import { h, reactive, ref } from "../../../../src/index.js";

let hashCode = 0;
export default {
  setup() {
    const selfBullets = reactive([]);
    const enemyPlanes = reactive([
      {
        x: 150,
        y: 0,
        width: 217,
        height: 263,
      },
    ]);

    const createHashCode = () => {
      return hashCode++;
    };

    const handleBulletDestroy = ({ id }) => {
      const index = selfBullets.findIndex((info) => info.id == id);
      selfBullets.splice(index, 1);
    };

    const handlePlaneAttack = ({ x, y }) => {
      const id = createHashCode();
      const width = 26;
      const height = 37;
      selfBullets.push({ x, y, id, width, height });
    };

    // todo
    // 检测子弹的位置是否和敌军的位置相交
    // 如果相交的话，就认定为碰撞了
    // 销毁子弹  销毁碰撞到的敌军
    // 在销毁之前 可以添加爆炸效果到敌军的位置
    // 公式
    function boxesIntersect(ab, bb) {
      return (
        ab.x + ab.width > bb.x &&
        ab.x < bb.x + bb.width &&
        ab.y + ab.height > bb.y &&
        ab.y < bb.y + bb.height
      );
    }

    const bulletSpeed = 3;
    const vanishLine = -100;
    const isDisappear = (val) => val < vanishLine;

    game.ticker.add(() => {
      selfBullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;
        if (isDisappear(bullet.y)) {
          selfBullets.splice(index, 1);
        }
      });

      // 先遍历所有的子弹
      selfBullets.forEach((bullet, index) => {
        enemyPlanes.forEach((enemyPlane) => {
          const isIntersect = boxesIntersect(bullet, enemyPlane);
          if (isIntersect) {
            console.log("碰上啦");
            selfBullets.splice(index, 1);
          }
        });
      });
    });

    return {
      enemyPlanes,
      selfBullets,
      handleBulletDestroy,
      handlePlaneAttack,
    };
  },

  render(ctx) {
    const createBullet = (info) => {
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
      });
    };

    return h(
      "Container",
      {
        width: 500,
        height: 500,
      },
      [
        h(Map),
        h(Plane, {
          onAttack: ctx.handlePlaneAttack,
        }),
        ...ctx.selfBullets.map(createBullet),
        ...ctx.enemyPlanes.map(createEnemyPlane),
      ]
    );
  },
};
