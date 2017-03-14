/* -------------------------------------------------------------------------- *\
 * utils.ts
 * Author: Ramiro Rojo <ramiro.rojo.cretta@gmail.com>
 * Apache 2.0 License - See LICENSE for details.
 * --------------------------------------------------------------------------
 * This file is part of the pixi-isometric-tilemaps package.
 * Containssome utilities for coordinate conversions.
\* ------------------------------------------------------------------------- */

import * as PIXI from 'pixi.js';

export function fromIsoTo2D(pt:PIXI.Point):PIXI.Point{
  return new PIXI.Point((2 * pt.y + pt.x) / 2, (2 * pt.y - pt.x) / 2);
}

export function from2DToIso(pt:PIXI.Point):PIXI.Point{
  return new PIXI.Point(pt.x - pt.y, (pt.x + pt.y) / 2);
}