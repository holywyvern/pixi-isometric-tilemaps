/* -------------------------------------------------------------------------- *\
 * IsoObject.ts
 * Author: Ramiro Rojo <ramiro.rojo.cretta@gmail.com>
 * Apache 2.0 License - See LICENSE for details.
 * --------------------------------------------------------------------------
 * This file is part of the pixi-isometric-tilemaps package.
 * Contains the description of isometric objects on a map.
\* ------------------------------------------------------------------------- */

import * as PIXI from 'pixi.js';
import IsoTile   from './IsoTile';

interface IsoObject { 
  readonly tileset:    number;
  readonly frame:      PIXI.Rectangle;
  readonly type:       string;
}

export default IsoObject;