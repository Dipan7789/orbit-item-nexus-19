
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  MonitorSmartphone, 
  Palette
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import DataSettings from '@/components/settings/DataSettings';
import DeviceSettings from '@/components/settings/DeviceSettings';

const Settings = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam || "profile");
  
  // Update the URL when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };
  
  // Update local state when URL changes
  useEffect(() => {
    if (tabParam && tabParam !== activeTab) {
      setActiveTab(tabParam);
    }
  }, [tabParam, activeTab]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>
      
      <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
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
