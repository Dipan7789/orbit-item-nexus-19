
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Database, 
  Grid, 
  Search, 
  Settings, 
  Package, 
  FileUp,
  Home,
  User,
  BarChart,
  ChevronsLeft,
  ChevronsRight,
  Rocket,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/', badge: null },
  { icon: Package, label: 'Inventory', path: '/inventory', badge: '128' },
  { icon: Grid, label: 'Storage Map', path: '/storage-map', badge: null },
  { icon: Database, label: 'Categories', path: '/categories', badge: null },
  { icon: FileUp, label: 'Import/Export', path: '/import-export', badge: null },
  { icon: BarChart, label: 'Analytics', path: '/analytics', badge: 'New' },
  { icon: Settings, label: 'Settings', path: '/settings', badge: null },
];

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed }) => {
  const { user } = useAuth();
  const location = useLocation();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  // Role-based color scheme
  const getRoleColor = () => {
    if (!user) return 'bg-primary';
    
    switch (user.role) {
      case 'commander':
        return 'bg-red-500';
      case 'engineer':
        return 'bg-orange-500';
      case 'scientist':
        return 'bg-purple-500';
      default:
        return 'bg-primary';
    }
  };

  // Role-based icon
  const getRoleIcon = () => {
    if (!user) return User;
    
    switch (user.role) {
      case 'commander':
        return Rocket;
      case 'engineer':
        return Settings;
      case 'scientist':
        return Zap;
      default:
        return User;
    }
  };

  const RoleIcon = getRoleIcon();

  return (
    <aside className={cn(
      "h-screen sticky top-0 bg-sidebar border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}>
            <div className="flex items-center">
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-space-bright-blue rounded-full opacity-20 animate-pulse-slow"></div>
                <div className="absolute inset-1 bg-space-bright-blue rounded-full"></div>
              </div>
              {!collapsed && (
                <span className="ml-3 font-bold text-lg text-white">OrbitNexus</span>
              )}
            </div>
            
            {!collapsed && (
              <button 
                onClick={(e) => e.stopPropagation()} 
                className="text-muted-foreground hover:text-white transition-colors"
              >
                <ChevronsLeft size={20} />
              </button>
            )}
            
            {collapsed && (
              <button 
                onClick={(e) => e.stopPropagation()} 
                className="absolute -right-3 top-10 bg-card border border-border rounded-full p-1 text-muted-foreground hover:text-white hover:bg-primary/20 transition-colors"
              >
                <ChevronsRight size={16} />
              </button>
            )}
          </div>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const isHovered = hoveredPath === item.path;
              
              return (
                <li key={item.label}>
                  <TooltipProvider delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <NavLink
                          to={item.path}
                          className={cn(
                            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all relative group",
                            collapsed ? "justify-center" : "justify-start",
                            isActive 
                              ? "text-white" 
                              : "text-muted-foreground hover:text-foreground"
                          )}
                          onMouseEnter={() => setHoveredPath(item.path)}
                          onMouseLeave={() => setHoveredPath(null)}
                        >
                          {/* Background effect */}
                          {isActive && (
                            <span 
                              className={cn(
                                "absolute inset-0 rounded-md opacity-20 bg-primary z-0",
                                collapsed ? "w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""
                              )}
                            />
                          )}
                          
                          {/* Hover indicator */}
                          {!isActive && isHovered && (
                            <span 
                              className={cn(
                                "absolute inset-0 rounded-md opacity-10 bg-white z-0",
                                collapsed ? "w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" : ""
                              )}
                            />
                          )}
                          
                          {/* Icon with animation */}
                          <span className={cn(
                            "relative z-10 transition-transform", 
                            isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:scale-110",
                            collapsed ? "" : "mr-3"
                          )}>
                            <item.icon size={collapsed ? 20 : 18} />
                          </span>
                          
                          {/* Label */}
                          {!collapsed && <span className="relative z-10">{item.label}</span>}
                          
                          {/* Badge */}
                          {!collapsed && item.badge && (
                            <Badge 
                              className={cn(
                                "ml-auto text-xs py-0 h-5", 
                                item.badge === 'New' ? "bg-green-500 hover:bg-green-600" : "bg-muted"
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                          
                          {/* Small dot indicator when collapsed for badges */}
                          {collapsed && item.badge && (
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary"></span>
                          )}
                        </NavLink>
                      </TooltipTrigger>
                      {collapsed && (
                        <TooltipContent side="right" className="flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <Badge 
                              className={cn(
                                "text-xs py-0 h-5", 
                                item.badge === 'New' ? "bg-green-500 hover:bg-green-600" : "bg-muted"
                              )}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}>
            <div className="flex items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center",
                getRoleColor()
              )}>
                <RoleIcon size={18} className="text-primary-foreground" />
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">{user?.name || 'Astronaut'}</p>
                  <p className="text-xs text-muted-foreground">
                    {user?.role.charAt(0).toUpperCase() + user?.role.slice(1) || 'ISS Station'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
