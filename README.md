# 3D Configurator

> **Warning**  
> This package is intended solely for internal use by Mediabirds. It was developed specifically for a unique project and may not suit general usage.

## Installation

To install the package, use the following command:

```bash
npm install @mediabirds/3d-configurator
```

## Usage

### Creating a Configurator Instance

To initialize the 3D configurator, create a new instance of `Configurator`:

```typescript
import { Configurator } from '@mediabirds/3d-configurator'

/**
 * Load a 3D ski goggle model.
 *
 * `element` is a reference to a DOM element to which the canvas will be appended.
 */
const configurator = new Configurator('/path/to/model.glb', element)
```

### Modifying Mesh Colors

You can access the `lens`, `frame`, and `strap` meshes to modify their colors:

```typescript
configurator.lens.setColor('#414141')
configurator.frame.setColor('#fff')
```

### Setting Strap Print

The `strap` mesh has a `setPrint` method for applying a texture print to the strap:

```typescript
configurator.strap.setPrint('/path/to/print.png')
```

You can further customize the texture settings by directly accessing the texture object:

```typescript
/**
 * Refer to the [Three.js Texture Documentation](https://threejs.org/docs/#api/en/textures/Texture)
 * for full customization options.
 */
configurator.strap.texture = // ...your texture settings here
```

### Accessing Material Properties

Each mesh also includes a `material` property, accessible for advanced customizations:

```typescript
/**
 * For more on materials, refer to the [Three.js Material Documentation](https://threejs.org/docs/#api/en/materials/Material)
 */
configurator.lens.material = // ...your material settings here
```
