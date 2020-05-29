export const patchProp = (
  el,
  key,
  prevValue,
  nextValue,
  isSVG = false,
  prevChildren,
  parentComponent,
  parentSuspense,
  unmountChildren
) => {
//   console.log(el, key, prevValue, nextValue);

  switch (key) {
    case "x":
      el.x = nextValue;
      break;
    case "y":
      el.y = nextValue;
      break;
    case "width":
        el.width = nextValue;
        break;
    case "height":
        el.height = nextValue;
        break;
    case "on":
      Object.keys(nextValue).forEach((eventName) => {
        const callback = nextValue[eventName];
        el.on(eventName, callback);
      });
      break;
    case "texture":
        let texture = PIXI.Texture.from(nextValue);
        el.texture = texture;
        break;
  }
};
