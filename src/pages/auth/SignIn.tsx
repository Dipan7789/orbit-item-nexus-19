
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '@/components/auth/AuthForm';
import { Rocket, Satellite, Star, Planet } from 'lucide-react';

const SignIn = () => {
  const [stars, setStars] = useState<{ top: string; left: string; size: string; delay: string }[]>([]);

  useEffect(() => {
    // Generate random stars for the background
    const newStars = Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 0.4 + 0.1}rem`,
      delay: `${Math.random() * 5}s`
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-space-deep-blue p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Stars */}
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute animate-pulse-slow bg-white rounded-full"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
        
        {/* Animated floating icons */}
        <div className="absolute top-1/4 left-1/5 text-blue-300 animate-float opacity-30">
          <Satellite size={40} />
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-purple-400 animate-float opacity-40" style={{ animationDelay: "2s" }}>
          <Planet size={64} />
        </div>
        <div className="absolute top-2/3 left-1/3 text-amber-300 animate-float opacity-30" style={{ animationDelay: "3s" }}>
          <Star size={48} />
        </div>
        <div className="absolute bottom-1/4 right-1/5 text-teal-400 animate-float opacity-40" style={{ animationDelay: "4s" }}>
          <Rocket size={56} />
        </div>
        
        {/* Nebula glow effects */}
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -right-1/4 w-3/4 h-3/4 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content area */}
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-white text-gradient-space">Space Station Storage</h2>
          <p className="text-blue-200">Sign in to your account to continue</p>
        </div>
        
        {/* Glassmorphic card */}
        <div className="glassmorphic-card backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-6 shadow-glow transition-transform hover:transform hover:scale-[1.01]">
          <AuthForm type="signin" />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-blue-200">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:text-primary/90 hover:underline transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
};

export default SignIn;
