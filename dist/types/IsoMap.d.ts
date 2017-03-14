import * as PIXI from 'pixi.js';
import IsoTile from './IsoTile';
import IsoObject from './IsoObject';
import IsoCharacter from './IsoCharacter';
declare class IsoMap extends PIXI.Container {
    children: IsoMap.IsoObject[];
    options: null | IsoMap.Attributes;
    tiles: null | IsoTile.Attributes[];
    textures: null | PIXI.BaseTexture[];
    mapWidth: null | number;
    mapHeight: null | number;
    mapData: null | number[];
    heightData: null | number[];
    objects: IsoMap.Instance[];
    objectDescriptors: null | IsoObject[];
    characters: IsoCharacter[];
    private _orderChanged;
    constructor();
    readonly camera: PIXI.Point;
    clean(): void;
    build(): void;
    heightAt(x: number, y: number): number;
    tileAt(x: number, y: number): number;
    private _valueAt(array, x, y);
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
