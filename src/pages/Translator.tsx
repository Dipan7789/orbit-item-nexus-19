
import React from 'react';
import FutureFeature from './FutureFeature';
import { useIsMobile } from '@/hooks/use-mobile';

const Translator = () => {
  const isMobile = useIsMobile();
  
  return (
    <FutureFeature 
      feature="Multilingual Translator" 
      featureDescription={isMobile ? 
        "Real-time translation across languages" : 
        "A real-time translation layer for inventory labels, logs, and notes"
      }
    />
  );
};

export default Translator;
