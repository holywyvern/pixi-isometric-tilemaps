import * as PIXI from 'pixi.js';
import IsoTile   from './IsoTile';

interface IsoObject { 
  readonly tileset:    number;
  readonly frame:      PIXI.Rectangle;
  readonly type:       string;
}

export default IsoObject;