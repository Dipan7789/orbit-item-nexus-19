import React, { useState, useEffect } from 'react';
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
import { useNavigate, useLocation } from 'react-router-dom';

import InventoryActions from '@/components/inventory/InventoryActions';
import InventoryItemDialog from '@/components/inventory/InventoryItemDialog';
import { dummyInventoryData } from '@/data/dummyData';
import { InventoryItem } from '@/types/inventory';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import CSVImporter from '@/components/importexport/CSVImporter';

const Inventory = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>(dummyInventoryData as InventoryItem[]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [importDialogOpen, setImportDialogOpen] = useState(false);
  const [exportInProgress, setExportInProgress] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | undefined>(undefined);
  const [isNewItem, setIsNewItem] = useState(false);
  const [highlightedItemId, setHighlightedItemId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const highlightId = searchParams.get('highlight');
    
    if (highlightId) {
      setHighlightedItemId(highlightId);
      setTimeout(() => {
        const element = document.getElementById(`inventory-item-${highlightId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 300);
    }
  }, [location.search]);

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
      toast({
        title: "Item Added",
        description: `${item.name} has been added to the inventory.`,
      });
    } else {
      setInventoryItems(items => 
        items.map(i => i.id === item.id ? item : i)
      );
      toast({
        title: "Item Updated",
        description: `${item.name} has been updated successfully.`,
      });
    }
  };
  
  const handleExport = () => {
    setExportInProgress(true);
    
    setTimeout(() => {
      try {
        const headers = ["ID", "Name", "Category", "Location", "Quantity", "Priority", "Last Used", "Expiry Date"];
        const csvContent = [
          headers.join(','),
          ...inventoryItems.map(item => [
            item.id,
            `"${item.name}"`,
            item.category,
            `"${item.location}"`,
            item.quantity,
            item.priority,
            item.lastUsed,
            item.expiryDate || ''
          ].join(','))
        ].join('\n');
        
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `inventory-export-${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Export Successful",
          description: "Inventory data has been exported to CSV file.",
        });
      } catch (error) {
        toast({
          title: "Export Failed",
          description: "There was an error exporting the inventory data.",
          variant: "destructive",
        });
      } finally {
        setExportInProgress(false);
      }
    }, 1500);
  };
  
  const handleItemsImported = (items: InventoryItem[]) => {
    setInventoryItems(prev => [...prev, ...items]);
    setImportDialogOpen(false);
    
    toast({
      title: "Import Successful",
      description: `${items.length} items have been imported.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage and track all items in the space station</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={handleExport}
            disabled={exportInProgress}
          >
            <Download size={16} />
            {exportInProgress ? 'Exporting...' : 'Export'}
          </Button>
          
          <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Upload size={16} />
                Import
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Import Inventory Items</DialogTitle>
                <DialogDescription>
                  Upload a CSV file to import inventory items in bulk.
                </DialogDescription>
              </DialogHeader>
              <CSVImporter onItemsImported={handleItemsImported} />
            </DialogContent>
          </Dialog>
          
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
                  <TableRow 
                    key={item.id}
                    id={`inventory-item-${item.id}`}
                    className={highlightedItemId === item.id ? 'bg-primary/10 animate-pulse' : ''}
                  >
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
                    <TableCell>
                      {item.lastUsed ? 
                        (typeof item.lastUsed === 'string' ? 
                          new Date(item.lastUsed).toLocaleDateString() : 
                          'object' === typeof item.lastUsed && item.lastUsed instanceof Date ? 
                            item.lastUsed.toLocaleDateString() : 
                            '—') 
                        : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <InventoryActions 
                        itemId={item.id} 
                        onEdit={() => handleEditItem(item.id)}
                        onDelete={() => handleDeleteItem(item.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      <Package className="mx-auto h-12 w-12 text-muted-foreground/50 mb-2" />
                      <p>No inventory items found</p>
                    </TableCell>
                  </TableRow>
                )}
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
