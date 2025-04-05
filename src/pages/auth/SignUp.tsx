
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Card } from '@/components/ui/card';

const SignUp = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="flex flex-1 flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Space Station Storage</h1>
            <p className="text-muted-foreground">Create a new account to get started</p>
          </div>
          
          <Card className="border-border/40 shadow-lg">
            <AuthForm type="signup" />
          </Card>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
