
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { InventoryItem, StorageContainer, calculateVolume } from '@/types/inventory';

interface PackingEfficiencyCardProps {
  containers: StorageContainer[];
  items: InventoryItem[];
  placements: Record<string, string>;
}

const PackingEfficiencyCard: React.FC<PackingEfficiencyCardProps> = ({ 
  containers, 
  items, 
  placements 
}) => {
  // Calculate efficiency metrics
  const calculateMetrics = () => {
    const containerVolumes: Record<string, number> = {};
    const usedVolumes: Record<string, number> = {};
    
    // Initialize container volumes
    containers.forEach(container => {
      const volume = calculateVolume(container.width_cm, container.depth_cm, container.height_cm);
      containerVolumes[container.container_id] = volume;
      usedVolumes[container.container_id] = 0;
    });
    
    // Calculate used volumes
    Object.entries(placements).forEach(([itemId, containerId]) => {
      const item = items.find(i => (i.item_id || i.id) === itemId);
      if (item) {
        const itemVolume = calculateVolume(
          item.width_cm || 0, 
          item.depth_cm || 0, 
          item.height_cm || 0
        );
        usedVolumes[containerId] = (usedVolumes[containerId] || 0) + itemVolume;
      }
    });
    
    // Calculate efficiency scores
    const efficiencyScores: Record<string, number> = {};
    const usedContainers = new Set(Object.values(placements));
    
    containers.forEach(container => {
      if (usedContainers.has(container.container_id)) {
        const totalVolume = containerVolumes[container.container_id];
        const usedVolume = usedVolumes[container.container_id] || 0;
        const efficiencyPercentage = Math.round((usedVolume / totalVolume) * 100);
        efficiencyScores[container.container_id] = efficiencyPercentage;
      }
    });
    
    // Overall metrics
    const totalVolume = Object.values(containerVolumes).reduce((a, b) => a + b, 0);
    const totalUsedVolume = Object.values(usedVolumes).reduce((a, b) => a + b, 0);
    const totalEfficiency = totalVolume > 0 ? Math.round((totalUsedVolume / totalVolume) * 100) : 0;
    
    // Group by zone
    const zoneMetrics: Record<string, {
      totalVolume: number;
      usedVolume: number;
      efficiency: number;
      containerCount: number;
    }> = {};
    
    containers.forEach(container => {
      if (!zoneMetrics[container.zone]) {
        zoneMetrics[container.zone] = {
          totalVolume: 0,
          usedVolume: 0,
          efficiency: 0,
          containerCount: 0
        };
      }
      
      zoneMetrics[container.zone].totalVolume += containerVolumes[container.container_id];
      zoneMetrics[container.zone].usedVolume += usedVolumes[container.container_id] || 0;
      zoneMetrics[container.zone].containerCount += 1;
    });
    
    // Calculate zone efficiencies
    Object.keys(zoneMetrics).forEach(zone => {
      const { totalVolume, usedVolume } = zoneMetrics[zone];
      zoneMetrics[zone].efficiency = totalVolume > 0 ? Math.round((usedVolume / totalVolume) * 100) : 0;
    });
    
    return {
      containerEfficiencies: efficiencyScores,
      totalEfficiency,
      zoneMetrics,
      totalContainers: containers.length,
      usedContainers: usedContainers.size,
      totalItems: items.length,
      placedItems: Object.keys(placements).length
    };
  };
  
  const metrics = calculateMetrics();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Packing Efficiency</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Efficiency</span>
            <span className="font-bold">{metrics.totalEfficiency}%</span>
          </div>
          <Progress value={metrics.totalEfficiency} className="h-2" />
          <div className="text-xs text-muted-foreground mt-1">
            {metrics.placedItems} of {metrics.totalItems} items placed using {metrics.usedContainers} of {metrics.totalContainers} containers
          </div>
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Efficiency by Zone</h4>
          <div className="grid gap-2">
            {Object.entries(metrics.zoneMetrics).map(([zone, data]) => (
              <div key={zone} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span>{zone}</span>
                  <span className="font-medium">{data.efficiency}%</span>
                </div>
                <Progress value={data.efficiency} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-sm">
          <p className="font-medium mb-2">Efficiency Score Explanation:</p>
          <ul className="list-disc pl-5 text-muted-foreground space-y-1">
            <li>90-100%: Excellent utilization</li>
            <li>70-89%: Good utilization</li>
            <li>50-69%: Average utilization</li>
            <li>&lt;50%: Poor utilization - consider reorganizing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackingEfficiencyCard;
