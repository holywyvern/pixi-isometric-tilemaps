import * as PIXI from 'pixi.js';
import IsoCharacter from './IsoCharacter';
import IsoMap from './IsoMap';
declare class IsoCharacterSprite extends PIXI.Sprite {
    private _character;
    private _tilemap;
    z: number | undefined;
    constructor(tilemap: IsoMap, character: IsoCharacter);
    readonly tileX: number;
    readonly tileY: number;
    private _refreshZ();
    update(delta: number): void;
}
export default IsoCharacterSprite;
