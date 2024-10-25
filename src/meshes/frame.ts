import * as THREE from 'three'

export class Frame {
    /**
     * Three MeshStandardMaterial
     *
     * @readonly
     */
    readonly material: THREE.MeshStandardMaterial

    constructor(readonly mesh: THREE.Mesh) {
        this.material = this.mesh.material as THREE.MeshStandardMaterial
        this.material.color.set(0x000000)
    }
}
