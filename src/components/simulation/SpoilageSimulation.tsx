
import React, { useState } from 'react';
import { Clock, Calendar, Thermometer, Droplets, SkipForward, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Sample items for the simulation
const sampleItems = [
  {
    id: 'food-001',
    name: 'Space Ice Cream',
    category: 'Food',
    expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
    temperatureSensitivity: 'high',
    humiditySensitivity: 'medium',
    initialQuality: 100,
    location: 'Food Storage - Module A'
  },
  {
    id: 'food-002',
    name: 'Freeze-Dried Fruit',
    category: 'Food',
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
    temperatureSensitivity: 'medium',
    humiditySensitivity: 'high',
    initialQuality: 98,
    location: 'Food Storage - Module A'
  },
  {
    id: 'med-001',
    name: 'Antibiotics',
    category: 'Medical',
    expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000), // 120 days from now
    temperatureSensitivity: 'high',
    humiditySensitivity: 'high',
    initialQuality: 100,
    location: 'Medical Cabinet - Module B'
  },
  {
    id: 'equip-001',
    name: 'Battery Pack',
    category: 'Equipment',
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 365 days from now
    temperatureSensitivity: 'low',
    humiditySensitivity: 'medium',
    initialQuality: 100,
    location: 'Equipment Storage - Cargo Bay'
  },
  {
    id: 'sci-001',
    name: 'Plant Experiment',
    category: 'Scientific',
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
    temperatureSensitivity: 'very high',
    humiditySensitivity: 'very high',
    initialQuality: 100,
    location: 'Science Lab'
  }
];

// Convert sensitivity to numeric values
const sensitivityToValue = (sensitivity: string): number => {
  switch (sensitivity) {
    case 'very high': return 1.5;
    case 'high': return 1.2;
    case 'medium': return 1;
    case 'low': return 0.7;
    case 'very low': return 0.4;
    default: return 1;
  }
};

// Calculate quality degradation
const calculateQuality = (
  item: any, 
  timeFactor: number, 
  temperature: number, 
  humidity: number
): number => {
  const daysPassed = timeFactor * 30; // Convert to days (1 = 30 days)
  const tempEffect = (Math.abs(temperature - 21) / 10) * sensitivityToValue(item.temperatureSensitivity);
  const humidityEffect = (Math.abs(humidity - 50) / 20) * sensitivityToValue(item.humiditySensitivity);
  
  // Calculate daily degradation rate
  const dailyDegradation = 0.05 + tempEffect * 0.05 + humidityEffect * 0.05;
  
  // Calculate quality
  const newQuality = Math.max(0, item.initialQuality - (dailyDegradation * daysPassed));
  return parseFloat(newQuality.toFixed(1));
};

// Calculate days until expiry
const calculateDaysUntilExpiry = (expiryDate: Date, timeFactor: number): number => {
  const now = new Date();
  const futureDate = new Date(now.getTime() + (timeFactor * 30 * 24 * 60 * 60 * 1000));
  const diffTime = expiryDate.getTime() - futureDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Quality to status mapping
const qualityToStatus = (quality: number): { label: string; variant: string } => {
  if (quality > 90) return { label: 'Excellent', variant: 'default' };
  if (quality > 75) return { label: 'Good', variant: 'secondary' };
  if (quality > 50) return { label: 'Fair', variant: 'outline' };
  if (quality > 25) return { label: 'Poor', variant: 'warning' };
  return { label: 'Critical', variant: 'destructive' };
};

const SpoilageSimulation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [timeFactor, setTimeFactor] = useState(1); // 1 = 1 month
  const [temperature, setTemperature] = useState(21); // 21°C
  const [humidity, setHumidity] = useState(50); // 50%
  const [simulatedItems, setSimulatedItems] = useState(
    sampleItems.map(item => ({
      ...item,
      quality: item.initialQuality,
      daysUntilExpiry: calculateDaysUntilExpiry(item.expiryDate, 0)
    }))
  );
  
  const runSimulation = () => {
    const newSimulatedItems = sampleItems.map(item => ({
      ...item,
      quality: calculateQuality(item, timeFactor, temperature, humidity),
      daysUntilExpiry: calculateDaysUntilExpiry(item.expiryDate, timeFactor)
    }));
    
    setSimulatedItems(newSimulatedItems);
  };
  
  const resetSimulation = () => {
    setTimeFactor(1);
    setTemperature(21);
    setHumidity(50);
    
    const newSimulatedItems = sampleItems.map(item => ({
      ...item,
      quality: item.initialQuality,
      daysUntilExpiry: calculateDaysUntilExpiry(item.expiryDate, 0)
    }));
    
    setSimulatedItems(newSimulatedItems);
  };
  
  // Filter items based on selected category
  const filteredItems = selectedCategory === 'all' 
    ? simulatedItems 
    : simulatedItems.filter(item => item.category.toLowerCase() === selectedCategory);
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Time Cloth Spoilage Simulation</h2>
        <p className="text-muted-foreground">
          Predict how items will degrade over time under different environmental conditions
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Simulation controls */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation Parameters</CardTitle>
              <CardDescription>
                Adjust the parameters to see how they affect item quality over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Advancement
                  </label>
                  <span className="text-sm text-muted-foreground">
                    {timeFactor === 0 ? 'Current Time' : `+${timeFactor} month${timeFactor !== 1 ? 's' : ''}`}
                  </span>
                </div>
                <Slider
                  value={[timeFactor]}
                  min={0}
                  max={12}
                  step={1}
                  onValueChange={([value]) => setTimeFactor(value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Now</span>
                  <span>6 months</span>
                  <span>12 months</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Thermometer className="h-4 w-4" />
                    Temperature
                  </label>
                  <span className="text-sm text-muted-foreground">{temperature}°C</span>
                </div>
                <Slider
                  value={[temperature]}
                  min={-10}
                  max={40}
                  step={1}
                  onValueChange={([value]) => setTemperature(value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Cold (-10°C)</span>
                  <span>Normal (21°C)</span>
                  <span>Hot (40°C)</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <Droplets className="h-4 w-4" />
                    Humidity
                  </label>
                  <span className="text-sm text-muted-foreground">{humidity}%</span>
                </div>
                <Slider
                  value={[humidity]}
                  min={0}
                  max={100}
                  step={5}
                  onValueChange={([value]) => setHumidity(value)}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Dry (0%)</span>
                  <span>Normal (50%)</span>
                  <span>Humid (100%)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={resetSimulation} className="gap-2">
                <RefreshCcw className="h-4 w-4" />
                Reset
              </Button>
              <Button onClick={runSimulation} className="gap-2">
                <SkipForward className="h-4 w-4" />
                Run Simulation
              </Button>
            </CardFooter>
          </Card>
          
          {/* Simulation date */}
          <div className="mt-4 p-4 border rounded-lg bg-background flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="text-sm font-medium">Simulation Date</div>
                <div className="text-xs text-muted-foreground">
                  {timeFactor === 0 
                    ? 'Current Time' 
                    : new Date(Date.now() + (timeFactor * 30 * 24 * 60 * 60 * 1000)).toDateString()}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Calendar View
            </Button>
          </div>
        </div>
        
        {/* Filter panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Filter Items</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="equipment">Equipment</SelectItem>
                  <SelectItem value="scientific">Scientific</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="mt-4 space-y-2">
                <div className="text-sm font-medium">Quick Scenarios</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-xs h-auto py-2" 
                    onClick={() => {
                      setTemperature(35);
                      setHumidity(90);
                      setTimeFactor(3);
                    }}
                  >
                    Power Outage
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-xs h-auto py-2"
                    onClick={() => {
                      setTemperature(-5);
                      setHumidity(30);
                      setTimeFactor(2);
                    }}
                  >
                    Cooling Failure
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-xs h-auto py-2"
                    onClick={() => {
                      setTemperature(21);
                      setHumidity(80);
                      setTimeFactor(6);
                    }}
                  >
                    Long-term Storage
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-xs h-auto py-2"
                    onClick={() => {
                      setTemperature(28);
                      setHumidity(65);
                      setTimeFactor(1);
                    }}
                  >
                    Standard Aging
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Simulation Results</h3>
          <div className="text-sm text-muted-foreground">
            Showing {filteredItems.length} items
          </div>
        </div>
        
        <Tabs defaultValue="cards">
          <TabsList className="mb-4">
            <TabsTrigger value="cards">Card View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="cards" className="space-y-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredItems.map((item) => {
                const qualityStatus = qualityToStatus(item.quality);
                const daysUntilExpiry = item.daysUntilExpiry;
                
                return (
                  <Card key={item.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base">{item.name}</CardTitle>
                        <Badge variant={qualityStatus.variant}>
                          {qualityStatus.label}
                        </Badge>
                      </div>
                      <CardDescription>{item.category} • {item.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Quality</span>
                            <span className="font-medium">{item.quality}%</span>
                          </div>
                          <Progress value={item.quality} />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Original Quality:</span>{' '}
                            {item.initialQuality}%
                          </div>
                          <div>
                            <span className="text-muted-foreground">Quality Loss:</span>{' '}
                            {(item.initialQuality - item.quality).toFixed(1)}%
                          </div>
                          <div>
                            <span className="text-muted-foreground">Temp Sensitivity:</span>{' '}
                            {item.temperatureSensitivity}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Humidity Sensitivity:</span>{' '}
                            {item.humiditySensitivity}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <div className={`px-6 py-2 text-center text-sm ${daysUntilExpiry < 0 
                      ? 'bg-destructive text-destructive-foreground' 
                      : daysUntilExpiry < 30 
                        ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {daysUntilExpiry < 0
                        ? `Expired ${Math.abs(daysUntilExpiry)} days ago`
                        : daysUntilExpiry === 0
                          ? 'Expires today'
                          : `${daysUntilExpiry} days until expiry`}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
          
          <TabsContent value="list" className="space-y-1">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-2 text-left font-medium text-sm">Item Name</th>
                    <th className="px-4 py-2 text-left font-medium text-sm">Category</th>
                    <th className="px-4 py-2 text-left font-medium text-sm">Quality</th>
                    <th className="px-4 py-2 text-left font-medium text-sm">Expiry</th>
                    <th className="px-4 py-2 text-left font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((item) => {
                    const qualityStatus = qualityToStatus(item.quality);
                    
                    return (
                      <tr key={item.id} className="border-t">
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">{item.category}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <Progress value={item.quality} className="w-16" />
                            <span>{item.quality}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {item.daysUntilExpiry < 0
                            ? `Expired ${Math.abs(item.daysUntilExpiry)} days ago`
                            : item.daysUntilExpiry === 0
                              ? 'Today'
                              : `${item.daysUntilExpiry} days`}
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant={qualityStatus.variant}>
                            {qualityStatus.label}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SpoilageSimulation;
