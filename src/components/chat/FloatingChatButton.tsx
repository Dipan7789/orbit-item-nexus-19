
import React from 'react';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingChatButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick, isVisible }) => {
  if (!isVisible) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 ease-in-out">
      <Button
        onClick={onClick}
        size="icon"
        className={cn(
          "h-14 w-14 rounded-full shadow-lg",
          "bg-primary hover:bg-primary/90",
          "transition-all duration-500",
          "animate-pulse hover:animate-none",
          "flex items-center justify-center"
        )}
      >
        <Bot className="h-7 w-7" />
        <span className="sr-only">Open AI Assistant</span>
      </Button>
      
      {/* Animated rings effect */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 animate-ping-slow rounded-full bg-primary/20 opacity-75"></div>
        <div className="absolute inset-0 animate-ping-slower rounded-full bg-primary/10 opacity-75"></div>
      </div>
      
      <style>{`
        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 0.75;
          }
          50% {
            transform: scale(1.2);
            opacity: 0;
          }
          100% {
            transform: scale(1.4);
            opacity: 0;
          }
        }
        @keyframes ping-slower {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .animate-ping-slower {
          animation: ping-slower 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingChatButton;
