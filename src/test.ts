import * as PIXI from 'pixi.js';
import * as raf  from 'raf';

import IsoMap    from './IsoMap';
import IsoTile   from './IsoTile';
import IsoObject from './IsoObject';

import 'fpsmeter';


const MAP_DATA = [
  [0,  7], [0,  7], [ 0,  5], [ 0,  5], [ 0,  5], [ 0,  7], [ 0,  7], [ 0,  7], [ 0,  4], [ 1,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  5], [ 0,  5], [ 0,  5], [ 0,  7], [ 0,  7], [ 0,  7], [ 0,  4], [ 2,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  5], [ 0,  5], [ 0,  5], [ 0,  7], [ 0,  7], [ 0,  6], [ 0,  4], [ 3,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  7], [ 0,  6], [ 0,  5], [ 0,  7], [ 0,  7], [ 0,  5], [ 0,  4], [ 4,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  7], [ 0,  6], [ 0,  5], [ 0,  6], [ 0,  6], [ 0,  5], [ 2,  3], [ 1,  3], [ 0,  4],
  [0,  7], [0,  7], [ 0,  7], [ 0,  5], [ 0,  5], [ 0,  6], [ 0,  5], [ 0,  5], [ 3,  3], [ 0,  4], [ 0,  4],
  [0,  7], [0,  6], [ 0,  6], [ 0,  5], [ 0,  5], [ 0,  5], [ 0,  5], [ 0,  2], [ 4,  1], [ 0,  2], [ 0,  1],
  [0,  4], [0,  4], [ 0,  2], [ 0,  1], [ 0,  0], [ 0,  0], [ 0,  4], [ 0,  2], [ 1,  1], [ 0,  2], [ 0,  1],
  [0,  3], [0,  2], [ 0,  2], [ 0,  0], [ 0,  0], [ 0,  0], [ 0,  2], [ 0,  2], [ 2,  1], [ 0,  2], [ 0,  1],
  [0,  0], [0,  0], [ 0,  0], [ 0,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0],
  [0,  0], [0,  0], [ 0,  0], [ 0,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0],
  [0,  0], [0,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0], [-1,  0],
];

const OBJECTS: IsoMap.Instance[] = [
  { x:  0, y:  0, id: 0 },
  { x:  5, y:  0, id: 0 },
  { x:  6, y:  0, id: 0 },
  { x:  5, y:  1, id: 0 },
  { x:  6, y:  1, id: 0 },  
  { x:  4, y:  4, id: 0 },
  { x:  0, y: 11, id: 0 },
];

const ATTRIBUTES : IsoTile.Attributes[] = [
  { tileset:  0, frames: [{ x: 0, y: 0 }], frameDelay: 0, type: "land" },
  { tileset:  0, frames: [{ x: 128, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 128, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 64, y: 0 }, { x: 128, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }, { x: 128, y: 0 }], frameDelay: 300, type: "water" },
];

const OBJECT_DESCRIPTORS : IsoObject[] = [
  { tileset: 0, frame: new PIXI.Rectangle(0, 64, 64, 128), type: "tree" }
];

const img = new Image();
img.onload = setup;
img.src = './test-cube.png';

const stage    = new PIXI.Container;
const renderer = PIXI.autoDetectRenderer(1200, 800);

const meter = new FPSMeter(document.body, {
  // Theme
  theme: 'colorful', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
  heat:  0,      // Allow themes to use coloring by FPS heat. 0 FPS = red, maxFps = green.

  // Graph
  graph:   1, // Whether to show history graph.
  history: 20 // How many history states to show in a graph.
})

document.body.appendChild(renderer.view);

const tilemap  = new IsoMap;
stage.addChild(tilemap);

let now = Date.now();

function setup() {
  const time = 0;
  tilemap.setGeneralAttributes({
    tileWidth:  64,
    heightSize: 16,
  });
  tilemap.setTileAttributes(ATTRIBUTES);
  tilemap.setObjectDescriptors(OBJECT_DESCRIPTORS);
  tilemap.setTextures([ new PIXI.BaseTexture(img) ]);
  tilemap.setData(11, 12, MAP_DATA);
  tilemap.setObjects(OBJECTS);
  tilemap.camera.x = 600;
  tilemap.camera.y = 400;
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