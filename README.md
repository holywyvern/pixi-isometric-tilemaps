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

Contains an array of tiles of size tilemap.mapWidth * tilemap.mapHeight.

Each tile is a number, representing the index on the tilemap.tiles array.
If you use a number less than 0, the tile won't exits and it will be empty space.

For example, a 3x3 map looks like this:

```js
[
  0,  0,  0,
  0,  0,  0,
  0,  0, -1
]
```

The -1 means than that square doesn't exists at all. so it will be a 3x3 map, with the bottom right
corner deleted.


### tilemap.heightData

Contains an array of tiles of size tilemap.mapWidth * tilemap.mapHeight.
Each number represents the height of the tile, from 0 to any higher number you like.
When the tile is -1, the height may be -1 to allow 0 indexed tiles have walls on them.

For example, the map of the example above may have something like this:

```js
[
  0,  0,  0,
  0,  1,  0,
  0,  0, -1
]
```

Where it will be all flat, except for the middle square, it will have some elevation.

The -1 is to make the non existent tile work properly.

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

### tilemap.interactiveTiles

Allows the tiles to have extra events if you set ti to a true value.

The following events will work with the tilemap:

|     event     | parameters        |              description                                                      |
|---------------|-------------------|-------------------------------------------------------------------------------|
| tile-selected | point: PIXI.Point | Emited when a tile is clicked. It takes into account the height of the tile.  |

