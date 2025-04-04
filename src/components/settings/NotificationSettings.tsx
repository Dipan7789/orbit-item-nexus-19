
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Save } from 'lucide-react';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    system: true,
    itemExpiry: true,
    inventoryUpdates: true,
    storageAlerts: true,
    securityAlerts: true,
    appUpdates: false,
    marketingEmails: false,
  });

  const handleToggleChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveSettings = () => {
    console.log('Saving notification settings:', notifications);
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Configure when and how you'd like to receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">System Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications about system status and operations
              </p>
            </div>
            <Switch 
              checked={notifications.system}
              onCheckedChange={() => handleToggleChange('system')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Item Expiry Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get alerts when items are approaching their expiration date
              </p>
            </div>
            <Switch 
              checked={notifications.itemExpiry}
              onCheckedChange={() => handleToggleChange('itemExpiry')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Inventory Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when inventory items are added, moved, or removed
              </p>
            </div>
            <Switch 
              checked={notifications.inventoryUpdates}
              onCheckedChange={() => handleToggleChange('inventoryUpdates')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Storage Optimization Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Receive suggestions for improving storage utilization
              </p>
            </div>
            <Switch 
              checked={notifications.storageAlerts}
              onCheckedChange={() => handleToggleChange('storageAlerts')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about security events and account activity
              </p>
            </div>
            <Switch 
              checked={notifications.securityAlerts}
              onCheckedChange={() => handleToggleChange('securityAlerts')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">App Updates</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when new features or updates are available
              </p>
            </div>
            <Switch 
              checked={notifications.appUpdates}
              onCheckedChange={() => handleToggleChange('appUpdates')}
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive email updates about new products and features
              </p>
            </div>
            <Switch 
              checked={notifications.marketingEmails}
              onCheckedChange={() => handleToggleChange('marketingEmails')}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveSettings} className="gap-2">
          <Save size={16} />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NotificationSettings;
