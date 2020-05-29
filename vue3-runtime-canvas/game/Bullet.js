import { h, ref, defineComponent } from "../runtime-canvas/index";
//炮弹
export default defineComponent({
  props: ["x","y"],
  setup(props, ctx) {
    const speed = 15;
    const y = ref(props.y);
    // mock ticker
    const intervalNumber = setInterval(() => {
        y.value -= speed;
        
        if(y.value < 100){
            clearInterval(intervalNumber)
            ctx.emit("destroy")
            // 用不了了
            // ctx.$destroy()
        }
    }, 100);

    clearInterval();
    return {
      x: props.x,
      y
    };
  },
  render(ctx) {
    return h("Sprite", {
      x: ctx.x,
      y: ctx.y,
      texture: "../examples/assets/bunny.png",
    });
  },
});
