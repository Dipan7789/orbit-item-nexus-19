
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import TiltEffect from '@/components/ui/tilt-effect';

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
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-card/90 border-white/10 shadow-lg futuristic-border">
      <CardHeader className="animate-fade-in">
        <CardTitle className="text-xl font-bold">{type === 'signin' ? 'Sign In' : 'Sign Up'}</CardTitle>
        <CardDescription className="text-muted-foreground">
          {type === 'signin' 
            ? 'Enter your credentials to access your account' 
            : 'Create a new account to get started'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="animate-scale-in">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2 animate-fade-in animate-delay-100">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <TiltEffect maxTilt={2} scale={1.01}>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="bg-background/50 border-white/10 hover:border-primary/50 transition-colors"
              />
            </TiltEffect>
          </div>
          
          <div className="space-y-2 animate-fade-in animate-delay-200">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <TiltEffect maxTilt={2} scale={1.01}>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bg-background/50 border-white/10 hover:border-primary/50 transition-colors"
              />
            </TiltEffect>
          </div>
          
          {type === 'signup' && (
            <div className="space-y-2 animate-fade-in animate-delay-300">
              <label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </label>
              <TiltEffect maxTilt={2} scale={1.01}>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-background/50 border-white/10 hover:border-primary/50 transition-colors"
                />
              </TiltEffect>
            </div>
          )}
          
          <TiltEffect maxTilt={5} scale={1.02} className="animate-fade-in animate-delay-400 mt-4">
            <Button 
              type="submit" 
              className="w-full glow-effect relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading
                ? 'Processing...'
                : type === 'signin'
                  ? 'Sign In'
                  : 'Sign Up'}
            </Button>
          </TiltEffect>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center animate-fade-in animate-delay-500">
        <p className="text-sm text-muted-foreground">
          {type === 'signin' ? (
            <>
              Don't have an account?{' '}
              <a href="/signup" className="text-primary hover:underline hover:text-primary/80 transition-colors">
                Sign up
              </a>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <a href="/signin" className="text-primary hover:underline hover:text-primary/80 transition-colors">
                Sign in
              </a>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
