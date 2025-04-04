
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  path: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, status, path }) => {
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
        {status === 'available' ? (
          <Button variant="outline" className="w-full" asChild>
            <Link to={path}>Launch Feature</Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full" disabled>
            {status === 'planned' ? 'Coming Soon' : 'In Development'}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export const IssAdvancedFeatures = () => {
  const features = [
    {
      title: "Quick Navigation Panel",
      description: "Jump to any ISS module on the 3D map instantly with this intuitive navigation tool",
      icon: <Navigation className="h-5 w-5" />,
      status: 'available' as const,
      path: '/instant-navigation'
    },
    {
      title: "Expiry Forecasting System",
      description: "Visually predict item degradation and expiry over time with advanced simulation",
      icon: <Clock className="h-5 w-5" />,
      status: 'in-progress' as const,
      path: '/spoilage-simulation'
    },
    {
      title: "Smart Tagging Tool",
      description: "Add custom voice/text notes to containers or items for better organization",
      icon: <Tag className="h-5 w-5" />,
      status: 'in-progress' as const,
      path: '/smart-tagging'
    },
    {
      title: "Zoomable 3D View",
      description: "Explore inventory at different scales with enhanced visualization technology",
      icon: <ZoomIn className="h-5 w-5" />,
      status: 'planned' as const,
      path: '/zoomable-view'
    },
    {
      title: "Multilingual Translator",
      description: "Real-time language translation of item names for international crew members",
      icon: <Globe className="h-5 w-5" />,
      status: 'planned' as const,
      path: '/translator'
    },
    {
      title: "Visual Item Transfer Assistant",
      description: "Animated tracking of goods between ISS sections with visual confirmation",
      icon: <Send className="h-5 w-5" />,
      status: 'planned' as const,
      path: '/transfer-assistant'
    },
    {
      title: "Space Event Predictor",
      description: "Intelligent space weather and anomaly prediction system using predictive AI models",
      icon: <AlertTriangle className="h-5 w-5" />,
      status: 'planned' as const,
      path: '/event-predictor'
    }
  ];

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-4">Advanced ISS Management Features</h2>
      <p className="text-muted-foreground mb-6">
        Advanced features and technologies designed to enhance ISS operations and logistics management
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            status={feature.status}
            path={feature.path}
          />
        ))}
      </div>
    </div>
  );
};

export default IssAdvancedFeatures;
