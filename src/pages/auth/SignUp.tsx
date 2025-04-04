
import React, { useEffect, useState } from 'react';
import AuthForm from '@/components/auth/AuthForm';
import ParticlesBackground from '@/components/ui/particles-background';
import TiltEffect from '@/components/ui/tilt-effect';
import { useNavigate } from 'react-router-dom';
import SpaceBackground from '@/components/ui/space-background';

const SignUp = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center p-4 bg-space-gradient overflow-hidden">
      <SpaceBackground />
      <ParticlesBackground density={100} speed={0.3} connectParticles={true} />
      
      <div className={`relative w-full max-w-md z-10 ${mounted ? 'animate-scale-in' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg blur-xl"></div>
        
        <div className="relative">
          <div className={`text-center mb-8 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            <h2 className="text-4xl font-mono font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 terminal-heading">
              Space Station Storage
            </h2>
            <p className={`text-blue-300 font-mono animate-fade-in animate-delay-200 terminal-text-glow`}>
              Create New Commander Access
            </p>
          </div>
          
          <TiltEffect
            className={`${mounted ? 'animate-float-in animate-delay-300' : 'opacity-0'}`}
            maxTilt={5}
            scale={1.02}
          >
            <AuthForm type="signup" />
          </TiltEffect>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
