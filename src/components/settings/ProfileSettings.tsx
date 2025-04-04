
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Save, Upload } from 'lucide-react';

interface ProfileSettingsProps {
  user: any;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ user }) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'astronaut',
    title: user?.title || '',
    bio: user?.bio || '',
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatar || null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleRoleChange = (value: string) => {
    setProfileData(prev => ({ ...prev, role: value }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile
    console.log('Saving profile:', { ...profileData, avatar: avatarUrl });
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setAvatarUrl(event.target.result as string);
        toast({
          title: "Avatar updated",
          description: "Your profile picture has been updated.",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your personal information and how it appears across the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4">
              <Avatar 
                className="h-24 w-24 border-2 border-primary/20 cursor-pointer"
                onClick={handleAvatarClick}
              >
                <AvatarImage src={avatarUrl || ''} alt={profileData.name} />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl relative group">
                  {avatarUrl ? '' : getInitials(profileData.name)}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                </AvatarFallback>
              </Avatar>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={handleAvatarClick}
              >
                <Upload size={14} />
                Change Photo
              </Button>
            </div>
            
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={profileData.name} 
                    onChange={handleInputChange} 
                    placeholder="Your full name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={profileData.email} 
                    onChange={handleInputChange} 
                    placeholder="your.email@example.com" 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={profileData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="astronaut">Astronaut</SelectItem>
                      <SelectItem value="commander">Commander</SelectItem>
                      <SelectItem value="engineer">Engineer</SelectItem>
                      <SelectItem value="scientist">Scientist</SelectItem>
                      <SelectItem value="mission-control">Mission Control</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Title/Position</Label>
                  <Input 
                    id="title" 
                    name="title"
                    value={profileData.title} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Flight Engineer, Science Officer" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <textarea 
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  className="w-full min-h-[100px] px-3 py-2 border rounded-md resize-y"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleSaveProfile} className="gap-2">
            <Save size={16} />
            Save Profile
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProfileSettings;
