
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Package,
  Grid3X3,
  FileInput,
  LayoutDashboard,
  Tag,
  BarChart,
  Settings,
  Menu,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SidebarItemProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  isActive: boolean;
  isPro?: boolean;
  isVisible?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  icon,
  title,
  isActive,
  isPro = false,
  isVisible = true
}) => {
  if (!isVisible) return null;
  
  return (
    <Link to={href} className="w-full">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "w-full justify-start gap-2 pl-2 mb-1 relative",
          isActive
            ? "bg-accent text-accent-foreground"
            : "hover:bg-accent hover:text-accent-foreground"
        )}
      >
        {icon}
        <span className="text-sm">{title}</span>
        {isPro && (
          <span className="absolute right-2 rounded-full px-1.5 py-0.5 text-[10px] font-medium bg-primary text-primary-foreground">
            PRO
          </span>
        )}
      </Button>
    </Link>
  );
};

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
  // Create a user role safeguard
  const userRole = user?.role || 'viewer';
  const userInitials = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  
  const isActive = (path: string) => location.pathname === path;
  
  const isRoleAllowed = (requiredRole: string) => {
    const roleHierarchy = {
      'admin': 3,
      'engineer': 2,
      'astronaut': 1,
      'viewer': 0
    };
    
    return roleHierarchy[userRole as keyof typeof roleHierarchy] >= 
           roleHierarchy[requiredRole as keyof typeof roleHierarchy];
  };
  
  return (
    <div
      className={cn(
        "h-screen bg-card border-r flex flex-col transition-all duration-300 ease-in-out",
        collapsed && !isHovered ? "w-[70px]" : "w-[240px]"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 border-b flex items-center h-[65px]">
        <div className={cn(
          "flex items-center gap-2 transition-all overflow-hidden whitespace-nowrap",
          collapsed && !isHovered ? "w-0" : "w-full"
        )}>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-semibold">
            ON
          </div>
          <span className="font-bold">Orbit Nexus</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col py-4 px-2 overflow-y-auto">
        <SidebarItem
          href="/"
          icon={<LayoutDashboard size={20} />}
          title="Mission Control"
          isActive={isActive("/")}
        />

        <SidebarItem
          href="/inventory"
          icon={<Package size={20} />}
          title="Inventory"
          isActive={isActive("/inventory")}
        />

        <SidebarItem
          href="/storage-map"
          icon={<Grid3X3 size={20} />}
          title="Storage Map"
          isActive={isActive("/storage-map")}
          isVisible={isRoleAllowed('astronaut')}
        />

        <SidebarItem
          href="/import-export"
          icon={<FileInput size={20} />}
          title="Import & Export"
          isActive={isActive("/import-export")}
          isVisible={isRoleAllowed('engineer')}
        />

        <SidebarItem
          href="/categories"
          icon={<Tag size={20} />}
          title="Categories"
          isActive={isActive("/categories")}
        />

        <SidebarItem
          href="/analytics"
          icon={<BarChart size={20} />}
          title="Analytics"
          isActive={isActive("/analytics")}
          isPro={true}
          isVisible={isRoleAllowed('engineer')}
        />

        <SidebarItem
          href="/settings"
          icon={<Settings size={20} />}
          title="Settings"
          isActive={isActive("/settings")}
        />
      </div>

      <div className="p-4 border-t mt-auto">
        {collapsed && !isHovered ? (
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full" onClick={() => signOut()}>
            <LogOut size={18} />
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{user?.name || 'User'}</span>
                    <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <DropdownMenuItem asChild>
                <Link to="/settings" className="flex items-center gap-2">
                  <User size={16} />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut()} className="flex items-center gap-2 text-red-500">
                <LogOut size={16} />
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
