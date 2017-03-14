import * as PIXI from 'pixi.js';
import IsoMap from './IsoMap';
declare abstract class IsoCharacter extends PIXI.Container {
    private _queue;
    private _animation;
    private _executing;
    _attributes: IsoMap.Attributes;
    x: number;
    y: number;
    h: number;
    j: number;
    mapX: number;
    mapY: number;
    mapH: number;
    scale: PIXI.Point;
    direction: IsoCharacter.Direction;
    frame: number;
    frameWidth: number;
    opacity: number;
    texture: PIXI.BaseTexture | null;
    constructor(attributes: IsoMap.Attributes, frameWidth: number, texture?: PIXI.BaseTexture | null);
    height: number;
    moveTo(x: number, y: number, h?: number): this;
    animate(frames: number[], delay: number, loops?: number, wait?: boolean): this;
    face(direction: IsoCharacter.Direction): this;
    walk(direction: IsoCharacter.Direction, newHeight: number, duration: number): this;
    jump(direction: IsoCharacter.Direction, newHeight: number, jumpheight: number, duration: number): this;
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
        duration: number;
        newHeight: number;
        distance: number;
        protected _targetX: number;
        protected _targetY: number;
        protected _targetH: number;
        protected _diffX: number;
        protected _diffY: number;
        protected _diffH: number;
        protected _newMapX: number;
        protected _newMapY: number;
        protected _targetSet: boolean;
        constructor(direction: Direction, newHeight: number, duration: number, distance?: number);
        protected _setTarget(character: IsoCharacter): void;
        update(delta: number, character: IsoCharacter): void;
        protected _endWhenDone(character: IsoCharacter): void;
        isDone(): boolean;
    }
    class JumpAction extends WalkAction {
        jumpHeight: number;
        totalDuration: number;
        private _angle;
        private _angleInc;
        constructor(direction: Direction, newHeight: number, jumpHeight: number, duration: number, distance?: number);
        update(delta: number, character: IsoCharacter): void;
    }
    enum Direction {
        CENTER = 5,
        UP = 2,
        DOWN = 4,
        LEFT = 6,
        RIGHT = 8,
    }
}
export default IsoCharacter;
