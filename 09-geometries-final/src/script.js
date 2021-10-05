import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Object
 */
function buildChakra(axis) {
  const geometry = new THREE.BufferGeometry();
  const count = 50;
  const positionsArray = new Float32Array(count * 3 * 3 * 3);
  let j = 0;
  for (let i = 0; i < count * 3 * 3 * 3; i++) {
    j++;
    if (axis) {
      if (j !== axis) positionsArray[i] = Math.sin(i);
      if (j == 3) j = 0;
    } else {
        positionsArray[i] = Math.sin(i);
    }
  }
  const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
  geometry.setAttribute("position", positionsAttribute);

  const material = new THREE.MeshBasicMaterial({
    color: 0xff57a0,
    wireframe: true,
  });

  return new THREE.Mesh(geometry, material);
}
const mesh1 = buildChakra(1);
scene.add(mesh1);

const mesh2 = buildChakra(2);
scene.add(mesh2);

const mesh3 = buildChakra(3);
scene.add(mesh3);
const mesh4 = buildChakra();
// scene.add(mesh4);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  //   mesh.rotation.order = "XYZ"
  // mesh.rotation.x = elapsedTime;
  // mesh.rotation.y = elapsedTime;
  mesh1.rotation.x = elapsedTime;
  mesh1.rotation.y = elapsedTime;
  mesh1.rotation.z = elapsedTime;
  mesh2.rotation.x = elapsedTime;
  mesh2.rotation.y = elapsedTime;
  mesh2.rotation.z = elapsedTime;
  mesh3.rotation.x = elapsedTime;
  mesh3.rotation.y = elapsedTime;
  mesh3.rotation.z = elapsedTime;
//   mesh4.rotation.z = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
