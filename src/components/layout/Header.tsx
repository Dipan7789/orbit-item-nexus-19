
import React from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="border-b border-border px-4 py-3 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-muted-foreground">
            <Menu size={20} />
          </Button>
          <div className="relative hidden md:block max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search inventory..." 
              className="pl-9 bg-background w-[300px]" 
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hidden md:flex gap-2 text-muted-foreground hover:text-foreground">
            <Badge className="bg-space-bright-blue text-white h-5 w-5 flex items-center justify-center rounded-full p-0">
              3
            </Badge>
            Priority Items
          </Button>
          
          <Button variant="ghost" size="icon" className="text-muted-foreground relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
