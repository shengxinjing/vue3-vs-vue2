import { h, createApp, defineComponent, reactive } from "@vue/runtime-dom";

const RootComponent = {
  setup() {
    const list = reactive(["list"]);

    return {
      name: "cxr",
      list,
    };
  },

  render(ctx) {
    // const renderHello = () => {
    //   return ctx.list.map((val) => {
    //     return val;
    //   });
    // };

    return h(
      "div",
      {
        onClick() {
          console.log("dd");
          ctx.list.push("ddd");
        },
      },
      ctx.list.map((val) => {
        return h("p", val);
      })
    );
  },
};

createApp(RootComponent).mount("#app");
