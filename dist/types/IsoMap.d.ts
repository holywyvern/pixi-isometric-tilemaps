import * as PIXI from 'pixi.js';
import IsoTile from './IsoTile';
declare class IsoMap extends PIXI.Container {
    children: IsoMap.IsoObject[];
    camera: PIXI.Point;
    private _options;
    private _tiles;
    private _textures;
    private _mapWidth;
    private _mapHeight;
    private _mapData;
    private _orderChanged;
    constructor();
    setGeneralAttributes(attributes: IsoMap.Attributes): void;
    setTileAttributes(attributes: IsoTile.Attributes[]): void;
    setTextures(textures: PIXI.BaseTexture[]): void;
    readonly textures: PIXI.BaseTexture[];
    setData(width: number, height: number, data: number[][]): void;
    clean(): void;
    build(): "IsoMap's options can't be null." | "IsoMap's tiles can't be null." | "IsoMap's textures can't be null." | "IsoMap's mapData can't be null." | "IsoMap's mapWidth can't be null." | "IsoMap's mapHeight can't be null." | undefined;
    readonly globalAttributes: IsoMap.Attributes | null;
    refreshOrder(): void;
    update(delta: number): void;
}
declare module IsoMap {
    interface IsoObject extends PIXI.DisplayObject {
        z: number;
        update(delta: number): void;
    }
    interface Attributes {
        tileWidth: number;
        heightSize: number;
    }
}
export default IsoMap;
