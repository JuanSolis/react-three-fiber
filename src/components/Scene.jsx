import React, { useEffect, useRef } from "react";
import * as THREE from "three";

function Scene() {
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

    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
  }, []);

  return (
    <div
      className="Contenedor3D"
      ref={mountRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
}

export default Scene;
