/**
 * Debug
 */

// const debugSphere = new THREE.Mesh(new THREE.BoxGeometry(0.4,0.4,0.4), new THREE.MeshBasicMaterial({color:"white"}))
// debugSphere.position.set(1, 0, 0)
// debugSphere.add(new THREE.AxisHelper(1))


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
  models[0].add(model.scene);
  models[0].isVisible = false;
});

const models = [
  new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent:true,
      opacity:0
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
  new THREE.AxisHelper(0),
  new THREE.AxisHelper(0),
  new THREE.AxisHelper(0),
  new THREE.AxisHelper(0),
  new THREE.AxisHelper(0),
  new THREE.AxisHelper(0),
]

//PARAMETERS


for(let i = 0;i<models.length;i++){
  models[i].add(helpers[i])
}

const distanceOfCamera = 4.5;
let selectedModel;
let selectedModelPosition = new THREE.Vector3(0,0,0);
let rotateGalaxy = true;
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

var hemisphereLight = new THREE.HemisphereLight(0xfbabff, 0x000000, 1);
scene.add(hemisphereLight);

let directionalLight = new THREE.DirectionalLight("yellow", 0.7)
const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }
  

  /**
   * Geometry
   */
  // geometry = new THREE.BufferGeometry(); 

  // const positions = new Float32Array(parameters.count * 3);
  // const colors = new Float32Array(parameters.count * 3);
  // const scales = new Float32Array(parameters.count);
  // const randomness = new Float32Array(parameters.count * 3);
  // const insideColor = new THREE.Color(parameters.insideColor);
  // const outsideColor = new THREE.Color(parameters.outsideColor);

  // for (let i = 0; i < parameters.count; i++) {
  //   const i3 = i * 3;

  //   // Position
  //   const radius = Math.random() * parameters.radius;

  //   const branchAngle =
  //     ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

  //   const randomX =
  //     Math.pow(Math.random(), parameters.randomnessPower) *
  //     (Math.random() < 0.5 ? 1 : -1) *
  //     parameters.randomness *
  //     radius;
  //   const randomY =
  //     Math.pow(Math.random(), parameters.randomnessPower) *
  //     (Math.random() < 0.5 ? 1 : -1) *
  //     parameters.randomness *
  //     radius;
  //   const randomZ =
  //     Math.pow(Math.random(), parameters.randomnessPower) *
  //     (Math.random() < 0.5 ? 1 : -1) *
  //     parameters.randomness *
  //     radius;

  //   positions[i3] = Math.cos(branchAngle) * radius;
  //   positions[i3 + 1] = 0;
  //   positions[i3 + 2] = Math.sin(branchAngle) * radius;

  //   // Randomness
  //   randomness[i3] = randomX;
  //   randomness[i3 + 1] = randomY;
  //   randomness[i3 + 2] = randomZ;

  //   // Color
  //   const mixedColor = insideColor.clone();
  //   mixedColor.lerp(outsideColor, radius / parameters.radius);

  //   colors[i3] = mixedColor.r;
  //   colors[i3 + 1] = mixedColor.g;
  //   colors[i3 + 2] = mixedColor.b;

  //   // Scales
  //   scales[i] = Math.random();
  // }

  // geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  // geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  // geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  // geometry.setAttribute(
  //   "aRandomness",
  //   new THREE.BufferAttribute(randomness, 3)
  // );
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
  // points = new THREE.Points(geometry, material);
  // scene.add(points);
};

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
camera.position.y = distanceOfCamera *0.6;
camera.position.z = distanceOfCamera;

// create the GSAP timeline
const timeline = gsap.timeline();

// animate the camera position over 3 seconds


const cameraPointer = new THREE.Object3D();
// cameraPointer.add(new THREE.AxisHelper(1))
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
controls.enabled = false;
controls.enableDamping = true;
controls.enablePan = false;
controls.maxDistance = 8;
controls.minDistance = 6;

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
    
    
    controls.enabled = false;
    // intersects[0].object.add(cameraPointer)
    selectedModel = intersects[0].object
  rotateGalaxy = false;
 selectedModel.getWorldPosition(target = selectedModelPosition)
//  selectedModel.position.y = 3;
    timeline.to(camera.position, { duration: 2, x:selectedModelPosition.x, y:selectedModelPosition.y, z:selectedModelPosition.z });
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
  antialias:true,
  alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

generateGalaxy();


 
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  material.uniforms.uTime.value = elapsedTime;



  // Update controls
  // selectedModel ? cameraPointer.position.set(selectedModel.position.x, selectedModel.position.y, selectedModel.position.z) : cameraPointer.position.set(0,0,0)
  selectedModel ? controls.target.set(cameraPointer.getWorldPosition().x, cameraPointer.getWorldPosition().y, cameraPointer.getWorldPosition().z) : controls.target.set(0,0,0)  
  // selectedModel ?selectedModel.add(camera):
  controls.update();


  // Render
  renderer.render(scene, camera);

  // group.rotation.y -= rotateGalaxy? 0.001:0;

  for (let i = 0; i < models.length; i++) {
    models[i].rotation.y -= 0.002;
  }

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
