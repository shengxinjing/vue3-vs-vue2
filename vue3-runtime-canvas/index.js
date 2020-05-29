import * as PIXI from "PIXI.js";
import {
  h,
  initRuntimeCanvas,
  ref,
  defineComponent,
  reactive,
  watch,
} from "./runtime-canvas/index";

import Plane from "./game/Plane";
import Bullet from "./game/Bullet";

window.PIXI = PIXI;
let app = initPixi();
const { renderer } = initRuntimeCanvas(app);
const RootComponent = createRootComponent();

const root = renderer.createApp(RootComponent);
root.mount(app.stage);

function createRootComponent() {
  return {
    setup() {
      // 存储所有的子弹
      const selfBullets = reactive([]);

      return {
        selfBullets,
      };
    },

    render(ctx) {
      console.log(
        h(Bullet, {
          props: {
            x: ref(100),
            y: 200,
          },
        })
      );
      return h(
        "Container",
        {
          width: 500,
          height: 500,
        },
        [
          h(Plane, {
            onAttack(pos) {
              ctx.selfBullets.push(pos);
            },
          }),
          ...ctx.selfBullets.map((bulletInfo) => {
            return h(Bullet, {
              x: bulletInfo.x,
              y: bulletInfo.y,
            });
          }),
        ]
      );
    },
  };
}

function initPixi() {
  let app = new PIXI.Application({ width: 500, height: 500 });
  app.renderer.backgroundColor = 0x061639;
  document.body.appendChild(app.view);
  return app;
}
