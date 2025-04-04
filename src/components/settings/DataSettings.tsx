
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { 
  AlertCircle, 
  Download, 
  DownloadCloud, 
  RefreshCcw, 
  Trash2, 
  Upload, 
  UploadCloud 
} from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

const DataSettings = () => {
  const { toast } = useToast();
  const [autoBackup, setAutoBackup] = React.useState(true);

  const handleExportData = () => {
    toast({
      title: "Data Export Started",
      description: "Your data is being prepared for download.",
    });
  };

  const handleImportData = () => {
    toast({
      title: "Data Import Started",
      description: "Your data is being uploaded and processed.",
    });
  };

  const handleClearData = () => {
    toast({
      title: "Data Cleared",
      description: "All your data has been cleared successfully.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Data Import & Export</CardTitle>
          <CardDescription>
            Export your data or import from a backup
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Export Data</h3>
              <p className="text-sm text-muted-foreground">
                Download all your data in various formats
              </p>
              
              <div className="flex flex-col gap-2">
                <Button variant="outline" className="justify-start gap-2">
                  <Download size={16} />
                  Export as CSV
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Download size={16} />
                  Export as JSON
                </Button>
                <Button variant="outline" className="justify-start gap-2">
                  <Download size={16} />
                  Export as PDF Report
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Import Data</h3>
              <p className="text-sm text-muted-foreground">
                Import data from your files
              </p>
              
              <div className="border-2 border-dashed border-muted rounded-md p-6 flex flex-col items-center justify-center">
                <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Drag and drop files here, or click to select files
                </p>
                <Button variant="secondary" size="sm" className="gap-2">
                  <Upload size={14} />
                  Select Files
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex items-center gap-2">
            <Switch 
              checked={autoBackup}
              onCheckedChange={setAutoBackup}
              id="auto-backup"
            />
            <Label htmlFor="auto-backup" className="cursor-pointer">
              Enable automatic daily backups
            </Label>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleExportData}>
              <DownloadCloud size={16} />
              Export All
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleImportData}>
              <UploadCloud size={16} />
              Import
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Manage your app data and storage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Storage Usage</Label>
              <span className="text-sm font-medium">23.4 MB / 100 MB</span>
            </div>
            <Progress value={23.4} className="h-2" />
            <p className="text-xs text-muted-foreground">
              You're using 23% of your available storage
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-1">Inventory Items</h4>
              <div className="flex justify-between text-sm">
                <span>143 items</span>
                <span>12.3 MB</span>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-1">Storage Containers</h4>
              <div className="flex justify-between text-sm">
                <span>28 containers</span>
                <span>5.7 MB</span>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-1">Optimization Plans</h4>
              <div className="flex justify-between text-sm">
                <span>5 plans</span>
                <span>3.2 MB</span>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md">
              <h4 className="font-medium mb-1">User Preferences</h4>
              <div className="flex justify-between text-sm">
                <span>System data</span>
                <span>2.2 MB</span>
              </div>
            </div>
          </div>
          
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>
              Clearing data will permanently remove all your inventory items, container information, and optimization plans. This action cannot be undone.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <RefreshCcw size={16} />
            Refresh Data
          </Button>
          <Button variant="destructive" className="gap-2" onClick={handleClearData}>
            <Trash2 size={16} />
            Clear All Data
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DataSettings;
