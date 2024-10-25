import * as THREE from 'three'

export class Lens {
    readonly material: THREE.MeshPhysicalMaterial

    constructor(readonly mesh: THREE.Mesh) {
        this.material = new THREE.MeshPhysicalMaterial({
            color: 0xe73240,
            metalness: 0.8,
            roughness: 0,
            iridescence: 1,
            iridescenceIOR: 1.2,
            ior: 0.02,
            transparent: true,
            opacity: 0.99,
            reflectivity: 0,
        })

        this.mesh.material = this.material
    }

    setColor(color: THREE.ColorRepresentation) {
        this.material.color.set(color)
    }
}
