import * as PIXI from 'pixi.js';
import IsoMap from './IsoMap';
declare abstract class IsoCharacter extends PIXI.Container {
    protected _x: number;
    protected _y: number;
    protected _height: number;
    protected _realX: number;
    protected _realY: number;
    protected _z: number;
    private _queue;
    private _animation;
    private _executing;
    private _attributes;
    scale: PIXI.Point;
    direction: IsoCharacter.Direction;
    frame: number;
    frameWidth: number;
    opacity: number;
    texture: PIXI.BaseTexture | null;
    constructor(attributes: IsoMap.Attributes, frameWidth: number, texture?: PIXI.BaseTexture | null);
    readonly z: number;
    readonly x: number;
    readonly y: number;
    readonly mapX: number;
    readonly mapY: number;
    readonly height: number;
    moveTo(x: number, y: number): this;
    animate(frames: number[], delay: number, loops?: number, wait?: boolean): this;
    face(direction: IsoCharacter.Direction): this;
    walk(direction: IsoCharacter.Direction, speed: number): this;
    jump(direction: IsoCharacter.Direction, speed: number, heightDifference: number): void;
    private _refreshCoordinates();
    private _updateAnimation(delta);
    private _updateQueue(delta);
    isMoving(): boolean;
    isAnimating(): boolean;
    update(delta: number): void;
}
declare module IsoCharacter {
    interface Action {
        update(delta: number, character: IsoCharacter): void;
        isDone(): boolean;
    }
    class WaitAction implements Action {
        time: number;
        constructor(time: number);
        update(delta: number, character: IsoCharacter): void;
        isDone(): boolean;
    }
    class AnimationAction implements Action {
        loops: number;
        frames: number[];
        delay: number;
        private _currentFrame;
        private _frameCount;
        constructor(loops: number, frames: number[], delay: number);
        update(delta: number, character: IsoCharacter): void;
        isDone(): boolean;
    }
    class FaceAction implements Action {
        direction: Direction;
        private _done;
        constructor(direction: Direction);
        update(delta: number, character: IsoCharacter): void;
        isDone(): boolean;
    }
    class WalkAction implements Action {
        direction: Direction;
        speed: number;
        constructor(direction: Direction, speed: number);
        update(delta: number, character: IsoCharacter): void;
        isDone(): boolean;
    }
    class JumpAction implements Action {
        direction: Direction;
        heightDifference: number;
        speed: number;
        constructor(direction: Direction, speed: number, heightDifference: number);
        update(delta: number, character: IsoCharacter): void;
        isDone(): boolean;
    }
    enum Direction {
        UP = 2,
        DOWN = 4,
        LEFT = 6,
        RIGHT = 8,
    }
}
export default IsoCharacter;
