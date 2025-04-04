
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'engineer' | 'astronaut' | 'viewer';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('orbitNexusUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('orbitNexusUser');
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any email/password combo
      // In a real app, you would validate against a backend
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email,
        role: 'engineer',
        avatar: '',
      };
      
      setUser(mockUser);
      localStorage.setItem('orbitNexusUser', JSON.stringify(mockUser));
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, create a new user with any email/password
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0],
        email,
        role: 'astronaut',
        avatar: '',
      };
      
      setUser(newUser);
      localStorage.setItem('orbitNexusUser', JSON.stringify(newUser));
      
      toast({
        title: 'Account created!',
        description: 'Your account has been successfully created.',
      });
      
    } catch (error) {
      console.error('Sign up error:', error);
      throw new Error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('orbitNexusUser');
    navigate('/signin');
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
