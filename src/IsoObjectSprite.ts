/* -------------------------------------------------------------------------- *\
 * IsoCharacterSprite.ts
 * Author: Ramiro Rojo <ramiro.rojo.cretta@gmail.com>
 * Apache 2.0 License - See LICENSE for details.
 * --------------------------------------------------------------------------
 * This file is part of the pixi-isometric-tilemaps package.
 * Contains an sprite for isometric characters.
\* ------------------------------------------------------------------------- */

import * as PIXI from 'pixi.js';
import IsoMap    from './IsoMap';
import IsoObject from './IsoObject';

const EMPTY_TEXTURE = new PIXI.BaseTexture();

class IsoObjectSprite extends PIXI.Sprite {

  private _z                : number;
  private _tilemap          : IsoMap;
  private _object           : IsoObject;
  private _tile             : IsoMap.Instance;
  private _tileHeight       : number;

  constructor(tilemap: IsoMap, tile: IsoMap.Instance, tileHeight: number, obj : IsoObject) {
    super();
    this._tilemap = tilemap;
    this._tileHeight = tileHeight;
    this.texture  = new PIXI.Texture(tilemap.textures ? tilemap.textures[obj.tileset] : EMPTY_TEXTURE, obj.frame); 
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._object  = obj;
    this._tile    = tile;
    const ga = (this._tilemap.globalAttributes as IsoMap.Attributes);
    this.z = (tile.x + tile.y) * ga.tileWidth / 4 + ga.tileWidth / 4 - 1;  
  }

  get z() {
    return this._z;
  }

  set z(value) {
    this._z = value;
    this._tilemap.refreshOrder();
  }

  private _updatePosition() {
    const ga = this._tilemap.globalAttributes as IsoMap.Attributes;
    this.x = (this._tile.x - this._tile.y) * ga.tileWidth / 2;
    this.y = (this._tile.x + this._tile.y) * ga.tileWidth / 4 - ga.heightSize * this._tileHeight ;

  }

  update(delta: number) {
    this._updatePosition();
  }

}

export default IsoObjectSprite;