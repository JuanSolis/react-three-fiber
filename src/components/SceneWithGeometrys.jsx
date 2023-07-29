import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function SceneWithGeometrys() {
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

    camera.position.z = 12;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Cubo
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.3,
        wireframe: true,
      })
    );

    scene.add(cube);

    // Sphere

    // Texture Loader
    const textureLoader = new THREE.TextureLoader();
    const matcap = textureLoader.load("./textures/mapcat2.png");
    const geometrySphere = new THREE.SphereGeometry(1, 32, 16);
    const materialSphere = new THREE.MeshMatcapMaterial({
      matcap: matcap,
    });
    const sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.set(0, 1.5, 0);
    scene.add(sphere);

    // TorusKnot

    const geometryTorusKnot = new THREE.TorusKnotGeometry(0.5, 0.18, 100, 16);
    const materialTorusKnot = new THREE.MeshNormalMaterial({
      flatShading: true,
    });
    const torusKnot = new THREE.Mesh(geometryTorusKnot, materialTorusKnot);
    torusKnot.position.set(0, -1.5, 0);
    scene.add(torusKnot);

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

export default SceneWithGeometrys;
