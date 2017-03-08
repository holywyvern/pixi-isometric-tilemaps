import * as PIXI from 'pixi.js';
import * as raf  from 'raf';

import IsoMap    from './IsoMap';
import IsoTile   from './IsoTile';

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

const ATTRIBUTES : IsoTile.Attributes[] = [
  { tileset:  0, frames: [{ x: 0, y: 0 }], frameDelay: 0, type: "land" },
  { tileset:  0, frames: [{ x: 128, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 128, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 64, y: 0 }, { x: 128, y: 0 }, { x: 64, y: 0 }], frameDelay: 300, type: "water" },
  { tileset:  0, frames: [{ x: 64, y: 0 }, { x: 64, y: 0 }, { x: 64, y: 0 }, { x: 128, y: 0 }], frameDelay: 300, type: "water" },
];



const img = new Image();
img.onload = setup;
img.src = './test-cube.png';

const stage    = new PIXI.Container;
const renderer = PIXI.autoDetectRenderer(1200, 800);

const meter = new FPSMeter(document.body, {
  heat: 1
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
  tilemap.setTextures([ new PIXI.BaseTexture(img) ]);
  tilemap.setData(11, 12, MAP_DATA);
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