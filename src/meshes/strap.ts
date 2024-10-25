import * as THREE from 'three'

export class Strap {
    //readonly material: THREE.MeshPhysicalMaterial

    constructor(readonly mesh: THREE.Mesh) {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.load('/SD144_Print-fixed.png', (texture) => {
            texture.generateMipmaps = false
            texture.minFilter = THREE.LinearFilter
            texture.magFilter = THREE.LinearFilter

            texture.flipY = false

            texture.wrapS = THREE.RepeatWrapping
            texture.wrapT = THREE.RepeatWrapping

            texture.repeat.set(0.0544, 0.2)
            texture.offset.set(0.01, 0.35)

            const texturedMaterial = new THREE.MeshBasicMaterial({
                map: texture,
            })

            this.mesh.material = texturedMaterial
        })
    }
}
