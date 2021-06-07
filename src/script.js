import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .5, 64, 64);

// Textures
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/NormalMap.png')

// Materials
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.05
material.routhes = 0.85
material.normalMap = normalTexture
material.color = new THREE.Color(0xf0f0f0)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const pointLight1 = new THREE.PointLight(0xff0000, 1)
pointLight1.position.set(7,2,0)
scene.add(pointLight1)

const pointLight2 = new THREE.PointLight(0x0000ff, 1)
pointLight2.position.set(-7,-2,0)
scene.add(pointLight2)

// Debug
const light1 = gui.addFolder('Light 1')
const light2 = gui.addFolder('Light 2')
light1.add(pointLight1.position, 'x').min(-3).max(3).step(0.01)
light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight1, 'intensity').min(0).max(3).step(0.1)
const light1Colour = {
    color: 0xff0000
}
light1.addColor(light1Colour, 'color')
  .onChange(() => {
      pointLight1.color.set(light1Colour.color)
  })

light2.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(3).step(0.1)
const light2Colour = {
    color: 0xff0000
}
light2.addColor(light2Colour, 'color')
  .onChange(() => {
      pointLight2.color.set(light2Colour.color)
  })

const pointLightHelper = new THREE.PointLightHelper(pointLight2, 0.5)
scene.add(pointLightHelper)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
