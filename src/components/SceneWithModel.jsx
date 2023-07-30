import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function SceneWithModel() {
  const mountRef = useRef(null);
  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    const currentMount = mountRef.current;
    // Camera
    const camera = new THREE.PerspectiveCamera(
      25,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );

    camera.position.z = 150;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.target.y = 1;

    // Resize

    const resize = () => {
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", resize);

    // Light

    const AO = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(AO);

    const pointLight = new THREE.PointLight(0xffffff, 1.3);
    pointLight.position.y = 2;
    // scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Environment Light

    const environmentMap = new THREE.CubeTextureLoader();
    const envMap = environmentMap.load([
      "./textures/envmap/px.png",
      "./textures/envmap/nx.png",
      "./textures/envmap/py.png",
      "./textures/envmap/ny.png",
      "./textures/envmap/pz.png",
      "./textures/envmap/nz.png",
    ]);

    scene.environment = envMap;
    scene.background = envMap;

    // Model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load("./Models/cartoonCar/scene.gltf", (gltf) => {
      gltf.scene.scale.set(10, 10, 10);
      scene.add(gltf.scene);
    });
    // Renderer the scene
    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Clean Up

    return () => {
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
}
export default SceneWithModel;
