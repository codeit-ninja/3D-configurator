import { type GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import * as THREE from 'three'
import { Lens } from './meshes/lens'
import { Strap } from './meshes/strap'

export class Configurator {
    scene: THREE.Scene

    camera: any

    renderer: THREE.WebGLRenderer

    lens!: Lens

    frame!: THREE.Mesh

    slider!: THREE.Mesh

    strap!: Strap

    controls: OrbitControls

    composer: EffectComposer

    constructor(protected gltf: GLTF, protected element: HTMLElement) {
        this.scene = new THREE.Scene()
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 1
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.camera.position.set(150, 150, 150)

        const model = gltf.scene

        model.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Mesh).isMesh) {
                if (child.name === 'Lens') {
                    this.lens = new Lens(child as THREE.Mesh)
                }

                if (child.name === 'Frame') {
                    this.frame = child as THREE.Mesh
                    this.frame.material.color.set(0x000000)
                }

                if (child.name === 'Slider3') {
                    this.strap = new Strap(child as THREE.Mesh)
                }
            }
        })

        element.appendChild(this.renderer.domElement)

        this.scene.add(model)
        this.initRenderer()
        this.initScene()

        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.enableDamping = true
        this.controls.dampingFactor = 0.05

        this.composer = new EffectComposer(this.renderer)
        const renderPass = new RenderPass(this.scene, this.camera)
        this.composer.addPass(renderPass)

        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0, 0, 0)
        bloomPass.threshold = 0.14
        bloomPass.strength = 0.1 // Adjust bloom strength
        bloomPass.radius = 0.5
        this.composer.addPass(bloomPass)

        this.render()
    }

    protected initRenderer() {
        const { width, height } = this.element.getBoundingClientRect()

        this.renderer.setSize(width, height)
        this.renderer.setClearColor(new THREE.Color(1, 1, 1), 1) // Equivalent to rgba(255, 255, 255, 1)
    }

    protected initScene() {
        //const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
        // Create a directional light to represent the sun
        const sunLight = new THREE.DirectionalLight(0xffffff, 1)

        // Position the light to the top right
        sunLight.position.set(10, 10, 10) // Adjust these values as needed

        // Optionally, set the target of the light to the center of the scene
        sunLight.target.position.set(0, 0, 0)

        // Add the light to the scene
        //this.scene.add(sunLight)
        //this.scene.add(sunLight.target)

        //this.scene.add(ambientLight)

        // const controls = new OrbitControls(this.camera, this.renderer.domElement)
        // controls.enableDamping = true
        // controls.dampingFactor = 0.1

        const rgbeLoader = new RGBELoader()
        rgbeLoader.load('/autumn_field_puresky_1k.hdr', (texture) => {
            texture.mapping = THREE.EquirectangularReflectionMapping
            this.scene.environment = texture
            //this.scene.background = texture
        })
    }

    protected render() {
        requestAnimationFrame(this.render.bind(this))

        this.controls.update()
        this.renderer.render(this.scene, this.camera)
        this.composer.render()
    }

    static async load(model: string, element: HTMLElement) {
        const loader = new GLTFLoader()
        const gltf = await loader.loadAsync(model)

        return new Configurator(gltf, element)
    }
}
