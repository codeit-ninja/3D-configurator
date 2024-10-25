import * as THREE from 'three'

export class Mesh {
    /**
     * Three MeshStandardMaterial
     *
     * @readonly
     */
    readonly material: THREE.MeshStandardMaterial

    readonly textureLoader: THREE.TextureLoader

    constructor(readonly mesh: THREE.Mesh) {
        this.material = this.mesh.material as THREE.MeshStandardMaterial
        this.textureLoader = new THREE.TextureLoader()
    }

    /**
     * Set the color of the material
     *
     * Color can be any of the following:
     * - A hexadecimal number
     * - A CSS-style color string
     * - A THREE.Color instance
     * - An array of three numbers representing RGB
     * - An array of four numbers representing RGBA
     *
     *
     * @param color
     */
    setColor(color: THREE.ColorRepresentation) {
        console.log(color)
        this.material.color.set(color)
    }
}
