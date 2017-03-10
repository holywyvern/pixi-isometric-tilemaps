# pixi-isometric-tilemaps
Isometric tilemaps with PIXI.js

## Quick start

### Using webpack/browserify

```sh
npm i --save holywyvern/pixi-isometric-tilemaps
```

In your code:

```js

  import { IsoMap, IsoCharacter } from 'pixi-isometric-tilemaps';

  const map = new IsoMap();
  
  //set your map's properties here... See below

  //This builds the actual tilemap, you can always use this to build again
  // if you later want to change a property.
  map.build();

  // Use your renderer, you can also append it like a regulat Pixi.js object.
  aPixiRenderer.render(map);

```

## Map Properties

### tilemap.options

The set of general options of your map, it consist of:

|   field    |  type  |              description                  |
|------------|--------|-------------------------------------------|
| tileWidth  | number | The width of a tile, the height is size/2 |
| heightSize | number | The size of the elevation in pixels       |

### tilemap.textures

An array of PIXI.BaseTexture objects, a map can handle multiple textures.
I personally recommend using one or two, but use as many as you need.


### tilemap.tiles

A collection of tiles used by the engine, each tile has the following properties


|   field    |  type           |              description                              |
|------------|-----------------|-------------------------------------------------------|
| tileset    | number          | The index of the texture used                         |
| frames     | IsoTile.Frame[] | A collection of frames                                |
| frameDelay | number          | The delay between each frame                          |
| type       | string          | An string for tagging, for example, water, ice, grass |

Each tile, is in the following format

![Tile Image](http://i.imgur.com/5CAHEZX.png)

 * 1: The top area of the tile, it's size is options.tileWidth x options.tileWidth / 2
 * 2: The top area of the wall, the size is  options.tileWidth x options.tileWidth / 4
 * 3: The middle wall, this is repeated vertically if needed, the size is options.tileWidth x options.heightSize
 * 4: The bottom wall, this is for the bottom of the tile, the size is options.tileWidth x options.heightSize

Each frame has the following options:

| field |  type  |              description                                       |
|-------|--------|----------------------------------------------------------------|
| x     | number | The horizontal offset of the start of the tile (from the left) |
| y     | number | The vertical offset of the start of the tile (from the top)    |


### tilemap.objectDescriptors

Aside from tiles, a tilset may contain objects, wich are free form.
They are always centered at a tile, but they don't have size restrictions.

|   field    |  type           |              description                               |
|------------|-----------------|--------------------------------------------------------|
| tileset    | number          | The index of the texture used                          |
| frame      | PIXI.Rectangle  | A collection of frames                                 |
| type       | string          | An string for tagging, for example, tree, rock, flower |

  readonly tileset:    number;
  readonly frame:      PIXI.Rectangle;
  readonly type:       string;

### tilemap.mapWidth

The width of the map in tiles

### tilemap.mapHeight

The height of the map in tiles

### tilemap.mapData

Contains an array of tiles of size tilemap.mapWidth * tilemap.mapHeaight.

Each tile is an array of two values, the first being the tile index of tilemap.tiles, or -1 if you don't want a tile
and a value indicating the height of the tile.

### tilemap.objects 

This is an array of objects, each one being an instance of an object descriptor.

Each object has the following properties:

| field |  type  |              description                                        |
|-------|--------|-----------------------------------------------------------------|
| x     | number | The horizontal offset of the start of the tile (from the left)  |
| y     | number | The vertical offset of the start of the tile (from the top)     |
| id    | number | The index of the object descriptor in tilemap.objectDescriptors |

### tilemap.characters

A list of characters used by the tilemap.
Characters, in difference from a tileset object are not limited to the grid.
They are also animated, and have convenience methods to make they walk or jump.

In order to have a character, you **must** extend IsoCharacter.

After you do, you may set it's properties and anything you need on them.