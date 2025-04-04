
import React from 'react';
import FutureFeature from './FutureFeature';
import { useIsMobile } from '@/hooks/use-mobile';

const EventPredictor = () => {
  const isMobile = useIsMobile();
  
  return (
    <FutureFeature 
      feature="Space Event Predictor" 
      featureDescription={isMobile ? 
        "Alert system for space events" : 
        "Uses real-time space weather data and AI predictions to alert users about incoming space hazards"
      }
    />
  );
};

export default EventPredictor;
