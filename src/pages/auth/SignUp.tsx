
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthLayout from '@/components/auth/AuthLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, Satellite } from 'lucide-react';
import { motion } from 'framer-motion';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (!acceptTerms) {
      setError('You must accept the terms and conditions');
      setIsLoading(false);
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      await signUp(email, password);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const satelliteIllustration = (
    <motion.div 
      className="relative w-64 h-64" 
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/0 to-indigo-500/30 rounded-full blur-2xl opacity-50 animate-pulse-slow" />
      <Satellite className="w-full h-full text-white" strokeWidth={1.5} />
    </motion.div>
  );
  
  return (
    <AuthLayout 
      title="Create an account" 
      subtitle="Sign up to start managing your space station inventory" 
      type="signup"
      illustration={satelliteIllustration}
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
          <label htmlFor="password" className="block text-sm font-medium text-blue-200">
            Password
          </label>
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
          className="space-y-2"
        >
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-blue-200">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-space-bright-blue"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-2"
        >
          <Checkbox 
            id="terms"
            checked={acceptTerms} 
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
            className="data-[state=checked]:bg-space-bright-blue data-[state=checked]:border-space-bright-blue border-white/50"
          />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none text-blue-200 cursor-pointer"
          >
            I accept the <a href="#" className="text-space-bright-blue hover:underline">terms and conditions</a>
          </label>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-space-bright-blue hover:bg-blue-500 text-white transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Create Account
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-blue-200"
        >
          Already have an account?{' '}
          <a href="/signin" className="text-space-bright-blue hover:text-space-bright-blue/80 font-medium transition-colors">
            Sign in
          </a>
        </motion.div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
