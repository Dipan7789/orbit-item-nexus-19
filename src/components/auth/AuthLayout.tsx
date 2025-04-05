
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SpaceObjects from './SpaceObjects';
import { Button } from '@/components/ui/button';

interface AuthLayoutProps {
  children: React.ReactNode;
  illustration?: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'signin' | 'signup';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, illustration, title, subtitle, type }) => {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-space-deep-blue to-black overflow-hidden relative">
      {/* Background stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `pulse-slow ${Math.random() * 3 + 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Animated space objects */}
      <SpaceObjects />
      
      {/* Auth container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row w-full max-w-5xl z-10"
      >
        {/* Left side - Illustration */}
        <motion.div 
          className="w-full lg:w-1/2 p-6 lg:p-12 bg-gradient-to-br from-space-purple/30 to-space-blue/30 backdrop-blur-md rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none border border-white/10 flex flex-col items-center justify-center text-center space-y-8"
          initial={{ x: flipped ? 0 : -50 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-3xl md:text-4xl font-bold text-white">Space Station Storage</div>
          <div className="text-xl text-blue-200">Organize the universe at your fingertips</div>
          
          {illustration && (
            <div className="py-8">
              {illustration}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-xs">
            <Button 
              variant={type === 'signup' ? 'default' : 'outline'}
              className={`w-full ${type === 'signup' ? 'bg-space-bright-blue hover:bg-space-bright-blue/80' : 'bg-transparent hover:bg-white/10 text-white'}`}
              onClick={() => window.location.href = '/signup'}
            >
              Create Account
            </Button>
            <Button 
              variant={type === 'signin' ? 'default' : 'outline'}
              className={`w-full ${type === 'signin' ? 'bg-space-bright-blue hover:bg-space-bright-blue/80' : 'bg-transparent hover:bg-white/10 text-white'}`}
              onClick={() => window.location.href = '/signin'}
            >
              Sign In
            </Button>
          </div>
        </motion.div>
        
        {/* Right side - Form */}
        <motion.div 
          className="w-full lg:w-1/2 p-6 lg:p-12 bg-gradient-to-br from-space-gray/80 to-space-deep-blue/90 backdrop-blur-md rounded-b-2xl lg:rounded-r-2xl lg:rounded-bl-none border border-white/10"
          initial={{ x: flipped ? -50 : 0 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">{title}</h1>
            <p className="text-blue-200 mb-8">{subtitle}</p>
            
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
