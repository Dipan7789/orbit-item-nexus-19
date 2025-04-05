
import React, { useEffect, useRef } from 'react';

const StarsBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars(); // Regenerate stars when resizing
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Stars array
    let stars: { x: number; y: number; radius: number; opacity: number; speed: number }[] = [];
    
    // Create stars
    function createStars() {
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 3000);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.01
        });
      }
    }
    
    // Animation loop
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Move star
        star.y += star.speed;
        
        // Reset star position if it goes off-screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default StarsBackground;
