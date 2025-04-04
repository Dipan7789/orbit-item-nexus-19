
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { InventoryItem, StorageContainer } from '@/types/inventory';
import { Upload, FileCheck, AlertTriangle } from 'lucide-react';
import { processInventoryItems, processStorageContainers } from '@/utils/dataImport';
import DataPreview from './DataPreview';
import FileUploader from './FileUploader';

interface CSVImporterProps {
  onItemsImported?: (items: InventoryItem[]) => void;
  onContainersImported?: (containers: StorageContainer[]) => void;
}

const CSVImporter: React.FC<CSVImporterProps> = ({ 
  onItemsImported,
  onContainersImported
}) => {
  const [activeTab, setActiveTab] = useState('items');
  const [itemsFile, setItemsFile] = useState<File | null>(null);
  const [containersFile, setContainersFile] = useState<File | null>(null);
  const [itemsData, setItemsData] = useState<InventoryItem[]>([]);
  const [containersData, setContainersData] = useState<StorageContainer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    if (activeTab === 'items') {
      setItemsFile(file);
      processFile(file, 'items');
    } else {
      setContainersFile(file);
      processFile(file, 'containers');
    }
  };

  const processFile = (file: File, type: 'items' | 'containers') => {
    setError(null);
    setSuccess(null);
    
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        
        if (type === 'items') {
          const items = processInventoryItems(csvText);
          setItemsData(items);
          setSuccess(`Successfully imported ${items.length} inventory items`);
        } else {
          const containers = processStorageContainers(csvText);
          setContainersData(containers);
          setSuccess(`Successfully imported ${containers.length} storage containers`);
        }
      } catch (err) {
        setError(`Failed to process CSV file: ${err instanceof Error ? err.message : String(err)}`);
      }
    };
    
    reader.onerror = () => {
      setError('Error reading file');
    };
    
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (activeTab === 'items' && itemsData.length > 0) {
      onItemsImported?.(itemsData);
      setSuccess(`${itemsData.length} items have been imported into the system`);
    } else if (activeTab === 'containers' && containersData.length > 0) {
      onContainersImported?.(containersData);
      setSuccess(`${containersData.length} containers have been imported into the system`);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="items">Inventory Items</TabsTrigger>
          <TabsTrigger value="containers">Storage Containers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="items" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Import inventory items with their dimensions, priority, and storage preferences.
            Expected columns: item_id, name, width_cm, depth_cm, height_cm, mass_kg, priority, expiry_date, usage_limit, preferred_zone
          </div>
          
          <FileUploader 
            onFileUpload={handleFileUpload} 
            currentFile={itemsFile}
          />
          
          {itemsData.length > 0 && (
            <>
              <h3 className="text-lg font-medium mt-6">Data Preview</h3>
              <DataPreview data={itemsData.slice(0, 5)} />
              <div className="text-sm text-muted-foreground mt-2">
                Showing {Math.min(5, itemsData.length)} of {itemsData.length} items
              </div>
            </>
          )}
        </TabsContent>
        
        <TabsContent value="containers" className="space-y-4">
          <div className="text-sm text-muted-foreground">
            Import storage containers with their location and dimensions.
            Expected columns: zone, container_id, width_cm, depth_cm, height_cm
          </div>
          
          <FileUploader 
            onFileUpload={handleFileUpload} 
            currentFile={containersFile}
          />
          
          {containersData.length > 0 && (
            <>
              <h3 className="text-lg font-medium mt-6">Data Preview</h3>
              <DataPreview data={containersData.slice(0, 5)} />
              <div className="text-sm text-muted-foreground mt-2">
                Showing {Math.min(5, containersData.length)} of {containersData.length} containers
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
      
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {success && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <FileCheck className="h-4 w-4 text-green-500" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-end">
        <Button 
          onClick={handleImport}
          disabled={(activeTab === 'items' && itemsData.length === 0) || 
                   (activeTab === 'containers' && containersData.length === 0)}
          className="gap-2"
        >
          <Upload size={16} />
          {activeTab === 'items' ? 'Import Items' : 'Import Containers'}
        </Button>
      </div>
    </div>
  );
};

export default CSVImporter;
