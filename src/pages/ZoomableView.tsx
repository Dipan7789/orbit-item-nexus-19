
import React from 'react';
import FutureFeature from './FutureFeature';
import { useIsMobile } from '@/hooks/use-mobile';

const ZoomableView = () => {
  const isMobile = useIsMobile();
  
  return (
    <FutureFeature 
      feature="Zoomable 3D View" 
      featureDescription={isMobile ? 
        "Zoom into inventory areas on any device" : 
        "Enables zooming into or out of specific inventory areas, containers, or even individual items"
      }
    />
  );
};

export default ZoomableView;
