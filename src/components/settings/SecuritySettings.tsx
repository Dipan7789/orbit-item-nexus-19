
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { AlertCircle, KeyRound, ShieldCheck, Smartphone } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const SecuritySettings = () => {
  const { toast } = useToast();
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(false);
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
  };
  
  const handleToggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "Two-factor authentication disabled" : "Two-factor authentication enabled",
      description: twoFactorEnabled 
        ? "Two-factor authentication has been turned off." 
        : "Two-factor authentication has been enabled for your account.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input 
                id="current-password" 
                type="password" 
                placeholder="Enter your current password" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input 
                id="new-password" 
                type="password" 
                placeholder="Enter a new password" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input 
                id="confirm-password" 
                type="password" 
                placeholder="Confirm your new password" 
              />
            </div>
            
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Password requirements</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>At least 8 characters</li>
                  <li>At least one uppercase letter</li>
                  <li>At least one number</li>
                  <li>At least one special character</li>
                </ul>
              </AlertDescription>
            </Alert>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="gap-2">
            <KeyRound size={16} />
            Update Password
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Require a verification code when signing in
              </p>
            </div>
            <Switch 
              checked={twoFactorEnabled}
              onCheckedChange={handleToggleTwoFactor}
            />
          </div>
          
          {twoFactorEnabled && (
            <div className="bg-muted p-4 rounded-md mt-4">
              <div className="flex items-start gap-4">
                <Smartphone className="h-10 w-10 text-primary" />
                <div>
                  <h4 className="font-medium">Mobile Authentication App</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Use an authentication app like Google Authenticator, Microsoft Authenticator, or Authy to get verification codes.
                  </p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Set Up App
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Session Management</CardTitle>
          <CardDescription>
            Manage your active sessions and devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-medium">Current Session</p>
                <p className="text-sm text-muted-foreground">
                  Chrome on Windows • Houston, United States
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Started 2 hours ago
                </p>
              </div>
              <ShieldCheck className="h-5 w-5 text-green-500" />
            </div>
            
            <div className="bg-muted p-4 rounded-md flex justify-between items-center">
              <div>
                <p className="font-medium">Mobile App</p>
                <p className="text-sm text-muted-foreground">
                  iPhone 13 • Kennedy Space Center, United States
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Last active 2 days ago
                </p>
              </div>
              <Button variant="outline" size="sm">Sign Out</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="text-destructive hover:text-destructive hover:bg-destructive/10">
            Sign Out All Devices
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SecuritySettings;
