
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BellIcon, 
  Search, 
  Menu, 
  Sun, 
  Moon, 
  LogOut, 
  User, 
  MessageSquare
} from 'lucide-react';
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  toggleSidebar: () => void;
  toggleChat?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, toggleChat }) => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleSignOut = () => {
    signOut();
    navigate('/signin');
  };
  
  const handleProfileClick = () => {
    navigate('/settings');
  };
  
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.charAt(0).toUpperCase();
  };
  
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className={isMobile ? 'lg:hidden' : 'hidden lg:flex'}
        >
          <Menu size={20} />
        </Button>
        
        <div className="md:w-64 lg:w-80 hidden sm:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Quick search..." 
              className="pl-9 bg-muted/40 border-muted" 
            />
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {!isMobile && toggleChat && (
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleChat}
            className="hidden md:flex"
          >
            <MessageSquare size={20} />
          </Button>
        )}
        
        <Button variant="ghost" size="icon">
          <BellIcon size={20} />
        </Button>
        
        <Button 
          variant="ghost" 
          size="icon"
          onClick={handleThemeToggle}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary">
                  {getInitials(user?.name)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleProfileClick} className="gap-2">
              <User size={16} />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="gap-2 text-destructive">
              <LogOut size={16} />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
