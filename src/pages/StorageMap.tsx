
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid, Plus, Minus, Maximize2, RotateCw, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import StorageGrid from '@/components/storage/StorageGrid';
import StorageModuleSelector from '@/components/storage/StorageModuleSelector';
import StorageUtilizationInfo from '@/components/storage/StorageUtilizationInfo';
import StorageOptimizationCard from '@/components/storage/StorageOptimizationCard';

const StorageMap = () => {
  const [activeModule, setActiveModule] = useState('module-a');
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 20, 200));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 20, 60));
  };
  
  const resetZoom = () => {
    setZoomLevel(100);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Storage Map</h1>
          <p className="text-muted-foreground mt-1">Visual representation of storage compartments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <ArrowUpRight size={16} />
            Expand View
          </Button>
          <Button className="gap-2">
            <RotateCw size={16} />
            Optimize Storage
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default StorageMap;
