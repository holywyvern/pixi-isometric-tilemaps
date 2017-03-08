import * as PIXI from 'pixi.js';
import IsoMap    from './IsoMap';

class IsoTile extends PIXI.Container {

  private _z                : number;
  private _tilemap          : IsoMap;
  private _tileX            : number;
  private _tileY            : number;
  private _tileHeight       : number;
  private _attributes       : IsoTile.Attributes;
  private _globalAttributes : IsoMap.Attributes;

  private _frame            : number;
  private _frameCount       : number;

  private _topTexture        : PIXI.Texture;
  private _middleTexture     : PIXI.Texture;
  private _bottomTexture     : PIXI.Texture; 

  constructor(tilemap : IsoMap, x: number, y: number, height: number, attributes: IsoTile.Attributes) {
    super();
    this._tilemap = tilemap;
    this._globalAttributes = tilemap.globalAttributes as IsoMap.Attributes;
    this._tileX    = x;
    this._tileY    = y;
    this._tileHeight = height;
    this._attributes = attributes;
    this.z = (this._tileX + this._tileY) * this._globalAttributes.tileWidth / 4; 
    this._frame = 0;
    this._frameCount = 0;
    this._setupRects();  
    this._updatePosition();
    this._buildSprites();
    this._updateRect();
  }

  private _setupRects() {
    const ga = this._globalAttributes;
    const texture = this._tilemap.textures[this._attributes.tileset];
    const topRect    = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.tileWidth / 2);
    const middleRect = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.heightSize);
    const bottomRect = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.heightSize);
    this._topTexture    = new PIXI.Texture(texture, topRect);
    this._middleTexture = new PIXI.Texture(texture, middleRect);
    this._bottomTexture = new PIXI.Texture(texture, bottomRect);
  }

  private _updateRect() {
    const frame = this._attributes.frames[this._frame];
    const ga = this._globalAttributes;
    this._topTexture.frame.x    = frame.x;
    this._topTexture.frame.y    = frame.y;
    this._topTexture.frame      = this._topTexture.frame;
    this._middleTexture.frame.x = frame.x;
    this._middleTexture.frame.y = frame.y + ga.tileWidth / 2;
    this._middleTexture.frame   = this._middleTexture.frame;
    this._bottomTexture.frame.x = frame.x;
    this._bottomTexture.frame.y = frame.y + ga.tileWidth / 2 + ga.heightSize;  
    this._bottomTexture.frame   = this._bottomTexture.frame;
  }

  private _updatePosition() {
    const ga = this._globalAttributes;
    this.x = (this._tileX - this._tileY) * ga.tileWidth / 2 + this._tilemap.camera.x;
    this.y = (this._tileX + this._tileY) * ga.tileWidth / 4 + this._tilemap.camera.y;
  }

  private _buildSprites() {
    this.removeChildren();
    const ga = this._globalAttributes;
    
    let bottom = new PIXI.Sprite(this._bottomTexture);
    bottom.anchor.x = 0.5;
    this.addChild(bottom);
    for (let i = 1, h = this._tileHeight; i <= h; ++i) {
      let middle = new PIXI.Sprite(this._middleTexture);
      middle.anchor.x = 0.5;
      middle.y = -(i * ga.heightSize);
      this.addChild(middle);
    }
    let top = new PIXI.Sprite(this._topTexture);
    top.y = -(ga.tileWidth / 2 + ga.heightSize * this._tileHeight);
    top.anchor.x = 0.5;
    this.addChild(top);
  }

  private _updateFrame(delta:number) {
    const length = this._attributes.frames.length;
    if (length > 1) {
      this._frameCount += delta;
      if (this._frameCount >= this._attributes.frameDelay) {
        while (this._frameCount >= this._attributes.frameDelay) {
          this._frameCount -= this._attributes.frameDelay;
          this._frame = (this._frame + 1) % length;
        }
        this._updateRect();
      }
    }
    
  }

  get z() {
    return this._z;
  }

  set z(value) {
    this._z = value;
    this._tilemap.refreshOrder();
  }


  update(delta:number) {
    this._updatePosition();
    this._updateFrame(delta);
    
  }

}

module IsoTile {

  export interface Frame {
    x: number;
    y: number;
  }

  export interface Attributes {
    tileset    : number;
    frames     : Frame[];
    frameDelay : number;
    type       : string;
  }

}

export default IsoTile;