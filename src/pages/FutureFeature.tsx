
import React from 'react';
import { RocketIcon } from 'lucide-react';

export interface FutureFeatureProps {
  feature: string;
  description?: string;
}

const FutureFeature: React.FC<FutureFeatureProps> = ({ feature, description }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-8">
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <RocketIcon className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-4">{feature}</h1>
      <p className="text-lg text-muted-foreground max-w-lg mb-8">
        {description || "This feature is still under development and will be available soon!"}
      </p>
      <div className="flex gap-2 items-center justify-center text-sm text-muted-foreground">
        <div className="h-2 w-2 bg-primary rounded-full animate-pulse"></div>
        <span>Coming Soon</span>
      </div>
    </div>
  );
};

export default FutureFeature;
