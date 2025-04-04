
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid, Plus, Minus, Maximize2, RotateCw, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InventoryItem, StorageContainer, calculateVolume } from '@/types/inventory';

import StorageGrid from '@/components/storage/StorageGrid';
import StorageModuleSelector from '@/components/storage/StorageModuleSelector';
import StorageUtilizationInfo from '@/components/storage/StorageUtilizationInfo';
import StorageOptimizationCard from '@/components/storage/StorageOptimizationCard';
import StorageVisualization from '@/components/storage/StorageVisualization';
import StorageCube from '@/components/storage/StorageCube';

// Demo data
const demoContainers: StorageContainer[] = [
  { 
    zone: "Command Center", 
    container_id: "CMD-001", 
    width_cm: 60, 
    depth_cm: 40, 
    height_cm: 30,
    items: ["TOOL-1", "MED-2"],
    available_volume_cm3: 50000
  },
  { 
    zone: "Command Center", 
    container_id: "CMD-002", 
    width_cm: 80, 
    depth_cm: 50, 
    height_cm: 40,
    items: [],
    available_volume_cm3: 160000
  },
  { 
    zone: "Science Lab", 
    container_id: "LAB-001", 
    width_cm: 100, 
    depth_cm: 60, 
    height_cm: 40,
    items: ["SCI-1", "SCI-2", "SCI-3"],
    available_volume_cm3: 120000
  },
  { 
    zone: "Cargo Bay", 
    container_id: "CARGO-001", 
    width_cm: 120, 
    depth_cm: 100, 
    height_cm: 80,
    items: ["FOOD-1", "EQUIP-2"],
    available_volume_cm3: 800000
  },
  { 
    zone: "Medical Bay", 
    container_id: "MED-001", 
    width_cm: 50, 
    depth_cm: 40, 
    height_cm: 30,
    items: ["MED-1", "MED-3"],
    available_volume_cm3: 40000
  }
];

const demoItems: InventoryItem[] = [
  {
    item_id: "TOOL-1",
    name: "Multi-Tool Set",
    width_cm: 20,
    depth_cm: 15,
    height_cm: 8,
    mass_kg: 1.2,
    priority: 6,
    expiry_date: null,
    usage_limit: 100,
    preferred_zone: "Command Center",
    usage_count: 12,
    last_used: "2023-03-15"
  },
  {
    item_id: "MED-1",
    name: "First Aid Kit",
    width_cm: 30,
    depth_cm: 20,
    height_cm: 10,
    mass_kg: 2.5,
    priority: 9,
    expiry_date: "2024-12-01",
    usage_limit: null,
    preferred_zone: "Medical Bay",
    usage_count: 3,
    last_used: "2023-04-01"
  },
  {
    item_id: "SCI-1",
    name: "Microscope",
    width_cm: 25,
    depth_cm: 20,
    height_cm: 40,
    mass_kg: 5.0,
    priority: 8,
    expiry_date: null,
    usage_limit: null,
    preferred_zone: "Science Lab",
    usage_count: 45,
    last_used: "2023-04-12"
  },
  {
    item_id: "FOOD-1",
    name: "Meal Package",
    width_cm: 40,
    depth_cm: 30,
    height_cm: 20,
    mass_kg: 3.0,
    priority: 10,
    expiry_date: "2023-08-15",
    usage_limit: 1,
    preferred_zone: "Cargo Bay",
    usage_count: 0,
    last_used: null
  }
];

// Demo placement data
const demoPlacements: Record<string, string> = {
  "TOOL-1": "CMD-001",
  "MED-1": "MED-001",
  "SCI-1": "LAB-001",
  "FOOD-1": "CARGO-001",
  "MED-2": "CMD-001",
  "SCI-2": "LAB-001",
  "SCI-3": "LAB-001",
  "MED-3": "MED-001",
  "EQUIP-2": "CARGO-001"
};

const StorageMap = () => {
  const [activeModule, setActiveModule] = useState('module-a');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [viewType, setViewType] = useState<'grid' | 'visualization'>('grid');
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);
  
  const [containers, setContainers] = useState<StorageContainer[]>(demoContainers);
  const [items, setItems] = useState<InventoryItem[]>(demoItems);
  const [placements, setPlacements] = useState<Record<string, string>>(demoPlacements);
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 20, 200));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 20, 60));
  };
  
  const resetZoom = () => {
    setZoomLevel(100);
  };

  // Calculate fill percentages for all containers
  const containerFillPercentages = containers.map(container => {
    const totalVolume = calculateVolume(container.width_cm, container.depth_cm, container.height_cm);
    
    const itemIds = Object.entries(placements)
      .filter(([_, cId]) => cId === container.container_id)
      .map(([itemId, _]) => itemId);
    
    const usedVolume = itemIds.reduce((total, itemId) => {
      const item = items.find(i => i.item_id === itemId);
      if (!item) return total;
      return total + calculateVolume(item.width_cm, item.depth_cm, item.height_cm);
    }, 0);
    
    return {
      container_id: container.container_id,
      fillPercentage: Math.min(100, Math.round((usedVolume / totalVolume) * 100))
    };
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Storage Map</h1>
          <p className="text-muted-foreground mt-1">Visual representation of storage compartments</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className={viewType === 'grid' ? 'bg-muted' : ''}
            onClick={() => setViewType('grid')}
          >
            <Grid size={16} className="mr-2" />
            Grid View
          </Button>
          <Button 
            variant="outline" 
            className={viewType === 'visualization' ? 'bg-muted' : ''}
            onClick={() => setViewType('visualization')}
          >
            <ArrowUpRight size={16} className="mr-2" />
            3D View
          </Button>
          <Button className="gap-2">
            <RotateCw size={16} />
            Optimize Storage
          </Button>
        </div>
      </div>

      {viewType === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 space-y-6">
            <Card className="space-card">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Storage Visualization</CardTitle>
                    <CardDescription>Select a module to view its storage compartments</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={handleZoomOut}>
                      <Minus size={16} />
                    </Button>
                    <Badge variant="outline" className="text-xs">
                      {zoomLevel}%
                    </Badge>
                    <Button variant="outline" size="icon" onClick={handleZoomIn}>
                      <Plus size={16} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={resetZoom}>
                      <Maximize2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <StorageModuleSelector activeModule={activeModule} onChange={setActiveModule} />
                
                <div className="mt-6 border rounded-md p-1 overflow-hidden bg-muted/30 grid-bg">
                  <div 
                    className="transition-transform duration-200 ease-in-out origin-center"
                    style={{ 
                      transform: `scale(${zoomLevel / 100})`,
                      height: '600px'
                    }}
                  >
                    <StorageGrid moduleId={activeModule} />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <StorageOptimizationCard />
          </div>
          
          <div className="space-y-6">
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Module Information</CardTitle>
                <CardDescription>Storage statistics and details</CardDescription>
              </CardHeader>
              <CardContent>
                <StorageUtilizationInfo moduleId={activeModule} />
              </CardContent>
            </Card>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Legend</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
                  <span className="text-sm">Available Space</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm"></div>
                  <span className="text-sm">Partially Filled</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
                  <span className="text-sm">Fully Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
                  <span className="text-sm">High Priority Items</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-sm"></div>
                  <span className="text-sm">Scientific Equipment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm"></div>
                  <span className="text-sm">Personal Items</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="space-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Grid size={16} className="mr-2" />
                  View Occupied Spaces
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RotateCw size={16} className="mr-2" />
                  Run Optimization
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <ArrowUpRight size={16} className="mr-2" />
                  Detailed View
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>3D Storage Containers</CardTitle>
                  <CardDescription>Visual representation of storage utilization</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {containers.map(container => {
                      const { fillPercentage } = containerFillPercentages.find(
                        c => c.container_id === container.container_id
                      ) || { fillPercentage: 0 };
                      
                      return (
                        <div 
                          key={container.container_id} 
                          className="flex flex-col items-center"
                        >
                          <StorageCube 
                            container={container}
                            fillPercentage={fillPercentage}
                            isSelected={selectedContainer === container.container_id}
                            onClick={() => setSelectedContainer(
                              selectedContainer === container.container_id ? null : container.container_id
                            )}
                          />
                          <div className="text-xs mt-1 text-center">
                            <div>{container.zone}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Storage Zones</CardTitle>
                  <CardDescription>Storage utilization by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from(new Set(containers.map(c => c.zone))).map(zone => {
                      const zoneContainers = containers.filter(c => c.zone === zone);
                      const totalContainers = zoneContainers.length;
                      
                      const zoneFills = containerFillPercentages
                        .filter(c => zoneContainers.some(zc => zc.container_id === c.container_id))
                        .map(c => c.fillPercentage);
                      
                      const averageFill = zoneFills.length > 0 
                        ? Math.round(zoneFills.reduce((a, b) => a + b, 0) / zoneFills.length) 
                        : 0;
                      
                      return (
                        <div key={zone} className="p-3 border rounded">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{zone}</h3>
                            <Badge className={
                              averageFill > 80 ? 'bg-red-600' :
                              averageFill > 50 ? 'bg-yellow-600' :
                              'bg-green-600'
                            }>
                              {averageFill}% Full
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {totalContainers} container{totalContainers !== 1 ? 's' : ''}
                          </div>
                          <div className="w-full bg-muted rounded-full h-2 mt-2">
                            <div 
                              className={`h-2 rounded-full ${
                                averageFill > 80 ? 'bg-red-600' :
                                averageFill > 50 ? 'bg-yellow-600' :
                                'bg-green-600'
                              }`}
                              style={{ width: `${averageFill}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Storage Details</CardTitle>
              <CardDescription>View detailed storage information</CardDescription>
            </CardHeader>
            <CardContent>
              <StorageVisualization 
                containerId={selectedContainer || undefined}
                containers={containers}
                items={items}
                placements={placements}
              />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default StorageMap;
