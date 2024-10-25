import { Configurator } from './configurator'

const configurator = Configurator.load('/Styx With Strap.glb', document.getElementById('app')!)
// import './style.css'
// import * as THREE from 'three'
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// const textureLoader = new THREE.TextureLoader();
// const loader = new GLTFLoader();
// const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera(
//     75, // Field of view
//     window.innerWidth / window.innerHeight, // Aspect ratio
//     0.1, // Near clipping plane
//     1000 // Far clipping plane
// );
// camera.position.z = 250;

// // Create the WebGL renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.setClearColor(0xffffff, 1);
// document.body.appendChild(renderer.domElement);

// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
// directionalLight.position.set(1, 2, 1); // Position the light
// scene.add(directionalLight);

// // Initialize OrbitControls to make the model rotatable
// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // Optional: smooth out the control movement
// controls.dampingFactor = 0.1;

// loader.load('/Styx With Strap.glb', (gltf) => {
//     const model = gltf.scene;

//     let lens: THREE.Mesh
//     let frame: THREE.Object3D
//     let slider: THREE.Object3D
//     let strap: THREE.Object3D

//     model.traverse((child) => {
//         switch (child.name) {
//             case 'Lens':
//                 if (child instanceof THREE.Mesh) {
//                     lens = child;
//                 }
//                 break;
//             case 'Frame':
//                 frame = child;
//                 break;
//             case 'Scene':
//                 strap = child;
//                 break;
//             case 'Slider3':
//                 slider = child;
//                 break;
//         }

//         if (lens) {
//             const glassMaterial = new THREE.MeshStandardMaterial({
//                 color: 0x88ccee, // Light blue tint (or change to a different tint)
//                 metalness: .2,    // High metalness for strong reflection
//                 roughness: .1,    // Low roughness for smooth, shiny surface
//                 envMapIntensity: 1, // Control how strong the reflection is
//                 transparent: true,  // Make the material slightly transparent
//                 opacity: .98,       // Adjust opacity for tinted transparency
//                 emissive: 0xff9900,        // Emissive color to boost brightness
//                 emissiveIntensity: 1.5,    // Higher emissive intensity for bright effect

//             });
//             lens.material = glassMaterial;
//             lens.material.needsUpdate = true;
//             lens.material.color.set(0xff9900);
//         }
//     });

//     scene.add(model);
//     animate();
// });

// function animate() {
//     requestAnimationFrame(animate);

//     // Any updates to your scene, camera, or objects
//     renderer.render(scene, camera);
// }
