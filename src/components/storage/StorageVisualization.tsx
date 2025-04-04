import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StorageContainer, InventoryItem } from '@/types/inventory';

interface StorageVisualizationProps {
  containerId?: string;
  containers: StorageContainer[];
  items: InventoryItem[];
  placements: Record<string, string>;
}

const colors = {
  empty: 'bg-green-200 border-green-400',
  partiallyFilled: 'bg-yellow-200 border-yellow-400',
  filled: 'bg-red-200 border-red-400',
  selected: 'ring-2 ring-blue-500 ring-offset-2'
};

const calculateFillPercentage = (
  container: StorageContainer, 
  items: InventoryItem[], 
  placements: Record<string, string>
): number => {
  const containerVolume = container.width_cm * container.depth_cm * container.height_cm;
  
  const itemIds = Object.entries(placements)
    .filter(([_, cId]) => cId === container.container_id)
    .map(([itemId, _]) => itemId);
  
  const itemsVolume = itemIds.reduce((total, itemId) => {
    const item = items.find(i => (i.item_id || i.id) === itemId);
    if (!item) return total;
    return total + ((item.width_cm || 0) * (item.depth_cm || 0) * (item.height_cm || 0));
  }, 0);
  
  return Math.min(100, Math.round((itemsVolume / containerVolume) * 100));
};

const getFillStatus = (percentage: number) => {
  if (percentage === 0) return 'empty';
  if (percentage < 70) return 'partiallyFilled';
  return 'filled';
};

const StorageVisualization: React.FC<StorageVisualizationProps> = ({
  containerId,
  containers,
  items,
  placements
}) => {
  const [selectedContainer, setSelectedContainer] = useState<StorageContainer | null>(null);
  const [containerItems, setContainerItems] = useState<InventoryItem[]>([]);
  
  const containersByZone = containers.reduce((acc, container) => {
    const zone = container.zone;
    if (!acc[zone]) acc[zone] = [];
    acc[zone].push(container);
    return acc;
  }, {} as Record<string, StorageContainer[]>);
  
  useEffect(() => {
    if (containerId) {
      const container = containers.find(c => c.container_id === containerId) || null;
      setSelectedContainer(container);
    } else {
      setSelectedContainer(null);
    }
  }, [containerId, containers]);
  
  useEffect(() => {
    if (!selectedContainer) {
      setContainerItems([]);
      return;
    }
    
    const itemIds = Object.entries(placements)
      .filter(([_, cId]) => cId === selectedContainer.container_id)
      .map(([itemId, _]) => itemId);
    
    const containerItems = items.filter(item => itemIds.includes(item.item_id || item.id));
    setContainerItems(containerItems);
  }, [selectedContainer, items, placements]);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Storage Zones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(containersByZone).map(([zone, zoneContainers]) => (
                <div key={zone} className="space-y-2">
                  <h3 className="text-lg font-medium">{zone}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {zoneContainers.map(container => {
                      const fillPercentage = calculateFillPercentage(container, items, placements);
                      const status = getFillStatus(fillPercentage);
                      const isSelected = selectedContainer?.container_id === container.container_id;
                      
                      return (
                        <div 
                          key={container.container_id}
                          className={`p-3 border rounded cursor-pointer transition-all ${colors[status]} ${isSelected ? colors.selected : ''}`}
                          onClick={() => setSelectedContainer(container)}
                        >
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate text-sm" title={container.container_id}>
                              {container.container_id}
                            </div>
                            <Badge className="text-xs ml-1">{fillPercentage}%</Badge>
                          </div>
                          <div className="mt-2 text-xs text-gray-600">
                            {container.width_cm}×{container.depth_cm}×{container.height_cm} cm
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedContainer ? 
                `Container ${selectedContainer.container_id}` : 
                'Select a Container'
              }
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedContainer ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Zone:</span>
                    <div className="font-medium">{selectedContainer.zone}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Dimensions:</span>
                    <div className="font-medium">
                      {selectedContainer.width_cm}×{selectedContainer.depth_cm}×{selectedContainer.height_cm} cm
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Volume:</span>
                    <div className="font-medium">
                      {selectedContainer.width_cm * selectedContainer.depth_cm * selectedContainer.height_cm} cm³
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Items:</span>
                    <div className="font-medium">
                      {containerItems.length}
                    </div>
                  </div>
                </div>
                
                {containerItems.length > 0 ? (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Stored Items</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                      {containerItems.map(item => (
                        <div key={item.item_id || item.id} className="p-3 border rounded bg-white">
                          <div className="flex justify-between items-start">
                            <div className="font-medium">{item.name}</div>
                            <Badge 
                              className={
                                typeof item.priority === 'number' ? 
                                  (Number(item.priority) > 7 ? 'bg-red-600' : 
                                  Number(item.priority) > 4 ? 'bg-yellow-600' : 
                                  'bg-green-600') : 'bg-blue-600'
                              }
                            >
                              Priority {item.priority}
                            </Badge>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            ID: {item.item_id || item.id}
                          </div>
                          <div className="text-xs text-gray-600">
                            {item.width_cm || 0}×{item.depth_cm || 0}×{item.height_cm || 0} cm • {item.mass_kg || 0} kg
                          </div>
                          {(item.expiryDate || item.expiry_date) && (
                            <div className="text-xs text-red-600 mt-1">
                              Expires: {String(item.expiryDate || item.expiry_date)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-muted-foreground">
                    No items stored in this container
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-muted-foreground">
                Select a container to view details
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StorageVisualization;
