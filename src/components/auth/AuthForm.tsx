
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, User, Lock, Mail, ArrowRight, Rocket } from 'lucide-react';
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
  const [welcomeText, setWelcomeText] = useState('');
  const [instructionText, setInstructionText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Typewriter effect for welcome message
  useEffect(() => {
    const welcomeMessage = "Welcome Commander, ready to dock?";
    const instructionMessage = type === 'signin' 
      ? "Enter your credentials to access the space station." 
      : "Register your credentials to join the space station crew.";
    
    let welcomeIndex = 0;
    let instructionIndex = 0;
    
    const welcomeInterval = setInterval(() => {
      if (welcomeIndex < welcomeMessage.length) {
        setWelcomeText(prev => prev + welcomeMessage.charAt(welcomeIndex));
        welcomeIndex++;
      } else {
        clearInterval(welcomeInterval);
        
        // Start instruction animation after welcome message completes
        const instructionInterval = setInterval(() => {
          if (instructionIndex < instructionMessage.length) {
            setInstructionText(prev => prev + instructionMessage.charAt(instructionIndex));
            instructionIndex++;
          } else {
            clearInterval(instructionInterval);
          }
        }, 30);
      }
    }, 50);
    
    return () => {
      clearInterval(welcomeInterval);
    };
  }, [type]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    setIsLaunching(true);
    
    if (type === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      setIsLaunching(false);
      return;
    }
    
    try {
      setTimeout(async () => {
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
          setIsLaunching(false);
        } finally {
          setIsLoading(false);
        }
      }, 1500); // Delay for launch animation
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsLoading(false);
      setIsLaunching(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto terminal-card backdrop-blur-lg bg-black/40 border-white/10 shadow-xl">
      <CardHeader className="animate-fade-in space-y-2">
        <CardTitle className="text-xl font-mono text-center terminal-text">
          {welcomeText || (
            <span className="pulse-animation">_</span>
          )}
        </CardTitle>
        <CardDescription className="font-mono text-blue-300/80 terminal-description">
          {instructionText || (
            <span className="pulse-animation">_</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive" className="animate-scale-in border-red-500/50 bg-red-900/20">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="font-mono">{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2 animate-fade-in animate-delay-100">
            <label htmlFor="email" className="text-sm font-mono text-blue-200">
              EMAIL IDENTIFICATION
            </label>
            <TiltEffect maxTilt={3} scale={1.01}>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="commander@spacestation.io"
                  required
                  className="pl-10 font-mono input-glow bg-black/30 border-blue-500/30 hover:border-blue-400 focus:border-blue-300 transition-colors text-blue-100"
                />
              </div>
            </TiltEffect>
          </div>
          
          <div className="space-y-2 animate-fade-in animate-delay-200">
            <label htmlFor="password" className="text-sm font-mono text-blue-200">
              SECURITY CODE
            </label>
            <TiltEffect maxTilt={3} scale={1.01}>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10 font-mono input-glow bg-black/30 border-blue-500/30 hover:border-blue-400 focus:border-blue-300 transition-colors text-blue-100"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </TiltEffect>
          </div>
          
          {type === 'signup' && (
            <div className="space-y-2 animate-fade-in animate-delay-300">
              <label htmlFor="confirmPassword" className="text-sm font-mono text-blue-200">
                CONFIRM SECURITY CODE
              </label>
              <TiltEffect maxTilt={3} scale={1.01}>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-blue-400" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pl-10 font-mono input-glow bg-black/30 border-blue-500/30 hover:border-blue-400 focus:border-blue-300 transition-colors text-blue-100"
                  />
                </div>
              </TiltEffect>
            </div>
          )}
          
          <TiltEffect maxTilt={5} scale={1.05} className="animate-fade-in animate-delay-400 mt-6">
            <Button 
              type="submit" 
              className={`w-full terminal-button relative overflow-hidden font-mono flex items-center justify-center gap-2 ${isLaunching ? 'launching' : ''}`}
              disabled={isLoading}
            >
              <span>
                {isLoading
                  ? 'LAUNCHING...'
                  : type === 'signin'
                    ? 'INITIATE DOCKING'
                    : 'REGISTER CREDENTIALS'}
              </span>
              {isLoading ? (
                <Rocket className="h-4 w-4 rocket-icon" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </Button>
          </TiltEffect>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center animate-fade-in animate-delay-500">
        <p className="text-sm text-blue-200/70 font-mono">
          {type === 'signin' ? (
            <>
              New commander?{' '}
              <a href="/signup" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                Register for clearance
              </a>
            </>
          ) : (
            <>
              Already registered?{' '}
              <a href="/signin" className="text-blue-400 hover:text-blue-300 hover:underline transition-colors">
                Dock now
              </a>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
