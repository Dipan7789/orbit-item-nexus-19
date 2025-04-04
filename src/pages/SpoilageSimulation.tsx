
import React from 'react';
import SpoilageSimulation from '@/components/simulation/SpoilageSimulation';

const SpoilageSimulationPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Spoilage Simulation System</h1>
        <p className="text-muted-foreground">
          Visually predict item degradation and expiry over time with "Time Cloth" technology
        </p>
      </div>
      
      <SpoilageSimulation />
    </div>
  );
};

export default SpoilageSimulationPage;
