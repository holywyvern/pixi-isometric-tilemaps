import * as PIXI from 'pixi.js';
import IsoMap    from './IsoMap';

const EMPTY_TEXTURE = new PIXI.BaseTexture();

class IsoTile extends PIXI.Container {

  private _z                   : number;
  private _tilemap             : IsoMap;
  private _tileX               : number;
  private _tileY               : number;
  private _tileHeight          : number;
  private _attributes          : IsoTile.Attributes;
  private _globalAttributes    : IsoMap.Attributes;

  private _frame               : number;
  private _frameCount          : number;

  private _topTexture          : PIXI.Texture;
  private _middleLeftTexture   : PIXI.Texture;
  private _bottomLeftTexture   : PIXI.Texture; 
  private _topLeftWallTexture  : PIXI.Texture; 

  private _middleRightTexture  : PIXI.Texture;
  private _bottomRightTexture  : PIXI.Texture; 
  private _topRightWallTexture : PIXI.Texture; 

  constructor(tilemap : IsoMap, x: number, y: number, height: number, attributes: IsoTile.Attributes) {
    super();
    this._tilemap = tilemap;
    const ga = tilemap.globalAttributes as IsoMap.Attributes;
    this._globalAttributes = ga;
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
    const texture             = this._tilemap.textures ? this._tilemap.textures[this._attributes.tileset] :  EMPTY_TEXTURE;
    const topRect             = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.tileWidth / 2);
    const topLeftWallRect     = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
    const middleLeftRect      = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
    const bottomLeftRect      = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);

    const topRightWallRect    = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
    const middleRightRect     = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
    const bottomRightRect     = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);

    this._topTexture          = new PIXI.Texture(texture, topRect);
    this._topLeftWallTexture  = new PIXI.Texture(texture, topLeftWallRect);
    this._middleLeftTexture   = new PIXI.Texture(texture, middleLeftRect);
    this._bottomLeftTexture   = new PIXI.Texture(texture, bottomLeftRect);
    this._topRightWallTexture = new PIXI.Texture(texture, topRightWallRect);
    this._middleRightTexture  = new PIXI.Texture(texture, middleRightRect);
    this._bottomRightTexture  = new PIXI.Texture(texture, bottomRightRect);    
  }

  private _updateRect() {
    const frame = this._attributes.frames[this._frame];
    const ga = this._globalAttributes;
    this._topTexture.frame.x     = frame.x;
    this._topTexture.frame.y     = frame.y;
    this._topTexture.frame       = this._topTexture.frame;
    this._topLeftWallTexture.frame.x = frame.x;
    this._topLeftWallTexture.frame.y = frame.y + ga.tileWidth / 2;
    this._topLeftWallTexture.frame   = this._topLeftWallTexture.frame;
    this._middleLeftTexture.frame.x  = frame.x;
    this._middleLeftTexture.frame.y  = frame.y + ga.tileWidth / 2 + ga.heightSize;
    this._middleLeftTexture.frame    = this._middleLeftTexture.frame;
    this._bottomLeftTexture.frame.x  = frame.x;
    this._bottomLeftTexture.frame.y  = frame.y + ga.tileWidth / 2 + ga.heightSize * 2;  
    this._bottomLeftTexture.frame    = this._bottomLeftTexture.frame;

    this._topRightWallTexture.frame.x = frame.x + ga.tileWidth / 2;
    this._topRightWallTexture.frame.y = frame.y + ga.tileWidth / 2;
    this._topRightWallTexture.frame   = this._topRightWallTexture.frame;
    this._middleRightTexture.frame.x  = frame.x + ga.tileWidth / 2;
    this._middleRightTexture.frame.y  = frame.y + ga.tileWidth / 2 + ga.heightSize;
    this._middleRightTexture.frame    = this._middleRightTexture.frame;
    this._bottomRightTexture.frame.x  = frame.x + ga.tileWidth / 2;
    this._bottomRightTexture.frame.y  = frame.y + ga.tileWidth / 2 + ga.heightSize * 2;  
    this._bottomRightTexture.frame    = this._bottomRightTexture.frame;

  }

  private _updatePosition() {
    const ga = this._globalAttributes;
    this.x = (this._tileX - this._tileY) * ga.tileWidth / 2;
    this.y = (this._tileX + this._tileY) * ga.tileWidth / 4;
  }

  private _buildBottomSprite(maxHeight:number[]) {
    const ga = this._globalAttributes;
    if (maxHeight[0] > 0) {
      let bottom = new PIXI.Sprite(this._bottomLeftTexture);
      bottom.y = -((this._tileHeight - maxHeight[0] + 1) * ga.heightSize);
      bottom.x = -ga.tileWidth / 2;
      this.addChild(bottom);
    }
    if (maxHeight[1] > 0) {
      let bottom = new PIXI.Sprite(this._bottomRightTexture);
      bottom.y = -((this._tileHeight - maxHeight[1] + 1) * ga.heightSize);
      bottom.x = 0;
      this.addChild(bottom);
    }    
  }

  private _buildMiddleSprites(maxHeight:number[]) {
    const ga = this._globalAttributes;
    for (let i = 0; i < maxHeight[0]; ++i) {
      let middle = new PIXI.Sprite(this._middleLeftTexture);
      middle.y = -((this._tileHeight - i) * ga.heightSize);
      middle.x = -ga.tileWidth / 2;
      this.addChild(middle);
    }
    for (let i = 0; i < maxHeight[1]; ++i) {
      let middle = new PIXI.Sprite(this._middleRightTexture);
      middle.y = -((this._tileHeight - i) * ga.heightSize);
      middle.x = 0;
      this.addChild(middle);
    }    
  }

  private _buildTopSprite(maxHeight:number[]) {
    const ga = this._globalAttributes;
    if (maxHeight[0] > 0) {
      let wallTop = new PIXI.Sprite(this._topLeftWallTexture);
      wallTop.y = -(ga.tileWidth / 2 + ga.heightSize  * (this._tileHeight - 1));
      wallTop.x = -ga.tileWidth / 2;
      this.addChild(wallTop);
    }
    if (maxHeight[1] > 0) {
      let wallTop = new PIXI.Sprite(this._topRightWallTexture);
      wallTop.y = -(ga.tileWidth / 2 + ga.heightSize  * (this._tileHeight - 1));
      wallTop.x = 0;
      this.addChild(wallTop);
    }    
    let top = new PIXI.Sprite(this._topTexture);
    top.y = -(ga.tileWidth / 2 + ga.heightSize * this._tileHeight);
    top.anchor.x = 0.5;
    this.addChild(top);
  }

  private _calculateMaxHeight() {
    let right  = this._tileHeight - this._tilemap.heightAt(this._tileX + 1, this._tileY);
    let bottom = this._tileHeight - this._tilemap.heightAt(this._tileX, this._tileY + 1);
    return [bottom, right];
  }

  private _buildSprites() {
    const maxHeight = this._calculateMaxHeight();
    this.removeChildren();
    this._buildBottomSprite(maxHeight);
    this._buildMiddleSprites(maxHeight.map(i => i - 1));
    this._buildTopSprite(maxHeight);
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