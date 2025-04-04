
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Package, Move, RefreshCw, ArrowRight, Lightbulb } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define item types for drag and drop
const ItemTypes = {
  INVENTORY_ITEM: 'inventoryItem'
};

// Mock data for storage zones
const storageZones = [
  { id: 'zone-a', name: 'Module A', capacity: 100, used: 65 },
  { id: 'zone-b', name: 'Module B', capacity: 100, used: 42 },
  { id: 'zone-c', name: 'Cargo Bay', capacity: 100, used: 87 },
  { id: 'zone-d', name: 'Lab Storage', capacity: 100, used: 34 },
  { id: 'zone-e', name: 'Personal Quarters', capacity: 100, used: 56 },
];

// Mock inventory items
const initialInventoryItems = [
  { id: 'item-1', name: 'Medical Kit', category: 'Medical', size: 'Medium', weight: '2.4kg', zoneId: 'zone-a' },
  { id: 'item-2', name: 'Food Rations', category: 'Food', size: 'Large', weight: '5.1kg', zoneId: 'zone-a' },
  { id: 'item-3', name: 'Oxygen Canisters', category: 'Life Support', size: 'Large', weight: '8.3kg', zoneId: 'zone-b' },
  { id: 'item-4', name: 'Science Equipment', category: 'Scientific', size: 'Medium', weight: '3.7kg', zoneId: 'zone-d' },
  { id: 'item-5', name: 'Tool Kit', category: 'Equipment', size: 'Small', weight: '1.2kg', zoneId: 'zone-c' },
  { id: 'item-6', name: 'Personal Items', category: 'Personal', size: 'Small', weight: '0.8kg', zoneId: 'zone-e' },
  { id: 'item-7', name: 'Water Filters', category: 'Life Support', size: 'Medium', weight: '4.5kg', zoneId: 'zone-b' },
  { id: 'item-8', name: 'Emergency Supplies', category: 'Emergency', size: 'Medium', weight: '3.6kg', zoneId: 'zone-c' },
];

interface DragItem {
  id: string;
  sourceZoneId: string;
}

// Draggable inventory item component
const InventoryItem = ({ item, index }: { item: any, index: number }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.INVENTORY_ITEM,
    item: { id: item.id, sourceZoneId: item.zoneId } as DragItem,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 border rounded-md cursor-move ${
        isDragging ? 'opacity-50 border-primary' : 'border-border'
      } hover:bg-accent hover:border-primary transition-colors`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="font-medium">{item.name}</p>
          <div className="flex gap-2 text-xs text-muted-foreground mt-1">
            <span>{item.category}</span>
            <span>•</span>
            <span>{item.size}</span>
            <span>•</span>
            <span>{item.weight}</span>
          </div>
        </div>
        <div className="text-muted-foreground">
          <Move size={16} />
        </div>
      </div>
    </div>
  );
};

// Droppable storage zone component
const StorageZone = ({ zone, items, onItemDrop, onOptimize }: { zone: any, items: any[], onItemDrop: (itemId: string, sourceZoneId: string, targetZoneId: string) => void, onOptimize: (zoneId: string) => void }) => {
  const { toast } = useToast();
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.INVENTORY_ITEM,
    drop: (droppedItem: DragItem) => {
      onItemDrop(droppedItem.id, droppedItem.sourceZoneId, zone.id);
      toast({
        title: "Item relocated",
        description: `Item moved to ${zone.name}`,
      });
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Calculate utilization percentage
  const utilizationPercent = (zone.used / zone.capacity) * 100;
  
  // Determine utilization color
  const getUtilizationColor = (percent: number) => {
    if (percent < 50) return 'bg-green-500';
    if (percent < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div 
      ref={drop} 
      className={`border rounded-lg p-4 ${
        isOver ? 'border-primary bg-accent/20' : ''
      } transition-colors h-full flex flex-col`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-lg">{zone.name}</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={() => onOptimize(zone.id)}
        >
          <RefreshCw size={14} />
        </Button>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Utilization</span>
          <span>{utilizationPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${getUtilizationColor(utilizationPercent)}`} 
            style={{ width: `${utilizationPercent}%` }}
          ></div>
        </div>
      </div>
      
      <div className="text-sm mb-2">
        <span className="text-muted-foreground">{items.length} items</span>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-2 mt-2">
        {items.map((item, index) => (
          <InventoryItem key={item.id} item={item} index={index} />
        ))}
        {items.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-8">
            Drop items here
          </div>
        )}
      </div>
    </div>
  );
};

// AI Recommendation component
const AIRecommendation = ({ recommendations, onApplyRecommendation, isLoading }: { recommendations: any[], onApplyRecommendation: (id: string) => void, isLoading: boolean }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          AI Storage Recommendations
        </CardTitle>
        <CardDescription>
          Smart suggestions to optimize your storage allocation
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="py-8 flex flex-col items-center">
            <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-2"></div>
            <p className="text-sm text-muted-foreground">Analyzing storage patterns...</p>
          </div>
        ) : recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-3 border rounded-md">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{rec.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                  <Button 
                    size="sm" 
                    className="ml-2 whitespace-nowrap"
                    onClick={() => onApplyRecommendation(rec.id)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Alert className="bg-muted/50 border">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>No recommendations at this time</AlertTitle>
            <AlertDescription>
              Your storage layout is currently optimized. Check back after making more changes.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

const StorageMap = () => {
  const { toast } = useToast();
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);
  const [recommendations, setRecommendations] = useState<Array<any>>([]);
  const [isGeneratingRecommendations, setIsGeneratingRecommendations] = useState(false);
  
  // Generate AI recommendations
  const generateRecommendations = () => {
    setIsGeneratingRecommendations(true);
    
    // Simulating API call delay
    setTimeout(() => {
      // These would come from an actual AI analysis in a real app
      const newRecommendations = [
        {
          id: 'rec-1',
          title: 'Optimize Module A Distribution',
          description: 'Move 2 medical items from Module A to Lab Storage to balance weight distribution and create 15% more space.',
          actions: [{itemId: 'item-1', sourceZone: 'zone-a', targetZone: 'zone-d'}]
        },
        {
          id: 'rec-2',
          title: 'Consolidate Life Support Items',
          description: 'Group all life support items in Module B for improved accessibility during emergencies.',
          actions: [{itemId: 'item-8', sourceZone: 'zone-c', targetZone: 'zone-b'}]
        },
        {
          id: 'rec-3',
          title: 'Reduce Cargo Bay Congestion',
          description: 'Cargo Bay is nearing capacity. Consider relocating non-essential items to Personal Quarters.',
          actions: [{itemId: 'item-5', sourceZone: 'zone-c', targetZone: 'zone-e'}]
        }
      ];
      
      setRecommendations(newRecommendations);
      setIsGeneratingRecommendations(false);
      
      toast({
        title: "Recommendations Generated",
        description: "AI has analyzed your storage and provided optimization suggestions.",
      });
    }, 2000);
  };
  
  // Effect to generate initial recommendations
  useEffect(() => {
    generateRecommendations();
  }, []);

  // Handle dropping an item into a zone
  const handleItemDrop = (itemId: string, sourceZoneId: string, targetZoneId: string) => {
    if (sourceZoneId === targetZoneId) return;
    
    setInventoryItems(items => 
      items.map(item => 
        item.id === itemId 
          ? { ...item, zoneId: targetZoneId } 
          : item
      )
    );
    
    // Generate new recommendations after moving items
    generateRecommendations();
  };
  
  // Apply an AI recommendation
  const handleApplyRecommendation = (recId: string) => {
    const recommendation = recommendations.find(rec => rec.id === recId);
    
    if (recommendation) {
      // Apply all actions in the recommendation
      recommendation.actions.forEach(action => {
        setInventoryItems(items => 
          items.map(item => 
            item.id === action.itemId 
              ? { ...item, zoneId: action.targetZone } 
              : item
          )
        );
      });
      
      // Remove the applied recommendation
      setRecommendations(recommendations.filter(rec => rec.id !== recId));
      
      toast({
        title: "Recommendation Applied",
        description: `${recommendation.title} has been implemented.`,
      });
    }
  };
  
  // Optimize a specific zone
  const handleOptimizeZone = (zoneId: string) => {
    toast({
      title: "Zone Optimization",
      description: `Optimizing ${storageZones.find(z => z.id === zoneId)?.name}...`,
    });
    
    // In a real app, this would call an AI service for specific zone optimization
    // For now, we'll just regenerate all recommendations
    generateRecommendations();
  };

  // Group items by zone
  const itemsByZone = storageZones.map(zone => ({
    ...zone,
    items: inventoryItems.filter(item => item.zoneId === zone.id)
  }));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Storage Map</h2>
            <p className="text-muted-foreground">
              Visualize and organize your inventory across storage zones
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={generateRecommendations}
              className="gap-2"
              disabled={isGeneratingRecommendations}
            >
              <RefreshCw size={16} className={isGeneratingRecommendations ? "animate-spin" : ""} />
              Refresh Analysis
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {itemsByZone.map(zone => (
                <StorageZone 
                  key={zone.id} 
                  zone={zone} 
                  items={zone.items} 
                  onItemDrop={handleItemDrop}
                  onOptimize={handleOptimizeZone}
                />
              ))}
            </div>
          </div>
          
          <div>
            <AIRecommendation 
              recommendations={recommendations}
              onApplyRecommendation={handleApplyRecommendation}
              isLoading={isGeneratingRecommendations}
            />
            
            <Card className="mt-6">
              <CardHeader className="pb-3">
                <CardTitle>Storage Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span className="text-sm">Under 50% - Optimal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">50-80% - Moderate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span className="text-sm">Over 80% - Critical</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium">How to use:</p>
                  <p className="text-xs text-muted-foreground">• Drag and drop items between zones</p>
                  <p className="text-xs text-muted-foreground">• Click the refresh icon to optimize a specific zone</p>
                  <p className="text-xs text-muted-foreground">• Apply AI recommendations for optimal storage</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default StorageMap;
