import { h, ref, defineComponent, watch } from "../../../../src/index";

//炮弹
export default defineComponent({
  props: ["x", "y", "id"],
  setup(props, ctx) {
    const x = ref(props.x);
    const y = ref(props.y);

    watch(props, (newProps) => {
      x.value = newProps.x;
      y.value = newProps.y;
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
      texture: "../../resource/assets/bunny.png",
    });
  },
});
