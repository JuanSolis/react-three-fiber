import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function SceneWithCube() {
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

    camera.position.z = 15;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Cubo

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const map = textureLoader.load(
      "./textures/groundDirt/Ground_Dirt_008_baseColor.jpg"
    );

    const AOmap = textureLoader.load(
      "./textures/groundDirt/Ground_Dirt_008_ambientOcclusion.jpg"
    );

    const roughnessMap = textureLoader.load(
      "./textures/groundDirt/Ground_Dirt_008_roughness.jpg"
    );

    const normalMap = textureLoader.load(
      "./textures/groundDirt/Ground_Dirt_008_normal.jpg"
    );

    const heightMap = textureLoader.load(
      "./textures/groundDirt/Ground_Dirt_008_height.png"
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1, 250, 250, 250);
    const material = new THREE.MeshStandardMaterial({
      map: map,
      aoMap: AOmap,
      roughnessMap: roughnessMap,
      normalMap: normalMap,
      displacementMap: heightMap,
      displacementScale: 0.08,
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.scale.set(3, 3, 3);
    scene.add(cube);

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

export default SceneWithCube;
