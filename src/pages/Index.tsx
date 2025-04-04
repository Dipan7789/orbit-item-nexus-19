
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import ParticlesBackground from '@/components/ui/particles-background';
import TiltEffect from '@/components/ui/tilt-effect';

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-background/80 p-4">
      <ParticlesBackground />
      
      <div className={`max-w-4xl w-full text-center space-y-8 ${mounted ? 'animate-scale-in' : 'opacity-0'}`}>
        <div className="space-y-2">
          <h1 className={`text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 ${mounted ? 'animate-fade-in' : 'opacity-0'}`}>
            Space Station Storage
          </h1>
          <p className={`text-xl text-muted-foreground mt-4 max-w-2xl mx-auto ${mounted ? 'animate-fade-in animate-delay-200' : 'opacity-0'}`}>
            Advanced inventory management system designed for the International Space Station
          </p>
        </div>
        
        <div className={`flex flex-col sm:flex-row gap-4 justify-center ${mounted ? 'animate-fade-in animate-delay-300' : 'opacity-0'}`}>
          <TiltEffect maxTilt={10} scale={1.05}>
            <Button 
              onClick={() => navigate('/signin')}
              className="px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 border-none glow-effect"
            >
              Sign In
            </Button>
          </TiltEffect>
          
          <TiltEffect maxTilt={10} scale={1.05}>
            <Button 
              onClick={() => navigate('/signup')}
              variant="outline" 
              className="px-8 py-6 text-lg bg-background/30 backdrop-blur-sm border border-white/10 hover:bg-white/10"
            >
              Create Account
            </Button>
          </TiltEffect>
        </div>
        
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 ${mounted ? 'animate-fade-in animate-delay-400' : 'opacity-0'}`}>
          {[
            { 
              title: "Instant Navigation",
              description: "Jump to any module or zone with a single click"
            },
            { 
              title: "Smart Inventory", 
              description: "AI-powered inventory management and predictions"
            },
            { 
              title: "3D Visualization",
              description: "Interactive 3D maps of storage locations"
            }
          ].map((feature, index) => (
            <TiltEffect key={index} className="h-full" maxTilt={5}>
              <div className="p-6 h-full rounded-lg futuristic-border backdrop-blur-sm bg-card/40 flex flex-col items-center text-center">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </TiltEffect>
          ))}
        </div>
      </div>
      
      <footer className={`mt-16 text-sm text-muted-foreground ${mounted ? 'animate-fade-in animate-delay-500' : 'opacity-0'}`}>
        Powered by advanced space technology &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Index;
