// Fix for the scene reference and detail property issues in IssViewer.tsx

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const IssViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scene = useRef<THREE.Scene | null>(null);
  const camera = useRef<THREE.PerspectiveCamera | null>(null);
  const renderer = useRef<THREE.WebGLRenderer | null>(null);
  const controls = useRef<OrbitControls | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize scene, camera, and renderer
    scene.current = new THREE.Scene();
    camera.current = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.current.position.z = 5;

    renderer.current = new THREE.WebGLRenderer({ alpha: true });
    renderer.current.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.current.domElement);

    // Orbit controls
    controls.current = new OrbitControls(camera.current, renderer.current.domElement);
    controls.current.enableDamping = true;
    controls.current.dampingFactor = 0.05;
    controls.current.screenSpacePanning = false;
    controls.current.minDistance = 3;
    controls.current.maxDistance = 7;
    controls.current.maxPolarAngle = Math.PI / 2;

    // Load ISS model
    const loader = new GLTFLoader();
    loader.load('/iss_model/scene.gltf', (gltf) => {
      if (scene.current) {
        gltf.scene.scale.set(0.01, 0.01, 0.01);
        scene.current.add(gltf.scene);
        // Store the scene for later use in zoom handler
        (window as any).scene = scene.current;
      }
    }, undefined, (error) => {
      console.error('An error happened while loading the ISS model:', error);
    });

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.current.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.current.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      controls.current?.update();

      renderer.current?.render(scene.current as THREE.Scene, camera.current as THREE.PerspectiveCamera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (camera.current && renderer.current) {
        camera.current.aspect = container.clientWidth / container.clientHeight;
        camera.current.updateProjectionMatrix();
        renderer.current.setSize(container.clientWidth, container.clientHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Handle zoom
    const handleZoom = (event: WheelEvent) => {
      const delta = event.deltaY;
      // Use the scene from the current scope, not from the global scope
      const currentScene = scene.current || (window as any).scene; // Access scene correctly

      if (!currentScene) return;

      currentScene.traverse((object: any) => {
        if (object.isMesh) {
          object.rotation.x += delta * 0.0005;
          object.rotation.y += delta * 0.0005;
        }
      });
    };

    container.addEventListener('wheel', handleZoom);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('wheel', handleZoom);

      // Dispose of resources
      if (scene.current) {
        scene.current.dispose();
      }
      if (renderer.current) {
        renderer.current.dispose();
        container.removeChild(renderer.current.domElement);
      }
    };
  }, []);

  // Fix for the interface declaration with duplicate detail property
  interface CustomEvent<T = any> extends Event {
    detail?: T;
    // Remove duplicate detail property to fix TS error
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '500px' }}></div>
  );
};

export default IssViewer;
