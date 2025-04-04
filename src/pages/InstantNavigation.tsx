
import React from 'react';
import InstantNavigation from '@/components/navigation/InstantNavigation';
import { IssViewer } from '@/components/iss/IssViewer';

const InstantNavigationPage = () => {
  const handleNavigate = (locationId: string) => {
    console.log('Navigating to:', locationId);
    // In a real application, this would update the 3D view position
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Instant Navigation Panel</h1>
        <p className="text-muted-foreground">
          Jump to any ISS module or storage location instantly, like Doraemon's "Anywhere Door"
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <InstantNavigation onNavigate={handleNavigate} />
        </div>
        <div className="border rounded-lg shadow-sm overflow-hidden h-[600px]">
          <IssViewer />
        </div>
      </div>
    </div>
  );
};

export default InstantNavigationPage;
