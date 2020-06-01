import { game } from "../../game";
import { useKeyboardMove, useKeyboard } from "../use";
import { h, defineComponent, ref } from "../../../../src/index";
// 敌方飞机
export default defineComponent({
  setup(props, ctx) {
    const x = ref(150);
    const y = ref(0);
    return {
      x,
      y,
    };
  },
  render(ctx) {
    return h("Sprite", {
      x: ctx.x,
      y: ctx.y,
      texture: "../../resource/assets/enemy1.png",
    });
  },
});
