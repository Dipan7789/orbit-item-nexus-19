
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import {
  Laptop,
  Smartphone,
  Tablet,
  MonitorSmartphone,
  Cast,
  WifiOff,
  RefreshCcw,
  Link2,
  ArrowUpDown,
  Trash2
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const DeviceSettings = () => {
  const { toast } = useToast();
  const [syncEnabled, setSyncEnabled] = React.useState(true);
  const [offlineMode, setOfflineMode] = React.useState(false);
  const [arEnabled, setArEnabled] = React.useState(true);
  
  const handleSyncNow = () => {
    toast({
      title: "Sync Started",
      description: "Syncing your data across all your devices...",
    });
    
    // Simulate sync completion
    setTimeout(() => {
      toast({
        title: "Sync Complete",
        description: "All your devices are now up to date.",
      });
    }, 2000);
  };

  const handleDisconnectDevice = (deviceName: string) => {
    toast({
      title: "Device Disconnected",
      description: `${deviceName} has been disconnected from your account.`,
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Device Sync & Settings</CardTitle>
          <CardDescription>
            Manage device synchronization and offline capabilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Device Synchronization</Label>
                <p className="text-sm text-muted-foreground">
                  Keep your data in sync across all your devices
                </p>
              </div>
              <Switch 
                checked={syncEnabled}
                onCheckedChange={setSyncEnabled}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Offline Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Work offline and sync when connection is available
                </p>
              </div>
              <Switch 
                checked={offlineMode}
                onCheckedChange={setOfflineMode}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Augmented Reality Features</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AR for container visualization and item placement
                </p>
              </div>
              <Switch 
                checked={arEnabled}
                onCheckedChange={setArEnabled}
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button variant="outline" size="sm" className="gap-2" onClick={handleSyncNow}>
              <RefreshCcw size={14} />
              Sync Now
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Connected Devices</CardTitle>
          <CardDescription>
            Manage devices linked to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Laptop className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-medium flex items-center">
                    Workstation PC
                    <Badge className="ml-2 bg-green-500">Current</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Windows 11 • Chrome • Last sync: Just now
                  </p>
                </div>
              </div>
              <div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowUpDown size={14} />
                  Sync
                </Button>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Smartphone className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-medium">Space Station iPad</div>
                  <p className="text-sm text-muted-foreground">
                    iPadOS • Safari • Last sync: 3 hours ago
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowUpDown size={14} />
                  Sync
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDisconnectDevice('Space Station iPad')}
                >
                  <Link2 size={14} className="rotate-45" />
                </Button>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Smartphone className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-medium">iPhone 13 Pro</div>
                  <p className="text-sm text-muted-foreground">
                    iOS • OrbitNexus App • Last sync: 1 day ago
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-1">
                  <ArrowUpDown size={14} />
                  Sync
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDisconnectDevice('iPhone 13 Pro')}
                >
                  <Link2 size={14} className="rotate-45" />
                </Button>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-md flex justify-between items-center opacity-60">
              <div className="flex items-center gap-3">
                <Tablet className="h-8 w-8 text-muted-foreground" />
                <div>
                  <div className="font-medium flex items-center">
                    Mission Control Tablet
                    <Badge variant="outline" className="ml-2">Offline</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Android • OrbitNexus App • Last sync: 5 days ago
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="gap-1" disabled>
                  <WifiOff size={14} />
                  Offline
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDisconnectDevice('Mission Control Tablet')}
                >
                  <Link2 size={14} className="rotate-45" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" className="gap-2">
            <Cast size={16} />
            Add New Device
          </Button>
          <Button 
            variant="destructive" 
            className="gap-2"
            onClick={() => {
              toast({
                title: "All Devices Disconnected",
                description: "All devices have been disconnected from your account except the current one.",
                variant: "destructive",
              });
            }}
          >
            <Trash2 size={16} />
            Remove All Devices
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DeviceSettings;
