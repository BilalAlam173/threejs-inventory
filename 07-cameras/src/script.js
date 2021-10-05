import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const pointer = {
  x: 0,
  y: 0,
};

// Sizes
const sizes = {
  width: 1000,
  height: 600,
};

const meshList = [];

const buildLine = (origin, start, end, fixX, fixY, fixZ) => {
  const isInvert = start > end;
  for (let i = start; isInvert ? i >= end : i <= end; isInvert ? i-- : i++) {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
      new THREE.MeshNormalMaterial()
    );
    mesh.position.set(
      fixX ? origin[0] : i,
      fixY ? origin[1] : i,
      fixZ ? origin[2] : i
    );
    meshList.push(mesh);
  }
};

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

const aspectRatio = sizes.width / sizes.height;

// Scene
const scene = new THREE.Scene();

// Object
const construct1 = [
  buildLine.bind(this, [0, 0, 0], 0, 10, true, true, false),
  buildLine.bind(this, [0, 0, 0], 0, 10, true, false, true),
  buildLine.bind(this, [0, 0, 0], 0, 10, false, true, true),
  buildLine.bind(this, [0, 0, 0], 0, 10, true, false, false),
  buildLine.bind(this, [0, 0, 0], 0, 10, false, false, true),
  buildLine.bind(this, [0, 0, 0], 0, 10, false, true, false),

  buildLine.bind(this, [0, 10, 10], 0, 10, true, true, false),
  buildLine.bind(this, [0, 10, 10], 0, 10, true, false, true),
  buildLine.bind(this, [0, 10, 10], 0, 10, false, true, true),
  buildLine.bind(this, [0, 10, 10], 0, 10, true, false, false),
  buildLine.bind(this, [0, 10, 10], 0, 10, false, false, true),
  buildLine.bind(this, [0, 10, 10], 0, 10, false, true, false),
  buildLine.bind(this, [0, 10, 10], 0, 10, false, false, false),

  buildLine.bind(this, [10, 10, 0], 0, 10, true, true, false),
  buildLine.bind(this, [10, 10, 0], 0, 10, true, false, true),
  buildLine.bind(this, [10, 10, 0], 0, 10, false, true, true),
  buildLine.bind(this, [10, 10, 0], 0, 10, true, false, false),
  buildLine.bind(this, [10, 10, 0], 0, 10, false, false, true),
  buildLine.bind(this, [10, 10, 0], 0, 10, false, true, false),
  buildLine.bind(this, [10, 10, 0], 0, 10, false, false, false),

  buildLine.bind(this, [10, 0, 10], 0, 10, true, true, false),
  buildLine.bind(this, [10, 0, 10], 0, 10, true, false, true),
  buildLine.bind(this, [10, 0, 10], 0, 10, false, true, true),
  buildLine.bind(this, [10, 0, 10], 0, 10, true, false, false),
  buildLine.bind(this, [10, 0, 10], 0, 10, false, false, true),
  buildLine.bind(this, [10, 0, 10], 0, 10, false, true, false),
  buildLine.bind(this, [10, 0, 10], 0, 10, false, false, false),
];

// Camera
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 1000);
// camera.position.x = 3;
// camera.position.y = 3;
camera.position.z = 25;
camera.position.x = 30;
scene.add(camera);
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const avg = (pointer.x + pointer.y) / 2;
  controls.update();
  renderer.render(scene, camera);

  // Render

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

construct1.forEach((item) => {
  item();
});
let i = 0;
setInterval(() => {
  if (i < meshList.length - 1) scene.add(meshList[i]);
  renderer.render(scene, camera);
  i++;
  console.log(meshList);
}, 10);

tick();
