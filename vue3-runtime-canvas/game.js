import * as PIXI from 'pixi.js'



//Create a Pixi Application
let app = new PIXI.Application({width: 256, height: 256});
// set background
app.renderer.backgroundColor = 0x061639;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);


// let rectangle = new PIXI.Graphics();
// rectangle.lineStyle(4, 0xFF3300, 1);
// rectangle.beginFill(0x66CCFF);
// rectangle.drawRect(0, 0, 64, 64);
// rectangle.endFill();
// rectangle.x = 0;
// rectangle.y = 0;

// app.stage.addChild(rectangle);
// app.stage.on("pointerdown",()=>{
//     console.log("click")
// })


const sprite = new PIXI.Sprite();

// Set the initial position
sprite.anchor.set(0.5);
sprite.x = app.screen.width / 2;
sprite.y = app.screen.height / 2;

// Opt-in to interactivity
sprite.interactive = true;

// Shows hand cursor
sprite.buttonMode = true;

// Pointers normalize touch and mouse
sprite.on('pointerdown', onClick);

// Alternatively, use the mouse & touch events:
// sprite.on('click', onClick); // mouse-only
// sprite.on('tap', onClick); // touch-only





app.stage.addChild(sprite);

let texture = PIXI.Texture.from('examples/assets/bunny.png');

// sprite.texture = "examples/assets/bunny.png" 
sprite.texture = texture;

function onClick() {
    sprite.x += 4;
}
