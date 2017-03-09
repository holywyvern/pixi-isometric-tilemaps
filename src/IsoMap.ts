import * as PIXI          from 'pixi.js';
import IsoTile            from './IsoTile';
import IsoObject          from './IsoObject';
import IsoObjectSprite    from './IsoObjectSprite';
import IsoCharacter       from './IsoCharacter';
import IsoCharacterSprite from './IsoCharacterSprite';

class IsoMap extends PIXI.Container {

  children  : IsoMap.IsoObject[];
  camera    : PIXI.Point;

  private _options           : null|IsoMap.Attributes;
  private _tiles             : null|IsoTile.Attributes[];
  private _textures          : null|PIXI.BaseTexture[];
  private _mapWidth          : null|number;
  private _mapHeight         : null|number;
  private _mapData           : null|number[][];
  private _objects           : IsoMap.Instance[];
  private _objectDescriptors : null|IsoObject[];
  private _characters        : IsoCharacter[];

  private _orderChanged : boolean;

  constructor() {
    super();
    this.clean();

  }

  setGeneralAttributes(attributes : IsoMap.Attributes) {
    this._options = attributes;
  }

  setTileAttributes(attributes : IsoTile.Attributes[]) {
    this._tiles = attributes;
  }

  setTextures(textures: PIXI.BaseTexture[]) {
    this._textures = textures;
  }

  setObjects(objects: IsoMap.Instance[]) {
    this._objects = objects;
  }

  setObjectDescriptors(objects: IsoObject[]) {
    this._objectDescriptors = objects;
  }

  setCharacters(characters: IsoCharacter[]) {
    this._characters = characters;
  }

  get textures() {
    return this._textures as PIXI.BaseTexture[];
  }

  setData(width: number, height: number, data: number[][]) {
    this._mapWidth  = width;
    this._mapHeight = height;
    this._mapData   = data;
  }

  clean() {
    this.removeChildren();
    this._orderChanged      = false;
    this._objects           = [];
    this._characters        = [];
    this._objectDescriptors = null;
    this.camera             = new PIXI.Point();    
    this._options           = null;
    this._tiles             = null;
    this._textures          = null;
    this._mapData           = null;
    this._mapWidth          = null;
    this._mapHeight         = null;
  }

  build() {
    this.removeChildren();
    if (this._options === null) {
      throw "IsoMap's options can't be null.";
    }
    if (this._tiles === null) {
      throw "IsoMap's tiles can't be null."
    } 
    if (this._textures === null) {
      throw "IsoMap's textures can't be null."
    } 
    if (this._mapData === null) {
      throw "IsoMap's mapData can't be null."
    } 
    if (this._mapWidth === null) {
      throw "IsoMap's mapWidth can't be null."
    }    
    if (this._mapHeight === null) {
      throw "IsoMap's mapHeight can't be null."
    }      
    if (this._objectDescriptors === null) {
      throw "IsoMap's object descriptors can't be null."
    }
    const size = this._mapWidth * this._mapHeight;
    for (let y = 0; y < this._mapHeight; ++y) {
      for (let x = 0; x <  this._mapWidth; ++x) {
        let data = this._mapData[x + y * this._mapWidth];
        const tileID = data[0];
        if (tileID >= 0) {
          this.addChild(new IsoTile(this, x, y, data[1], this._tiles[tileID]));
        }
      }
    }  
    for (let object of this._objects)  {
      let h = this.tileAt(object.x, object.y)[1];
      this.addChild(new IsoObjectSprite(this, object, h, this._objectDescriptors[object.id]));
    }
    for (let character of this._characters) {
      this.addChild(new IsoCharacterSprite(this, character));
    }
  }

  tileAt(x: number, y: number) {
    if (x < 0 || x >= (this._mapWidth as number) || y < 0 || y >= (this._mapHeight as number)) {
      return [-1, -1];
    }
    return (this._mapData && this._mapData[x + y * (this._mapWidth as number)]) || [-1, -1];
  }

  get globalAttributes() : IsoMap.Attributes | null {
    return this._options;
  }

  refreshOrder() {
    this._orderChanged = true;
  }

  update(delta: number) {
    if (this._orderChanged) {
      this.children.sort((a, b) => a.z - b.z);
      this._orderChanged = false;
    }
    for (let child of this.children) {
      child.update(delta);
    }
  }

}

module IsoMap {

  export interface IsoObject extends PIXI.DisplayObject {
    z: number;
    update(delta: number): void;
  }

  export interface Instance {
    x:  number;
    y:  number;
    id: number;
  }

  export interface Attributes {
    tileWidth:  number;
    heightSize: number;
  }

}

export default IsoMap;