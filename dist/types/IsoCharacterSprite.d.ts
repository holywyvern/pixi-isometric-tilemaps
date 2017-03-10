import * as PIXI from 'pixi.js';
import IsoCharacter from './IsoCharacter';
import IsoMap from './IsoMap';
declare class IsoCharacterSprite extends PIXI.Sprite {
    private _character;
    private _tilemap;
    private _frameX;
    private _frameY;
    z: number | undefined;
    constructor(tilemap: IsoMap, character: IsoCharacter);
    readonly tileX: number;
    readonly tileY: number;
    private _updateZ();
    private _updateFrame();
    update(delta: number): void;
}
export default IsoCharacterSprite;
