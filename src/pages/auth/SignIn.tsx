
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const rocketIllustration = (
    <motion.div 
      className="relative w-64 h-64"
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-space-bright-blue/0 to-space-bright-blue/30 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
      <Rocket className="w-full h-full text-white" strokeWidth={1.5} />
    </motion.div>
  );
  
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Sign in to your account to continue" 
      type="signin"
      illustration={rocketIllustration}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <Alert variant="destructive" className="bg-red-500/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <label htmlFor="email" className="block text-sm font-medium text-blue-200">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-space-bright-blue"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-2"
        >
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm font-medium text-blue-200">
              Password
            </label>
            <a href="#" className="text-xs text-space-bright-blue hover:text-space-bright-blue/80 transition-colors">
              Forgot password?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-space-bright-blue"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-2"
        >
          <Checkbox 
            id="remember"
            checked={rememberMe} 
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            className="data-[state=checked]:bg-space-bright-blue data-[state=checked]:border-space-bright-blue border-white/50"
          />
          <label
            htmlFor="remember"
            className="text-sm font-medium leading-none text-blue-200 cursor-pointer"
          >
            Keep me logged in
          </label>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-space-bright-blue hover:bg-blue-500 text-white transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Sign In
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-blue-200"
        >
          Don't have an account?{' '}
          <a href="/signup" className="text-space-bright-blue hover:text-space-bright-blue/80 font-medium transition-colors">
            Sign up
          </a>
        </motion.div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
