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
    private _tilemap;
    frameWidth: number;
    frameHeight: number;
    opacity: number;
    texture: PIXI.BaseTexture;
    constructor(tilemap: IsoMap, texture: PIXI.BaseTexture, frameWidth: number, frameHeight: number);
    readonly z: number;
    readonly x: number;
    readonly y: number;
    readonly height: number;
    moveTo(x: number, y: number): void;
    setAnimation(frames: number[], speed: number, loops?: number, wait?: boolean): void;
    face(direction: IsoCharacter.Direction): void;
    walk(direction: IsoCharacter.Direction, speed: number): void;
    jump(direction: IsoCharacter.Direction, speed: number, heightDifference: number): void;
    private _refreshCoordinates();
    private _updateAnimation(delta);
    private readonly currentAction;
    isAnimating(): boolean;
    update(delta: number): void;
}
declare module IsoCharacter {
    enum ActionType {
        WALK = 0,
        JUMP = 1,
        FACE = 2,
        ANIMATE = 3,
    }
    interface AnimationAction {
        type: ActionType.ANIMATE;
        loops: number;
        frames: number[];
        speed: number;
        wait: boolean;
    }
    interface FaceAction {
        type: ActionType.FACE;
        direction: Direction;
    }
    interface WalkAction {
        type: ActionType.WALK;
        direction: Direction;
        speed: number;
    }
    interface JumpAction {
        type: ActionType.JUMP;
        direction: Direction;
        heightDifference: number;
        speed: number;
    }
    type Action = AnimationAction | FaceAction | WalkAction | JumpAction;
    enum Direction {
        UP = 0,
        DOWN = 1,
        LEFT = 2,
        RIGHT = 3,
    }
}
export default IsoCharacter;
