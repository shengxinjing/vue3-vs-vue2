import { game } from "../../game";
import {
  h,
  ref,
  defineComponent,
  onMounted,
  onUnmounted,
} from "../../../../src/index";

// 地图
export default defineComponent({
  setup(props, ctx) {
    const mapHeight = 800;
    let x1 = ref(0);
    let x2 = ref(0);
    let y1 = ref(0);
    let y2 = ref(-mapHeight);

    const speed = 1;

    game.ticker.add(() => {
      y1.value += speed;
      y2.value += speed;

      if (y1.value > mapHeight) {
        y1.value = y2.value - mapHeight;
      }

      if (y2.value > mapHeight) {
        y2.value = y1.value - mapHeight;
      }
    });
    return {
      y1,
      x1,
      y2,
      x2,
    };
  },
  render(ctx) {
    return h("Container", [
      h("Sprite", {
        x: ctx.x1,
        y: ctx.y1,
        texture: "../../resource/assets/map.png",
        key: "1",
      }),
      h("Sprite", {
        x: ctx.x2,
        y: ctx.y2,
        texture: "../../resource/assets/map.png",
        key: "2",
      }),
    ]);
  },
});
