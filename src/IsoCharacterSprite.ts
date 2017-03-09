import * as PIXI    from 'pixi.js';
import IsoCharacter from './IsoCharacter';
import IsoMap       from './IsoMap';

class IsoCharacterSprite extends PIXI.Sprite {

  private _character : IsoCharacter;
  private _tilemap   : IsoMap;
  
  z                  : number|undefined;

  constructor(tilemap : IsoMap, character : IsoCharacter) {
    super();
    this._tilemap   = tilemap;
    this._character = character;
    this.z          = undefined;
    this._refreshZ();
  }

  get tileX() {
    return Math.floor(this.x / (this._tilemap.globalAttributes as IsoMap.Attributes).tileWidth);
  }

  get tileY() {
    return Math.floor(this.y / (this._tilemap.globalAttributes as IsoMap.Attributes).tileWidth);
  }

  private _refreshZ() {
    const ga = (this._tilemap.globalAttributes as IsoMap.Attributes);
    const z = (this.tileX + this.tileY) * ga.tileWidth / 2 + ga.tileWidth;
    if (z !== this.z) {
      this.z = z;
      this._tilemap.refreshOrder();
    }
  }

  update(delta: number) {
    this._character.update(delta);
    this._refreshZ();
  }

}

export default IsoCharacterSprite;