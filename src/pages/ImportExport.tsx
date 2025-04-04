import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InventoryItem, StorageContainer, findOptimalPlacement } from '@/types/inventory';
import { exportToCSV, exportToJSON } from '@/utils/dataImport';
import { toast } from '@/hooks/use-toast';
import CSVImporter from '@/components/importexport/CSVImporter';
import ExportOptions from '@/components/importexport/ExportOptions';
import { Button } from '@/components/ui/button';
import { AlertCircle, Download, RotateCw } from 'lucide-react';

const ImportExport = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [containers, setContainers] = useState<StorageContainer[]>([]);
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [unplacedItems, setUnplacedItems] = useState<InventoryItem[]>([]);
  const [optimizationComplete, setOptimizationComplete] = useState(false);

  const handleItemsImported = (newItems: InventoryItem[]) => {
    setItems(newItems);
    setOptimizationComplete(false);
    toast({
      title: "Items Imported",
      description: `${newItems.length} items have been imported successfully.`,
    });
  };

  const handleContainersImported = (newContainers: StorageContainer[]) => {
    setContainers(newContainers);
    setOptimizationComplete(false);
    toast({
      title: "Containers Imported",
      description: `${newContainers.length} containers have been imported successfully.`,
    });
  };

  const runOptimization = () => {
    if (items.length === 0 || containers.length === 0) {
      toast({
        title: "Cannot Run Optimization",
        description: "Please import both items and containers first.",
        variant: "destructive",
      });
      return;
    }

    const { placements: newPlacements, unplaced } = findOptimalPlacement(items, containers);
    setPlacements(newPlacements);
    setUnplacedItems(unplaced);
    setOptimizationComplete(true);

    toast({
      title: "Optimization Complete",
      description: `Placed ${Object.keys(newPlacements).length} items. ${unplaced.length} items could not be placed.`,
    });
  };

  const downloadResults = (format: 'csv' | 'json') => {
    if (!optimizationComplete) {
      toast({
        title: "No Results to Download",
        description: "Please run the optimization first.",
        variant: "destructive",
      });
      return;
    }

    // Create results data
    const placementResults = items
      .filter(item => placements[item.item_id || item.id])
      .map(item => ({
        item_id: item.item_id || item.id,
        name: item.name,
        container_id: placements[item.item_id || item.id],
        container_zone: containers.find(c => c.container_id === placements[item.item_id || item.id])?.zone || '',
        priority: item.priority,
        preferred_zone: item.preferred_zone,
        dimensions: `${item.width_cm || 0}x${item.depth_cm || 0}x${item.height_cm || 0} cm`,
        mass_kg: item.mass_kg || 0
      }));

    const unplacedResults = unplacedItems.map(item => ({
      item_id: item.item_id || item.id,
      name: item.name,
      reason: "No suitable container found",
      priority: item.priority,
      preferred_zone: item.preferred_zone,
      dimensions: `${item.width_cm || 0}x${item.depth_cm || 0}x${item.height_cm || 0} cm`,
      mass_kg: item.mass_kg || 0
    }));

    const results = {
      placed: placementResults,
      unplaced: unplacedResults,
      summary: {
        total_items: items.length,
        placed_items: placementResults.length,
        unplaced_items: unplacedResults.length,
        containers_used: [...new Set(Object.values(placements))].length,
        total_containers: containers.length
      }
    };

    // Create downloadable content
    let content = '';
    let filename = '';
    
    if (format === 'csv') {
      content = exportToCSV(placementResults);
      filename = 'storage-placements.csv';
    } else {
      content = exportToJSON(results);
      filename = 'storage-optimization-results.json';
    }

    // Create download link
    const blob = new Blob([content], { type: format === 'csv' ? 'text/csv' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download Started",
      description: `Your ${format.toUpperCase()} file is being downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Import & Export</h1>
          <p className="text-muted-foreground mt-1">Manage inventory data and storage containers</p>
        </div>
      </div>

      <Tabs defaultValue="import">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="import">Import Data</TabsTrigger>
          <TabsTrigger value="export">Export Data</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Import</CardTitle>
              <CardDescription>
                Import inventory items and storage containers from CSV files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CSVImporter 
                onItemsImported={handleItemsImported}
                onContainersImported={handleContainersImported}
              />
            </CardContent>
          </Card>

          {(items.length > 0 || containers.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Storage Optimization</CardTitle>
                <CardDescription>
                  Run the optimization algorithm to find the best placement for items
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Imported Items</h3>
                      <div className="text-3xl font-bold">{items.length}</div>
                      {items.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Ready for optimization
                        </p>
                      )}
                    </div>
                    
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Storage Containers</h3>
                      <div className="text-3xl font-bold">{containers.length}</div>
                      {containers.length > 0 && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Available for item placement
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {(items.length === 0 || containers.length === 0) && (
                    <div className="bg-amber-50 text-amber-800 p-4 rounded-md flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                      <div>
                        <strong>Import Required</strong>
                        <p className="text-sm">
                          Please import both inventory items and storage containers before running the optimization.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {optimizationComplete && (
                    <div className="bg-muted p-4 rounded-md">
                      <h3 className="font-medium mb-2">Optimization Results</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Items successfully placed:</span>
                          <span className="font-medium">{Object.keys(placements).length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Items that couldn't be placed:</span>
                          <span className="font-medium">{unplacedItems.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Containers utilized:</span>
                          <span className="font-medium">{[...new Set(Object.values(placements))].length}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex gap-2">
                        <Button onClick={() => downloadResults('csv')} variant="outline" size="sm" className="gap-1">
                          <Download size={14} />
                          CSV
                        </Button>
                        <Button onClick={() => downloadResults('json')} variant="outline" size="sm" className="gap-1">
                          <Download size={14} />
                          JSON
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={runOptimization}
                      disabled={items.length === 0 || containers.length === 0}
                      className="gap-2"
                    >
                      <RotateCw size={16} />
                      Run Optimization
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="export" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Export Data</CardTitle>
              <CardDescription>
                Export inventory data and reports in various formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExportOptions />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportExport;
