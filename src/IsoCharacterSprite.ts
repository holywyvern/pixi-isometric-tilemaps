/* -------------------------------------------------------------------------- *\
 * IsoCharacterSprite.ts
 * Author: Ramiro Rojo <ramiro.rojo.cretta@gmail.com>
 * Apache 2.0 License - See LICENSE for details.
 * --------------------------------------------------------------------------
 * This file is part of the pixi-isometric-tilemaps package.
 * Displays an IsoCharacter added to a map.
\* ------------------------------------------------------------------------- */

import * as PIXI    from 'pixi.js';
import IsoCharacter from './IsoCharacter';
import IsoMap       from './IsoMap';

class AfterImage extends PIXI.Sprite {

  children             : AfterImage[];

  private _count       : number;
  private _refreshTime : number;

  previous            : PIXI.Sprite;

  private _lastX       : number;
  private _lastY       : number;

  constructor(opacity: number, count: number) {
    super();

    this.alpha        = opacity;
    this._count       = 1;
    this._refreshTime = count;

  }

  setup(previous: PIXI.Sprite) {
    this.previous    = previous;
    this._lastX      = previous.x;
    this._lastY      = previous.y;
    this.x           = 0;
    this.y           = 0;
    this.texture     = previous.texture;
    this.anchor      = previous.anchor;
    previous.addChild(this);    
  }

  update(delta: number) {
    this._count -= delta;
    while (this._count < 0) {
      this.x = this.previous.x - this._lastX;
      this.y = this._lastY - this.previous.y;
      this._count += this._refreshTime;
      this._lastX = this.previous.x;
      this._lastY = this.previous.y;
    }
    for (let child of this.children) {
      child.update(delta);
    }
  }

}

export interface HasUpdate extends PIXI.DisplayObject {
  update(delta: number): void;
}

class IsoCharacterSprite extends PIXI.Sprite {

  children             : HasUpdate[];

  private _character   : IsoCharacter;
  private _tilemap     : IsoMap;
  
  private _frameX      : number;
  private _frameY      : number;
  private _afterImages : AfterImage|null;

  z                    : number|undefined;

  

  constructor(tilemap : IsoMap, character : IsoCharacter) {
    super();
    this.texture      = new PIXI.Texture(character.texture || new PIXI.BaseTexture());
    this._tilemap     = tilemap;
    this._character   = character;
    this.z            = -1;
    this._frameX      = 0;
    this._frameY      = 0;
    this.anchor.x     = 0.5;
    this.anchor.y     = 1;
    this._afterImages = null;
    this._updateZ();
    this._updateFrame();
  }

  get tileX() {
    return Math.floor(this.x / (this._tilemap.globalAttributes as IsoMap.Attributes).tileWidth);
  }

  get tileY() {
    return Math.floor(this.y / (this._tilemap.globalAttributes as IsoMap.Attributes).tileWidth);
  }

  private _updateZ() {
    const character = this._character;
    const ga = (this._tilemap.globalAttributes as IsoMap.Attributes);
    const z = character.y + ga.tileWidth / 4 - 1; 
    if (z !== this.z) {
      this.z = z;
      this._tilemap.refreshOrder();
    }
  }

  private _updateFrame() {
    
    const { direction, frame, texture, frameWidth, scale } = this._character;
    if (!texture) {
      return;
    }
    const ga = (this._tilemap.globalAttributes as IsoMap.Attributes);
    const spriteFrame = this.texture.frame;
    const h = texture.height / 2;
    const x = frameWidth * frame;
    let   y = 0;
    let flip = 1;
    
    if (direction == IsoCharacter.Direction.LEFT) {
      y = h;
      flip = -1;
    } else if (direction === IsoCharacter.Direction.RIGHT) {
      flip = -1;
    } else if (direction === IsoCharacter.Direction.DOWN) {
      y = h;
    }

    this.scale.y = scale.y;
    this.scale.x = flip * scale.x;

    if (x !== spriteFrame.x || y !== spriteFrame.y || frameWidth !== spriteFrame.width || spriteFrame.height !== h) {
      spriteFrame.height = h;
      spriteFrame.width  = frameWidth;
      spriteFrame.x      = x;
      spriteFrame.y      = y;
      this.texture.frame = spriteFrame;
    } 

    this.position.x = this._character.x;
    this.position.y = this._character.y - this._character.h - this._character.j;

  }

  private _updateAfterImages() {
    if (this._character.afterImageRefreshed) {
      this._refreshAfterImages();
      this._character.afterImageRefreshed = false;
    }
  }

  private _refreshAfterImages() {
    if (this._afterImages) {
      this.removeChild(this._afterImages);
    }
    this._afterImages = null;
    let prev : PIXI.Sprite = this;
    for (let i = 0, count = this._character.afterImageCount; i < count; ++i) {
      let img = new AfterImage(0.5 - 0.5 * i / count, this._character.afterImageSpacing);
      img.setup(prev);
      prev = img;
      if (i === 0) {
        this._afterImages = img;
      }
    }
  }

  private _updateChildren(delta: number) {
    for (let child of this.children) {
      child.update(delta);
    }
  }

  update(delta: number) {
    this._character.update(delta);
    this._updateZ();
    this._updateFrame();
    this._updateAfterImages();
    this._updateChildren(delta);
  }

}

export default IsoCharacterSprite;