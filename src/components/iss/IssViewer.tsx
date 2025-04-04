
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export const IssViewer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('exterior');
  const [rotationSpeed, setRotationSpeed] = useState(50);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newValue = prev + Math.random() * 10;
        if (newValue >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return newValue;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    if (!isLoading && canvasRef.current && containerRef.current) {
      initializeIssViewer();
    }
  }, [isLoading]);
  
  const initializeIssViewer = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Simulate a 3D rendering context (in a real implementation, this would use Three.js)
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = containerRef.current?.clientWidth || 800;
    canvas.height = containerRef.current?.clientHeight || 600;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw a gradient background (space)
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#000510');
    gradient.addColorStop(1, '#001030');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw some stars
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 300; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw Earth
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height + 300, 400, 0, Math.PI * 2);
    const earthGradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height + 300, 300,
      canvas.width / 2, canvas.height + 300, 400
    );
    earthGradient.addColorStop(0, '#006994');
    earthGradient.addColorStop(1, '#001030');
    ctx.fillStyle = earthGradient;
    ctx.fill();
    
    // Draw clouds
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 10; i++) {
      const x = (canvas.width / 2) + Math.random() * 200 - 100;
      const y = canvas.height + 200 + Math.random() * 100 - 50;
      const radiusX = 30 + Math.random() * 50;
      const radiusY = 20 + Math.random() * 30;
      
      ctx.beginPath();
      ctx.ellipse(x, y, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    
    // Draw a simplified ISS
    const issX = canvas.width / 2;
    const issY = canvas.height / 2;
    
    // Main body
    ctx.fillStyle = '#CCCCCC';
    ctx.fillRect(issX - 100, issY - 20, 200, 40);
    
    // Solar panels
    ctx.fillStyle = '#3366CC';
    ctx.fillRect(issX - 150, issY - 60, 40, 120); // Left panel
    ctx.fillRect(issX + 110, issY - 60, 40, 120); // Right panel
    
    // Module connectors
    ctx.fillStyle = '#999999';
    ctx.fillRect(issX - 125, issY - 10, 25, 20); // Left connector
    ctx.fillRect(issX + 100, issY - 10, 25, 20); // Right connector
    
    // Modules
    ctx.fillStyle = '#DDDDDD';
    ctx.fillRect(issX - 100, issY - 30, 50, 60); // Left module
    ctx.fillRect(issX + 50, issY - 30, 50, 60); // Right module
    
    // Label
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('International Space Station', issX, issY + 80);
    
    // Note: In a real implementation, this would use Three.js to render a 3D model
    // that can be rotated and zoomed. This is a simplified placeholder.
  };
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isLoading) {
        initializeIssViewer();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoading]);
  
  // Mouse event handlers for better hover interaction
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  // Add mouse leave handler to handle cases where mouse up occurs outside the component
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);
  
  return (
    <div 
      className="relative h-full" 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <div className="text-xl font-bold text-white mb-4">Loading ISS Model</div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-muted-foreground mt-2">
            {Math.round(loadingProgress)}% Complete
          </div>
        </div>
      ) : (
        <>
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          />
          
          <div className="absolute top-4 left-4 space-y-2 pointer-events-auto">
            <div className="w-48">
              <Select value={viewMode} onValueChange={setViewMode}>
                <SelectTrigger className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
                  <SelectValue placeholder="View Mode" />
                </SelectTrigger>
                <SelectContent className="bg-background/95 backdrop-blur-sm">
                  <SelectItem value="exterior">Exterior View</SelectItem>
                  <SelectItem value="interior">Interior View</SelectItem>
                  <SelectItem value="xray">X-Ray View</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm p-2 rounded-md hover:bg-background/90 transition-colors">
              <span className="text-xs">Rotation</span>
              <Slider
                value={[rotationSpeed]}
                min={0}
                max={100}
                step={1}
                onValueChange={([value]) => setRotationSpeed(value)}
                className="w-32"
              />
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
                Reset View
              </Button>
              <Button size="sm" variant="secondary" className="bg-background/80 backdrop-blur-sm hover:bg-background/90 transition-colors">
                Screenshot
              </Button>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 w-72 pointer-events-auto">
            <Alert className="bg-background/80 backdrop-blur-sm border-amber-500 hover:bg-background/90 transition-colors">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">Placeholder Visualization</AlertTitle>
              <AlertDescription className="text-xs">
                This is a placeholder for a 3D model. In a real implementation, this would use Three.js to render an interactive 3D model of the ISS.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md hover:bg-background/90 transition-colors pointer-events-auto">
            <div className="text-xs text-muted-foreground">
              Altitude: 420 km • Velocity: 27,600 km/h • Orbit: 92 min
            </div>
          </div>
        </>
      )}
    </div>
  );
};
