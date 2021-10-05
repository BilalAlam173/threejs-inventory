import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Base
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial()
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 0
scene.add(camera)
scene.add(new THREE.AxesHelper)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

/**
 * Animate
 */


const clock = new THREE.Clock();

const tick = () =>
{

    //animate
    // mesh.rotation.reorder('YXZ')
    // mesh.rotation.y = clock.getElapsedTime()
    const elTime = clock.getElapsedTime()
    const elTimeSin = Math.sin(clock.getElapsedTime())
    const elTimeCos = Math.cos(clock.getElapsedTime())
    mesh.material = new THREE.MeshBasicMaterial({color:new THREE.Color( elTimeSin, elTimeCos, elTimeSin )})
    mesh.rotation.x = Math.sin(elTime)
    // mesh.rotation.y = Math.sin(clock.getElapsedTime())
    // console.log(M(clock.getElapsedTime()))
    // mesh.position.y = Math.sin(clock.getElapsedTime())



    // Render
    renderer.render(scene, camera)
    
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}
tick()