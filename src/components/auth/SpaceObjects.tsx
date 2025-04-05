
import React, { useEffect, useRef } from 'react';
import { Rocket, Satellite, Moon, Sun } from 'lucide-react';

const SpaceObjects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      const objects = container.querySelectorAll('.space-object');
      
      objects.forEach((obj, index) => {
        const factor = 1 - (index * 0.1);
        const htmlObj = obj as HTMLElement;
        htmlObj.style.transform = `translate(${x * 20 * factor}px, ${y * 20 * factor}px)`;
      });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="space-object absolute top-[10%] left-[15%] transition-transform duration-200 ease-out">
        <Moon className="w-8 h-8 text-blue-200 animate-float opacity-80" />
      </div>
      <div className="space-object absolute top-[20%] right-[20%] transition-transform duration-200 ease-out">
        <Satellite className="w-10 h-10 text-blue-300 animate-float opacity-90" style={{ animationDelay: "0.5s" }} />
      </div>
      <div className="space-object absolute bottom-[20%] left-[25%] transition-transform duration-200 ease-out">
        <Rocket className="w-12 h-12 text-indigo-400 animate-float opacity-90" style={{ animationDelay: "1s" }} />
      </div>
      <div className="space-object absolute top-[70%] right-[15%] transition-transform duration-200 ease-out">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-400 to-yellow-200 animate-pulse-slow opacity-70" />
      </div>
      <div className="space-object absolute top-[40%] left-[60%] transition-transform duration-200 ease-out">
        <div className="w-4 h-4 rounded-full bg-white animate-pulse-slow opacity-50" style={{ animationDelay: "1.5s" }} />
      </div>
      <div className="space-object absolute top-[30%] left-[40%] transition-transform duration-200 ease-out">
        <div className="w-3 h-3 rounded-full bg-white animate-pulse-slow opacity-30" style={{ animationDelay: "0.7s" }} />
      </div>
      <div className="space-object absolute top-[60%] right-[30%] transition-transform duration-200 ease-out">
        <div className="w-5 h-5 rounded-full bg-white animate-pulse-slow opacity-60" style={{ animationDelay: "1.2s" }} />
      </div>
    </div>
  );
};

export default SpaceObjects;
