
import React, { useEffect, useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import ParticlesBackground from '@/components/ui/particles-background';
import TiltEffect from '@/components/ui/tilt-effect';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center p-4 bg-muted/10 overflow-hidden">
      <ParticlesBackground />
      
      <div className={`relative w-full max-w-md ${mounted ? 'animate-scale-in' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
        
        <div className="relative">
          <div className={`text-center mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              Space Station Storage
            </h2>
            <p className={`text-muted-foreground animate-fade-in animate-delay-200`}>
              Sign in to your account to continue
            </p>
          </div>
          
          <TiltEffect
            className={`${mounted ? 'animate-float-in animate-delay-300' : 'opacity-0'}`}
            maxTilt={5}
          >
            <AuthForm type="signin" />
          </TiltEffect>
          
          <div className={`mt-8 text-center text-sm text-muted-foreground ${mounted ? 'animate-fade-in animate-delay-500' : 'opacity-0'}`}>
            <p>Need help? <button onClick={() => navigate('/signup')} className="text-primary hover:text-primary/90 underline">Contact support</button></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
