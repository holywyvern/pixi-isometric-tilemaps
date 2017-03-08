import * as PIXI from 'pixi.js';
import IsoMap from './IsoMap';
declare class IsoTile extends PIXI.Container {
    private _z;
    private _tilemap;
    private _tileX;
    private _tileY;
    private _tileHeight;
    private _attributes;
    private _globalAttributes;
    private _frame;
    private _frameCount;
    private _topTexture;
    private _middleTexture;
    private _bottomTexture;
    constructor(tilemap: IsoMap, x: number, y: number, height: number, attributes: IsoTile.Attributes);
    private _setupRects();
    private _updateRect();
    private _updatePosition();
    private _buildSprites();
    private _updateFrame(delta);
    z: number;
    update(delta: number): void;
}
declare module IsoTile {
    interface Frame {
        x: number;
        y: number;
    }
    interface Attributes {
        tileset: number;
        frames: Frame[];
        frameDelay: number;
        type: string;
    }
}
export default IsoTile;
