
import React, { useState } from 'react';
import { Package, ArrowRight, MoveDown, MoveUp, FileUp, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const initialActivities = [
  {
    id: 1,
    type: 'retrieved',
    item: 'Medical Kit (MED-1234)',
    location: 'Module A - Cabinet 3',
    user: 'Astronaut Zhang',
    timestamp: '10 minutes ago',
    icon: MoveUp
  },
  {
    id: 2,
    type: 'returned',
    item: 'Multi-Tool (TOOL-5678)',
    location: 'Module B - Tool Rack',
    user: 'Astronaut Johnson',
    timestamp: '45 minutes ago',
    icon: MoveDown
  },
  {
    id: 3,
    type: 'imported',
    item: '25 new items',
    location: 'System',
    user: 'Astronaut Patel',
    timestamp: '2 hours ago',
    icon: FileUp
  },
  {
    id: 4,
    type: 'relocated',
    item: 'Lab Equipment (LAB-9012)',
    location: 'Cargo Bay → Lab Storage',
    user: 'Astronaut Kim',
    timestamp: '3 hours ago',
    icon: ArrowRight
  },
  {
    id: 5,
    type: 'optimized',
    item: 'Cargo Bay Storage',
    location: 'System',
    user: 'AI Optimization',
    timestamp: '5 hours ago',
    icon: RefreshCw
  }
];

const additionalActivities = [
  {
    id: 6,
    type: 'retrieved',
    item: 'Laptop (TECH-3456)',
    location: 'Module C - Workstation',
    user: 'Astronaut Rodriguez',
    timestamp: '7 hours ago',
    icon: MoveUp
  },
  {
    id: 7,
    type: 'returned',
    item: 'Camera (EQUIP-7890)',
    location: 'Module A - Equipment Locker',
    user: 'Astronaut Chen',
    timestamp: '9 hours ago',
    icon: MoveDown
  },
  {
    id: 8,
    type: 'imported',
    item: '10 new scientific samples',
    location: 'Lab Storage',
    user: 'Astronaut Ivanov',
    timestamp: '12 hours ago',
    icon: FileUp
  }
];

const RecentActivityList = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setIsLoading(true);
    
    // Simulating an API call with setTimeout
    setTimeout(() => {
      if (page === 1) {
        setActivities([...activities, ...additionalActivities]);
        setHasMore(false);
      }
      
      setPage(page + 1);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-1">
      {activities.map((activity) => (
        <div 
          key={activity.id} 
          className="flex items-center gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <activity.icon size={18} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium truncate">{activity.item}</span>
              <span className="text-xs text-muted-foreground hidden md:inline">
                {activity.type}
              </span>
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {activity.location} • {activity.user}
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground flex items-center whitespace-nowrap">
            <Clock size={14} className="mr-1" />
            {activity.timestamp}
          </div>
        </div>
      ))}
      
      <div className="pt-2 flex justify-center">
        {hasMore ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLoadMore} 
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground">All activities loaded</span>
        )}
      </div>
    </div>
  );
};

export default RecentActivityList;
