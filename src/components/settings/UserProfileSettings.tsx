
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, User } from 'lucide-react';
import { useUser } from '@/context/UserContext';

const UserProfileSettings: React.FC = () => {
  const { profileImage, updateProfileImage, userName, userRole, updateUserDetails } = useUser();
  
  const [nameValue, setNameValue] = useState(userName);
  const [roleValue, setRoleValue] = useState(userRole);
  const [imagePreview, setImagePreview] = useState<string | null>(profileImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };
  
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  
  const handleSaveProfile = () => {
    // Update profile image if changed
    if (imagePreview && imagePreview !== profileImage) {
      updateProfileImage(imagePreview);
    }
    
    // Update user details
    updateUserDetails(nameValue, roleValue);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated",
    });
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
        <CardDescription>
          Update your personal information and profile picture
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              {imagePreview ? (
                <AvatarImage src={imagePreview} />
              ) : (
                <AvatarFallback className="text-2xl bg-muted">
                  <User size={40} />
                </AvatarFallback>
              )}
            </Avatar>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={triggerFileInput}
            >
              <Camera size={14} />
              Change Image
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          
          <div className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Job Role</Label>
              <Input 
                id="role" 
                value={roleValue}
                onChange={(e) => setRoleValue(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveProfile}>Save Profile</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileSettings;
