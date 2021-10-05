// Canvas
const canvas = document.querySelector('canvas.webgl')
let isPowerOn = true;

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const cubeGeometry = new THREE.CylinderGeometry( 2, 2, 10, 50 );
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: '#ff0000'
})
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

// Camera
const camera = new THREE.PerspectiveCamera(90, sizes.width / sizes.height)
camera.position.z = 5
scene.add(camera)

//axes helper

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

const interval = setInterval(()=>{
    // i 
    camera.fov+=5;
    console.log(camera.position.z, camera.fov)
    camera.updateProjectionMatrix();
    renderer.render(scene, camera)

},500);
