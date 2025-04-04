
import React, { useState } from 'react';
import { Zap, MapPin, Search, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Sample locations for navigation
const locations = [
  { id: 'module-a', name: 'Module A', type: 'module' },
  { id: 'module-b', name: 'Module B', type: 'module' },
  { id: 'cargo-bay', name: 'Cargo Bay', type: 'storage' },
  { id: 'lab-storage', name: 'Lab Storage', type: 'storage' },
  { id: 'science-lab', name: 'Science Lab', type: 'work' },
  { id: 'sleeping-quarters', name: 'Sleeping Quarters', type: 'living' },
  { id: 'airlock-1', name: 'Airlock 1', type: 'access' },
  { id: 'cupola', name: 'Cupola', type: 'observation' },
];

// Saved locations for quick access
const savedLocations = [
  { id: 'medical-cabinet', name: 'Medical Cabinet', description: 'Emergency supplies' },
  { id: 'food-storage', name: 'Food Storage', description: 'Daily rations' },
  { id: 'tools-rack', name: 'Tool Rack', description: 'Maintenance equipment' },
];

interface InstantNavigationProps {
  onNavigate?: (locationId: string) => void;
}

const InstantNavigation: React.FC<InstantNavigationProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [navigating, setNavigating] = useState(false);
  const { toast } = useToast();
  
  // Filter locations based on search query
  const filteredLocations = locations.filter(
    (location) => location.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleNavigate = (locationId: string) => {
    setNavigating(true);
    
    // Simulate the teleportation effect
    toast({
      title: "Anywhere Door Activated!",
      description: `Teleporting to ${locations.find(l => l.id === locationId)?.name || locationId}...`,
      duration: 2000,
    });
    
    // Simulate loading time
    setTimeout(() => {
      if (onNavigate) {
        onNavigate(locationId);
      }
      setNavigating(false);
      
      toast({
        title: "Destination Reached",
        description: `You've arrived at ${locations.find(l => l.id === locationId)?.name || locationId}`,
      });
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Anywhere Door Navigation</h2>
        <p className="text-muted-foreground">
          Instantly teleport to any location in the ISS with our Anywhere Door technology
        </p>
      </div>
      
      {/* Search and quick select */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative md:col-span-3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search locations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="md:col-span-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Quick select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Select location</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Saved locations */}
      <div>
        <h3 className="text-sm font-medium mb-3">Saved Locations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedLocations.map((location) => (
            <Card key={location.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{location.name}</CardTitle>
                <CardDescription>{location.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={() => handleNavigate(location.id)}
                  disabled={navigating}
                >
                  <Zap className="h-4 w-4" />
                  Teleport
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Search results */}
      {searchQuery && (
        <div className="bg-background border rounded-lg">
          <div className="p-4 border-b">
            <h3 className="font-medium">Search Results</h3>
            <p className="text-sm text-muted-foreground">
              {filteredLocations.length} locations found
            </p>
          </div>
          <div className="p-2 max-h-72 overflow-y-auto">
            {filteredLocations.length > 0 ? (
              filteredLocations.map((location) => (
                <div 
                  key={location.id}
                  className="flex items-center justify-between p-2 hover:bg-accent rounded-md cursor-pointer"
                  onClick={() => handleNavigate(location.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-primary/10">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{location.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="gap-1">
                    <Navigation className="h-3 w-3" />
                    Go
                  </Badge>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-muted-foreground">
                No locations found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InstantNavigation;
