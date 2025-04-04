
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const SignUp = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30">
      <div className="w-full max-w-md animate-slideUp">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="h-8 w-8 text-primary animate-pulse"
              >
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                <path d="M3 15v4h16a2 2 0 0 0 0-4H3Z" />
                <path d="M12 19v2" />
                <path d="M12 3v2" />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Space Station Storage</h2>
          <p className="text-muted-foreground">Create a new account to get started</p>
        </div>
        <AuthForm type="signup" />
      </div>
    </div>
  );
};

export default SignUp;
