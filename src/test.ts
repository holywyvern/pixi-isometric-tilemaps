import * as PIXI    from 'pixi.js';
import * as raf     from 'raf';

import IsoMap       from './IsoMap';
import IsoTile      from './IsoTile';
import IsoObject    from './IsoObject';
import IsoCharacter from './IsoCharacter';

import 'fpsmeter';


const MAP_DATA = [
  [0,  7], [0,  7], [ 0,  5], [ 0,  5], [ 0,  6], [ 0,  7], [ 0,  7], [ 0,  7], [ 0,  4], [ 1,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  5], [ 0,  5], [ 0,  6], [ 0,  7], [ 0,  7], [ 0,  7], [ 0,  4], [ 2,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  5], [ 0,  5], [ 0,  6], [ 0,  7], [ 0,  7], [ 0,  6], [ 0,  4], [ 3,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  7], [ 0,  6], [ 0,  6], [ 0,  7], [ 0,  7], [ 0,  5], [ 0,  4], [ 4,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  7], [ 0,  6], [ 0,  6], [ 0,  6], [ 0,  6], [ 0,  5], [ 2,  3], [ 1,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  7], [ 0,  5], [ 0,  5], [ 0,  6], [ 0,  5], [ 0,  5], [ 3,  3], [ 0,  4], [ 0,  4],
  [0,  7], [0,  6], [ 0,  6], [ 0,  5], [ 0,  5], [ 0,  5], [ 0,  5], [ 0,  2], [ 4,  1], [ 0,  2], [ 0,  1],
  [0,  4], [0,  4], [ 0,  2], [ 0,  1], [ 0,  0], [ 0,  0], [ 0,  3], [ 0,  2], [ 1,  1], [ 0,  2], [ 0,  1],
  [0,  3], [0,  2], [ 0,  2], [ 0,  0], [ 0,  0], [ 0,  1], [ 0,  2], [ 0,  2], [ 2,  1], [ 0,  2], [ 0,  1],
  [0,  0], [0,  0], [ 0,  0], [ 0,  0], [ 0,  0], [ 0,  0], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  [0,  0], [0,  0], [ 0,  0], [ 0,  0], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1],
  [0,  0], [0,  0], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1],
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
  new TestCharacter().moveTo(10, 0).face(IsoCharacter.Direction.UP),
  new TestCharacter().moveTo(0, 1).face(IsoCharacter.Direction.LEFT),  
  new TestCharacter().moveTo(1, 0).face(IsoCharacter.Direction.DOWN),
  new TestCharacter().moveTo(3, 2).face(IsoCharacter.Direction.RIGHT),
  new TestCharacter().moveTo(3, 3).face(IsoCharacter.Direction.RIGHT),
  new TestCharacter().moveTo(4, 5).face(IsoCharacter.Direction.LEFT),
  new TestCharacter().moveTo(1, 11).face(IsoCharacter.Direction.RIGHT),
  new TestCharacter().moveTo(0, 10).face(IsoCharacter.Direction.RIGHT),
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
  tilemap.setGeneralAttributes(GENERAL_ATTRIBUTES);
  tilemap.setTileAttributes(ATTRIBUTES);
  tilemap.setObjectDescriptors(OBJECT_DESCRIPTORS);
  tilemap.setTextures([ new PIXI.BaseTexture(tilesetImg) ]);
  tilemap.setData(11, 12, MAP_DATA);
  tilemap.setObjects(OBJECTS);
  tilemap.setCharacters(CHARACTERS);
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