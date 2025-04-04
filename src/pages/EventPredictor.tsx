
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { AlertTriangle, Shield, Satellite, Info, Sun, Comet } from 'lucide-react';

const EventPredictor = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  // Mock data for space events
  const upcomingEvents = [
    {
      id: 'event-1',
      title: 'Solar Flare Warning',
      description: 'Medium-intensity solar flare predicted in the next 24 hours.',
      severity: 'warning',
      time: 'In 18 hours',
      type: 'solar',
      actions: ['Shield Activation', 'System Backup']
    },
    {
      id: 'event-2',
      title: 'Micro-Meteoroid Shower',
      description: 'Small debris field approaching station trajectory.',
      severity: 'info',
      time: 'In 36 hours',
      type: 'debris',
      actions: ['Monitor Only']
    },
    {
      id: 'event-3',
      title: 'Aurora Activity Increase',
      description: 'Heightened aurora activity may affect communications.',
      severity: 'info',
      time: 'In 6 hours',
      type: 'atmospheric',
      actions: ['Communications Check']
    }
  ];
  
  const historicalEvents = [
    {
      id: 'hist-1',
      title: 'Solar Storm',
      description: 'Major solar storm passed Earth orbit',
      severity: 'critical',
      time: '3 days ago',
      type: 'solar',
      outcome: 'Mitigated with shield activation'
    },
    {
      id: 'hist-2',
      title: 'Orbital Debris Avoidance',
      description: 'Station trajectory adjusted to avoid space debris',
      severity: 'warning',
      time: '2 weeks ago',
      type: 'debris',
      outcome: 'Successfully avoided'
    }
  ];

  // Display a toast notification on component mount to simulate real-time alert
  useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "New Space Event Detected",
        description: "Solar flare warning issued for the next 24 hours.",
        variant: "destructive",
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const getSeverityBadge = (severity: string) => {
    switch(severity) {
      case 'critical':
        return <Badge className="bg-red-600 animate-pulse">Critical</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-600">Warning</Badge>;
      case 'info':
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'solar':
        return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'debris':
        return <Comet className="h-5 w-5 text-slate-400" />;
      case 'atmospheric':
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const handleActionClick = (action: string, eventTitle: string) => {
    toast({
      title: `${action} Initiated`,
      description: `Response protocol for "${eventTitle}" has been initiated.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            Event Predictor
            <Badge className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-500 shadow-sm animate-pulse">
              Beta
            </Badge>
          </h1>
          <p className="text-muted-foreground mt-1">
            Predictive analysis of space weather and potential hazards
          </p>
        </div>
      </div>

      <Card className="space-card shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-yellow-500/10 p-2 rounded-full">
                <Satellite className="h-5 w-5 text-yellow-500" />
              </div>
              <div>
                <CardTitle>Space Event Monitor</CardTitle>
                <CardDescription>Real-time prediction and tracking</CardDescription>
              </div>
            </div>
            <Button variant="outline" className="gap-2">
              <Shield className="h-4 w-4" />
              Shield Status: Active
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="historical">Historical Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.map(event => (
                <div key={event.id} className="border rounded-lg p-4 bg-card transition-all hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      {getTypeIcon(event.type)}
                      <div>
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          {event.title}
                          {getSeverityBadge(event.severity)}
                        </h3>
                        <p className="text-muted-foreground">{event.description}</p>
                        <p className="text-sm font-medium mt-2">Expected: {event.time}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {event.actions.map(action => (
                      <Button 
                        key={action} 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleActionClick(action, event.title)}
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="historical" className="space-y-4">
              {historicalEvents.map(event => (
                <div key={event.id} className="border rounded-lg p-4 bg-card transition-all hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      {getTypeIcon(event.type)}
                      <div>
                        <h3 className="font-medium text-lg flex items-center gap-2">
                          {event.title}
                          {getSeverityBadge(event.severity)}
                        </h3>
                        <p className="text-muted-foreground">{event.description}</p>
                        <p className="text-sm font-medium mt-2">Occurred: {event.time}</p>
                        <p className="text-sm text-muted-foreground mt-1">Outcome: {event.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="space-card">
        <CardHeader>
          <CardTitle>AI Prediction Model</CardTitle>
          <CardDescription>
            Current model accuracy: 94.3% for events within 48 hours
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted p-4 rounded-md">
            <h3 className="font-medium mb-2">Event Detection Parameters</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-card border rounded-md p-3">
                <div className="text-sm font-medium">Solar Activity</div>
                <div className="text-xs text-muted-foreground">Monitoring solar flares and CMEs</div>
              </div>
              <div className="bg-card border rounded-md p-3">
                <div className="text-sm font-medium">Orbital Debris</div>
                <div className="text-xs text-muted-foreground">Tracking objects > 1cm in proximity</div>
              </div>
              <div className="bg-card border rounded-md p-3">
                <div className="text-sm font-medium">Atmospheric Effects</div>
                <div className="text-xs text-muted-foreground">Ionospheric disturbances</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPredictor;
