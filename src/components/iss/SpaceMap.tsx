
import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, Info, Map, Satellite } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface IssPosition {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: string;
}

export const SpaceMap: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(1);
  const [issPosition, setIssPosition] = useState<IssPosition>({
    latitude: 0, 
    longitude: 0, 
    altitude: 420, 
    velocity: 27600,
    timestamp: new Date().toISOString()
  });
  const [showDetails, setShowDetails] = useState(false);
  
  // Simulate loading and fetching ISS position
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      fetchIssPosition();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Simulate fetching ISS position data
  const fetchIssPosition = () => {
    // In a real application, this would fetch from an API
    // For demonstration, we'll simulate orbital motion
    setInterval(() => {
      const now = new Date();
      // Simulate orbital movement (simplified circular orbit around Earth)
      const timeOffset = now.getTime() / 1000 / 30; // Use time to animate position
      
      const latitude = 51.5 * Math.sin(timeOffset);
      const longitude = (timeOffset * 5) % 360 - 180;
      
      setIssPosition({
        latitude,
        longitude,
        altitude: 420 + (Math.sin(timeOffset * 0.5) * 10), // Small altitude variation
        velocity: 27600 + (Math.sin(timeOffset) * 200), // Small velocity variation
        timestamp: now.toISOString()
      });
    }, 1000);
  };
  
  // Initialize and update the map
  useEffect(() => {
    if (!isLoading && canvasRef.current && containerRef.current) {
      drawSpaceMap();
    }
  }, [isLoading, issPosition, zoom]);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!isLoading) {
        drawSpaceMap();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isLoading, issPosition, zoom]);
  
  const drawSpaceMap = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Simulate a 2D rendering context (in a real implementation, this would use a mapping library)
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = containerRef.current?.clientWidth || 800;
    canvas.height = containerRef.current?.clientHeight || 600;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw space background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#000510');
    gradient.addColorStop(1, '#001030');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw stars
    ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 500; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Draw Earth
    const earthRadius = 150 * zoom;
    const earthX = canvas.width / 2;
    const earthY = canvas.height / 2;
    
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
    const earthGradient = ctx.createRadialGradient(
      earthX, earthY, earthRadius * 0.8,
      earthX, earthY, earthRadius
    );
    earthGradient.addColorStop(0, '#006994');
    earthGradient.addColorStop(1, '#00305a');
    ctx.fillStyle = earthGradient;
    ctx.fill();
    
    // Draw continents (simplified)
    ctx.fillStyle = 'rgba(0, 150, 70, 0.6)';
    
    // North America
    ctx.beginPath();
    ctx.ellipse(
      earthX - earthRadius * 0.3, 
      earthY - earthRadius * 0.3, 
      earthRadius * 0.3, 
      earthRadius * 0.2, 
      0, 0, Math.PI * 2
    );
    ctx.fill();
    
    // South America
    ctx.beginPath();
    ctx.ellipse(
      earthX - earthRadius * 0.15, 
      earthY + earthRadius * 0.2, 
      earthRadius * 0.15, 
      earthRadius * 0.3, 
      0, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Europe/Africa
    ctx.beginPath();
    ctx.ellipse(
      earthX + earthRadius * 0.1, 
      earthY, 
      earthRadius * 0.15, 
      earthRadius * 0.4, 
      0, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Asia/Australia
    ctx.beginPath();
    ctx.ellipse(
      earthX + earthRadius * 0.35, 
      earthY - earthRadius * 0.1, 
      earthRadius * 0.3, 
      earthRadius * 0.25, 
      0, 0, Math.PI * 2
    );
    ctx.fill();
    
    // Draw orbit path
    ctx.beginPath();
    ctx.ellipse(
      earthX, 
      earthY, 
      earthRadius * 1.5, 
      earthRadius * 1.5, 
      0, 0, Math.PI * 2
    );
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.setLineDash([]);
    
    // Calculate ISS position on the map
    const angle = (issPosition.longitude + 180) * (Math.PI / 180);
    const orbitRadius = earthRadius * 1.5;
    const issX = earthX + Math.cos(angle) * orbitRadius;
    const issY = earthY + Math.sin(angle) * orbitRadius;
    
    // Draw ISS trajectory (past positions)
    ctx.beginPath();
    ctx.arc(issX, issY, 2, 0, Math.PI * 2);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    
    // Draw ISS
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(issX, issY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw ISS solar panels
    ctx.strokeStyle = '#AACCFF';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(issX - 10, issY);
    ctx.lineTo(issX + 10, issY);
    ctx.stroke();
    
    // Label ISS
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('ISS', issX, issY - 12);
  };
  
  return (
    <div className="relative h-full" ref={containerRef}>
      {isLoading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <div className="text-xl font-bold text-white mb-4">Loading Space Map</div>
          <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
          <div className="text-sm text-muted-foreground mt-4">
            Establishing connection to ISS tracking...
          </div>
        </div>
      ) : (
        <>
          <canvas ref={canvasRef} className="w-full h-full" />
          
          <div className="absolute top-4 left-4 space-y-2">
            <div className="flex items-center space-x-2 bg-background/80 backdrop-blur-sm p-2 rounded-md">
              <span className="text-xs">Zoom</span>
              <Slider
                value={[zoom]}
                min={0.5}
                max={2}
                step={0.1}
                onValueChange={([value]) => setZoom(value)}
                className="w-32"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-background/80 backdrop-blur-sm"
                onClick={() => setZoom(1)}
              >
                Reset View
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="icon" 
                      variant="secondary" 
                      className="bg-background/80 backdrop-blur-sm"
                      onClick={() => setShowDetails(!showDetails)}
                    >
                      <Info size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show/Hide Details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 w-72">
            <Alert className="bg-background/80 backdrop-blur-sm border-amber-500">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-amber-500">Placeholder Visualization</AlertTitle>
              <AlertDescription className="text-xs">
                This is a placeholder. In a real implementation, this would use a mapping library with real ISS tracking data.
              </AlertDescription>
            </Alert>
          </div>
          
          <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-md">
            <div className="flex items-center gap-2 mb-1">
              <Satellite className="h-4 w-4 text-primary" />
              <div className="text-sm font-medium">ISS Position</div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <div><span className="text-muted-foreground">Latitude:</span> {issPosition.latitude.toFixed(2)}°</div>
              <div><span className="text-muted-foreground">Longitude:</span> {issPosition.longitude.toFixed(2)}°</div>
              <div><span className="text-muted-foreground">Altitude:</span> {issPosition.altitude.toFixed(1)} km</div>
              <div><span className="text-muted-foreground">Velocity:</span> {(issPosition.velocity / 1000).toFixed(1)} km/s</div>
            </div>
          </div>
          
          {showDetails && (
            <div className="absolute top-4 right-4 w-72 bg-background/80 backdrop-blur-sm p-3 rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <Map className="h-4 w-4 text-primary" />
                <div className="text-sm font-medium">Trajectory Information</div>
              </div>
              <div className="space-y-1 text-xs">
                <div><span className="text-muted-foreground">Orbital Period:</span> 92 minutes</div>
                <div><span className="text-muted-foreground">Inclination:</span> 51.6°</div>
                <div><span className="text-muted-foreground">Eccentricity:</span> 0.0004</div>
                <div><span className="text-muted-foreground">Ground Track:</span> Repeats every 3 days</div>
                <div><span className="text-muted-foreground">Next Visible Pass:</span> In 5h 32m</div>
                <div><span className="text-muted-foreground">Last Updated:</span> {new Date().toLocaleTimeString()}</div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
