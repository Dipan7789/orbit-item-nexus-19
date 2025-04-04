
import React, { useState, useEffect } from 'react';
import { CalendarIcon, Clock, Droplets, ThermometerSun, Calendar, ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

// Sample inventory items
const items = [
  {
    id: 'food-001',
    name: 'Freeze-Dried Fruit',
    category: 'Food',
    expiryDate: '2025-09-15',
    shelfLife: 365, // days
    currentCondition: 100, // percent
    sensitiveTo: ['temperature', 'humidity'],
    degradationRate: 0.05, // percent per day under normal conditions
  },
  {
    id: 'med-001',
    name: 'Emergency Antibiotics',
    category: 'Medical',
    expiryDate: '2026-03-10',
    shelfLife: 730, // days
    currentCondition: 98, // percent
    sensitiveTo: ['temperature', 'light'],
    degradationRate: 0.02,
  },
  {
    id: 'equip-001',
    name: 'Battery Pack',
    category: 'Equipment',
    expiryDate: '2026-01-25',
    shelfLife: 500, // days
    currentCondition: 95, // percent
    sensitiveTo: ['temperature', 'usage'],
    degradationRate: 0.08,
  },
  {
    id: 'food-002',
    name: 'Protein Bars',
    category: 'Food',
    expiryDate: '2025-07-30',
    shelfLife: 180, // days
    currentCondition: 92, // percent
    sensitiveTo: ['humidity', 'temperature'],
    degradationRate: 0.1,
  },
  {
    id: 'science-001',
    name: 'Experiment Samples',
    category: 'Scientific',
    expiryDate: '2025-06-15',
    shelfLife: 120, // days
    currentCondition: 88, // percent
    sensitiveTo: ['temperature', 'pressure', 'radiation'],
    degradationRate: 0.15,
  },
];

interface SpoilageSimulationProps {}

const SpoilageSimulation: React.FC<SpoilageSimulationProps> = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [simulationDays, setSimulationDays] = useState(30);
  const [temperature, setTemperature] = useState(21); // Celsius
  const [humidity, setHumidity] = useState(40); // Percent
  const [light, setLight] = useState(50); // Percent
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedItems, setSimulatedItems] = useState<any[]>([]);
  const [date, setDate] = useState<Date>();
  const { toast } = useToast();

  // Toggle item selection
  const toggleItem = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Get condition class based on percentage
  const getConditionClass = (condition: number) => {
    if (condition >= 90) return "text-green-600";
    if (condition >= 70) return "text-yellow-600";
    if (condition >= 50) return "text-orange-600";
    return "text-red-600";
  };

  // Calculate degradation based on conditions and sensitivities
  const calculateDegradation = (item: any, days: number, conditions: any) => {
    let degradationMultiplier = 1;
    
    // Temperature sensitivity
    if (item.sensitiveTo.includes('temperature')) {
      // Deviation from optimal temperature (20-22°C)
      const tempDeviation = Math.abs(conditions.temperature - 21);
      if (tempDeviation > 2) {
        degradationMultiplier += (tempDeviation - 2) * 0.1;
      }
    }
    
    // Humidity sensitivity
    if (item.sensitiveTo.includes('humidity')) {
      // Deviation from optimal humidity (30-50%)
      const humidityDeviation = conditions.humidity < 30
        ? 30 - conditions.humidity
        : Math.max(0, conditions.humidity - 50);
      degradationMultiplier += humidityDeviation * 0.02;
    }
    
    // Light sensitivity
    if (item.sensitiveTo.includes('light')) {
      // Impact of light exposure (50% is standard)
      if (conditions.light > 50) {
        degradationMultiplier += (conditions.light - 50) * 0.015;
      }
    }
    
    // Calculate total degradation
    const dailyDegradation = item.degradationRate * degradationMultiplier;
    const totalDegradation = dailyDegradation * days;
    
    // Calculate new condition
    let newCondition = Math.max(0, item.currentCondition - totalDegradation);
    
    // Calculate new expiry date if applicable
    let newExpiryDate = item.expiryDate;
    if (degradationMultiplier > 1) {
      // Reduce shelf life based on conditions
      const shelfLifeReduction = days * (degradationMultiplier - 1) / 2;
      
      // Current expiry date
      const currentExpiry = new Date(item.expiryDate);
      
      // New expiry date
      const newDateObj = new Date(currentExpiry);
      newDateObj.setDate(currentExpiry.getDate() - Math.round(shelfLifeReduction));
      newExpiryDate = newDateObj.toISOString().split('T')[0];
    }
    
    return {
      ...item,
      simulatedCondition: newCondition,
      simulatedExpiryDate: newExpiryDate,
      degradationRate: dailyDegradation,
    };
  };

  // Run simulation
  const runSimulation = () => {
    setIsSimulating(true);
    
    // Get simulation date (default to today + simulationDays if not selected)
    const simulationDate = date || new Date(Date.now() + simulationDays * 86400000);
    const daysDifference = Math.round((simulationDate.getTime() - Date.now()) / 86400000);
    
    // Create conditions object
    const conditions = {
      temperature,
      humidity,
      light
    };
    
    // Simulate degradation for selected items
    setTimeout(() => {
      const simulatedResults = items
        .filter(item => selectedItems.includes(item.id))
        .map(item => calculateDegradation(item, daysDifference, conditions));
      
      setSimulatedItems(simulatedResults);
      setIsSimulating(false);
      
      toast({
        title: "Time Cloth Simulation Complete",
        description: `Simulated conditions for ${daysDifference} days into the future`,
      });
    }, 1500);
  };

  // Reset simulation
  const resetSimulation = () => {
    setSimulatedItems([]);
    setSelectedItems([]);
    setSimulationDays(30);
    setTemperature(21);
    setHumidity(40);
    setLight(50);
    setDate(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Item Selection */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Select Items for Simulation
            </CardTitle>
            <CardDescription>
              Choose items to simulate degradation over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.map(item => (
                <div 
                  key={item.id}
                  className={cn(
                    "p-3 border rounded-lg cursor-pointer transition-all",
                    selectedItems.includes(item.id) 
                      ? "border-primary bg-primary/5" 
                      : "hover:border-muted-foreground/20"
                  )}
                  onClick={() => toggleItem(item.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {item.category} • Expires: {item.expiryDate}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={getConditionClass(item.currentCondition)}>
                        {item.currentCondition}% Condition
                      </div>
                      <div className="text-xs mt-1">
                        {item.sensitiveTo.map((sensitivity: string) => (
                          <Badge key={sensitivity} variant="outline" className="ml-1 text-xs">
                            {sensitivity}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {selectedItems.length === 0 && (
                <div className="p-8 text-center text-muted-foreground border border-dashed rounded-lg">
                  Select items to begin simulation
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setSelectedItems(items.map(item => item.id))}
              disabled={isSimulating}
            >
              Select All
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setSelectedItems([])}
              disabled={selectedItems.length === 0 || isSimulating}
            >
              Clear Selection
            </Button>
          </CardFooter>
        </Card>
        
        {/* Simulation Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Time Cloth Controls
            </CardTitle>
            <CardDescription>
              Set environmental conditions and duration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Date selection */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Simulation Date</span>
                <span className="text-muted-foreground">
                  {date ? format(date, 'PPP') : `+${simulationDays} days`}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-left font-normal"
                        disabled={isSimulating}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="col-span-1">
                  <Select 
                    value={String(simulationDays)} 
                    onValueChange={(val) => {
                      setSimulationDays(Number(val));
                      setDate(undefined);
                    }}
                    disabled={isSimulating || !!date}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Temperature control */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <ThermometerSun className="h-4 w-4" />
                  Temperature
                </span>
                <span>{temperature}°C</span>
              </div>
              <Slider 
                value={[temperature]} 
                min={-10} 
                max={50} 
                step={1}
                onValueChange={(values) => setTemperature(values[0])}
                disabled={isSimulating}
                className={cn(
                  temperature < 5 ? "text-blue-500" : 
                  temperature > 30 ? "text-red-500" : 
                  "text-green-500"
                )}
              />
            </div>
            
            {/* Humidity control */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Droplets className="h-4 w-4" />
                  Humidity
                </span>
                <span>{humidity}%</span>
              </div>
              <Slider 
                value={[humidity]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={(values) => setHumidity(values[0])}
                disabled={isSimulating}
                className={cn(
                  humidity < 20 ? "text-yellow-500" : 
                  humidity > 70 ? "text-blue-500" : 
                  "text-green-500"
                )}
              />
            </div>
            
            {/* Light exposure control */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Light Exposure</span>
                <span>{light}%</span>
              </div>
              <Slider 
                value={[light]} 
                min={0} 
                max={100} 
                step={1}
                onValueChange={(values) => setLight(values[0])}
                disabled={isSimulating}
              />
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button 
              onClick={runSimulation} 
              disabled={selectedItems.length === 0 || isSimulating}
              className="w-full"
            >
              {isSimulating ? "Simulating..." : "Run Simulation"}
            </Button>
            <Button 
              variant="outline" 
              onClick={resetSimulation}
              disabled={isSimulating}
              className="w-full"
            >
              Reset
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Simulation results */}
      {simulatedItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Simulation Results
            </CardTitle>
            <CardDescription>
              Projected item conditions and expiry dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {simulatedItems.map(item => {
                // Calculate condition difference
                const conditionDiff = item.simulatedCondition - item.currentCondition;
                
                // Calculate if expiry date changed
                const originalExpiry = new Date(item.expiryDate);
                const simulatedExpiry = new Date(item.simulatedExpiryDate);
                const expiryDiff = Math.round((simulatedExpiry.getTime() - originalExpiry.getTime()) / 86400000);
                
                return (
                  <div key={item.id} className="border rounded-lg overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{item.name}</h3>
                        <Badge variant={item.simulatedCondition < 50 ? "destructive" : "outline"}>
                          {item.category}
                        </Badge>
                      </div>
                      
                      {/* Condition bar */}
                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Current Condition:</span>
                          <span className={getConditionClass(item.currentCondition)}>
                            {item.currentCondition.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={item.currentCondition} />
                        
                        <div className="flex justify-between text-sm mt-2">
                          <span>Projected Condition:</span>
                          <span className={getConditionClass(item.simulatedCondition)}>
                            {item.simulatedCondition.toFixed(1)}%
                            {conditionDiff < 0 && (
                              <span className="ml-1 text-red-600">
                                ({conditionDiff.toFixed(1)}%)
                              </span>
                            )}
                          </span>
                        </div>
                        <Progress value={item.simulatedCondition} className={getConditionClass(item.simulatedCondition)} />
                      </div>
                      
                      {/* Expiry info */}
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-sm">Original Expiry:</div>
                          <div className="text-xs text-muted-foreground">
                            {format(new Date(item.expiryDate), 'PPP')}
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div className="text-sm">Projected Expiry:</div>
                          <div className={cn(
                            "text-xs",
                            expiryDiff < 0 ? "text-red-600 font-medium" : "text-muted-foreground"
                          )}>
                            {format(new Date(item.simulatedExpiryDate), 'PPP')}
                            {expiryDiff < 0 && (
                              <span className="ml-1">
                                ({expiryDiff} days)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Degradation rate */}
                      <div className="mt-4 text-xs">
                        <span className="text-muted-foreground">Daily degradation rate: </span>
                        <span className={item.degradationRate > item.degradationRate * 1.5 ? "text-red-600" : "text-amber-600"}>
                          {(item.degradationRate * 100).toFixed(2)}% per day
                        </span>
                      </div>
                      
                      {/* Warning if condition is critical */}
                      {item.simulatedCondition < 30 && (
                        <div className="mt-4 p-2 bg-red-50 border border-red-200 text-red-800 text-sm rounded">
                          Warning: Item projected to be in critical condition. Consider replacing or using before simulation date.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setSimulatedItems([])}>
              Clear Results
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default SpoilageSimulation;
