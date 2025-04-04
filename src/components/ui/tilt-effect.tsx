
import React, { useState, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TiltEffectProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  speed?: number;
  perspective?: number;
}

const TiltEffect: React.FC<TiltEffectProps> = ({
  children,
  className,
  maxTilt = 10,
  scale = 1.03,
  speed = 400,
  perspective = 1000,
}) => {
  const [transform, setTransform] = useState('');
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPercentage = mouseX / width;
    const yPercentage = mouseY / height;
    
    const xRotation = maxTilt * (0.5 - yPercentage);
    const yRotation = maxTilt * (xPercentage - 0.5);
    
    setTransform(`
      perspective(${perspective}px)
      rotateX(${xRotation}deg)
      rotateY(${yRotation}deg)
      scale(${scale})
    `);
  };

  const handleMouseLeave = () => {
    setTransform('');
  };

  return (
    <div
      className={cn(
        "transition-transform",
        className
      )}
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: transform,
        transition: transform === '' ? `transform ${speed}ms ease-out` : 'none',
      }}
    >
      {children}
    </div>
  );
};

export default TiltEffect;
