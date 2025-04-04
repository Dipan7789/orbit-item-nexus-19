
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Inventory Alert",
    description: "Medical supplies are running low",
    time: "5 minutes ago",
    isRead: false
  },
  {
    id: 2,
    title: "New Item Added",
    description: "Hydroponics sensor equipment has been added",
    time: "2 hours ago",
    isRead: false
  },
  {
    id: 3,
    title: "System Update",
    description: "Inventory system update completed successfully",
    time: "Yesterday",
    isRead: false
  },
  {
    id: 4,
    title: "Container Optimized",
    description: "Storage container B12 has been reorganized",
    time: "2 days ago",
    isRead: true
  }
];

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  
  // Calculate unread notifications count
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  // Add a fallback for user details
  const userName = user?.name || 'User';
  const userInitials = userName ? userName.charAt(0).toUpperCase() : 'U';
  
  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };
  
  // Mark a single notification as read
  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notification => 
      notification.id === id 
        ? { ...notification, isRead: true } 
        : notification
    ));
  };
  
  return (
    <header className="border-b sticky top-0 z-10 bg-background">
      <div className="flex h-16 items-center px-4 gap-4">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <Menu size={20} />
        </Button>
        
        <div className="flex-1 md:flex-initial md:w-64">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search inventory..."
                className="w-full pl-8 bg-background"
              />
            </div>
          </form>
        </div>
        
        <div className="ml-auto flex items-center gap-4">
          <DropdownMenu onOpenChange={(open) => { if (open) markAllAsRead(); }}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[320px]">
              <div className="px-4 py-3 font-medium">Notifications</div>
              <DropdownMenuSeparator />
              <div className="max-h-[300px] overflow-y-auto">
                {notifications.map(notification => (
                  <div 
                    key={notification.id}
                    className={`px-4 py-3 flex gap-3 ${!notification.isRead ? 'bg-accent' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="rounded-full h-2 w-2 bg-primary mt-2 shrink-0">
                      {!notification.isRead && <div className="h-full w-full" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.description}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
                
                {notifications.length === 0 && (
                  <div className="py-4 text-center text-muted-foreground">
                    No notifications
                  </div>
                )}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-center text-sm cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || ''} alt={userName} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || ''} alt={userName} />
                  <AvatarFallback>{userInitials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-0.5">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings?tab=profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()}>
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
