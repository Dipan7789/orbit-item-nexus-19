
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
  Satellite,
  Navigation,
  Clock,
  ZoomIn,
  Globe,
  Send,
  AlertTriangle
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

  // Group the features
  const mainFeatures = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Storage Map', icon: Boxes, path: '/storage-map' },
    { name: 'ISS Guidelines', icon: Satellite, path: '/iss-guidelines' },
  ];

  const futureFeatures = [
    { name: 'Instant Navigation', icon: Navigation, path: '/instant-navigation' },
    { name: 'Spoilage Simulation', icon: Clock, path: '/spoilage-simulation' },
    { name: 'Smart Tagging', icon: Tags, path: '/smart-tagging' },
    { name: 'Zoomable 3D View', icon: ZoomIn, path: '/zoomable-view' },
    { name: 'Multilingual Translator', icon: Globe, path: '/translator' },
    { name: 'Item Transfer Assistant', icon: Send, path: '/transfer-assistant' },
    { name: 'Space Event Predictor', icon: AlertTriangle, path: '/event-predictor' },
  ];

  const utilityFeatures = [
    { name: 'Import/Export', icon: Upload, path: '/import-export' },
    { name: 'Categories', icon: Tags, path: '/categories' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const renderNavLinks = (items) => {
    return items.map((item) => (
      <NavLink
        key={item.path}
        to={item.path}
        className={({ isActive }) =>
          cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
            isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50"
          )
        }
      >
        <item.icon className="h-4 w-4" />
        <span className={cn(
          "transition-opacity",
          isCollapsed ? "opacity-0 hidden" : "opacity-100 block"
        )}>
          {item.name}
        </span>
      </NavLink>
    ));
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
            <div className="mb-2">
              {renderNavLinks(mainFeatures)}
            </div>

            {!isCollapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground">FUTURE FEATURES</h3>
              </div>
            )}
            <div className="mb-2">
              {renderNavLinks(futureFeatures)}
            </div>

            {!isCollapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground">UTILITIES</h3>
              </div>
            )}
            <div>
              {renderNavLinks(utilityFeatures)}
            </div>
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
