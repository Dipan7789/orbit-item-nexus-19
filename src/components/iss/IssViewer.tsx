
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Slider } from '@/components/ui/slider';

export const IssViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(15); // Default zoom level
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Load the 3D script
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/three@0.133.0/build/three.min.js';
    script.async = true;
    
    script.onload = initThreeJS;
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
      // Clean up any THREE.js resources if needed
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);
  
  // Apply zoom level changes to the scene
  useEffect(() => {
    const cameraUpdateEvent = new CustomEvent('update-camera', { detail: { zoom: zoomLevel } });
    window.dispatchEvent(cameraUpdateEvent);
  }, [zoomLevel]);
  
  const initThreeJS = () => {
    // Make sure THREE is loaded globally
    if (typeof THREE === 'undefined') return;
    
    const container = containerRef.current;
    if (!container) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 15;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // Add stars to the background
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });
    
    const starsVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = (Math.random() - 0.5) * 2000;
      starsVertices.push(x, y, z);
    }
    
    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);
    
    // Create Sun
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff00,
      emissive: 0xffff00,
      emissiveIntensity: 1
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.position.set(-50, 20, -100); // Positioned far away
    scene.add(sun);
    
    // Create a glow around the Sun
    const sunGlowGeometry = new THREE.SphereGeometry(7, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 0.2
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    sun.add(sunGlow);
    
    // Create Earth
    const earthGeometry = new THREE.SphereGeometry(3, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
      emissiveIntensity: 0.2,
      specular: 0x222222
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(-20, -10, -40); // Positioned further back
    scene.add(earth);
    
    // Cloud layer for Earth
    const earthCloudGeometry = new THREE.SphereGeometry(3.1, 32, 32);
    const earthCloudMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.3,
    });
    const earthClouds = new THREE.Mesh(earthCloudGeometry, earthCloudMaterial);
    earth.add(earthClouds);
    
    // Create a main ISS group that will contain the entire model
    const issGroup = new THREE.Group();
    scene.add(issGroup);
    
    // Main body
    const mainBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 6, 16),
      new THREE.MeshPhongMaterial({ color: 0xcccccc })
    );
    mainBody.rotation.z = Math.PI / 2;
    issGroup.add(mainBody);
    
    // Solar panels
    const solarPanel1 = createSolarPanel();
    solarPanel1.position.set(0, 3, 0);
    issGroup.add(solarPanel1);
    
    const solarPanel2 = createSolarPanel();
    solarPanel2.position.set(0, -3, 0);
    issGroup.add(solarPanel2);
    
    // Modules
    const module1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xaaaaaa })
    );
    module1.position.set(3, 0, 0);
    issGroup.add(module1);
    
    const module2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0x999999 })
    );
    module2.position.set(-3, 0, 0);
    issGroup.add(module2);
    
    // Add connector tubes
    const tube1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2, 16),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    tube1.position.set(2, 0, 0);
    tube1.rotation.z = Math.PI / 2;
    issGroup.add(tube1);
    
    const tube2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2, 16),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    tube2.position.set(-2, 0, 0);
    tube2.rotation.z = Math.PI / 2;
    issGroup.add(tube2);
    
    // Animation loop
    let animationFrame: number;
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      
      // Rotate the entire ISS model
      issGroup.rotation.y += 0.005;
      
      // Slowly rotate the Earth
      earth.rotation.y += 0.001;
      
      // Rotate the clouds slightly faster for effect
      earthClouds.rotation.y += 0.0015;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Set up zoom control
    window.addEventListener('update-camera', ((e: CustomEvent) => {
      const newZoom = e.detail.zoom;
      // Update camera position
      camera.position.z = 30 - newZoom;
      // Update camera
      camera.updateProjectionMatrix();
    }) as EventListener);

    // Handle scroll for zooming
    const handleScroll = (e: WheelEvent) => {
      // Update camera position based on scroll
      camera.position.z += e.deltaY * 0.05;
      camera.position.z = Math.max(5, Math.min(25, camera.position.z));
      
      // Update slider position (dispatch a custom event for the UI to catch)
      const newZoomLevel = 30 - camera.position.z;
      const zoomEvent = new CustomEvent('zoom-changed', { 
        detail: { zoom: newZoomLevel }
      });
      window.dispatchEvent(zoomEvent);
    };
    
    container.addEventListener('wheel', handleScroll);
    
    // Add orbit controls
    setupMouseControl(issGroup, camera, renderer);
    
    // Cleanup function for when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('update-camera', (() => {}) as EventListener);
      container.removeEventListener('wheel', handleScroll);
      cancelAnimationFrame(animationFrame);
      renderer.dispose();
    };
  };
  
  // Helper function to create solar panels
  function createSolarPanel() {
    const group = new THREE.Group();
    
    // Solar panel
    const panel = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.1, 2),
      new THREE.MeshPhongMaterial({ 
        color: 0x2266aa,
        emissive: 0x0033aa,
        emissiveIntensity: 0.2,
        specular: 0x111133
      })
    );
    group.add(panel);
    
    // Support arm
    const arm = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.1, 2, 8),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    arm.position.set(0, 0, 0);
    arm.rotation.x = Math.PI / 2;
    group.add(arm);
    
    return group;
  }
  
  // Setup mouse rotation controls
  function setupMouseControl(issGroup: any, camera: any, renderer: any) {
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      
      // Rotate the ISS model based on mouse movement
      issGroup.rotation.y += deltaMove.x * 0.01;
      issGroup.rotation.x += deltaMove.y * 0.01;
      
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
      
      renderer.render(scene, camera);
    };
    
    const handleMouseUp = () => {
      isDragging = false;
    };
    
    // Attach event listeners to renderer DOM element
    const element = renderer.domElement;
    element.addEventListener('mousedown', handleMouseDown, false);
    element.addEventListener('mousemove', handleMouseMove, false);
    element.addEventListener('mouseup', handleMouseUp, false);
    element.addEventListener('mouseleave', handleMouseUp, false);
    
    // Add touch support
    element.addEventListener('touchstart', (e: TouchEvent) => {
      if (e.touches.length === 1) {
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        isDragging = true;
      }
    }, false);
    
    element.addEventListener('touchmove', (e: TouchEvent) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaMove = {
          x: e.touches[0].clientX - previousMousePosition.x,
          y: e.touches[0].clientY - previousMousePosition.y
        };
        
        issGroup.rotation.y += deltaMove.x * 0.01;
        issGroup.rotation.x += deltaMove.y * 0.01;
        
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        
        renderer.render(scene, camera);
      }
    }, false);
    
    element.addEventListener('touchend', () => {
      isDragging = false;
    }, false);
  }

  // Listen for zoom changes from the 3D scene
  useEffect(() => {
    const handleZoomChange = (e: CustomEvent) => {
      setZoomLevel(e.detail.zoom);
    };
    
    window.addEventListener('zoom-changed', handleZoomChange as EventListener);
    return () => {
      window.removeEventListener('zoom-changed', handleZoomChange as EventListener);
    };
  }, []);
  
  return (
    <div className="relative h-full">
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        {/* 3D viewer will be rendered here */}
      </div>
      
      <div className="absolute bottom-4 left-4">
        <Alert className="bg-background/80 backdrop-blur-sm border max-w-xs">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-sm">Interactive Model</AlertTitle>
          <AlertDescription className="text-xs">
            Drag to rotate the ISS model. Scroll to zoom in/out of the scene.
          </AlertDescription>
        </Alert>
      </div>

      <div className="absolute bottom-4 right-4 w-40 bg-background/80 backdrop-blur-sm p-2 rounded-md border">
        <div className="text-xs mb-1 font-medium">Zoom</div>
        <Slider
          value={[zoomLevel]}
          min={1}
          max={25}
          step={1}
          onValueChange={(value) => setZoomLevel(value[0])}
        />
      </div>
    </div>
  );
};

// Add a THREE type declaration for TypeScript
declare global {
  interface Window {
    THREE: any;
  }
  const THREE: any;
  
  interface CustomEventInit {
    detail?: any;
  }
  
  interface CustomEvent {
    detail: any;
  }
}

export default IssViewer;
