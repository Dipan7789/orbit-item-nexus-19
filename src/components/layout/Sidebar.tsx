
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
  AlertTriangle,
  MessageSquare
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

  const implementedFeatures = [
    { name: 'Instant Navigation', icon: Navigation, path: '/instant-navigation' },
    { name: 'Spoilage Simulation', icon: Clock, path: '/spoilage-simulation' },
    { name: 'Smart Tagging', icon: MessageSquare, path: '/smart-tagging' },
  ];

  const futureFeatures = [
    { name: 'Zoomable 3D View', icon: ZoomIn, path: '/zoomable-view' },
    { name: 'Multilingual Translator', icon: Globe, path: '/translator' },
    { name: 'Item Transfer Assistant', icon: Send, path: '/transfer-assistant' },
    { name: 'Space Event Predictor', icon: AlertTriangle, path: '/event-predictor' },
  ];

  const utilityFeatures = [
    { name: 'Categories', icon: Tags, path: '/categories' },
    { name: 'Import/Export', icon: Upload, path: '/import-export' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <div
      className={cn(
        "hidden md:flex border-r bg-background flex-col fixed inset-y-0 z-30 transition-all",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        {isCollapsed ? (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            O
          </div>
        ) : (
          <div className="font-semibold tracking-tight">Orbit Item Nexus</div>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        <div className="px-2 py-4">
          <div className="space-y-1">
            <div className={cn("px-2 mb-1", isCollapsed ? "sr-only" : "")}>
              <h3 className="text-xs font-medium text-muted-foreground">Main</h3>
            </div>
            {mainFeatures.map((feature) => (
              <NavLink to={feature.path} key={feature.path}>
                <Button
                  variant={isActiveRoute(feature.path) ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    isCollapsed && "justify-center px-0"
                  )}
                  size={isCollapsed ? "icon" : "default"}
                >
                  <feature.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
                  {!isCollapsed && <span>{feature.name}</span>}
                </Button>
              </NavLink>
            ))}
          </div>

          <div className="mt-6">
            <div className={cn("px-2 mb-1", isCollapsed ? "sr-only" : "")}>
              <h3 className="text-xs font-medium text-muted-foreground">Doraemon Features</h3>
            </div>
            <div className="space-y-1">
              {implementedFeatures.map((feature) => (
                <NavLink to={feature.path} key={feature.path}>
                  <Button
                    variant={isActiveRoute(feature.path) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isCollapsed && "justify-center px-0"
                    )}
                    size={isCollapsed ? "icon" : "default"}
                  >
                    <feature.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
                    {!isCollapsed && <span>{feature.name}</span>}
                  </Button>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className={cn("px-2 mb-1", isCollapsed ? "sr-only" : "")}>
              <h3 className="text-xs font-medium text-muted-foreground">Coming Soon</h3>
            </div>
            <div className="space-y-1">
              {futureFeatures.map((feature) => (
                <NavLink to={feature.path} key={feature.path}>
                  <Button
                    variant={isActiveRoute(feature.path) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start opacity-70",
                      isCollapsed && "justify-center px-0"
                    )}
                    size={isCollapsed ? "icon" : "default"}
                  >
                    <feature.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
                    {!isCollapsed && <span>{feature.name}</span>}
                  </Button>
                </NavLink>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className={cn("px-2 mb-1", isCollapsed ? "sr-only" : "")}>
              <h3 className="text-xs font-medium text-muted-foreground">Utilities</h3>
            </div>
            <div className="space-y-1">
              {utilityFeatures.map((feature) => (
                <NavLink to={feature.path} key={feature.path}>
                  <Button
                    variant={isActiveRoute(feature.path) ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      isCollapsed && "justify-center px-0"
                    )}
                    size={isCollapsed ? "icon" : "default"}
                  >
                    <feature.icon className={cn("h-5 w-5", isCollapsed ? "" : "mr-2")} />
                    {!isCollapsed && <span>{feature.name}</span>}
                  </Button>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
      
      {!isCollapsed && (
        <div className="p-2 border-t">
          <div className="p-2 rounded-md text-xs text-muted-foreground">
            <div className="font-medium">Logged in as:</div>
            <div className="truncate">{user?.email}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
