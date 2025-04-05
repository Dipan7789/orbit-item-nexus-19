
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';
import { 
  AlertCircle, 
  AlertTriangle, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Eye, 
  Globe, 
  Info, 
  Star, 
  Sun, 
  Timer
} from 'lucide-react';

// Types for celestial events
interface CelestialEvent {
  id: string;
  type: 'meteor' | 'solarFlare' | 'comet' | 'auroraActivity' | 'debrisField';
  title: string;
  description: string;
  predictedTime: Date;
  probability: number;
  severity: 'low' | 'medium' | 'high';
  isActive: boolean;
  detectionDate: Date;
}

const EventPredictor = () => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('upcoming');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [events, setEvents] = useState<CelestialEvent[]>([
    {
      id: 'evt-001',
      type: 'meteor',
      title: 'Perseid Meteor Shower',
      description: 'Annual meteor shower with up to 100 meteors per hour at peak activity',
      predictedTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      probability: 98,
      severity: 'low',
      isActive: true,
      detectionDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'evt-002',
      type: 'solarFlare',
      title: 'X-Class Solar Flare',
      description: 'High-energy solar flare with potential for communications disruption',
      predictedTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      probability: 75,
      severity: 'medium',
      isActive: true,
      detectionDate: new Date(Date.now() - 6 * 60 * 60 * 1000)
    },
    {
      id: 'evt-003',
      type: 'comet',
      title: 'Near-Earth Comet Approach',
      description: 'Comet will pass within 0.5 million km of Earth, visible to the naked eye',
      predictedTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      probability: 100,
      severity: 'low',
      isActive: true,
      detectionDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'evt-004',
      type: 'debrisField',
      title: 'Orbital Debris Field Crossing',
      description: 'Station orbit will intersect with known debris field, shields recommended',
      predictedTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      probability: 85,
      severity: 'high',
      isActive: true,
      detectionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'evt-005',
      type: 'auroraActivity',
      title: 'Enhanced Aurora Activity',
      description: 'Geomagnetic storm will cause vivid aurora displays visible from station',
      predictedTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      probability: 90,
      severity: 'low',
      isActive: true,
      detectionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]);
  
  // Simulate data analysis
  const handleAnalyzeData = () => {
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    
    const interval = setInterval(() => {
      setAnalyzeProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          
          // Simulate new event detection occasionally
          if (Math.random() > 0.7) {
            const newEvent: CelestialEvent = {
              id: `evt-${Math.floor(Math.random() * 1000)}`,
              type: ['meteor', 'solarFlare', 'comet', 'auroraActivity', 'debrisField'][
                Math.floor(Math.random() * 5)
              ] as CelestialEvent['type'],
              title: 'New Celestial Event Detected',
              description: 'The system has detected a new celestial event that may affect the station',
              predictedTime: new Date(Date.now() + Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000),
              probability: Math.floor(Math.random() * 40) + 60,
              severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high',
              isActive: true,
              detectionDate: new Date()
            };
            
            setEvents(prev => [newEvent, ...prev]);
            
            toast({
              title: "New Event Detected",
              description: `${newEvent.title} - ${newEvent.description}`,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Analysis Complete",
              description: "No new celestial events detected at this time",
            });
          }
          
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };
  
  // Filter events based on tab
  const filteredEvents = events.filter(event => {
    const now = new Date();
    if (currentTab === 'upcoming') {
      return event.predictedTime > now && event.isActive;
    }
    if (currentTab === 'past') {
      return event.predictedTime <= now;
    }
    if (currentTab === 'all') {
      return true;
    }
    return false;
  });
  
  // Sort events by predicted time
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (currentTab === 'past') {
      return b.predictedTime.getTime() - a.predictedTime.getTime();
    }
    return a.predictedTime.getTime() - b.predictedTime.getTime();
  });
  
  // Get icon based on event type
  const getEventIcon = (type: CelestialEvent['type']) => {
    switch (type) {
      case 'meteor':
        return <Star size={18} />;
      case 'solarFlare':
        return <Sun size={18} />;
      case 'comet':
        return <Globe size={18} />;
      case 'auroraActivity':
        return <Sun size={18} />;
      case 'debrisField':
        return <AlertCircle size={18} />;
      default:
        return <Info size={18} />;
    }
  };
  
  // Get severity color
  const getSeverityColor = (severity: CelestialEvent['severity']) => {
    switch (severity) {
      case 'low':
        return 'bg-green-600';
      case 'medium':
        return 'bg-yellow-600';
      case 'high':
        return 'bg-red-600';
      default:
        return 'bg-slate-600';
    }
  };
  
  // Format relative time
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays < 0 || diffHours < 0) {
      return 'Event has passed';
    }
    
    if (diffDays === 0) {
      return `In ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
    }
    
    if (diffDays === 0 && diffHours === 0) {
      const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      return `In ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`;
    }
    
    return `In ${diffDays} day${diffDays !== 1 ? 's' : ''} ${diffHours} hour${diffHours !== 1 ? 's' : ''}`;
  };
  
  // Mark event as reviewed and create notification
  const handleReviewEvent = (event: CelestialEvent) => {
    toast({
      title: "Event Reviewed",
      description: `You've acknowledged ${event.title}`,
    });
    
    setEvents(prev => 
      prev.map(e => 
        e.id === event.id 
          ? { ...e, isActive: false } 
          : e
      )
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Event Predictor</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-500 px-2 py-0.5 animate-pulse">
                    Beta
                  </Badge>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p className="text-sm">This feature is in beta testing.<br />Predictions may not be 100% accurate.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-muted-foreground mt-1">
            Automated celestial event detection and prediction system
          </p>
        </div>
        
        <Button 
          className="gap-2"
          onClick={handleAnalyzeData}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Timer className="animate-spin" size={16} />
              Analyzing Data...
            </>
          ) : (
            <>
              <Timer size={16} />
              Analyze Latest Data
            </>
          )}
        </Button>
      </div>
      
      {isAnalyzing && (
        <Card className="space-card">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing astronomical data</span>
                <span>{Math.floor(analyzeProgress)}%</span>
              </div>
              <Progress value={analyzeProgress} />
              <p className="text-xs text-muted-foreground">Scanning for potential celestial events that may affect the station</p>
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card className="space-card">
        <CardHeader>
          <CardTitle>Celestial Events</CardTitle>
          <CardDescription>Predicted astronomical events that may affect the space station</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="all">All Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value={currentTab} className="space-y-4">
              {sortedEvents.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                  <p>No {currentTab} events found</p>
                </div>
              ) : (
                sortedEvents.map(event => (
                  <div key={event.id} className="border rounded-lg p-4 shadow-sm bg-background space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className={`mt-1 p-2 rounded-full ${
                          event.type === 'solarFlare' ? 'bg-yellow-100 text-yellow-700' :
                          event.type === 'meteor' ? 'bg-purple-100 text-purple-700' :
                          event.type === 'comet' ? 'bg-blue-100 text-blue-700' :
                          event.type === 'debrisField' ? 'bg-red-100 text-red-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {getEventIcon(event.type)}
                        </div>
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock size={14} />
                              <span>{event.predictedTime.toLocaleDateString()} {event.predictedTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <AlertTriangle size={14} />
                              <span>Probability: {event.probability}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={getSeverityColor(event.severity)}>
                          {event.severity} severity
                        </Badge>
                        {currentTab !== 'past' && (
                          <div className="text-xs font-medium">
                            {getRelativeTime(event.predictedTime)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {event.isActive && event.severity === 'high' && (
                      <Alert variant="destructive" className="mt-3 py-2">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Action Required</AlertTitle>
                        <AlertDescription>
                          This high-severity event requires immediate attention and preparation.
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {event.isActive && currentTab !== 'past' && (
                      <div className="flex justify-end gap-2 mt-2">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="outline" size="sm" className="gap-1">
                                <Eye size={14} />
                                Details
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>View detailed trajectory and impact analysis</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <Button size="sm" className="gap-1" onClick={() => handleReviewEvent(event)}>
                          <ChevronRight size={14} />
                          Mark as Reviewed
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventPredictor;
