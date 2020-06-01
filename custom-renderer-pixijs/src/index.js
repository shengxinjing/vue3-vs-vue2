import { createRenderer } from "@vue/runtime-core";
import { nodeOps } from "./nodeOps";
import { patchProp } from "./patchProp";

export const initRuntimeCanvas = () => {
  const renderer = createRenderer({
    ...nodeOps,
    patchProp,
  });

  return {
    renderer,
  };
};

export * from "@vue/runtime-core";
