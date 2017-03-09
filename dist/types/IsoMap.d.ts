import * as PIXI from 'pixi.js';
import IsoTile from './IsoTile';
import IsoObject from './IsoObject';
import IsoCharacter from './IsoCharacter';
declare class IsoMap extends PIXI.Container {
    children: IsoMap.IsoObject[];
    camera: PIXI.Point;
    private _options;
    private _tiles;
    private _textures;
    private _mapWidth;
    private _mapHeight;
    private _mapData;
    private _objects;
    private _objectDescriptors;
    private _characters;
    private _orderChanged;
    constructor();
    setGeneralAttributes(attributes: IsoMap.Attributes): void;
    setTileAttributes(attributes: IsoTile.Attributes[]): void;
    setTextures(textures: PIXI.BaseTexture[]): void;
    setObjects(objects: IsoMap.Instance[]): void;
    setObjectDescriptors(objects: IsoObject[]): void;
    setCharacters(characters: IsoCharacter[]): void;
    readonly textures: PIXI.BaseTexture[];
    setData(width: number, height: number, data: number[][]): void;
    clean(): void;
    build(): void;
    tileAt(x: number, y: number): number[];
    readonly globalAttributes: IsoMap.Attributes | null;
    refreshOrder(): void;
    update(delta: number): void;
}
declare module IsoMap {
    interface IsoObject extends PIXI.DisplayObject {
        z: number;
        update(delta: number): void;
    }
    interface Instance {
        x: number;
        y: number;
        id: number;
    }
    interface Attributes {
        tileWidth: number;
        heightSize: number;
    }
}
export default IsoMap;
