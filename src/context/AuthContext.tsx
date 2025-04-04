
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the shape of user data
interface User {
  id: string;
  email: string;
  name?: string;
}

// Define the AuthContext shape
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  isLoading: true,
});

// Auth Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check for existing auth on mount
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Auth methods
  const signIn = async (email: string, password: string) => {
    // For demo purposes, we'll just simulate authentication
    // In a real app, you would validate against a backend
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation - in a real app, this would be server-side
    if (email && password.length >= 6) {
      const newUser = { id: Date.now().toString(), email };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    throw new Error('Invalid credentials');
  };
  
  const signUp = async (email: string, password: string) => {
    // Similar to signIn, but for creating a new account
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email && password.length >= 6) {
      const newUser = { id: Date.now().toString(), email };
      localStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    throw new Error('Invalid credentials. Password must be at least 6 characters.');
  };
  
  const signOut = async () => {
    localStorage.removeItem('user');
    setUser(null);
  };
  
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        signIn,
        signUp,
        signOut,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook for using the auth context
export const useAuth = () => useContext(AuthContext);
