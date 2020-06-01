import * as PIXI from "PIXI.js";

export const game = initPixi();

function initPixi() {
  let app = new PIXI.Application({
    width: 750,
    height: 800,
  });
  app.renderer.backgroundColor = 0x061639;
  document.body.appendChild(app.view);
  return app;
}
