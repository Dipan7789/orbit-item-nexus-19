
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BarChart3,
  LayoutDashboard,
  Package,
  Settings,
  Boxes,
  Tags,
  Upload,
  MapPin,
  Satellite
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const { user } = useAuth();
  const location = useLocation();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className={cn(
      "h-screen border-r bg-background transition-all duration-300 ease-in-out group overflow-hidden",
      isCollapsed ? "w-[70px]" : "w-[250px]"
    )}>
      <div className="flex h-full flex-col">
        <div className="p-4 flex items-center h-16">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">ON</span>
          </div>
          <h2 className={cn(
            "text-lg font-bold ml-2 transition-opacity",
            isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
          )}>
            OrbitNexus
          </h2>
        </div>

        <ScrollArea className="flex-1 pt-2">
          <nav className="grid gap-1 px-2">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                Dashboard
              </span>
            </NavLink>

            <NavLink 
              to="/inventory"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <Package className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                Inventory
              </span>
            </NavLink>

            <NavLink 
              to="/storage-map"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <Boxes className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                Storage Map
              </span>
            </NavLink>
            
            <NavLink 
              to="/iss-guidelines"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <Satellite className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                ISS Guidelines
              </span>
            </NavLink>

            <NavLink 
              to="/import-export"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <Upload className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                Import/Export
              </span>
            </NavLink>

            <NavLink 
              to="/categories"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <Tags className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                Categories
              </span>
            </NavLink>

            <NavLink 
              to="/analytics"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <BarChart3 className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                Analytics
              </span>
            </NavLink>

            <NavLink 
              to="/settings"
              className={({ isActive }) => 
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
                )
              }
            >
              <Settings className="h-4 w-4" />
              <span className={cn(
                "transition-opacity",
                isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
              )}>
                Settings
              </span>
            </NavLink>
          </nav>
        </ScrollArea>

        <div className="mt-auto p-4">
          <div className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            isCollapsed ? "justify-center" : "justify-start"
          )}>
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-primary font-semibold text-xs">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <div className={cn(
              "transition-opacity",
              isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
            )}>
              <p className="text-sm font-medium">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground">{user?.role || 'Engineer'}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
