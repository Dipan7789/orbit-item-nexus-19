
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowUpCircle, 
  Bot,
  Sparkles, 
  X, 
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  type?: 'normal' | 'error' | 'warning' | 'info';
}

interface ChatOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your ISS Inventory Assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'normal'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Simplified response for the overlay - redirects to full page for complex queries
  const getQuickResponse = async (userMessage: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('find') || lowerMessage.includes('where') || 
        lowerMessage.includes('inventory') || lowerMessage.includes('emergency') ||
        lowerMessage.includes('expir') || lowerMessage.includes('event')) {
      return "That's a great question! Would you like to continue this conversation in the full AI Assistant interface?";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm your ISS Inventory Assistant. How can I help you today?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Let me know if you need anything else.";
    }
    
    return "I can help you with that. Would you like to open the full assistant interface for a more detailed conversation?";
  };
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen, isMinimized]);
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: '',
      sender: 'assistant',
      timestamp: new Date(),
      isLoading: true
    };
    
    setMessages(prev => [...prev, userMessage, loadingMessage]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      const response = await getQuickResponse(inputValue);
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { ...msg, text: response, isLoading: false } 
          : msg
      ));
    } catch (error) {
      // Handle error
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id 
          ? { 
              ...msg, 
              text: "I'm sorry, I encountered an error. Please try again.",
              isLoading: false,
              type: 'error'
            } 
          : msg
      ));
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };
  
  const openFullAssistant = () => {
    onClose();
    navigate('/ai-assistant');
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      className={cn(
        "fixed bottom-4 right-4 w-80 shadow-lg rounded-lg border bg-background/80 backdrop-blur-md z-50 transition-all duration-300 ease-in-out",
        isMinimized ? "h-14" : "h-[500px]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-primary/10 p-3 rounded-t-lg">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot size={16} className="text-primary" />
          </div>
          <div>
            <div className="font-medium text-sm">ISS Assistant</div>
            <div className={cn(
              "text-xs text-muted-foreground transition-opacity",
              isMinimized ? "opacity-0" : "opacity-100"
            )}>
              Quick chat
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMinimize}>
            {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X size={14} />
          </Button>
        </div>
      </div>
      
      {/* Body */}
      {!isMinimized && (
        <>
          <ScrollArea className="flex-grow p-4 h-[calc(500px-64px-58px)] border-b">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div 
                    className={cn(
                      "max-w-[80%] rounded-xl px-3 py-2 shadow-sm text-sm",
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-muted/50 backdrop-blur-lg border rounded-tl-none',
                      message.type === 'error' && 'bg-red-100 text-red-800',
                      message.type === 'warning' && 'bg-yellow-100 text-yellow-800',
                      message.type === 'info' && 'bg-blue-100 text-blue-800'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'assistant' && !message.isLoading && (
                        <Sparkles size={14} className="mt-1 text-primary shrink-0" />
                      )}
                      
                      <div className="space-y-1">
                        <div>
                          {message.isLoading ? (
                            <div className="flex items-center h-5">
                              <div className="dot-typing"></div>
                            </div>
                          ) : (
                            message.text
                          )}
                        </div>
                        <div className="text-xs opacity-70 text-right">
                          {formatTime(message.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="p-2 flex flex-col gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={openFullAssistant}
              className="text-xs"
            >
              Open Full Assistant
            </Button>
            
            <div className="flex gap-1">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="h-9 text-sm"
                disabled={isTyping}
              />
              <Button 
                size="icon"
                className="h-9 w-9"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
              >
                <ArrowUpCircle size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
      
      <style jsx global>{`
        .dot-typing {
          position: relative;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: currentColor;
          color: currentColor;
          animation: dot-typing 1s infinite linear;
        }
        
        .dot-typing::before, .dot-typing::after {
          content: '';
          position: absolute;
          top: 0;
          width: 6px;
          height: 6px;
          border-radius: 3px;
          background-color: currentColor;
          color: currentColor;
        }
        
        .dot-typing::before {
          left: -10px;
          animation: dot-typing 1s infinite 0.3s linear;
        }
        
        .dot-typing::after {
          left: 10px;
          animation: dot-typing 1s infinite 0.6s linear;
        }
        
        @keyframes dot-typing {
          0%, 20% {
            transform: scale(1);
            opacity: 0.6;
          }
          
          40% {
            transform: scale(1.2);
            opacity: 1;
          }
          
          60%, 100% {
            transform: scale(1);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatOverlay;
