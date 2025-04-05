import React, { useEffect, useRef } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const IssViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
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
    
    // Create a simple ISS model (in a real app, we'd load a detailed model)
    // Main body
    const mainBody = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.5, 6, 16),
      new THREE.MeshPhongMaterial({ color: 0xcccccc })
    );
    mainBody.rotation.z = Math.PI / 2;
    scene.add(mainBody);
    
    // Solar panels
    const solarPanel1 = createSolarPanel();
    solarPanel1.position.set(0, 3, 0);
    scene.add(solarPanel1);
    
    const solarPanel2 = createSolarPanel();
    solarPanel2.position.set(0, -3, 0);
    scene.add(solarPanel2);
    
    // Modules
    const module1 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0xaaaaaa })
    );
    module1.position.set(3, 0, 0);
    scene.add(module1);
    
    const module2 = new THREE.Mesh(
      new THREE.SphereGeometry(1, 16, 16),
      new THREE.MeshPhongMaterial({ color: 0x999999 })
    );
    module2.position.set(-3, 0, 0);
    scene.add(module2);
    
    // Add connector tubes
    const tube1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2, 16),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    tube1.position.set(2, 0, 0);
    tube1.rotation.z = Math.PI / 2;
    scene.add(tube1);
    
    const tube2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 2, 16),
      new THREE.MeshPhongMaterial({ color: 0x888888 })
    );
    tube2.position.set(-2, 0, 0);
    tube2.rotation.z = Math.PI / 2;
    scene.add(tube2);
    
    // Animation loop
    let animationFrame: number;
    const animate = () => {
      animationFrame = requestAnimationFrame(animate);
      
      // Rotate the entire ISS model
      scene.rotation.y += 0.005;
      
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
    
    // Add orbit controls
    setupMouseControl(scene, camera, renderer);
    
    // Cleanup function for when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
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
      new THREE.MeshPhongMaterial({ color: 0x2266aa })
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
  function setupMouseControl(scene, camera, renderer) {
    let isDragging = false;
    let previousMousePosition = {
      x: 0,
      y: 0
    };
    
    const handleMouseDown = (e) => {
      isDragging = true;
    };
    
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y
      };
      
      // Rotate the scene based on mouse movement
      scene.rotation.y += deltaMove.x * 0.01;
      scene.rotation.x += deltaMove.y * 0.01;
      
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
    element.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY
        };
        isDragging = true;
      }
    }, false);
    
    element.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaMove = {
          x: e.touches[0].clientX - previousMousePosition.x,
          y: e.touches[0].clientY - previousMousePosition.y
        };
        
        scene.rotation.y += deltaMove.x * 0.01;
        scene.rotation.x += deltaMove.y * 0.01;
        
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
            Drag to rotate the ISS model. This is a simplified 3D representation.
          </AlertDescription>
        </Alert>
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
}
