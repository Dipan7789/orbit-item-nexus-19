
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface AuthFormProps {
  type: 'signin' | 'signup';
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    <>
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-2xl font-bold text-white">{type === 'signin' ? 'Sign In' : 'Sign Up'}</CardTitle>
        <CardDescription className="text-blue-100">
          {type === 'signin' 
            ? 'Enter your credentials to access your account' 
            : 'Create a new account to get started'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5 pt-0">
        {error && (
          <Alert variant="destructive" className="mb-4 border-red-300/20 bg-red-900/20 text-red-200">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-blue-100">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-400"
              required
              autoComplete="email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-blue-100">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-400"
              required
              autoComplete={type === 'signin' ? 'current-password' : 'new-password'}
            />
          </div>
          
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-blue-100">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-white/10 border-white/20 text-white placeholder:text-blue-300/50 focus-visible:ring-blue-400"
                required
                autoComplete="new-password"
              />
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium mt-2" 
            disabled={isLoading}
          >
            {isLoading
              ? 'Processing...'
              : type === 'signin'
                ? 'Sign In'
                : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t border-white/10 pt-4">
        <p className="text-sm text-blue-100">
          {type === 'signin' ? (
            <>
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-300 hover:text-blue-200 font-medium">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="/signin" className="text-blue-300 hover:text-blue-200 font-medium">
                Sign in
              </a>
            </>
          )}
        </p>
      </CardFooter>
    </>
  );
};

export default AuthForm;
