import * as PIXI    from 'pixi.js';
import IsoCharacter from './IsoCharacter';
import IsoMap       from './IsoMap';

class IsoCharacterSprite extends PIXI.Sprite {

  private _character : IsoCharacter;
  private _tilemap   : IsoMap;
  
  private _frameX    : number;
  private _frameY    : number;

  z                  : number|undefined;

  constructor(tilemap : IsoMap, character : IsoCharacter) {
    super();
    this.texture    = new PIXI.Texture(character.texture);
    this._tilemap   = tilemap;
    this._character = character;
    this.z          = undefined;
    this._frameX    = 0;
    this._frameY    = 0;
    this.anchor.x   = 0.5;
    this.anchor.y   = 1;
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
    const ga = (this._tilemap.globalAttributes as IsoMap.Attributes);
    const z = (this.tileX + this.tileY) * ga.tileWidth / 2 + ga.tileWidth;
    if (z !== this.z) {
      this.z = z;
      this._tilemap.refreshOrder();
    }
  }

  private _updateFrame() {
    const { direction, frame, texture, frameWidth, scale } = this._character;
    const spriteFrame = this.texture.frame;
    const h = texture.height / 2;
    const x = frameWidth * frame;
    let   y = 0;
    
    
    if (direction == IsoCharacter.Direction.LEFT || direction == IsoCharacter.Direction.RIGHT) {
      const flip = (direction == IsoCharacter.Direction.LEFT || direction == IsoCharacter.Direction.RIGHT) ? -1 : 1;
      this.scale.x = flip * scale.x;
      this.scale.y = scale.y;
      y = h;
    } 
    
    if (x !== spriteFrame.x || y !== spriteFrame.y || frameWidth !== spriteFrame.width || spriteFrame.height !== h) {
      spriteFrame.height = h;
      spriteFrame.width  = frameWidth;
      spriteFrame.x      = x;
      spriteFrame.y      = y;
      this.texture.frame = spriteFrame;
    }

  }

  update(delta: number) {
    this._character.update(delta);
    this._updateZ();
    this._updateFrame();
  }

}

export default IsoCharacterSprite;