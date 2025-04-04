
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, ConstructionIcon, Rocket } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

interface FutureFeatureProps {
  feature: string;
}

const FutureFeature: React.FC<FutureFeatureProps> = ({ feature }) => {
  const getFeatureDescription = (featureName: string) => {
    const descriptions: Record<string, string> = {
      "Instant Navigation Panel": "Jump to any ISS module on the 3D map instantly, like the 'Anywhere Door'.",
      "Spoilage Simulation System": "Visually predict item degradation and expiry over time with 'Time Cloth' technology.",
      "Smart Tagging Tool": "Add custom voice/text notes to containers or items with 'Memory Bread' technology.",
      "Zoomable 3D View": "Explore inventory at different scales with 'Small Light/Big Light' technology.",
      "Multilingual Translator Layer": "Real-time language translation of item names with 'Translator Jelly' technology.",
      "Visual Item Transfer Assistant": "Animated tracking of goods between ISS sections with 'Take-copter' technology.",
      "Space Event Predictor": "Intelligent space weather and anomaly prediction system using predictive AI models."
    };
    
    return descriptions[featureName] || "Coming soon...";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{feature}</h1>
        <p className="text-muted-foreground mt-1">{getFeatureDescription(feature)}</p>
      </div>

      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{feature}</CardTitle>
            <span className="bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-500 px-2 py-1 rounded-md text-xs font-semibold">
              Coming Soon
            </span>
          </div>
          <CardDescription>
            This feature is currently under development and will be available in a future update.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-center h-64 rounded-md bg-muted/50">
            <div className="text-center">
              <Rocket className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">Feature In Development</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Our team is working hard to bring this exciting feature to life. 
                Check back soon for updates!
              </p>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Development Preview</AlertTitle>
            <AlertDescription>
              This is a preview of the {feature} that is coming soon to the ISS Management System.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline">Learn More</Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">{feature}</h4>
                  <p className="text-xs">
                    {getFeatureDescription(feature)} This futuristic technology will revolutionize
                    how astronauts manage resources on the International Space Station.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
            
            <Button variant="secondary" disabled>Early Access Waitlist</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FutureFeature;
