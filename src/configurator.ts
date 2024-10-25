import { type GLTF, GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import * as THREE from 'three'
import { Lens } from './meshes/lens'
import { Strap } from './meshes/strap'
import { Frame } from './meshes/frame'

export class Configurator {
    /**
     * Three Scene
     *
     * @readonly
     * @see {@link https://threejs.org/docs/#api/en/scenes/Scene}
     */
    scene: THREE.Scene

    /**
     * Three OrbitControls
     *
     * @readonly
     * @see {@link https://threejs.org/docs/#examples/en/controls/OrbitControls}
     */
    controls: OrbitControls

    /**
     * Three PerspectiveCamera
     *
     * @readonly
     * @see {@link https://threejs.org/docs/#api/en/cameras/PerspectiveCamera}
     */
    camera: THREE.PerspectiveCamera

    /**
     * Three WebGLRenderer
     *
     * @readonly
     * @see {@link https://threejs.org/docs/#api/en/renderers/WebGLRenderer}
     */
    renderer: THREE.WebGLRenderer

    /**
     * The lens of the glasses
     *
     * @readonly
     */
    readonly lens!: Lens

    /**
     * The frame of the glasses
     *
     * @readonly
     */
    readonly frame!: Frame

    /**
     * The slider of the glasses
     *
     * @readonly
     */
    readonly slider!: THREE.Mesh

    /**
     * The strap of the glasses
     *
     * @readonly
     */
    readonly strap!: Strap

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
                    // @ts-ignore
                    this.lens = new Lens(child as THREE.Mesh)
                }

                if (child.name === 'Frame') {
                    // @ts-ignore
                    this.frame = new Frame(child as THREE.Mesh)
                }

                if (child.name === 'Slider3') {
                    // @ts-ignore
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
        this.controls.maxDistance = 500

        this.render()
    }

    protected initRenderer() {
        const { width, height } = this.element.getBoundingClientRect()

        this.renderer.setSize(width, height)
        this.renderer.setClearColor(new THREE.Color(1, 1, 1), 1)
    }

    protected initScene() {
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
    }

    static async load(model: string, element: HTMLElement) {
        const loader = new GLTFLoader()
        try {
            const gltf = await loader.loadAsync(model)
            return new Configurator(gltf, element)
        } catch (error) {
            console.error('Error loading model:', error)
            throw error
        }
    }
}
