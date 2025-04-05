
import React from 'react';
import AuthForm from '@/components/auth/AuthForm';

const SignUp = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4 bg-muted/30">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Space Station Storage</h2>
          <p className="text-muted-foreground">Create a new account to get started</p>
        </div>
        <AuthForm type="signup" />
      </div>
    </div>
  );
};

export default SignUp;
