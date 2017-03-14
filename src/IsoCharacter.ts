/* -------------------------------------------------------------------------- *\
 * IsoCharacter.ts
 * Author: Ramiro Rojo <ramiro.rojo.cretta@gmail.com>
 * Apache 2.0 License - See LICENSE for details.
 * --------------------------------------------------------------------------
 * This file is part of the pixi-isometric-tilemaps package.
 * Handles a character on a map. The difference with them and objects are than.
 * Objects are not animated, and are part of the tileset.
 * Characters can have animations and can be in the middle of a tile.
\* ------------------------------------------------------------------------- */

import * as PIXI from 'pixi.js';

import IsoMap    from './IsoMap';

abstract class IsoCharacter extends PIXI.Container {
 
    private   _queue     : IsoCharacter.Action[];
    private _animation   : IsoCharacter.AnimationAction|null;
    private _executing   : boolean;

    _attributes          : IsoMap.Attributes;

    x                    : number;
    y                    : number;
    h                    : number;
    j                    : number;

    mapX                 : number;
    mapY                 : number;
    mapH                 : number;

    scale                : PIXI.Point;
    direction            : IsoCharacter.Direction;
    frame                : number;
    frameWidth           : number;
    opacity              : number;
    texture              : PIXI.BaseTexture|null;
    afterImageRefreshed  : boolean;
    afterImageSpacing    : number;
    afterImageCount      : number;

    constructor(attributes: IsoMap.Attributes, frameWidth: number, texture: PIXI.BaseTexture|null=null) {
        super();
        this._attributes  = attributes;
        this.texture     = texture;
        this.frameWidth  = frameWidth;
        this.frame       = 0;
        this.direction   = IsoCharacter.Direction.UP;
        this.mapX  = 0;
        this.mapY  = 0;
        this.mapH  = 0;
        this._queue = [];
        this.opacity   = 1;
        this._animation = null;
        this._executing  = false;
        this.scale = new PIXI.Point(1, 1);
        this.afterImageCount     = 0;
        this.afterImageSpacing   = 0;
    }


    get height() {
        return this.h;
    }

    set height(value) {
        this.h = value;
    }

    moveTo(x: number, y: number, h: number=0) {
        this.mapX = x;
        this.mapY = y;
        this.mapH = h;
        this.j    = 0;
        this._refreshCoordinates();
        return this;
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
        return this;
    }

    face(direction: IsoCharacter.Direction) {
        this._queue.push(new IsoCharacter.FaceAction(  
            direction, 
        ));  
        return this;
    }

    walk(direction: IsoCharacter.Direction, newHeight: number, duration: number) {
        this._queue.push(new IsoCharacter.WalkAction(
            direction, 
            newHeight,
            duration,
        ));
        return this;
    }

    jump(direction: IsoCharacter.Direction, newHeight: number, jumpheight: number, duration: number) {
        this._queue.push(new IsoCharacter.JumpAction(  
            direction, 
            newHeight,
            jumpheight,
            duration, 
        ));
        return this;
    }

    startAfterImages(count: number, spacing: number) {
        this._queue.push(new IsoCharacter.StartAfterImageAction(
            count, spacing
        ));  
        return this.wait(1);
    }

    endAfterImages() {
         this._queue.push(new IsoCharacter.EndAfterImageAction());  
         return this.wait(1);
    }

    wait(time: number) {
        this._queue.push(new IsoCharacter.WaitAction(time));
        return this;
    }

    private _refreshCoordinates() {
        this.x = (this.mapX - this.mapY) * this._attributes.tileWidth / 2;
        this.y = (this.mapX + this.mapY) * this._attributes.tileWidth / 4;      
        this.h = (this.mapH) * this._attributes.heightSize;
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

    export interface AfterImage {
        distance: number;
        opacity:  number;
    }

    export class StartAfterImageAction implements Action {

        count   : number;
        spacing : number;

        private _isDone : boolean;

        private _images: AfterImage[];

        constructor(count: number, spacing: number) {
            this._images = [];
            this.count = count;
            this.spacing = spacing;

        }

        update(delta: number, character: IsoCharacter) {
            character.afterImageCount     = this.count;
            character.afterImageSpacing   = this.spacing;
            character.afterImageRefreshed = true;
            this._isDone = true;
        }

        isDone() {
            return this._isDone;
        }
    }

    export class EndAfterImageAction implements Action {

        private _isDone : boolean;

        constructor() {
            this._isDone = false;
        }

        update(delta: number, character: IsoCharacter) {
            character.afterImageCount = 0;
            character.afterImageRefreshed = true;
            this._isDone = true;
        }

        isDone() {
            return this._isDone;
        }
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
                    character.frame = this.frames[this._currentFrame];
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
            character.direction = this.direction;
            this._done = true;
        }

        isDone() {
            return this._done;
        }

    }

    export class WalkAction implements Action {
        direction : Direction;
        duration  : number;
        newHeight : number;
        distance  : number;

        protected _targetX   : number;
        protected _targetY   : number;
        protected _targetH   : number;
        protected _diffX     : number;
        protected _diffY     : number;
        protected _diffH     : number;        
        protected _newMapX   : number;
        protected _newMapY   : number;
        protected _targetSet : boolean;

        constructor(direction: Direction, newHeight: number, duration: number, distance= 1) {
            this.direction = direction;
            this.duration  = duration;
            this.distance  = distance;
            this.newHeight = newHeight;
            this._targetSet = false;
        }

        protected _setTarget(character : IsoCharacter) {
            let x = 0, y = 0;
            switch (this.direction) {
                case Direction.UP:
                    x = character.mapX - this.distance;
                    y = character.mapY;
                    break;
                case Direction.DOWN:
                    x = character.mapX + this.distance;
                    y = character.mapY;               
                    break;
                case Direction.LEFT:
                    x = character.mapX;
                    y = character.mapY + this.distance;                
                    break;
                case Direction.RIGHT:
                    x = character.mapX;
                    y = character.mapY - this.distance;                  
                    break;
                default:
                    x = character.mapX;
                    y = character.mapY;                  
                    break;
            }
            this._newMapX = x;
            this._newMapY = y;
            this._targetX = (x - y) * character._attributes.tileWidth / 2;
            this._targetY = (x + y) * character._attributes.tileWidth / 4;  
            this._targetH = this.newHeight * character._attributes.heightSize;
            this._diffX   = (this._targetX - character.x) / this.duration; 
            this._diffY   = (this._targetY - character.y) / this.duration; 
            this._diffH   = (this._targetH - character.h) / this.duration; 
            this._targetSet = true;
        }

        update(delta: number, character: IsoCharacter) {
            if (!this._targetSet) {
                this._setTarget(character);
            }
            if (this.duration > 0) {
                character.x += this._diffX * delta;
                character.y += this._diffY * delta;
                character.h += this._diffH * delta;
                this.duration -= delta;
                this._endWhenDone(character);
            }
        }

        protected _endWhenDone(character: IsoCharacter) {
            if (this.isDone()) {
                character.x    = this._targetX;
                character.y    = this._targetY;
                character.h    = this._targetH;
                character.j    = 0;  
                character.mapX = this._newMapX;
                character.mapY = this._newMapY;
            }
        }

        isDone() {
            return this.duration <= 0;
        }

    }

    export class JumpAction extends WalkAction {

        jumpHeight    : number;
        totalDuration : number;

        private _angle    : number;
        private _angleInc : number;

        constructor(direction: Direction, newHeight: number, jumpHeight: number, duration: number, distance = 1) {
            super(direction, newHeight, duration, distance);
            this.totalDuration = duration;
            this.jumpHeight    = jumpHeight;
            this._angle        = 0;
            this._angleInc     = Math.PI / (duration - 1);
        }

        update(delta: number, character: IsoCharacter) {
            if (!this._targetSet) {
                this._setTarget(character);
            }            
            if (this.duration) {
                character.x += this._diffX * delta;
                character.y += this._diffY * delta;
                character.h += this._diffH * delta; 
                character.j  = Math.sin(this._angle) * this.jumpHeight;
                this.duration -= delta;
                this._angle += this._angleInc * delta;
                this._endWhenDone(character);            
            }
        }

    }


    export enum Direction {
        CENTER = 5,
        UP     = 2,
        DOWN   = 4,
        LEFT   = 6,
        RIGHT  = 8
    }

}

export default IsoCharacter;