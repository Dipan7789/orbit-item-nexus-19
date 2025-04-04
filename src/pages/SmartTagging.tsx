
import React from 'react';
import SmartTagging from '@/components/tagging/SmartTagging';

const SmartTaggingPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Smart Tagging Tool</h1>
        <p className="text-muted-foreground">
          Add custom voice and text notes to containers or items with "Memory Bread" technology
        </p>
      </div>
      
      <SmartTagging />
    </div>
  );
};

export default SmartTaggingPage;
