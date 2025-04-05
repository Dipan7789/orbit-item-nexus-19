
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  type: 'system' | 'expiry' | 'inventory' | 'security';
}

const NotificationBell: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'System Update',
      description: 'The inventory system has been updated to version 2.4.0',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      read: false,
      type: 'system',
    },
    {
      id: '2',
      title: 'Expiry Alert',
      description: 'Medical Kit (MED-1234) is expiring in 5 days',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      read: false,
      type: 'expiry',
    },
    {
      id: '3',
      title: 'Low Stock Alert',
      description: 'Freeze-Dried Meals (FOOD-5678) are running low (3 left)',
      timestamp: new Date(Date.now() - 86400000), // 1 day ago
      read: false,
      type: 'inventory',
    },
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  
  // Calculate unread count whenever notifications change
  useEffect(() => {
    const count = notifications.filter(notification => !notification.read).length;
    setUnreadCount(count);
  }, [notifications]);
  
  // Mark all as read when dropdown is opened
  useEffect(() => {
    if (isOpen && unreadCount > 0) {
      setNotifications(prevNotifications => 
        prevNotifications.map(notification => ({
          ...notification,
          read: true
        }))
      );
    }
  }, [isOpen, unreadCount]);
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    const diffDays = Math.round(diffMs / 86400000);
    
    if (diffMin < 60) {
      return `${diffMin} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'system':
        return 'bg-blue-500';
      case 'expiry':
        return 'bg-red-500';
      case 'inventory':
        return 'bg-yellow-500';
      case 'security':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1 min-w-[18px] h-[18px] flex items-center justify-center text-[10px] bg-red-500">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex justify-between items-center p-2 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-xs h-auto px-2 py-1"
              onClick={() => {
                setNotifications(prevNotifications => 
                  prevNotifications.map(notification => ({
                    ...notification,
                    read: true
                  }))
                );
              }}
            >
              Mark all as read
            </Button>
          )}
        </div>
        
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div key={notification.id} className="border-b last:border-0">
                <DropdownMenuItem className="flex flex-col items-start p-3 cursor-default">
                  <div className="flex items-center w-full gap-2">
                    <div className={`h-2 w-2 rounded-full ${getNotificationColor(notification.type)}`} />
                    <div className="font-medium flex-1">{notification.title}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {formatTimestamp(notification.timestamp)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 pl-4">
                    {notification.description}
                  </p>
                </DropdownMenuItem>
              </div>
            ))
          ) : (
            <div className="py-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
