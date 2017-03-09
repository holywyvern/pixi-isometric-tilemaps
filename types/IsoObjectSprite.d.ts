import * as PIXI from 'pixi.js';
import IsoMap from './IsoMap';
import IsoObject from './IsoObject';
declare class IsoObjectSprite extends PIXI.Sprite {
    private _z;
    private _tilemap;
    private _object;
    private _tile;
    private _tileHeight;
    constructor(tilemap: IsoMap, tile: IsoMap.Instance, tileHeight: number, obj: IsoObject);
    z: number;
    private _updatePosition();
    update(delta: number): void;
}
export default IsoObjectSprite;
