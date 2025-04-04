
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  MonitorSmartphone, 
  Palette, 
  Settings as SettingsIcon, 
  Save, 
  RefreshCcw,
  Trash2
} from 'lucide-react';

import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import DataSettings from '@/components/settings/DataSettings';
import DeviceSettings from '@/components/settings/DeviceSettings';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <Card>
          <CardContent className="py-4">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 h-auto">
              <TabsTrigger value="profile" className="flex flex-col items-center py-2 h-auto">
                <User size={20} className="mb-1" />
                <span className="text-xs">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex flex-col items-center py-2 h-auto">
                <Bell size={20} className="mb-1" />
                <span className="text-xs">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex flex-col items-center py-2 h-auto">
                <Shield size={20} className="mb-1" />
                <span className="text-xs">Security</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex flex-col items-center py-2 h-auto">
                <Palette size={20} className="mb-1" />
                <span className="text-xs">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="data" className="flex flex-col items-center py-2 h-auto">
                <Database size={20} className="mb-1" />
                <span className="text-xs">Data</span>
              </TabsTrigger>
              <TabsTrigger value="devices" className="flex flex-col items-center py-2 h-auto">
                <MonitorSmartphone size={20} className="mb-1" />
                <span className="text-xs">Devices</span>
              </TabsTrigger>
            </TabsList>
          </CardContent>
        </Card>
        
        <TabsContent value="profile" className="space-y-6">
          <ProfileSettings user={user} />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <AppearanceSettings />
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <DataSettings />
        </TabsContent>
        
        <TabsContent value="devices" className="space-y-6">
          <DeviceSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
