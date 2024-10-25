import * as THREE from 'three'
import { Mesh } from './mesh'

export class Frame extends Mesh {
    constructor(readonly mesh: THREE.Mesh) {
        super(mesh)

        this.material.color.set(0x000000)
    }
}
