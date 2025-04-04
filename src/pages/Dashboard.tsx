import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Grid, Package, Search, BarChart4, ArrowUp, ArrowDown } from 'lucide-react';
import StorageUtilizationChart from '@/components/dashboard/StorageUtilizationChart';
import RecentActivityList from '@/components/dashboard/RecentActivityList';
import PriorityItems from '@/components/dashboard/PriorityItems';
import ExpiryTracker from '@/components/inventory/ExpiryTracker';
import { dummyInventoryData } from '@/data/dummyData';
import InventoryItemDialog from '@/components/inventory/InventoryItemDialog';
import { InventoryItem } from '@/types/inventory';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [inventoryItems, setInventoryItems] = useState(dummyInventoryData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | undefined>(undefined);

  // Handle search functionality
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/inventory?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle add item
  const handleAddItem = () => {
    setCurrentItem(undefined);
    setDialogOpen(true);
  };

  // Save an item
  const handleSaveItem = (item: InventoryItem) => {
    const newItem: InventoryItem = {
      ...item,
      priority: typeof item.priority === 'string' ? item.priority : String(item.priority)
    };
    
    setInventoryItems(prev => [...prev, newItem as any]);
    toast({
      title: "Item Added",
      description: `${item.name} has been added to the inventory.`,
    });
  };

  // Navigate to details
  const handleItemClick = (itemId: string) => {
    navigate(`/inventory?highlight=${itemId}`);
  };

  // Navigate to analytics
  const handleAnalyticsClick = () => {
    navigate('/analytics');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Astronaut. Here's your storage overview.</p>
        </div>
        <div className="flex gap-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick Find"
                className="pl-9 w-64"
              />
            </div>
            <Button type="submit" variant="outline">
              <Search size={16} className="mr-2" />
              Search
            </Button>
          </form>
          <Button className="gap-2" onClick={handleAddItem}>
            <Package size={16} />
            Add Item
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="space-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Items</CardTitle>
            <CardDescription>Current inventory count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{inventoryItems.length}</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <ArrowUp size={14} className="text-green-500" />
                  <span className="text-green-500">+12</span> since last supply mission
                </div>
              </div>
              <Package size={40} className="text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Storage Utilization</CardTitle>
            <CardDescription>Available space capacity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">76%</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <ArrowDown size={14} className="text-green-500" />
                  <span className="text-green-500">4%</span> after last optimization
                </div>
              </div>
              <Grid size={40} className="text-muted-foreground/30" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">High Priority</CardTitle>
            <CardDescription>Items needing attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">8</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1">
                  <ArrowUp size={14} className="text-red-500" />
                  <span className="text-red-500">+3</span> in the last week
                </div>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-yellow-600">3 Med</Badge>
                <Badge className="bg-red-600">5 High</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-card md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Storage Utilization</CardTitle>
                <CardDescription>Usage across storage compartments</CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={handleAnalyticsClick}>
                <BarChart4 size={16} className="mr-2" />
                Analytics
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <StorageUtilizationChart />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="space-card">
            <CardHeader>
              <CardTitle>Priority Items</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <PriorityItems onItemClick={handleItemClick} />
            </CardContent>
          </Card>
        </div>
      </div>

      <ExpiryTracker />

      <Card className="space-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest inventory operations</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate('/inventory')}>
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <RecentActivityList />
        </CardContent>
      </Card>

      <InventoryItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={currentItem}
        onSave={handleSaveItem}
        isNewItem={true}
      />
    </div>
  );
};

export default Dashboard;
