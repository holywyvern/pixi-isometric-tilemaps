import * as PIXI    from 'pixi.js';
import * as raf     from 'raf';

import IsoMap       from './IsoMap';
import IsoTile      from './IsoTile';
import IsoObject    from './IsoObject';
import IsoCharacter from './IsoCharacter';

import 'fpsmeter';


const MAP_DATA = [
  0, 0,  0,  0,  0,  0,  0,  0,  0,  1,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  0,  2,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  0,  3,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  0,  4,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  2,  1,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  3,  0,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  4,  0,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  1,  0,  0,
  0, 0,  0,  0,  0,  0,  0,  0,  2,  0,  0,
  0, 0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
  0, 0,  0,  0, -1, -1, -1, -1, -1, -1, -1,
  0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];

const HEIGHT_DATA = [
  7, 7,  5,  5,  6,  7,  7,  7,  4,  3,  4,
  7, 7,  5,  5,  6,  7,  7,  7,  4,  3,  4,
  7, 7,  5,  5,  6,  7,  7,  6,  4,  3,  4,
  7, 7,  7,  6,  6,  7,  7,  5,  4,  3,  4,
  7, 7,  7,  6,  6,  6,  6,  5,  3,  3,  4,
  7, 7,  7,  5,  5,  6,  5,  5,  3,  4,  4,
  7, 6,  6,  5,  5,  5,  5,  2,  1,  2,  1,
  4, 4,  2,  1,  0,  0,  3,  2,  1,  2,  1,
  3, 2,  2,  0,  0,  1,  2,  2,  1,  2,  1,
  0, 0,  0,  0,  0,  0, -1, -1, -1, -1, -1,
  0, 0,  0,  0, -1, -1, -1, -1, -1, -1, -1,
  0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1,
];

const OBJECTS: IsoMap.Instance[] = [
  { x:  0, y:  0, id: 0 },
  { x:  5, y:  0, id: 0 },
  { x:  6, y:  0, id: 0 },
  { x:  5, y:  1, id: 0 },
  { x:  6, y:  1, id: 0 },  
  { x:  4, y:  4, id: 0 },
  { x:  0, y: 11, id: 0 },
  { x:  2, y:  8, id: 1 },
  { x:  3, y:  4, id: 1 },
  { x:  5, y:  5, id: 1 },
  { x:  2, y:  6, id: 1 },
];

const ATTRIBUTES : IsoTile.Attributes[] = [
  { tileset:  0, frames: [{ x: 0, y: 0 }], frameDelay: 0, type: "land" },
  { tileset:  0, frames: [{ x: 128, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 128, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 64, y: 0 }, { x: 128, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }, { x: 128, y: 0 }], frameDelay: 300, type: "water" },
];

const GENERAL_ATTRIBUTES = {
  tileWidth:  64,
  heightSize: 16,
};

class TestCharacter extends IsoCharacter {

  constructor() {
    super(GENERAL_ATTRIBUTES, 64, null);
    this.animate([0], 100, -1);
  }

}

const CHARACTERS : IsoCharacter[] = [
  new TestCharacter().moveTo(10, 0, 4).face(IsoCharacter.Direction.UP),
  new TestCharacter().moveTo(0, 1,  7).face(IsoCharacter.Direction.LEFT),  
  new TestCharacter().moveTo(1, 0,  7).face(IsoCharacter.Direction.DOWN),
  new TestCharacter().moveTo(3, 2,  5).face(IsoCharacter.Direction.RIGHT),
  new TestCharacter().moveTo(3, 3,  6).face(IsoCharacter.Direction.RIGHT),
  new TestCharacter().moveTo(1, 11, 0).face(IsoCharacter.Direction.RIGHT),
  new TestCharacter().moveTo(0, 10, 0)
    .face(IsoCharacter.Direction.RIGHT)
    .walk(IsoCharacter.Direction.RIGHT,  0, 1000)
    .face(IsoCharacter.Direction.DOWN)
    .walk(IsoCharacter.Direction.DOWN,  0, 1000)  
    .face(IsoCharacter.Direction.LEFT)
    .walk(IsoCharacter.Direction.LEFT, 0, 1000)      
    .face(IsoCharacter.Direction.UP)
    .walk(IsoCharacter.Direction.UP,    0, 1000)
    .face(IsoCharacter.Direction.RIGHT),
  new TestCharacter().moveTo(4, 6,  5)
    .startAfterImages(4, 40)
    .face(IsoCharacter.Direction.LEFT)
    .jump(IsoCharacter.Direction.LEFT, 0, 64, 400)
    .endAfterImages(),
  new TestCharacter().moveTo(3, 7,  1)
    .face(IsoCharacter.Direction.RIGHT)
    .jump(IsoCharacter.Direction.RIGHT, 5, 48, 400),    
  new TestCharacter().moveTo(3, 8,  0)
    .face(IsoCharacter.Direction.LEFT)
    .startAfterImages(3, 50)
    .jump(IsoCharacter.Direction.CENTER, 0, 200, 500)
    .endAfterImages(),        
];

const OBJECT_DESCRIPTORS : IsoObject[] = [
  { tileset: 0, frame: new PIXI.Rectangle(0,  80, 64, 80), type: "tree" },
  { tileset: 0, frame: new PIXI.Rectangle(64, 80, 64, 32), type: "rock" }
];

const tilesetImg = new Image();
tilesetImg.onload = endLoad;
tilesetImg.src = './test-cube.png';

const charImg = new Image();
charImg.onload = endLoad;
charImg.src = './character.png';

let loaded      = 0;
const loadCount = 2;

const stage    = new PIXI.Container;
const renderer = PIXI.autoDetectRenderer(1200, 800);

const meter = new FPSMeter(document.body, {
  // Theme
  theme: 'colorful', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
  heat:  1,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

  // Graph
  graph:   1, // Whether to show history graph.
  history: 20 // How many history states to show in a graph.
})

document.body.appendChild(renderer.view);

const tilemap  = new IsoMap;
stage.addChild(tilemap);

let now = Date.now();

function endLoad() {
  ++loaded;
  if (loaded >= loadCount) {
    setup();
  }
}

function setup() {
  const time = 0;
  const charTexture = new PIXI.BaseTexture(charImg);
  for (let character of CHARACTERS) {
    character.texture = charTexture;
  }
  tilemap.options           = GENERAL_ATTRIBUTES;
  tilemap.tiles             = ATTRIBUTES;
  tilemap.objectDescriptors = OBJECT_DESCRIPTORS;
  tilemap.textures          = [ new PIXI.BaseTexture(tilesetImg) ];
  tilemap.mapWidth          = 11;
  tilemap.mapHeight         = 12;
  tilemap.mapData           = MAP_DATA;
  tilemap.heightData        = HEIGHT_DATA;
  tilemap.objects           = OBJECTS;
  tilemap.characters        = CHARACTERS;
  tilemap.x = 600;
  tilemap.y = 400;
  tilemap.build();
  now = Date.now();
  raf(update);
}

function update() {
  let newNow = Date.now();
  tilemap.update(newNow - now);
  now = newNow;
  renderer.render(stage);
  meter.tick();
  raf(update);
}