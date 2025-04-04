
import React, { useEffect, useRef } from 'react';

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Initialize the background scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateStars();
    };

    // Stars configuration
    let stars: { x: number; y: number; size: number; opacity: number; speed: number }[] = [];
    
    const generateStars = () => {
      stars = [];
      const starCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 1000), 500);
      
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.01
        });
      }
    };

    // Floating planet
    const planetRadius = Math.min(canvas.width, canvas.height) * 0.2;
    const planetX = canvas.width + planetRadius * 1.5;
    const planetY = canvas.height * 0.3;
    let planetAngle = 0;

    // Render the scene
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the deep space background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0d1e');
      gradient.addColorStop(0.5, '#141a33');
      gradient.addColorStop(1, '#1a1a2e');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebula effects
      const nebulaGradient = ctx.createRadialGradient(
        canvas.width * 0.8, canvas.height * 0.2, 0,
        canvas.width * 0.8, canvas.height * 0.2, canvas.width * 0.6
      );
      nebulaGradient.addColorStop(0, 'rgba(86, 24, 128, 0.2)');
      nebulaGradient.addColorStop(0.5, 'rgba(86, 24, 128, 0.05)');
      nebulaGradient.addColorStop(1, 'rgba(86, 24, 128, 0)');
      ctx.fillStyle = nebulaGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Move stars slightly for parallax effect
        star.x -= star.speed;
        
        // Reset star position when it moves off-screen
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * canvas.height;
        }
      });
      
      // Slowly move the planet into view
      if (planetX > canvas.width * 0.75) {
        planetX -= 0.2;
      }
      
      // Draw the planet
      planetAngle += 0.001;
      
      // Planet body
      const planetGradient = ctx.createLinearGradient(
        planetX - planetRadius, planetY,
        planetX + planetRadius, planetY
      );
      planetGradient.addColorStop(0, '#1a237e');
      planetGradient.addColorStop(0.5, '#3949ab');
      planetGradient.addColorStop(1, '#5c6bc0');
      
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius, 0, Math.PI * 2);
      ctx.fillStyle = planetGradient;
      ctx.fill();
      
      // Planet atmosphere glow
      ctx.beginPath();
      ctx.arc(planetX, planetY, planetRadius + 5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120, 143, 237, 0.1)';
      ctx.fill();
      
      // Planet surface details
      for (let i = 0; i < 5; i++) {
        const angle = planetAngle + (Math.PI * 2 / 5) * i;
        const x = planetX + Math.cos(angle) * planetRadius * 0.7;
        const y = planetY + Math.sin(angle) * planetRadius * 0.7;
        const size = planetRadius * (0.1 + Math.random() * 0.1);
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fill();
      }
      
      // Rings
      ctx.beginPath();
      ctx.ellipse(
        planetX, planetY,
        planetRadius * 1.5, planetRadius * 0.3,
        planetAngle, 0, Math.PI * 2
      );
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 4;
      ctx.stroke();
      
      requestAnimationFrame(animate);
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
    
    // Add parallax effect on mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // Calculate the position in relation to the center of the screen
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const offsetX = (mouseX - centerX) / 50;
      const offsetY = (mouseY - centerY) / 50;
      
      // Apply parallax to stars based on their size (depth)
      stars.forEach(star => {
        star.x += star.size * offsetX * 0.01;
        star.y += star.size * offsetY * 0.01;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default SpaceBackground;
