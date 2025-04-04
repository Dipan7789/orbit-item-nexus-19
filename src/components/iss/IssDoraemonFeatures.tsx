
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Navigation, 
  Clock, 
  Tag, 
  ZoomIn, 
  Globe, 
  Send,
  AlertTriangle
} from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  status: 'planned' | 'in-progress' | 'available';
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, status }) => {
  const statusColors = {
    'planned': 'bg-amber-100 text-amber-800 dark:bg-amber-800/20 dark:text-amber-500',
    'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-500',
    'available': 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-500',
  };

  return (
    <Card className="h-full transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <Badge variant="outline" className={statusColors[status]}>
            {status === 'planned' ? 'Planned' : 
             status === 'in-progress' ? 'In Progress' : 'Available'}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full" disabled={status !== 'available'}>
          {status === 'available' ? 'Launch Feature' : 'Coming Soon'}
        </Button>
      </CardContent>
    </Card>
  );
};

export const IssDoraemonFeatures = () => {
  const features = [
    {
      title: "Instant Navigation Panel",
      description: "Jump to any ISS module on the 3D map instantly, like the 'Anywhere Door'",
      icon: <Navigation className="h-5 w-5" />,
      status: 'planned' as const
    },
    {
      title: "Spoilage Simulation System",
      description: "Visually predict item degradation and expiry over time with 'Time Cloth' technology",
      icon: <Clock className="h-5 w-5" />,
      status: 'planned' as const
    },
    {
      title: "Smart Tagging Tool",
      description: "Add custom voice/text notes to containers or items with 'Memory Bread' technology",
      icon: <Tag className="h-5 w-5" />,
      status: 'in-progress' as const
    },
    {
      title: "Zoomable 3D View",
      description: "Explore inventory at different scales with 'Small Light/Big Light' technology",
      icon: <ZoomIn className="h-5 w-5" />,
      status: 'planned' as const
    },
    {
      title: "Multilingual Translator Layer",
      description: "Real-time language translation of item names with 'Translator Jelly' technology",
      icon: <Globe className="h-5 w-5" />,
      status: 'planned' as const
    },
    {
      title: "Visual Item Transfer Assistant",
      description: "Animated tracking of goods between ISS sections with 'Take-copter' technology",
      icon: <Send className="h-5 w-5" />,
      status: 'planned' as const
    },
    {
      title: "Space Event Predictor",
      description: "Intelligent space weather and anomaly prediction system using predictive AI models",
      icon: <AlertTriangle className="h-5 w-5" />,
      status: 'in-progress' as const
    }
  ];

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Future ISS Management Features</h2>
      <p className="text-muted-foreground mb-6">
        Advanced features inspired by futuristic technology to enhance ISS operations and logistics management
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            status={feature.status}
          />
        ))}
      </div>
    </div>
  );
};

export default IssDoraemonFeatures;
