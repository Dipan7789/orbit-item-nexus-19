
import React from 'react';
import { Package, ArrowRight, MoveDown, MoveUp, FileUp, Clock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const activities = [
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

const RecentActivityList = () => {
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
        <Button variant="outline" size="sm">Load More</Button>
      </div>
    </div>
  );
};

export default RecentActivityList;
