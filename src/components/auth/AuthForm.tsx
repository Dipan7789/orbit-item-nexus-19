
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface AuthFormProps {
  type: 'signin' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    if (type === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    try {
      if (type === 'signin') {
        await signIn(email, password);
        navigate('/');
      } else {
        await signUp(email, password);
        navigate('/');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <Alert variant="destructive" className="bg-red-500/20 border-red-500/50 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-1.5">
        <label htmlFor="email" className="text-sm font-medium text-white">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          required
          className="auth-input bg-white/5 border-blue-300/30 focus:border-blue-400/70 text-white placeholder:text-blue-200/50"
        />
      </div>
      
      <div className="space-y-1.5">
        <label htmlFor="password" className="text-sm font-medium text-white">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          className="auth-input bg-white/5 border-blue-300/30 focus:border-blue-400/70 text-white placeholder:text-blue-200/50"
        />
      </div>
      
      {type === 'signup' && (
        <div className="space-y-1.5">
          <label htmlFor="confirmPassword" className="text-sm font-medium text-white">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="auth-input bg-white/5 border-blue-300/30 focus:border-blue-400/70 text-white placeholder:text-blue-200/50"
          />
        </div>
      )}
      
      {type === 'signin' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember-me" 
              checked={rememberMe} 
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              className="border-blue-300/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <label htmlFor="remember-me" className="text-sm text-blue-200">
              Keep me logged in
            </label>
          </div>
          
          <a href="#" className="text-sm text-primary hover:text-primary/90 hover:underline transition-colors">
            Forgot password?
          </a>
        </div>
      )}
      
      <Button 
        type="submit" 
        className="w-full pulse-button bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium py-2 shadow-glow-sm transition-all hover:shadow-glow-md"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            {type === 'signin' ? 'Signing in...' : 'Creating account...'}
          </span>
        ) : (
          type === 'signin' ? 'Sign In' : 'Create Account'
        )}
      </Button>
    </form>
  );
};

export default AuthForm;
