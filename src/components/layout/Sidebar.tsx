
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
  AlertTriangle,
  MessageSquare,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  // Group the features
  const mainFeatures = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Storage Map', icon: MapPin, path: '/storage-map' },
    { name: 'Import/Export', icon: Upload, path: '/import-export' },
    { name: 'Categories', icon: Tags, path: '/categories' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  ];

  // Advanced features (updated list with removed inactive features)
  const advancedFeatures = [
    { name: 'ISS Guidelines', icon: Satellite, path: '/iss-guidelines' },
    { name: 'Quick Navigation', icon: Navigation, path: '/instant-navigation', status: 'available' },
    { name: 'Expiry Forecasting', icon: Clock, path: '/spoilage-simulation', status: 'dev' },
    { name: 'Smart Tagging', icon: Tags, path: '/smart-tagging', status: 'dev' },
    { name: 'Event Predictor', icon: AlertTriangle, path: '/event-predictor', status: 'dev' },
    { name: 'AI Assistant', icon: MessageSquare, path: '/ai-assistant', status: 'dev' },
  ];

  return (
    <aside className={cn(
      'flex flex-col h-full bg-background border-r',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      <div className={cn(
        'h-16 flex items-center px-4 border-b',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="font-semibold text-lg">ISS Inventory</div>
        )}
        {isCollapsed && (
          <div className="font-semibold text-lg">ISS</div>
        )}
      </div>
      
      <ScrollArea className="flex-1">
        <nav className="px-2 py-4">
          <div className="space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">
                Main
              </div>
            )}
            
            {mainFeatures.map(feature => (
              <NavLink
                key={feature.path}
                to={feature.path}
                className={({ isActive }) => cn(
                  'flex items-center py-2 px-3 rounded-md text-sm font-medium',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  isCollapsed && 'justify-center'
                )}
              >
                <feature.icon size={20} className={isCollapsed ? '' : 'mr-2'} />
                {!isCollapsed && <span>{feature.name}</span>}
              </NavLink>
            ))}
          </div>
          
          <div className="mt-6 space-y-1">
            {!isCollapsed && (
              <div className="px-3 pb-1 text-xs font-medium text-muted-foreground">
                Advanced Features
              </div>
            )}
            
            {advancedFeatures.map(feature => {
              const isPlanned = feature.status === 'planned';
              const isInDev = feature.status === 'dev';
              
              return (
                <NavLink
                  key={feature.path}
                  to={feature.path}
                  className={({ isActive }) => cn(
                    'flex items-center py-2 px-3 rounded-md text-sm font-medium',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : isPlanned
                        ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground opacity-50'
                        : isInDev
                          ? 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    isCollapsed && 'justify-center'
                  )}
                >
                  <feature.icon size={20} className={isCollapsed ? '' : 'mr-2'} />
                  {!isCollapsed && (
                    <div className="flex justify-between items-center w-full">
                      <span>{feature.name}</span>
                      {isPlanned && (
                        <span className="text-xs bg-muted px-1.5 py-0.5 rounded-sm">Coming Soon</span>
                      )}
                      {isInDev && (
                        <span className="text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-500 px-1.5 py-0.5 rounded-sm">Beta</span>
                      )}
                    </div>
                  )}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </ScrollArea>
      
      <div className={cn(
        'border-t p-4',
        isCollapsed ? 'flex justify-center' : ''
      )}>
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate">
                {user?.name || 'Astronaut'}
              </div>
              <div className="text-xs text-muted-foreground truncate">
                ISS Crew Member
              </div>
            </div>
            <Button variant="ghost" size="icon" asChild>
              <NavLink to="/settings">
                <Settings size={18} />
              </NavLink>
            </Button>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            {user?.name?.[0] || 'U'}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
