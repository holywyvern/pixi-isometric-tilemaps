module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("pixi.js");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(0);
var IsoCharacter = (function (_super) {
    __extends(IsoCharacter, _super);
    function IsoCharacter(attributes, frameWidth, texture) {
        if (texture === void 0) { texture = null; }
        var _this = _super.call(this) || this;
        _this._attributes = attributes;
        _this.texture = texture;
        _this.frameWidth = frameWidth;
        _this.frame = 0;
        _this.direction = IsoCharacter.Direction.UP;
        _this.mapX = 0;
        _this.mapY = 0;
        _this.mapH = 0;
        _this._queue = [];
        _this.opacity = 1;
        _this._animation = null;
        _this._executing = false;
        _this.scale = new PIXI.Point(1, 1);
        return _this;
    }
    Object.defineProperty(IsoCharacter.prototype, "height", {
        get: function () {
            return this.h;
        },
        set: function (value) {
            this.h = value;
        },
        enumerable: true,
        configurable: true
    });
    IsoCharacter.prototype.moveTo = function (x, y, h) {
        if (h === void 0) { h = 0; }
        this.mapX = x;
        this.mapY = y;
        this.mapH = h;
        this._refreshCoordinates();
        return this;
    };
    IsoCharacter.prototype.animate = function (frames, delay, loops, wait) {
        if (loops === void 0) { loops = -1; }
        if (wait === void 0) { wait = false; }
        var animation = new IsoCharacter.AnimationAction(loops, frames, delay);
        if (loops >= 0 && wait) {
            this._animation = null;
            this._queue.push(animation);
        }
        else {
            this._animation = animation;
        }
        return this;
    };
    IsoCharacter.prototype.face = function (direction) {
        this._queue.push(new IsoCharacter.FaceAction(direction));
        return this;
    };
    IsoCharacter.prototype.walk = function (direction, newHeight, duration) {
        this._queue.push(new IsoCharacter.WalkAction(direction, newHeight, duration));
        return this;
    };
    IsoCharacter.prototype.jump = function (direction, newHeight, jumpheight, duration) {
        this._queue.push(new IsoCharacter.JumpAction(direction, newHeight, jumpheight, duration));
    };
    IsoCharacter.prototype._refreshCoordinates = function () {
        this.x = (this.mapX - this.mapY) * this._attributes.tileWidth / 2;
        this.y = (this.mapX + this.mapY) * this._attributes.tileWidth / 4;
        this.h = (this.mapH) * this._attributes.heightSize;
    };
    IsoCharacter.prototype._updateAnimation = function (delta) {
        if (this._animation) {
            this._animation.update(delta, this);
        }
    };
    IsoCharacter.prototype._updateQueue = function (delta) {
        var action = this._queue[0];
        if (action) {
            action.update(delta, this);
            if (action.isDone()) {
                this._queue.shift();
            }
        }
    };
    IsoCharacter.prototype.isMoving = function () {
        return false;
    };
    IsoCharacter.prototype.isAnimating = function () {
        return this.isMoving() || this._queue.length > 0;
    };
    IsoCharacter.prototype.update = function (delta) {
        this._updateQueue(delta);
        this._updateAnimation(delta);
    };
    return IsoCharacter;
}(PIXI.Container));
(function (IsoCharacter) {
    var WaitAction = (function () {
        function WaitAction(time) {
            this.time = time;
        }
        WaitAction.prototype.update = function (delta, character) {
            this.time -= delta;
        };
        WaitAction.prototype.isDone = function () {
            return this.time <= 0;
        };
        return WaitAction;
    }());
    IsoCharacter.WaitAction = WaitAction;
    var AnimationAction = (function () {
        function AnimationAction(loops, frames, delay) {
            this.loops = loops;
            this.frames = frames;
            this.delay = delay;
            this._currentFrame = 0;
            this._frameCount = 0;
        }
        AnimationAction.prototype.update = function (delta, character) {
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
        };
        AnimationAction.prototype.isDone = function () {
            return this.loops === 0;
        };
        return AnimationAction;
    }());
    IsoCharacter.AnimationAction = AnimationAction;
    var FaceAction = (function () {
        function FaceAction(direction) {
            this.direction = direction;
        }
        FaceAction.prototype.update = function (delta, character) {
            character.direction = this.direction;
            this._done = true;
        };
        FaceAction.prototype.isDone = function () {
            return this._done;
        };
        return FaceAction;
    }());
    IsoCharacter.FaceAction = FaceAction;
    var WalkAction = (function () {
        function WalkAction(direction, newHeight, duration) {
            this.direction = direction;
            this.duration = duration;
            this.newHeight = newHeight;
            this._targetSet = false;
        }
        WalkAction.prototype._setTarget = function (character) {
            var x = 0, y = 0;
            switch (this.direction) {
                case Direction.UP:
                    x = character.mapX - 1;
                    y = character.mapY;
                    break;
                case Direction.DOWN:
                    x = character.mapX + 1;
                    y = character.mapY;
                    break;
                case Direction.LEFT:
                    x = character.mapX;
                    y = character.mapY + 1;
                    break;
                case Direction.RIGHT:
                    x = character.mapX;
                    y = character.mapY - 1;
                    break;
                default:
                    break;
            }
            this._newMapX = x;
            this._newMapY = y;
            this._targetX = (x - y) * character._attributes.tileWidth / 2;
            this._targetY = (x + y) * character._attributes.tileWidth / 4;
            this._targetH = this.newHeight * character._attributes.heightSize;
            this._diffX = (this._targetX - character.x) / this.duration;
            this._diffY = (this._targetY - character.y) / this.duration;
            this._diffH = (this._targetH - character.h) / this.duration;
            this._targetSet = true;
        };
        WalkAction.prototype.update = function (delta, character) {
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
        };
        WalkAction.prototype._endWhenDone = function (character) {
            if (this.isDone()) {
                character.x = this._targetX;
                character.y = this._targetY;
                character.h = this._targetH;
                character.mapX = this._newMapX;
                character.mapY = this._newMapY;
            }
        };
        WalkAction.prototype.isDone = function () {
            return this.duration <= 0;
        };
        return WalkAction;
    }());
    IsoCharacter.WalkAction = WalkAction;
    var JumpAction = (function (_super) {
        __extends(JumpAction, _super);
        function JumpAction(direction, newHeight, jumpheight, duration) {
            var _this = _super.call(this, direction, newHeight, duration) || this;
            _this.jumpheight = jumpheight;
            return _this;
        }
        JumpAction.prototype._updateLowerJump = function (delta, character) {
        };
        JumpAction.prototype._updateUpperJump = function (delta, character) {
        };
        JumpAction.prototype.update = function (delta, character) {
            if (!this._targetSet) {
                this._setTarget(character);
            }
            if (this.duration) {
                if (this._diffH < 0) {
                    this._updateLowerJump(delta, character);
                }
                else {
                    this._updateUpperJump(delta, character);
                }
                this.duration -= delta;
                this._endWhenDone(character);
            }
        };
        JumpAction.prototype.isDone = function () {
            return false;
        };
        return JumpAction;
    }(WalkAction));
    IsoCharacter.JumpAction = JumpAction;
    var Direction;
    (function (Direction) {
        Direction[Direction["CENTER"] = 5] = "CENTER";
        Direction[Direction["UP"] = 2] = "UP";
        Direction[Direction["DOWN"] = 4] = "DOWN";
        Direction[Direction["LEFT"] = 6] = "LEFT";
        Direction[Direction["RIGHT"] = 8] = "RIGHT";
    })(Direction = IsoCharacter.Direction || (IsoCharacter.Direction = {}));
})(IsoCharacter || (IsoCharacter = {}));
exports.default = IsoCharacter;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(0);
var EMPTY_TEXTURE = new PIXI.BaseTexture();
var IsoTile = (function (_super) {
    __extends(IsoTile, _super);
    function IsoTile(tilemap, x, y, height, attributes) {
        var _this = _super.call(this) || this;
        _this._tilemap = tilemap;
        var ga = tilemap.globalAttributes;
        _this._globalAttributes = ga;
        _this._tileX = x;
        _this._tileY = y;
        _this._tileHeight = height;
        _this._attributes = attributes;
        _this.z = (_this._tileX + _this._tileY) * _this._globalAttributes.tileWidth / 4;
        _this._frame = 0;
        _this._frameCount = 0;
        _this._setupRects();
        _this._updatePosition();
        _this._buildSprites();
        _this._updateRect();
        return _this;
    }
    IsoTile.prototype._setupRects = function () {
        var ga = this._globalAttributes;
        var texture = this._tilemap.textures ? this._tilemap.textures[this._attributes.tileset] : EMPTY_TEXTURE;
        var topRect = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.tileWidth / 2);
        var topLeftWallRect = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
        var middleLeftRect = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
        var bottomLeftRect = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
        var topRightWallRect = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
        var middleRightRect = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
        var bottomRightRect = new PIXI.Rectangle(0, 0, ga.tileWidth / 2, ga.heightSize);
        this._topTexture = new PIXI.Texture(texture, topRect);
        this._topLeftWallTexture = new PIXI.Texture(texture, topLeftWallRect);
        this._middleLeftTexture = new PIXI.Texture(texture, middleLeftRect);
        this._bottomLeftTexture = new PIXI.Texture(texture, bottomLeftRect);
        this._topRightWallTexture = new PIXI.Texture(texture, topRightWallRect);
        this._middleRightTexture = new PIXI.Texture(texture, middleRightRect);
        this._bottomRightTexture = new PIXI.Texture(texture, bottomRightRect);
    };
    IsoTile.prototype._updateRect = function () {
        var frame = this._attributes.frames[this._frame];
        var ga = this._globalAttributes;
        this._topTexture.frame.x = frame.x;
        this._topTexture.frame.y = frame.y;
        this._topTexture.frame = this._topTexture.frame;
        this._topLeftWallTexture.frame.x = frame.x;
        this._topLeftWallTexture.frame.y = frame.y + ga.tileWidth / 2;
        this._topLeftWallTexture.frame = this._topLeftWallTexture.frame;
        this._middleLeftTexture.frame.x = frame.x;
        this._middleLeftTexture.frame.y = frame.y + ga.tileWidth / 2 + ga.heightSize;
        this._middleLeftTexture.frame = this._middleLeftTexture.frame;
        this._bottomLeftTexture.frame.x = frame.x;
        this._bottomLeftTexture.frame.y = frame.y + ga.tileWidth / 2 + ga.heightSize * 2;
        this._bottomLeftTexture.frame = this._bottomLeftTexture.frame;
        this._topRightWallTexture.frame.x = frame.x + ga.tileWidth / 2;
        this._topRightWallTexture.frame.y = frame.y + ga.tileWidth / 2;
        this._topRightWallTexture.frame = this._topRightWallTexture.frame;
        this._middleRightTexture.frame.x = frame.x + ga.tileWidth / 2;
        this._middleRightTexture.frame.y = frame.y + ga.tileWidth / 2 + ga.heightSize;
        this._middleRightTexture.frame = this._middleRightTexture.frame;
        this._bottomRightTexture.frame.x = frame.x + ga.tileWidth / 2;
        this._bottomRightTexture.frame.y = frame.y + ga.tileWidth / 2 + ga.heightSize * 2;
        this._bottomRightTexture.frame = this._bottomRightTexture.frame;
    };
    IsoTile.prototype._updatePosition = function () {
        var ga = this._globalAttributes;
        this.x = (this._tileX - this._tileY) * ga.tileWidth / 2;
        this.y = (this._tileX + this._tileY) * ga.tileWidth / 4;
    };
    IsoTile.prototype._buildBottomSprite = function (maxHeight) {
        var ga = this._globalAttributes;
        if (maxHeight[0] > 0) {
            var bottom = new PIXI.Sprite(this._bottomLeftTexture);
            bottom.y = -((this._tileHeight - maxHeight[0] + 1) * ga.heightSize);
            bottom.x = -ga.tileWidth / 2;
            this.addChild(bottom);
        }
        if (maxHeight[1] > 0) {
            var bottom = new PIXI.Sprite(this._bottomRightTexture);
            bottom.y = -((this._tileHeight - maxHeight[1] + 1) * ga.heightSize);
            bottom.x = 0;
            this.addChild(bottom);
        }
    };
    IsoTile.prototype._buildMiddleSprites = function (maxHeight) {
        var ga = this._globalAttributes;
        for (var i = 0; i < maxHeight[0]; ++i) {
            var middle = new PIXI.Sprite(this._middleLeftTexture);
            middle.y = -((this._tileHeight - i) * ga.heightSize);
            middle.x = -ga.tileWidth / 2;
            this.addChild(middle);
        }
        for (var i = 0; i < maxHeight[1]; ++i) {
            var middle = new PIXI.Sprite(this._middleRightTexture);
            middle.y = -((this._tileHeight - i) * ga.heightSize);
            middle.x = 0;
            this.addChild(middle);
        }
    };
    IsoTile.prototype._buildTopSprite = function (maxHeight) {
        var ga = this._globalAttributes;
        if (maxHeight[0] > 0) {
            var wallTop = new PIXI.Sprite(this._topLeftWallTexture);
            wallTop.y = -(ga.tileWidth / 2 + ga.heightSize * (this._tileHeight - 1));
            wallTop.x = -ga.tileWidth / 2;
            this.addChild(wallTop);
        }
        if (maxHeight[1] > 0) {
            var wallTop = new PIXI.Sprite(this._topRightWallTexture);
            wallTop.y = -(ga.tileWidth / 2 + ga.heightSize * (this._tileHeight - 1));
            wallTop.x = 0;
            this.addChild(wallTop);
        }
        var top = new PIXI.Sprite(this._topTexture);
        top.y = -(ga.tileWidth / 2 + ga.heightSize * this._tileHeight);
        top.anchor.x = 0.5;
        this.addChild(top);
    };
    IsoTile.prototype._calculateMaxHeight = function () {
        var right = this._tileHeight - this._tilemap.tileAt(this._tileX + 1, this._tileY)[1];
        var bottom = this._tileHeight - this._tilemap.tileAt(this._tileX, this._tileY + 1)[1];
        return [bottom, right];
    };
    IsoTile.prototype._buildSprites = function () {
        var maxHeight = this._calculateMaxHeight();
        this.removeChildren();
        this._buildBottomSprite(maxHeight);
        this._buildMiddleSprites(maxHeight.map(function (i) { return i - 1; }));
        this._buildTopSprite(maxHeight);
    };
    IsoTile.prototype._updateFrame = function (delta) {
        var length = this._attributes.frames.length;
        if (length > 1) {
            this._frameCount += delta;
            if (this._frameCount >= this._attributes.frameDelay) {
                while (this._frameCount >= this._attributes.frameDelay) {
                    this._frameCount -= this._attributes.frameDelay;
                    this._frame = (this._frame + 1) % length;
                }
                this._updateRect();
            }
        }
    };
    Object.defineProperty(IsoTile.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this._z = value;
            this._tilemap.refreshOrder();
        },
        enumerable: true,
        configurable: true
    });
    IsoTile.prototype.update = function (delta) {
        this._updatePosition();
        this._updateFrame(delta);
    };
    return IsoTile;
}(PIXI.Container));
exports.default = IsoTile;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(0);
var IsoTile_1 = __webpack_require__(2);
var IsoObjectSprite_1 = __webpack_require__(5);
var IsoCharacterSprite_1 = __webpack_require__(4);
var IsoMap = (function (_super) {
    __extends(IsoMap, _super);
    function IsoMap() {
        var _this = _super.call(this) || this;
        _this.clean();
        return _this;
    }
    Object.defineProperty(IsoMap.prototype, "camera", {
        get: function () {
            return this.position;
        },
        enumerable: true,
        configurable: true
    });
    IsoMap.prototype.clean = function () {
        this.removeChildren();
        this._orderChanged = false;
        this.objects = [];
        this.characters = [];
        this.objectDescriptors = null;
        this.options = null;
        this.tiles = null;
        this.textures = null;
        this.mapData = null;
        this.mapWidth = null;
        this.mapHeight = null;
    };
    IsoMap.prototype.build = function () {
        this.removeChildren();
        if (this.options === null) {
            throw "IsoMap's options can't be null.";
        }
        if (this.tiles === null) {
            throw "IsoMap's tiles can't be null.";
        }
        if (this.textures === null) {
            throw "IsoMap's textures can't be null.";
        }
        if (this.mapData === null) {
            throw "IsoMap's mapData can't be null.";
        }
        if (this.mapWidth === null) {
            throw "IsoMap's mapWidth can't be null.";
        }
        if (this.mapHeight === null) {
            throw "IsoMap's mapHeight can't be null.";
        }
        if (this.objectDescriptors === null) {
            throw "IsoMap's object descriptors can't be null.";
        }
        var size = this.mapWidth * this.mapHeight;
        for (var y = 0; y < this.mapHeight; ++y) {
            for (var x = 0; x < this.mapWidth; ++x) {
                var data = this.mapData[x + y * this.mapWidth];
                var tileID = data[0];
                if (tileID >= 0) {
                    this.addChild(new IsoTile_1.default(this, x, y, data[1], this.tiles[tileID]));
                }
            }
        }
        for (var _i = 0, _a = this.objects; _i < _a.length; _i++) {
            var object = _a[_i];
            var h = this.tileAt(object.x, object.y)[1];
            this.addChild(new IsoObjectSprite_1.default(this, object, h, this.objectDescriptors[object.id]));
        }
        for (var _b = 0, _c = this.characters; _b < _c.length; _b++) {
            var character = _c[_b];
            this.addChild(new IsoCharacterSprite_1.default(this, character));
        }
    };
    IsoMap.prototype.tileAt = function (x, y) {
        if (x < 0 || x >= this.mapWidth || y < 0 || y >= this.mapHeight) {
            return [-1, -1];
        }
        return (this.mapData && this.mapData[x + y * this.mapWidth]) || [-1, -1];
    };
    Object.defineProperty(IsoMap.prototype, "globalAttributes", {
        get: function () {
            return this.options;
        },
        enumerable: true,
        configurable: true
    });
    IsoMap.prototype.refreshOrder = function () {
        this._orderChanged = true;
    };
    IsoMap.prototype.update = function (delta) {
        if (this._orderChanged) {
            this.children.sort(function (a, b) { return a.z - b.z; });
            this._orderChanged = false;
        }
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            child.update(delta);
        }
    };
    return IsoMap;
}(PIXI.Container));
exports.default = IsoMap;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(0);
var IsoCharacter_1 = __webpack_require__(1);
var IsoCharacterSprite = (function (_super) {
    __extends(IsoCharacterSprite, _super);
    function IsoCharacterSprite(tilemap, character) {
        var _this = _super.call(this) || this;
        _this.texture = new PIXI.Texture(character.texture || new PIXI.BaseTexture());
        _this._tilemap = tilemap;
        _this._character = character;
        _this.z = -1;
        _this._frameX = 0;
        _this._frameY = 0;
        _this.anchor.x = 0.5;
        _this.anchor.y = 1;
        _this._updateZ();
        _this._updateFrame();
        return _this;
    }
    Object.defineProperty(IsoCharacterSprite.prototype, "tileX", {
        get: function () {
            return Math.floor(this.x / this._tilemap.globalAttributes.tileWidth);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IsoCharacterSprite.prototype, "tileY", {
        get: function () {
            return Math.floor(this.y / this._tilemap.globalAttributes.tileWidth);
        },
        enumerable: true,
        configurable: true
    });
    IsoCharacterSprite.prototype._updateZ = function () {
        var character = this._character;
        var ga = this._tilemap.globalAttributes;
        var z = character.y + ga.tileWidth / 4 - 1;
        if (z !== this.z) {
            this.z = z;
            this._tilemap.refreshOrder();
        }
    };
    IsoCharacterSprite.prototype._updateFrame = function () {
        var _a = this._character, direction = _a.direction, frame = _a.frame, texture = _a.texture, frameWidth = _a.frameWidth, scale = _a.scale;
        if (!texture) {
            return;
        }
        var ga = this._tilemap.globalAttributes;
        var spriteFrame = this.texture.frame;
        var h = texture.height / 2;
        var x = frameWidth * frame;
        var y = 0;
        var flip = 1;
        if (direction == IsoCharacter_1.default.Direction.LEFT) {
            y = h;
            flip = -1;
        }
        else if (direction === IsoCharacter_1.default.Direction.RIGHT) {
            flip = -1;
        }
        else if (direction === IsoCharacter_1.default.Direction.DOWN) {
            y = h;
        }
        this.scale.y = scale.y;
        this.scale.x = flip * scale.x;
        if (x !== spriteFrame.x || y !== spriteFrame.y || frameWidth !== spriteFrame.width || spriteFrame.height !== h) {
            spriteFrame.height = h;
            spriteFrame.width = frameWidth;
            spriteFrame.x = x;
            spriteFrame.y = y;
            this.texture.frame = spriteFrame;
        }
        this.position.x = this._character.x;
        this.position.y = this._character.y - this._character.h;
    };
    IsoCharacterSprite.prototype.update = function (delta) {
        this._character.update(delta);
        this._updateZ();
        this._updateFrame();
    };
    return IsoCharacterSprite;
}(PIXI.Sprite));
exports.default = IsoCharacterSprite;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __webpack_require__(0);
var EMPTY_TEXTURE = new PIXI.BaseTexture();
var IsoObjectSprite = (function (_super) {
    __extends(IsoObjectSprite, _super);
    function IsoObjectSprite(tilemap, tile, tileHeight, obj) {
        var _this = _super.call(this) || this;
        _this._tilemap = tilemap;
        _this._tileHeight = tileHeight;
        _this.texture = new PIXI.Texture(tilemap.textures ? tilemap.textures[obj.tileset] : EMPTY_TEXTURE, obj.frame);
        _this.anchor.x = 0.5;
        _this.anchor.y = 1;
        _this._object = obj;
        _this._tile = tile;
        var ga = _this._tilemap.globalAttributes;
        _this.z = (tile.x + tile.y) * ga.tileWidth / 4 + ga.tileWidth / 4 - 1;
        return _this;
    }
    Object.defineProperty(IsoObjectSprite.prototype, "z", {
        get: function () {
            return this._z;
        },
        set: function (value) {
            this._z = value;
            this._tilemap.refreshOrder();
        },
        enumerable: true,
        configurable: true
    });
    IsoObjectSprite.prototype._updatePosition = function () {
        var ga = this._tilemap.globalAttributes;
        this.x = (this._tile.x - this._tile.y) * ga.tileWidth / 2;
        this.y = (this._tile.x + this._tile.y) * ga.tileWidth / 4 - ga.heightSize * this._tileHeight;
    };
    IsoObjectSprite.prototype.update = function (delta) {
        this._updatePosition();
    };
    return IsoObjectSprite;
}(PIXI.Sprite));
exports.default = IsoObjectSprite;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var IsoMap_1 = __webpack_require__(3);
var IsoTile_1 = __webpack_require__(2);
var IsoCharacter_1 = __webpack_require__(1);
var IsoMap = (function (_super) {
    __extends(IsoMap, _super);
    function IsoMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IsoMap;
}(IsoMap_1.default));
exports.IsoMap = IsoMap;
;
var IsoTile = (function (_super) {
    __extends(IsoTile, _super);
    function IsoTile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IsoTile;
}(IsoTile_1.default));
exports.IsoTile = IsoTile;
;
var IsoCharacter = (function (_super) {
    __extends(IsoCharacter, _super);
    function IsoCharacter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IsoCharacter;
}(IsoCharacter_1.default));
exports.IsoCharacter = IsoCharacter;
;
var PIXI;
(function (PIXI) {
    var IsoMap = (function (_super) {
        __extends(IsoMap, _super);
        function IsoMap() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IsoMap;
    }(IsoMap_1.default));
    PIXI.IsoMap = IsoMap;
    ;
    var IsoTile = (function (_super) {
        __extends(IsoTile, _super);
        function IsoTile() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IsoTile;
    }(IsoTile_1.default));
    PIXI.IsoTile = IsoTile;
    ;
    var IsoCharacter = (function (_super) {
        __extends(IsoCharacter, _super);
        function IsoCharacter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IsoCharacter;
    }(IsoCharacter_1.default));
    PIXI.IsoCharacter = IsoCharacter;
    ;
})(PIXI || (PIXI = {}));


/***/ })
/******/ ]);