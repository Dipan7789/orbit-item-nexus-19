
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileUp, FileDown, Upload, Download, File, CheckSquare, Database, AlertTriangle } from 'lucide-react';

import FileUploader from '@/components/importexport/FileUploader';
import DataPreview from '@/components/importexport/DataPreview';
import ExportOptions from '@/components/importexport/ExportOptions';

const ImportExport = () => {
  const [activeTab, setActiveTab] = useState('import');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<any[] | null>(null);
  const [importReady, setImportReady] = useState(false);
  
  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    
    // Simulate file parsing and preview generation
    setTimeout(() => {
      // Mock data preview for demonstration
      if (file.name.endsWith('.csv') || file.name.endsWith('.json')) {
        const mockPreviewData = [
          { id: 'MED-1234', name: 'First Aid Kit', category: 'Medical', quantity: 5 },
          { id: 'FOOD-5678', name: 'Freeze-Dried Meal', category: 'Food', quantity: 20 },
          { id: 'TOOL-9101', name: 'Screwdriver Set', category: 'Equipment', quantity: 2 },
        ];
        setPreviewData(mockPreviewData);
        setImportReady(true);
      } else {
        setPreviewData(null);
        setImportReady(false);
      }
    }, 1000);
  };
  
  const handleImport = () => {
    // Simulate import process
    console.log('Importing data from', uploadedFile?.name);
    // Show success message, clear data
    setTimeout(() => {
      setUploadedFile(null);
      setPreviewData(null);
      setImportReady(false);
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Data Import & Export</h1>
          <p className="text-muted-foreground mt-1">Transfer inventory data in and out of the system</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="import" className="flex items-center gap-2">
            <FileUp size={16} />
            Import
          </TabsTrigger>
          <TabsTrigger value="export" className="flex items-center gap-2">
            <FileDown size={16} />
            Export
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="import" className="space-y-4">
          <Card className="space-card">
            <CardHeader>
              <CardTitle>Import Inventory Data</CardTitle>
              <CardDescription>
                Upload CSV or JSON files containing inventory items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FileUploader onFileUpload={handleFileUpload} currentFile={uploadedFile} />
              
              {uploadedFile && !previewData && (
                <div className="flex items-center justify-center h-32 bg-muted/30 rounded-md border border-dashed">
                  <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
                    <File size={20} />
                    <span>Processing file...</span>
                  </div>
                </div>
              )}
              
              {previewData && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckSquare size={20} />
                    <span>File processed successfully!</span>
                  </div>
                  
                  <DataPreview data={previewData} />
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Database size={16} />
                      <span>{previewData.length} items ready to import</span>
                    </div>
                    <Button 
                      onClick={handleImport}
                      disabled={!importReady}
                      className="gap-2"
                    >
                      <Upload size={16} />
                      Import Data
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="space-card">
            <CardHeader>
              <CardTitle>Import Guidelines</CardTitle>
              <CardDescription>
                Requirements for importing data correctly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertTriangle size={20} className="text-yellow-500 mt-0.5" />
                <div>
                  <h4 className="font-medium">File Format Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    Files must be in CSV or JSON format with UTF-8 encoding. Maximum file size is 10MB.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Required Fields:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>ID - Unique identifier for each item</li>
                  <li>Name - Item name</li>
                  <li>Category - Item category</li>
                  <li>Quantity - Number of items</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Optional Fields:</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                  <li>Location - Storage location</li>
                  <li>Dimensions - Size in cm (format: LxWxH)</li>
                  <li>Weight - Weight in kg</li>
                  <li>ExpiryDate - Date in YYYY-MM-DD format</li>
                  <li>Priority - Low, Medium, or High</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <Card className="space-card">
            <CardHeader>
              <CardTitle>Export Inventory Data</CardTitle>
              <CardDescription>
                Export your inventory data in various formats
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExportOptions />
            </CardContent>
          </Card>
          
          <Card className="space-card">
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>
                Recent data exports from the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border bg-card">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File size={20} className="text-blue-400" />
                      <div>
                        <p className="font-medium">Complete Inventory</p>
                        <p className="text-sm text-muted-foreground">CSV format - 247 items</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Today, 09:45 AM
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File size={20} className="text-green-400" />
                      <div>
                        <p className="font-medium">Medical Supplies Only</p>
                        <p className="text-sm text-muted-foreground">JSON format - 42 items</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Yesterday, 2:30 PM
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <File size={20} className="text-purple-400" />
                      <div>
                        <p className="font-medium">High Priority Items</p>
                        <p className="text-sm text-muted-foreground">CSV format - 8 items</p>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Mar 28, 2025
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ImportExport;
