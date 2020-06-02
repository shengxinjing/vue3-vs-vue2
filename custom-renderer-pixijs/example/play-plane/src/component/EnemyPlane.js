import { game } from "../../game";
import { useKeyboardMove, useKeyboard } from "../use";
import {
  h,
  defineComponent,
  ref,
  watch,
  onMounted,
  onUnmounted,
} from "../../../../src/index";
// 敌方飞机
export default defineComponent({
  props: ["x", "y"],
  setup(props, ctx) {
    const x = ref(props.x);
    const y = ref(props.y);

    watch(props, (newValue) => {
      x.value = newValue.x;
      y.value = newValue.y;
    });

    // 发射子弹
    const attackInterval = 2000;
    let intervalId;
    onMounted(() => {
      intervalId = setInterval(() => {
        ctx.emit("attack", {
          x: x.value + 105,
          y: y.value + 200,
        });
      }, attackInterval);
    });

    onUnmounted(() => {
      clearInterval(intervalId);
    });

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
