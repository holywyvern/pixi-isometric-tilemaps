import * as PIXI from 'pixi.js';

import IsoMap    from './IsoMap';

abstract class IsoCharacter extends PIXI.Container {

    protected _x         : number;
    protected _y         : number;
    protected _height    : number;
    protected _realX     : number;
    protected _realY     : number;    
    protected _z         : number;
    private   _queue     : IsoCharacter.Action[];
    private  _tilemap    : IsoMap;
    
    frameWidth  : number;
    frameHeight : number;
    opacity     : number;
    texture     : PIXI.BaseTexture

    constructor(tilemap: IsoMap, texture: PIXI.BaseTexture, frameWidth: number, frameHeight: number) {
        super();
        this._tilemap    = tilemap;
        this.texture     = texture;
        this.frameWidth  = frameWidth;
        this.frameHeight = frameHeight;
        this._x = 0;
        this._y = 0;
        this._height = 0;
        this._queue = [];
        this.opacity   = 1;
    }

    get z() {
        return this._z;
    }

    get x() {
        return this._realX;
    }

    get y() {
        return this._realY;
    }

    get height() {
        return this._height;
    }

    moveTo(x: number, y: number) {
        this._x = x;
        this._y = y;
        this._refreshCoordinates();
    }

    setAnimation(frames: number[], speed: number, loops: number=-1) {
        this._queue.push({
            type: IsoCharacter.ActionType.ANIMATE,
            loops,
            frames,
            speed
        });
    }

    face(direction: IsoCharacter.Direction) {
        this._queue.push({ 
            type: IsoCharacter.ActionType.FACE, 
            direction, 
        });  
    }

    walk(direction: IsoCharacter.Direction, speed: number) {
        this._queue.push({ 
            type: IsoCharacter.ActionType.WALK, 
            direction, 
            speed 
        });
    }

    jump(direction: IsoCharacter.Direction, speed: number, heightDifference: number) {
        this._queue.push({
            type: IsoCharacter.ActionType.JUMP,  
            direction, 
            speed, 
            heightDifference 
        });
    }

    private _refreshCoordinates() {
        const ga = this._tilemap.globalAttributes as IsoMap.Attributes;
        this._realX = this._x * ga.tileWidth;
        this._realY = this._y * ga.tileWidth;
    }

    private _updateAnimation(delta: number) {

    }

    private get currentAction() {
        return this._queue[0];
    }

    isAnimating() {
        return this._queue.length > 0;
    }

    update(delta: number) {
        this._updateAnimation(delta);
    }

}

module IsoCharacter {

    export enum ActionType {
        WALK,
        JUMP,
        FACE,
        ANIMATE
    }

    export interface AnimationAction {
        type      : ActionType.ANIMATE;
        loops     : number;
        frames    : number[];
        speed     : number;
    }

    export interface FaceAction {
        type      : ActionType.FACE;
        direction : Direction;
    }

    export interface WalkAction {
        type      : ActionType.WALK;
        direction : Direction;
        speed     : number;
    }

    export interface JumpAction {
        type             : ActionType.JUMP;
        direction        : Direction;
        heightDifference : number;
        speed            : number;
    }

    export type Action = AnimationAction|FaceAction|WalkAction|JumpAction;

    export enum Direction {
        UP,
        DOWN,
        LEFT,
        RIGHT
    }

}

export default IsoCharacter;