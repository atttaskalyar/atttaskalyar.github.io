/**
 * Debug
 */

// const debugSphere = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.4,0.4), new THREE.MeshBasicMaterial({color:"white"}))
// debugSphere.position.set(1, 0, 0)
// debugSphere.add(new THREE.AxisHelper(1))
const gui = new dat.GUI({ closed: true, width: 350 });

const parameters = {
  count: 125000,
  radius: 5,
  branches: 5,
  spin: 5,
  randomness: 0.5,
  randomnessPower: 6,
  insideColor: "#ec5300",
  outsideColor: "#2fb4fc",
};

// 3D models
const gltfLoader = new THREE.GLTFLoader();
gltfLoader.load("./ForCompaniiesSphere.gltf", (model) => {
  console.log(model);
  model.scene.scale.set(0.5, 0.5, 0.5);
  models.push(model.scene);
});

const models = [
  new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({
      color: "blue",
    })
  ),
  new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({
      color: "blue",
    })
  ),
  new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({
      color: "blue",
    })
  ),
  new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({
      color: "blue",
    })
  ),
  new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({
      color: "blue",
    })
  ),
];

const helpers =[
  new THREE.AxisHelper(1.5),
  new THREE.AxisHelper(1.5),
  new THREE.AxisHelper(1.5),
  new THREE.AxisHelper(1.5),
  new THREE.AxisHelper(1.5),
  new THREE.AxisHelper(1.5),
]

//PARAMETERS


for(let i = 0;i<models.length;i++){
  models[i].add(helpers[i])
}

const distanceOfCamera = 4.5;
let selectedModel;
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// scene.add(debugSphere)
// TextureLoader
const textureLoader = new THREE.TextureLoader();
const starTexture = textureLoader.load(
  "https://assets.codepen.io/22914/star_02.png"
);

// const texture = textureLoader.load(
//   "https://assets.codepen.io/22914/eso0932a.jpg",
//   () => {
//     const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
//     rt.fromEquirectangularTexture(renderer, texture);
//     scene.background = rt;
//   }
// );

/**
 * Object
 */
let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
  scene.add(hemisphereLight);

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry(); 

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count);
  const randomness = new Float32Array(parameters.count * 3);
  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle =
      ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    // Randomness
    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // Scales
    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute(
    "aRandomness",
    new THREE.BufferAttribute(randomness, 3)
  );
  // console.log(new THREE.)
  /**
   * Material
   */
  material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader: document.getElementById("vertexShader").textContent,
    fragmentShader: document.getElementById("fragmentShader").textContent,
    transparent: true,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 30 * renderer.getPixelRatio() },
      uHoleSize: { value: 0.15 },
      uTexture: { value: starTexture },
      size: { value: 1.0 },
    },
  });

  /**
   * Points
   */
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy)
  .name("Star count");
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.01)
  .onFinishChange(generateGalaxy)
  .name("Galaxy radius");
gui
  .add(parameters, "branches")
  .min(2)
  .max(20)
  .step(1)
  .onFinishChange(generateGalaxy)
  .name("Galaxy branches");
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy)
  .name("Randomness position");
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy)
  .name("Randomness power");
gui
  .addColor(parameters, "insideColor")
  .onFinishChange(generateGalaxy)
  .name("Galaxy inside color");
gui
  .addColor(parameters, "outsideColor")
  .onFinishChange(generateGalaxy)
  .name("Galaxy outside color");

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
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  40,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = distanceOfCamera;
camera.position.y = distanceOfCamera *0.4;
camera.position.z = distanceOfCamera;

const cameraPointer = new THREE.Object3D();
cameraPointer.add(new THREE.AxisHelper(1))
scene.add(cameraPointer)

// Groups
let group = new THREE.Group();

scene.add(group);

setTimeout(() => {
  for (var i = 0; i < models.length; i++) {
    //  console.log("models")
    models[i].position.set(
      Math.cos((i / 5) * 2 * Math.PI) * 3,

      0,
      Math.sin((i / 5) * 2 * Math.PI) * 3
    );
    group.add(models[i]);
  }
}, 2000);

// Controls
const controls = new THREE.OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls for planet selection
const raycaster = new THREE.Raycaster();
document.addEventListener("click", function (e) {
  let pointer = {};
  //first we cast a ray and check intersected objects
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
  //perhaps we can apply a filter to the raycast
  console.log(pointer.x, pointer.y);

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(models, false);
  if(intersects.length){

    console.log(camera.position);  
    intersects[0].object.add(debugSphere)
    intersects[0].object.add(cameraPointer)
    selectedModel = intersects[0].object
    // selectedModel.add(cameraPointer)
    console.error(cameraPointer.position)
    
    console.log(camera.position);
  }
});
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();

gui
  .add(material.uniforms.uSize, "value")
  .min(1)
  .max(100)
  .step(0.001)
  .name("Point size")
  .onChange(() => {
    material.uniforms.uSize.value =
      material.uniforms.uSize.value * renderer.getPixelRatio();
  });

gui
  .add(material.uniforms.uHoleSize, "value")
  .min(0)
  .max(1)
  .step(0.001)
  .name("Black hole size");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;



  // Update controls
  // selectedModel ? cameraPointer.position.set(selectedModel.position.x, selectedModel.position.y, selectedModel.position.z) : cameraPointer.position.set(0,0,0)
  selectedModel ? controls.target.set(cameraPointer.getWorldPosition().x, cameraPointer.getWorldPosition().y, cameraPointer.getWorldPosition().z) : controls.target.set(0,0,0)  
  
  controls.update();

  // Render
  renderer.render(scene, camera);

  group.rotation.y -= 0.001;

  for (let i = 0; i < models.length; i++) {
    models[i].rotation.y -= 0.002;
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
