
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'astronaut' | 'engineer' | 'scientist' | 'commander';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('orbitnexus_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Demo users for hackathon
  const demoUsers = [
    {
      id: '1',
      name: 'Alex Martinez',
      email: 'alex@space.com',
      password: 'password123',
      avatar: '',
      role: 'astronaut'
    },
    {
      id: '2',
      name: 'Sarah Kim',
      email: 'sarah@space.com',
      password: 'password123',
      avatar: '',
      role: 'commander'
    }
  ];

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const matchedUser = demoUsers.find(u => u.email === email && u.password === password);
    
    if (matchedUser) {
      const { password, ...userWithoutPassword } = matchedUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem('orbitnexus_user', JSON.stringify(userWithoutPassword));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  const signUp = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (demoUsers.some(u => u.email === email)) {
      throw new Error('User already exists');
    }
    
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role: 'astronaut',
    } as User;
    
    setUser(newUser);
    localStorage.setItem('orbitnexus_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('orbitnexus_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
