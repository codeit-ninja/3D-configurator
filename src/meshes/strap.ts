import * as THREE from 'three'
import { Mesh } from './mesh'

export class Strap extends Mesh {
    public texture?: THREE.Texture

    /**
     * Set the print on the strap
     *
     * Path can be any of the following:
     * - URL
     * - base64 encoded image
     * - data URL
     * - relative path
     *
     * @param path  - Path to resource
     */
    setPrint(path: string): Promise<THREE.Texture> {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                path,
                (texture) => {
                    texture.generateMipmaps = false

                    texture.flipY = false

                    texture.wrapS = THREE.ClampToEdgeWrapping
                    texture.wrapT = THREE.ClampToEdgeWrapping

                    texture.repeat.set(0.0544, 0.2)
                    texture.offset.set(0.01, 0.35)

                    const texturedMaterial = new THREE.MeshPhysicalMaterial({
                        map: texture,
                        side: THREE.FrontSide,
                    })

                    this.mesh.material = texturedMaterial
                    this.texture = texture
                    resolve(this.texture)
                },
                (progress) => {
                    console.log(progress)
                },
                (error) => {
                    reject(error)
                },
            )
        })
    }
}
