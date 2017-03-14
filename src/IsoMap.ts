import * as PIXI          from 'pixi.js';
import IsoTile            from './IsoTile';
import IsoObject          from './IsoObject';
import IsoObjectSprite    from './IsoObjectSprite';
import IsoCharacter       from './IsoCharacter';
import IsoCharacterSprite from './IsoCharacterSprite';

class IsoMap extends PIXI.Container {

  children  : IsoMap.IsoObject[];

  options           : null|IsoMap.Attributes;
  tiles             : null|IsoTile.Attributes[];
  textures          : null|PIXI.BaseTexture[];
  interactiveTiles  : boolean;
  mapWidth          : null|number;
  mapHeight         : null|number;
  mapData           : null|number[];
  heightData        : null|number[];
  objects           : IsoMap.Instance[];
  objectDescriptors : null|IsoObject[];
  characters        : IsoCharacter[];

  private _orderChanged : boolean;

  constructor() {
    super();
    this.clean();
    this.interactiveTiles = false;
  }

  get camera() {
    return this.position;
  }


  clean() {
    this.removeChildren();
    this._orderChanged      = false;
    this.objects           = [];
    this.characters        = [];
    this.objectDescriptors = null;
    this.options           = null;
    this.tiles             = null;
    this.textures          = null;
    this.mapData           = null;
    this.heightData        = null;
    this.mapWidth          = null;
    this.mapHeight         = null;
  }

  build() {
    this.removeChildren();
    if (this.options === null) {
      throw "IsoMap's options can't be null.";
    }
    if (this.tiles === null) {
      throw "IsoMap's tiles can't be null."
    } 
    if (this.textures === null) {
      throw "IsoMap's textures can't be null."
    } 
    if (this.mapData === null) {
      throw "IsoMap's mapData can't be null."
    } 
    if (this.mapWidth === null) {
      throw "IsoMap's mapWidth can't be null."
    }    
    if (this.mapHeight === null) {
      throw "IsoMap's mapHeight can't be null."
    }      
    if (this.objectDescriptors === null) {
      throw "IsoMap's object descriptors can't be null."
    }
    if (this.heightData === null) {
      throw "IsoMap's height data cannot be null";
    }
    const size = this.mapWidth * this.mapHeight;
    for (let y = 0; y < this.mapHeight; ++y) {
      for (let x = 0; x <  this.mapWidth; ++x) {
        let data = this.tileAt(x, y);
        let h    = this.heightAt(x, y);
        const tileID = data;
        if (tileID >= 0) {
          this.addChild(new IsoTile(this, x, y, h, this.tiles[tileID]));
        }
      }
    }  
    for (let object of this.objects)  {
      let h = this.heightAt(object.x, object.y);
      this.addChild(new IsoObjectSprite(this, object, h, this.objectDescriptors[object.id]));
    }
    for (let character of this.characters) {
      this.addChild(new IsoCharacterSprite(this, character));
    }
  }

  heightAt(x: number, y: number) {
    return this._valueAt(this.heightData as number[], x, y);
  }

  tileAt(x: number, y: number) {
    return this._valueAt(this.mapData as number[], x, y);
  }

  private _valueAt(array: number[], x: number, y: number) {
    if (x < 0 || x >= (this.mapWidth as number) || y < 0 || y >= (this.mapHeight as number)) {
      return -1;
    }
    return array[x + y * (this.mapWidth as number)];
  }

  get globalAttributes() : IsoMap.Attributes | null {
    return this.options;
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