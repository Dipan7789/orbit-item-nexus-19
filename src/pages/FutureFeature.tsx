
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import TiltEffect from '@/components/ui/tilt-effect';
import { useNavigate } from 'react-router-dom';

interface FutureFeatureProps {
  feature: string;
  featureDescription: string;
}

const FutureFeature: React.FC<FutureFeatureProps> = ({ feature, featureDescription }) => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`container mx-auto max-w-6xl p-4 sm:p-6 md:p-8 h-full flex items-center justify-center ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
      <TiltEffect maxTilt={5} scale={1.01} className="w-full max-w-2xl">
        <Card className="w-full border-white/10 bg-card/90 backdrop-blur-sm futuristic-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              {feature}
            </CardTitle>
            <CardDescription className="mt-2 text-base md:text-lg">
              {featureDescription}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative h-48 md:h-64 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-lg md:text-xl font-semibold text-muted-foreground">
                  Coming Soon
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-muted-foreground">
                We're working hard to bring this exciting feature to you. Stay tuned!
              </p>
              <TiltEffect maxTilt={8}>
                <Button 
                  onClick={() => navigate(-1)} 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 glow-effect"
                >
                  Go Back
                </Button>
              </TiltEffect>
            </div>
          </CardContent>
        </Card>
      </TiltEffect>
    </div>
  );
};

export default FutureFeature;
