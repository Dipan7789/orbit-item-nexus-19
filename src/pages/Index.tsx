
import React from 'react';
import { RocketIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-8">
      <div className="bg-primary/10 p-4 rounded-full mb-6">
        <RocketIcon className="h-10 w-10 text-primary" />
      </div>
      <h1 className="text-3xl font-bold mb-4">Welcome to ISS Inventory System</h1>
      <p className="text-lg text-muted-foreground max-w-lg mb-8">
        Your comprehensive solution for managing space station inventory
      </p>
      <Button 
        size="lg" 
        className="px-8"
        onClick={() => navigate('/dashboard')}
      >
        Go to Dashboard
      </Button>
    </div>
  );
};

export default Index;
