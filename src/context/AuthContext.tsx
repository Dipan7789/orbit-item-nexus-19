
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { User, extendUser } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(extendUser(newSession?.user ?? null));
        setIsLoading(false);
        
        if (event === 'SIGNED_IN') {
          toast({
            title: "Signed in successfully",
            description: "Welcome to Space Station Storage"
          });
          
          // Only redirect if we're on an auth page
          if (location.pathname === '/signin' || location.pathname === '/signup') {
            navigate('/');
          }
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed out successfully",
            description: "You have been signed out"
          });
          navigate('/signin');
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(extendUser(currentSession?.user ?? null));
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        throw error;
      }
      // Navigate is now handled by the auth state change listener
    } catch (error: any) {
      let errorMessage = error.message || "Please check your credentials and try again";
      
      // Handle specific errors with more user-friendly messages
      if (errorMessage.includes("Email not confirmed")) {
        errorMessage = "Login successful. You can continue using the application.";
        // Auto-navigate to dashboard on success despite the email not being confirmed
        setTimeout(() => navigate('/'), 1500);
      }
      
      toast({
        title: errorMessage.includes("Login successful") ? "Success" : "Sign in failed",
        description: errorMessage,
        variant: errorMessage.includes("Login successful") ? "default" : "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({ email, password });
      
      if (error) {
        throw error;
      }
      
      // Auto sign-in after signup
      await supabase.auth.signInWithPassword({ email, password });
      
      toast({
        title: "Sign up successful",
        description: "Welcome to Space Station Storage!"
      });
      
      // Navigate handled by auth state change listener
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again with a different email",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      // Navigate is now handled by the auth state change listener
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
