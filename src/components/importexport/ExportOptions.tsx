
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FileDown, Settings } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ExportOptions = () => {
  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Export Format</Label>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="cursor-pointer">CSV</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="json" id="json" />
                <Label htmlFor="json" className="cursor-pointer">JSON</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="excel" id="excel" />
                <Label htmlFor="excel" className="cursor-pointer">Excel</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label>Filter by Category</Label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
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
          
          <div className="space-y-2">
            <Label>Other Filters</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="priority" />
                <label
                  htmlFor="priority"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  High Priority Items Only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="expiring" />
                <label
                  htmlFor="expiring"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Expiring Items Only
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lowstock" />
                <label
                  htmlFor="lowstock"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Low Stock Items Only
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Include Fields</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="id" defaultChecked />
                <label
                  htmlFor="id"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  ID
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="name" defaultChecked />
                <label
                  htmlFor="name"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Name
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="category" defaultChecked />
                <label
                  htmlFor="category"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Category
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="location" defaultChecked />
                <label
                  htmlFor="location"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Location
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="quantity" defaultChecked />
                <label
                  htmlFor="quantity"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Quantity
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="priority" defaultChecked />
                <label
                  htmlFor="priority"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Priority
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dimensions" />
                <label
                  htmlFor="dimensions"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Dimensions
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="weight" />
                <label
                  htmlFor="weight"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Weight
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="expiry" />
                <label
                  htmlFor="expiry"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Expiry Date
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lastUsed" />
                <label
                  htmlFor="lastUsed"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Last Used
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" className="gap-2">
          <Settings size={16} />
          Advanced Options
        </Button>
        <Button className="gap-2">
          <FileDown size={16} />
          Export Data
        </Button>
      </div>
    </div>
  );
};

export default ExportOptions;
