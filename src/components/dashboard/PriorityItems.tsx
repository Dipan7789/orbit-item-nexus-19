
import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const priorityItems = [
  {
    id: 'MED-1234',
    name: 'Medical Kit',
    location: 'Module A - Cabinet 3',
    reason: 'Expiring soon (5 days)',
    priority: 'high'
  },
  {
    id: 'FOOD-5678',
    name: 'Freeze-Dried Meals',
    location: 'Cargo Bay - Food Storage',
    reason: 'Low quantity (3 left)',
    priority: 'high'
  },
  {
    id: 'OXY-9012',
    name: 'Oxygen Canisters',
    location: 'Module B - Life Support',
    reason: 'Scheduled replacement',
    priority: 'medium'
  }
];

const PriorityItems = () => {
  return (
    <div className="space-y-3">
      {priorityItems.map((item) => (
        <div 
          key={item.id} 
          className="space-card p-3 rounded-md"
        >
          <div className="flex items-start gap-2">
            <div className={`mt-0.5 ${
              item.priority === 'high' ? 'text-red-500' : 'text-yellow-500'
            }`}>
              <AlertTriangle size={18} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                <Badge 
                  className={
                    item.priority === 'high' ? 'bg-red-600' : 'bg-yellow-600'
                  }
                >
                  {item.priority}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.location}</p>
              <p className="text-xs mt-1">{item.reason}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="w-full text-xs">Locate</Button>
            <Button size="sm" className="w-full text-xs flex items-center gap-1">
              <CheckCircle2 size={14} />
              Mark Resolved
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PriorityItems;
