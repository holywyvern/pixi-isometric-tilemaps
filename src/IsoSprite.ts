import * as PIXI from 'pixi.js';
import IsoMap    from './IsoMap';
import IsoObject from './IsoObject';

class IsoSprite extends PIXI.Sprite {

  private _z                : number;
  private _tilemap          : IsoMap;
  private _object           : IsoObject;
  private _tile             : IsoMap.Instance;
  private _tileHeight       : number;

  constructor(tilemap: IsoMap, tile: IsoMap.Instance, tileHeight: number, obj : IsoObject) {
    super();
    this._tilemap = tilemap;
    this._tileHeight = tileHeight;
    this.texture  = new PIXI.Texture(tilemap.textures[obj.tileset], obj.frame); 
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._object  = obj;
    this._tile    = tile;
    this.z = (tile.x + tile.y) * (this._tilemap.globalAttributes as IsoMap.Attributes).tileWidth / 4 + 1; 
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
    const camera = this._tilemap.camera;
    this.x = (this._tile.x - this._tile.y) * ga.tileWidth / 2 + camera.x;
    this.y = (this._tile.x + this._tile.y) * ga.tileWidth / 4 - ga.heightSize * this._tileHeight + camera.y;

  }

  update(delta: number) {
    this._updatePosition();
  }

}

export default IsoSprite;