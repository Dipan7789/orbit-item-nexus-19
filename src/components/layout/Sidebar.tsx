
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Database, 
  Grid, 
  Search, 
  Settings, 
  Package, 
  FileUp,
  Home,
  User,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: Grid, label: 'Storage Map', path: '/storage-map' },
  { icon: Database, label: 'Categories', path: '/categories' },
  { icon: FileUp, label: 'Import/Export', path: '/import-export' },
  { icon: BarChart, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <aside className={cn(
      "h-screen sticky top-0 bg-sidebar border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-start"
          )}>
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-space-bright-blue rounded-full opacity-20 animate-pulse-slow"></div>
              <div className="absolute inset-1 bg-space-bright-blue rounded-full"></div>
            </div>
            {!collapsed && (
              <span className="ml-3 font-bold text-lg text-white">OrbitNexus</span>
            )}
          </div>
        </div>
        
        <nav className="flex-1 py-4 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    collapsed ? "justify-center" : "justify-start",
                    isActive 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <item.icon size={20} className={collapsed ? "" : "mr-3"} />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-border">
          <div className={cn(
            "flex items-center",
            collapsed ? "justify-center" : "justify-between"
          )}>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User size={18} className="text-primary-foreground" />
              </div>
              {!collapsed && (
                <div className="ml-3">
                  <p className="text-sm font-medium text-foreground">Astronaut</p>
                  <p className="text-xs text-muted-foreground">ISS Station</p>
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
