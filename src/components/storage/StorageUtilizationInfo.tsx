
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface StorageUtilizationInfoProps {
  moduleId: string;
}

// Module information data
const moduleData: Record<string, any> = {
  'module-a': {
    name: 'Module A',
    utilization: 75,
    totalCapacity: '120 units',
    available: '30 units',
    categories: [
      { name: 'Medical', percentage: 40, color: 'bg-blue-500' },
      { name: 'Scientific', percentage: 25, color: 'bg-purple-500' },
      { name: 'Food', percentage: 10, color: 'bg-yellow-500' },
    ],
    highPriorityCount: 3,
  },
  'module-b': {
    name: 'Module B',
    utilization: 65,
    totalCapacity: '100 units',
    available: '35 units',
    categories: [
      { name: 'Equipment', percentage: 35, color: 'bg-orange-500' },
      { name: 'Scientific', percentage: 20, color: 'bg-purple-500' },
      { name: 'Personal', percentage: 10, color: 'bg-teal-500' },
    ],
    highPriorityCount: 1,
  },
  'cargo-bay': {
    name: 'Cargo Bay',
    utilization: 90,
    totalCapacity: '200 units',
    available: '20 units',
    categories: [
      { name: 'Food', percentage: 40, color: 'bg-yellow-500' },
      { name: 'Equipment', percentage: 35, color: 'bg-orange-500' },
      { name: 'Medical', percentage: 15, color: 'bg-blue-500' },
    ],
    highPriorityCount: 4,
  },
  'lab-storage': {
    name: 'Lab Storage',
    utilization: 50,
    totalCapacity: '80 units',
    available: '40 units',
    categories: [
      { name: 'Scientific', percentage: 40, color: 'bg-purple-500' },
      { name: 'Medical', percentage: 10, color: 'bg-blue-500' },
    ],
    highPriorityCount: 0,
  },
};

const StorageUtilizationInfo: React.FC<StorageUtilizationInfoProps> = ({ moduleId }) => {
  const moduleInfo = moduleData[moduleId] || moduleData['module-a'];
  
  return (
    <div className="space-y-4">
      <div>
        <div className="flex justify-between items-end mb-2">
          <div className="text-sm text-muted-foreground">Storage Utilization</div>
          <div className="text-sm font-medium">{moduleInfo.utilization}%</div>
        </div>
        <Progress value={moduleInfo.utilization} className="h-2" />
      </div>
      
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="text-muted-foreground">Total Capacity</div>
          <div className="font-medium">{moduleInfo.totalCapacity}</div>
        </div>
        <div>
          <div className="text-muted-foreground">Available</div>
          <div className="font-medium">{moduleInfo.available}</div>
        </div>
        <div>
          <div className="text-muted-foreground">High Priority</div>
          <div className="font-medium">{moduleInfo.highPriorityCount} items</div>
        </div>
        <div>
          <div className="text-muted-foreground">Last Optimized</div>
          <div className="font-medium">2 days ago</div>
        </div>
      </div>
      
      <div className="space-y-3 pt-2">
        <div className="text-sm font-medium">Category Breakdown</div>
        {moduleInfo.categories.map((category: any, index: number) => (
          <div key={index} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>{category.name}</span>
              <span>{category.percentage}%</span>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${category.color}`} 
                style={{ width: `${category.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StorageUtilizationInfo;
