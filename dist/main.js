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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
var PIXI = __webpack_require__(1);
var IsoTile = (function (_super) {
    __extends(IsoTile, _super);
    function IsoTile(tilemap, x, y, height, attributes) {
        var _this = _super.call(this) || this;
        _this._tilemap = tilemap;
        _this._globalAttributes = tilemap.globalAttributes;
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
        var texture = this._tilemap.textures[this._attributes.tileset];
        var topRect = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.tileWidth / 2);
        var middleRect = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.heightSize);
        var bottomRect = new PIXI.Rectangle(0, 0, ga.tileWidth, ga.heightSize);
        this._topTexture = new PIXI.Texture(texture, topRect);
        this._middleTexture = new PIXI.Texture(texture, middleRect);
        this._bottomTexture = new PIXI.Texture(texture, bottomRect);
    };
    IsoTile.prototype._updateRect = function () {
        var frame = this._attributes.frames[this._frame];
        var ga = this._globalAttributes;
        this._topTexture.frame.x = frame.x;
        this._topTexture.frame.y = frame.y;
        this._topTexture.frame = this._topTexture.frame;
        this._middleTexture.frame.x = frame.x;
        this._middleTexture.frame.y = frame.y + ga.tileWidth / 2;
        this._middleTexture.frame = this._middleTexture.frame;
        this._bottomTexture.frame.x = frame.x;
        this._bottomTexture.frame.y = frame.y + ga.tileWidth / 2 + ga.heightSize;
        this._bottomTexture.frame = this._bottomTexture.frame;
    };
    IsoTile.prototype._updatePosition = function () {
        var ga = this._globalAttributes;
        this.x = (this._tileX - this._tileY) * ga.tileWidth / 2 + this._tilemap.camera.x;
        this.y = (this._tileX + this._tileY) * ga.tileWidth / 4 + this._tilemap.camera.y;
    };
    IsoTile.prototype._buildSprites = function () {
        this.removeChildren();
        var ga = this._globalAttributes;
        var bottom = new PIXI.Sprite(this._bottomTexture);
        bottom.anchor.x = 0.5;
        this.addChild(bottom);
        for (var i = 1, h = this._tileHeight; i <= h; ++i) {
            var middle = new PIXI.Sprite(this._middleTexture);
            middle.anchor.x = 0.5;
            middle.y = -(i * ga.heightSize);
            this.addChild(middle);
        }
        var top = new PIXI.Sprite(this._topTexture);
        top.y = -(ga.tileWidth / 2 + ga.heightSize * this._tileHeight);
        top.anchor.x = 0.5;
        this.addChild(top);
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
/* 1 */
/***/ (function(module, exports) {

module.exports = require("pixi.js");

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
var PIXI = __webpack_require__(1);
var IsoTile_1 = __webpack_require__(0);
var IsoMap = (function (_super) {
    __extends(IsoMap, _super);
    function IsoMap() {
        var _this = _super.call(this) || this;
        _this.clean();
        _this._orderChanged = false;
        _this.camera = new PIXI.Point();
        return _this;
    }
    IsoMap.prototype.setGeneralAttributes = function (attributes) {
        this._options = attributes;
    };
    IsoMap.prototype.setTileAttributes = function (attributes) {
        this._tiles = attributes;
    };
    IsoMap.prototype.setTextures = function (textures) {
        this._textures = textures;
    };
    Object.defineProperty(IsoMap.prototype, "textures", {
        get: function () {
            return this._textures;
        },
        enumerable: true,
        configurable: true
    });
    IsoMap.prototype.setData = function (width, height, data) {
        this._mapWidth = width;
        this._mapHeight = height;
        this._mapData = data;
    };
    IsoMap.prototype.clean = function () {
        this.removeChildren();
        this._options = null;
        this._tiles = null;
        this._textures = null;
        this._mapData = null;
        this._mapWidth = null;
        this._mapHeight = null;
    };
    IsoMap.prototype.build = function () {
        this.removeChildren();
        if (this._options === null) {
            return "IsoMap's options can't be null.";
        }
        if (this._tiles === null) {
            return "IsoMap's tiles can't be null.";
        }
        if (this._textures === null) {
            return "IsoMap's textures can't be null.";
        }
        if (this._mapData === null) {
            return "IsoMap's mapData can't be null.";
        }
        if (this._mapWidth === null) {
            return "IsoMap's mapWidth can't be null.";
        }
        if (this._mapHeight === null) {
            return "IsoMap's mapHeight can't be null.";
        }
        var size = this._mapWidth * this._mapHeight;
        for (var y = 0; y < this._mapHeight; ++y) {
            for (var x = 0; x < this._mapWidth; ++x) {
                var data = this._mapData[x + y * this._mapWidth];
                var tileID = data[0];
                if (tileID >= 0) {
                    this.addChild(new IsoTile_1.default(this, x, y, data[1], this._tiles[tileID]));
                }
            }
        }
    };
    Object.defineProperty(IsoMap.prototype, "globalAttributes", {
        get: function () {
            return this._options;
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
var IsoMap_1 = __webpack_require__(2);
var IsoTile_1 = __webpack_require__(0);
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
})(PIXI || (PIXI = {}));


/***/ })
/******/ ]);