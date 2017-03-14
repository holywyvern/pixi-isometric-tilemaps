/* -------------------------------------------------------------------------- *\
 * build.ts
 * Author: Ramiro Rojo <ramiro.rojo.cretta@gmail.com>
 * Apache 2.0 License - See LICENSE for details.
 * --------------------------------------------------------------------------
 * This file is part of the pixi-isometric-tilemaps package.
 * Handles the build version and the exported classes on the package.
\* ------------------------------------------------------------------------- */
/** @license 
 * pixi-isometric-tilemaps
 * Author: Ramiro Rojo <ramiro.rojo.cretta@gmail.com>
 * Apache 2.0 License - See LICENSE for details.
 */
import IsoMapX        from './IsoMap';
import IsoTileX       from './IsoTile';
import IsoCharacterX from './IsoCharacter';

export class IsoMap       extends IsoMapX  {};
export class IsoTile      extends IsoTileX {};
export class IsoCharacter extends IsoCharacterX {};

module PIXI {
  export class IsoMap       extends IsoMapX  {};
  export class IsoTile      extends IsoTileX {};
  export class IsoCharacter extends IsoCharacterX {};
}