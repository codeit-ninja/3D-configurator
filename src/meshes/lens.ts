import * as THREE from 'three'
import { Mesh } from './mesh'

export class Lens extends Mesh {
    readonly material: THREE.MeshPhysicalMaterial

    constructor(readonly mesh: THREE.Mesh) {
        super(mesh)

        this.material = new THREE.MeshPhysicalMaterial({
            color: 0xe73240,
            metalness: 0.8,
            roughness: 0,
            iridescence: 1,
            iridescenceIOR: 1.2,
            ior: 0.02,
            transparent: true,
            opacity: 0.95,
            reflectivity: 0,
        })

        this.mesh.material = this.material
    }

    /**
     * Sets the transparency of the lens
     *
     * @example
     * ```typescript
     * .setTransparency(0.5)
     * ```
     * @param value
     */
    setTransparency(value: number) {
        this.material.opacity = value
    }
}
