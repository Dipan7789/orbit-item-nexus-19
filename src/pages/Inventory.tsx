import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Package, Filter, Download, Upload, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

import InventoryActions from '@/components/inventory/InventoryActions';
import InventoryItemDialog from '@/components/inventory/InventoryItemDialog';
import { dummyInventoryData } from '@/data/dummyData';
import { InventoryItem } from '@/types/inventory';

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(dummyInventoryData as unknown as InventoryItem[]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | undefined>(undefined);
  const [isNewItem, setIsNewItem] = useState(false);

  const filteredItems = inventoryItems.filter(item => {
    return (
      (searchTerm === '' || 
       item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      (selectedLocation === 'all' || item.location === selectedLocation) &&
      (selectedPriority === 'all' || item.priority === selectedPriority)
    );
  });

  const handleEditItem = (itemId: string) => {
    const item = inventoryItems.find(item => item.id === itemId);
    setCurrentItem(item);
    setIsNewItem(false);
    setDialogOpen(true);
  };

  const handleAddItem = () => {
    setCurrentItem(undefined);
    setIsNewItem(true);
    setDialogOpen(true);
  };

  const handleDeleteItem = (itemId: string) => {
    setInventoryItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Item Deleted",
      description: "The item has been removed from inventory.",
    });
  };

  const handleSaveItem = (item: InventoryItem) => {
    if (isNewItem) {
      setInventoryItems(items => [...items, item]);
    } else {
      setInventoryItems(items => 
        items.map(i => i.id === item.id ? item : i)
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage and track all items in the space station</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download size={16} />
            Export
          </Button>
          <Button variant="outline" className="gap-2">
            <Upload size={16} />
            Import
          </Button>
          <Button className="gap-2" onClick={handleAddItem}>
            <Plus size={16} />
            New Item
          </Button>
        </div>
      </div>

      <Card className="space-card">
        <CardHeader className="pb-3">
          <CardTitle>Item Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Input
                placeholder="Search by name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
              <Package className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-wrap md:flex-nowrap gap-3">
              <div className="w-full md:w-auto">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="medical">Medical</SelectItem>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="scientific">Scientific</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-auto">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="module-a">Module A</SelectItem>
                    <SelectItem value="module-b">Module B</SelectItem>
                    <SelectItem value="cargo-bay">Cargo Bay</SelectItem>
                    <SelectItem value="lab-storage">Lab Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full md:w-auto">
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger className="w-full md:w-[150px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>

          <div className="rounded-md border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          item.priority === 'high' ? 'bg-red-600' : 
                          item.priority === 'medium' ? 'bg-yellow-600' : 
                          'bg-green-600'
                        }
                      >
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>{typeof item.lastUsed === 'string' ? item.lastUsed : item.lastUsed.toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <InventoryActions 
                        itemId={item.id} 
                        onEdit={() => handleEditItem(item.id)}
                        onDelete={() => handleDeleteItem(item.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <InventoryItemDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={currentItem}
        onSave={handleSaveItem}
        isNewItem={isNewItem}
      />
    </div>
  );
};

export default Inventory;
