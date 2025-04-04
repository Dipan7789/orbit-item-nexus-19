
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { Circle, Moon, Sun, Monitor, Save } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const AppearanceSettings = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    animationsEnabled: true,
    reducedMotion: false,
    highContrast: false,
    showStorageGrid: true,
    compactView: false
  });

  const handleThemeChange = (value: string) => {
    setTheme(value as 'light' | 'dark' | 'system');
  };

  const handleToggle = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAppearance = () => {
    console.log('Saving appearance settings:', { theme, ...settings });
    toast({
      title: "Appearance settings updated",
      description: "Your appearance preferences have been saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appearance Settings</CardTitle>
        <CardDescription>
          Customize how the app looks and feels
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Theme</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your preferred color scheme
            </p>
            
            <RadioGroup 
              value={theme} 
              onValueChange={handleThemeChange}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="light"
                  id="theme-light"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="theme-light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="h-6 w-6 mb-2" />
                  <span>Light</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="dark"
                  id="theme-dark"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="theme-dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="h-6 w-6 mb-2" />
                  <span>Dark</span>
                </Label>
              </div>
              
              <div>
                <RadioGroupItem
                  value="system"
                  id="theme-system"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="theme-system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Monitor className="h-6 w-6 mb-2" />
                  <span>System</span>
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Display Options</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Enable Animations</Label>
                <p className="text-sm text-muted-foreground">
                  Show animations for transitions and effects
                </p>
              </div>
              <Switch 
                checked={settings.animationsEnabled}
                onCheckedChange={() => handleToggle('animationsEnabled')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Reduced Motion</Label>
                <p className="text-sm text-muted-foreground">
                  Minimize animation effects for accessibility
                </p>
              </div>
              <Switch 
                checked={settings.reducedMotion}
                onCheckedChange={() => handleToggle('reducedMotion')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">High Contrast Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Increase contrast for better visibility
                </p>
              </div>
              <Switch 
                checked={settings.highContrast}
                onCheckedChange={() => handleToggle('highContrast')}
              />
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Layout Preferences</h3>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Show Storage Grid</Label>
                <p className="text-sm text-muted-foreground">
                  Display the storage grid visualization on the dashboard
                </p>
              </div>
              <Switch 
                checked={settings.showStorageGrid}
                onCheckedChange={() => handleToggle('showStorageGrid')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="text-base">Compact View</Label>
                <p className="text-sm text-muted-foreground">
                  Use a more compact layout with less whitespace
                </p>
              </div>
              <Switch 
                checked={settings.compactView}
                onCheckedChange={() => handleToggle('compactView')}
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSaveAppearance} className="gap-2">
          <Save size={16} />
          Save Preferences
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AppearanceSettings;
