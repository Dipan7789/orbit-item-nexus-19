
import React, { useRef, useEffect } from 'react';
import { StorageContainer } from '@/types/inventory';

interface StorageCubeProps {
  container: StorageContainer;
  fillPercentage: number;
  onClick?: () => void;
  isSelected?: boolean;
}

const StorageCube: React.FC<StorageCubeProps> = ({ 
  container, 
  fillPercentage, 
  onClick,
  isSelected = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Get dimensions (normalize to fit canvas while maintaining proportions)
    const maxDimension = Math.max(container.width_cm, container.depth_cm, container.height_cm);
    const scale = 100 / maxDimension;
    
    const width = container.width_cm * scale;
    const height = container.height_cm * scale;
    const depth = container.depth_cm * scale;
    
    // Center position
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw 3D box (isometric view)
    const colorFill = fillPercentage === 0 ? '#10B981' : 
                      fillPercentage < 70 ? '#F59E0B' : 
                      '#EF4444';
    
    // Highlighted border for selected container
    if (isSelected) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#3B82F6';
    } else {
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#64748B';
    }
    
    // Front face
    ctx.fillStyle = colorFill;
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.moveTo(centerX - width/2, centerY - height/3);
    ctx.lineTo(centerX + width/2, centerY - height/3);
    ctx.lineTo(centerX + width/2, centerY + height*2/3);
    ctx.lineTo(centerX - width/2, centerY + height*2/3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Right face
    ctx.fillStyle = colorFill;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(centerX + width/2, centerY - height/3);
    ctx.lineTo(centerX + width/2 + depth/3, centerY - height/3 - depth/6);
    ctx.lineTo(centerX + width/2 + depth/3, centerY + height*2/3 - depth/6);
    ctx.lineTo(centerX + width/2, centerY + height*2/3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Top face
    ctx.fillStyle = colorFill;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(centerX - width/2, centerY - height/3);
    ctx.lineTo(centerX + width/2, centerY - height/3);
    ctx.lineTo(centerX + width/2 + depth/3, centerY - height/3 - depth/6);
    ctx.lineTo(centerX - width/2 + depth/3, centerY - height/3 - depth/6);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    // Draw fill level if not empty
    if (fillPercentage > 0) {
      const fillHeight = height * (fillPercentage / 100);
      
      ctx.fillStyle = colorFill;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.moveTo(centerX - width/2, centerY + height*2/3 - fillHeight);
      ctx.lineTo(centerX + width/2, centerY + height*2/3 - fillHeight);
      ctx.lineTo(centerX + width/2, centerY + height*2/3);
      ctx.lineTo(centerX - width/2, centerY + height*2/3);
      ctx.closePath();
      ctx.fill();
    }
    
    // Display container ID
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#000';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    const idText = container.container_id.length > 8 ? 
      `${container.container_id.substring(0, 8)}...` : 
      container.container_id;
    ctx.fillText(idText, centerX, centerY + height*2/3 + 15);
    
    // Display fill percentage
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`${fillPercentage}%`, centerX, centerY);
    
  }, [container, fillPercentage, isSelected]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={150} 
      height={150}
      className={`cursor-pointer transition-all ${isSelected ? 'shadow-lg scale-105' : 'hover:shadow-md hover:scale-102'}`}
      onClick={onClick}
    />
  );
};

export default StorageCube;
