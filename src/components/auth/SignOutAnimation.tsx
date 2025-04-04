
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SignOutAnimationProps {
  onComplete?: () => void;
}

const SignOutAnimation: React.FC<SignOutAnimationProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    // Typewriter effect for message
    const fullMessage = "Safe travels, Commander.";
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < fullMessage.length) {
        setMessage(prev => prev + fullMessage[index]);
        index++;
      } else {
        clearInterval(interval);
        
        // Navigate after animation completes
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            navigate('/signin');
          }
        }, 2000);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [navigate, onComplete]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Spaceship parameters
    let shipX = canvas.width / 2;
    let shipY = canvas.height / 2;
    let shipAngle = -Math.PI / 2; // Pointing upward
    let thrusterSize = 0;
    let speed = 0;
    const maxSpeed = 15;
    
    // Stars
    const stars = Array(100).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speed: Math.random() * 0.5 + 0.1
    }));
    
    const drawStars = () => {
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
        
        // Move stars downward for the effect of ship rising
        star.y += star.speed + speed * 0.2;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
    };
    
    const drawShip = () => {
      ctx.save();
      ctx.translate(shipX, shipY);
      ctx.rotate(shipAngle);
      
      // Draw ship body
      ctx.beginPath();
      ctx.moveTo(0, -20);
      ctx.lineTo(10, 10);
      ctx.lineTo(0, 0);
      ctx.lineTo(-10, 10);
      ctx.closePath();
      ctx.fillStyle = '#e0e0e0';
      ctx.fill();
      ctx.strokeStyle = '#4a5568';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw window
      ctx.beginPath();
      ctx.arc(0, -5, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#63b3ed';
      ctx.fill();
      ctx.strokeStyle = '#2b6cb0';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw thrusters
      if (thrusterSize > 0) {
        ctx.beginPath();
        ctx.moveTo(-5, 10);
        ctx.lineTo(0, 10 + thrusterSize);
        ctx.lineTo(5, 10);
        
        const gradient = ctx.createLinearGradient(0, 10, 0, 10 + thrusterSize);
        gradient.addColorStop(0, '#f56565');
        gradient.addColorStop(0.5, '#ed8936');
        gradient.addColorStop(1, '#ecc94b');
        
        ctx.fillStyle = gradient;
        ctx.fill();
      }
      
      ctx.restore();
    };
    
    let frameCount = 0;
    const totalFrames = 180; // 3 seconds at 60fps
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawStars();
      
      if (frameCount < totalFrames) {
        // First phase: warming up engines
        if (frameCount < 60) {
          thrusterSize = Math.sin(frameCount * 0.1) * 5 + 5;
          speed = frameCount * 0.02;
        } 
        // Second phase: accelerating
        else {
          thrusterSize = 20 + Math.sin(frameCount * 0.2) * 5;
          speed = Math.min(maxSpeed, speed + 0.3);
          shipY -= speed;
        }
        
        drawShip();
        frameCount++;
        requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    return () => {
      // Cleanup if needed
    };
  }, []);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-50">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10 text-center p-8">
        <h2 className="text-2xl font-mono text-blue-300 mt-64">
          {message}<span className="animate-pulse">_</span>
        </h2>
      </div>
    </div>
  );
};

export default SignOutAnimation;
