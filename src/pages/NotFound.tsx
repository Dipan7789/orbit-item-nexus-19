
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center py-12 px-4 space-y-6">
      <div className="animate-float">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 bg-space-bright-blue rounded-full opacity-20 animate-pulse-slow"></div>
          <div className="absolute inset-4 bg-space-bright-blue rounded-full"></div>
          <div className="absolute w-12 h-1 bg-space-bright-blue/50 top-1/2 -right-8"></div>
          <div className="absolute w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full -right-12 top-1/2 -translate-y-1/2 border border-white/20"></div>
        </div>
      </div>
      
      <h1 className="text-4xl font-bold tracking-tight">Houston, we have a problem</h1>
      <p className="text-xl text-muted-foreground max-w-md mx-auto">
        The module you're looking for seems to have drifted into deep space
      </p>
      
      <div className="pt-4">
        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <Home size={18} />
            Return to Mission Control
          </Link>
        </Button>
      </div>
      
      <div className="grid-bg absolute inset-0 opacity-[0.03] -z-10"></div>
    </div>
  );
};

export default NotFound;
