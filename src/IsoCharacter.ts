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
    private _animation   : IsoCharacter.AnimationAction|null;
    private _executing   : boolean;
    private _attributes  : IsoMap.Attributes;

    frameWidth  : number;
    frameHeight : number;
    opacity     : number;
    texture     : PIXI.BaseTexture

    constructor(attributes: IsoMap.Attributes, texture: PIXI.BaseTexture, frameWidth: number, frameHeight: number) {
        super();
        this._attributes  = attributes;
        this.texture     = texture;
        this.frameWidth  = frameWidth;
        this.frameHeight = frameHeight;
        this._x = 0;
        this._y = 0;
        this._height = 0;
        this._queue = [];
        this.opacity   = 1;
        this._animation = null;
        this._executing  = false;
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

    animate(frames: number[], delay: number, loops: number=-1, wait = false) {
        const animation = new IsoCharacter.AnimationAction(
            loops,
            frames,
            delay
        );
        if (loops >= 0 && wait) {
            this._animation = null;
            this._queue.push(animation);
        } else {
            this._animation = animation;
        }
    }

    setFrame(index: number) {

    }

    face(direction: IsoCharacter.Direction) {
        this._queue.push(new IsoCharacter.FaceAction(  
            direction, 
        ));  
    }

    walk(direction: IsoCharacter.Direction, speed: number) {
        this._queue.push(new IsoCharacter.WalkAction(
            direction, 
            speed 
        ));
    }

    jump(direction: IsoCharacter.Direction, speed: number, heightDifference: number) {
        this._queue.push(new IsoCharacter.JumpAction(  
            direction, 
            speed, 
            heightDifference 
        ));
    }

    private _refreshCoordinates() {
        this._realX = this._x * this._attributes.tileWidth;
        this._realY = this._y * this._attributes.tileWidth;
    }

    private _updateAnimation(delta: number) {
        if (this._animation) {
            this._animation.update(delta, this);
        }
    }

    private _updateQueue(delta: number) {
        const action = this._queue[0];
        if (action) {
            action.update(delta, this);
            if (action.isDone()) {
                this._queue.shift();
            }
        }
    }      

    isMoving() {
        return false;
    }

    isAnimating() {
        return this.isMoving() || this._queue.length > 0;
    }

    update(delta: number) {
        this._updateQueue(delta);
        this._updateAnimation(delta);
    }

}

module IsoCharacter {


    export interface Action {
        update(delta: number, character: IsoCharacter): void;
        isDone(): boolean;
    }

    export class WaitAction implements Action {

        time : number;

        constructor(time: number) {
            this.time = time;
        }

        update(delta: number, character: IsoCharacter) {
            this.time -= delta;
        }

        isDone() {
            return this.time <= 0;
        }

    }

    export class AnimationAction implements Action {
        loops     : number;
        frames    : number[];
        delay     : number;

        private _currentFrame : number;
        private _frameCount   : number;

        constructor(loops: number, frames: number[], delay: number) {
            this.loops  = loops;
            this.frames = frames;
            this.delay  = delay;
            this._currentFrame = 0;
            this._frameCount   = 0;
        }

        update(delta: number, character: IsoCharacter) {
            if (!this.isDone()) {
                this._frameCount += delta;
                if (this._frameCount > this.delay) {
                    while (this._frameCount > this.delay) {
                        this._frameCount -= this.delay;
                        this._currentFrame = (this._currentFrame + 1) % this.frames.length;
                    }
                    character.setFrame(this.frames[this._currentFrame]);
                }
            }
        }        

        isDone() {
            return this.loops === 0;
        }

    }

    export class FaceAction implements Action {
        direction : Direction;

        private _done : boolean;

        constructor(direction : Direction) {
            this.direction = direction;
        }

        update(delta: number, character: IsoCharacter) {
            character.face(this.direction);
            this._done = true;
        }

        isDone() {
            return this._done;
        }

    }

    export class WalkAction implements Action {
        direction : Direction;
        speed     : number;

        constructor(direction: Direction, speed: number) {
            this.direction = direction;
            this.speed     = speed;
        }

        update(delta: number, character: IsoCharacter) {
            
        }

        isDone() {
            return false;
        }

    }

    export class JumpAction implements Action {
        direction        : Direction;
        heightDifference : number;
        speed            : number;

        constructor(direction: Direction, speed: number, heightDifference: number) {
            this.direction        = direction;
            this.speed            = speed;
            this.heightDifference = heightDifference;
        }

        update(delta: number, character: IsoCharacter) {
            
        }

        isDone() {
            return false;
        }

    }


    export enum Direction {
        UP    = 2,
        DOWN  = 4,
        LEFT  = 6,
        RIGHT = 8
    }

}

export default IsoCharacter;