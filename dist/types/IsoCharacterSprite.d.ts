import * as PIXI from 'pixi.js';
import IsoCharacter from './IsoCharacter';
import IsoMap from './IsoMap';
export interface HasUpdate extends PIXI.DisplayObject {
    update(delta: number): void;
}
declare class IsoCharacterSprite extends PIXI.Sprite {
    children: HasUpdate[];
    private _character;
    private _tilemap;
    private _frameX;
    private _frameY;
    private _afterImages;
    z: number | undefined;
    constructor(tilemap: IsoMap, character: IsoCharacter);
    readonly tileX: number;
    readonly tileY: number;
    private _updateZ();
    private _updateFrame();
    private _updateAfterImages();
    private _refreshAfterImages();
    private _updateChildren(delta);
    update(delta: number): void;
}
export default IsoCharacterSprite;
