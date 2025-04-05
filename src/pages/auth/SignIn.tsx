
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';
import { Card } from '@/components/ui/card';
import StarsBackground from '@/components/animations/StarsBackground';

const SignIn = () => {
  return (
    <div className="relative flex min-h-screen w-full overflow-hidden bg-gradient-to-br from-space-deep-blue via-space-blue to-space-purple">
      <StarsBackground />
      
      <div className="relative z-10 flex flex-1 flex-col justify-center items-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-white">Space Station Storage</h1>
            <p className="text-lg text-blue-100">Welcome back! Sign in to your account</p>
          </div>
          
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl">
            <AuthForm type="signin" />
          </Card>
          
          <div className="text-center text-sm text-blue-100">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
