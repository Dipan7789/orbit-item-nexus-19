
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Card } from '@/components/ui/card';

const SignIn = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="flex flex-1 flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Space Station Storage</h1>
            <p className="text-muted-foreground">Welcome back! Sign in to your account to continue</p>
          </div>
          
          <Card className="border-border/40 shadow-lg">
            <AuthForm type="signin" />
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
