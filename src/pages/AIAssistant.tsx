
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  AlertCircle, 
  ArrowUpCircle, 
  Bot, 
  Package, 
  Search, 
  Sparkles, 
  User, 
  X,
  Clock,
  AlertTriangle,
  Rocket,
  Zap
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  type?: 'normal' | 'error' | 'warning' | 'info';
}

interface QuickAction {
  id: string;
  icon: React.ElementType;
  label: string;
  action: () => void;
}

const AIAssistant = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your ISS Inventory Assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'normal'
    },
    {
      id: '2',
      text: "I can help with inventory searches, emergency procedures, or item recommendations. Try asking me a question!",
      sender: 'assistant',
      timestamp: new Date(Date.now() + 100),
      type: 'info'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Quick action suggestions
  const quickActions: QuickAction[] = [
    {
      id: 'find-item',
      icon: Search,
      label: 'Find an item',
      action: () => handleQuickAction('Can you help me find a medical kit?')
    },
    {
      id: 'inventory-status',
      icon: Package,
      label: 'Inventory status',
      action: () => handleQuickAction('What\'s the current inventory status?')
    },
    {
      id: 'emergency',
      icon: AlertCircle,
      label: 'Emergency procedures',
      action: () => handleQuickAction('Show me emergency decompression procedures')
    },
    {
      id: 'expiring-items',
      icon: Clock,
      label: 'Expiring items',
      action: () => handleQuickAction('What items are expiring soon?')
    },
    {
      id: 'upcoming-events',
      icon: AlertTriangle,
      label: 'Upcoming events',
      action: () => handleQuickAction('Are there any upcoming celestial events I should know about?')
    }
  ];
  
  // Simulate assistant responses - in a real app, this would be an API call
  const getAssistantResponse = async (userMessage: string): Promise<string> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('find') || lowerMessage.includes('where')) {
      if (lowerMessage.includes('medical') || lowerMessage.includes('kit')) {
        return "I found 3 medical kits in inventory. The nearest one is in Module A, Cabinet 3. Would you like me to show you the exact location?";
      }
      return "I can help you find items in the inventory. What specific item are you looking for?";
    }
    
    if (lowerMessage.includes('inventory') && lowerMessage.includes('status')) {
      return "Current inventory status: 143 items total, 12 items low on stock, 5 items expired. Priority attention needed for Medical Supplies (3 expired items) and Food Rations (2 items critically low).";
    }
    
    if (lowerMessage.includes('emergency')) {
      if (lowerMessage.includes('decompression')) {
        return "EMERGENCY PROCEDURE: DECOMPRESSION\n1. Put on nearest oxygen mask\n2. Secure yourself to prevent being pulled toward breach\n3. Alert all crew members via emergency channel\n4. Locate breach using pressure sensors\n5. Seal affected module if possible\nWould you like me to notify the crew?";
      }
      return "I can provide guidance for various emergency procedures. Please specify which emergency you need help with (e.g., decompression, fire, medical, etc.)";
    }
    
    if (lowerMessage.includes('expir')) {
      return "I found 8 items expiring within the next 30 days:\n- Medical Kit (5 days)\n- Freeze-Dried Meals (15 days)\n- Antibiotics (-2 days, EXPIRED)\n- Painkillers (20 days)\nWould you like to see the complete list?";
    }
    
    if (lowerMessage.includes('event') || lowerMessage.includes('celestial')) {
      return "Upcoming celestial events:\n1. X-Class Solar Flare (1 day from now, medium severity)\n2. Orbital Debris Field Crossing (2 days from now, high severity)\n3. Perseid Meteor Shower (4 days from now, low severity)\nThe debris field crossing requires preparation. Would you like me to show the detailed forecast?";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return "Hello! I'm your ISS Inventory Assistant. How can I help you today?";
    }
    
    if (lowerMessage.includes('thank')) {
      return "You're welcome! Let me know if you need anything else.";
    }
    
    return "I understand you're asking about '" + userMessage + "'. I can help with inventory searches, emergency procedures, expiring items, and more. Could you provide more details about what you need?";
  };
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isChatOpen]);
  
  // Send message
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
      const response = await getAssistantResponse(inputValue);
      
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
              text: "I'm sorry, I encountered an error processing your request. Please try again.",
              isLoading: false,
              type: 'error'
            } 
          : msg
      ));
      
      toast({
        title: "Connection Error",
        description: "The assistant is currently unavailable. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  // Handle quick action button click
  const handleQuickAction = (actionMessage: string) => {
    setInputValue(actionMessage);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  // Handle input key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Format timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Toggle chat open/closed
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };
  
  // Clear chat history
  const clearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        text: "Chat history cleared. How can I assist you?",
        sender: 'assistant',
        timestamp: new Date()
      }
    ]);
  };
  
  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Bot className="text-primary" /> AI Assistant
          </h1>
          <p className="text-muted-foreground">Your intelligent space station companion</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={clearChat}>
            <Rocket size={16} />
            New Conversation
          </Button>
        </div>
      </div>
      
      <Card className="flex-grow shadow-md relative overflow-hidden border bg-card/30 backdrop-blur-sm">
        <CardContent className="p-0 h-full flex flex-col">
          <div className="flex items-center justify-between bg-primary/5 backdrop-blur-sm p-3 border-b">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">ISS Assistant</div>
                <div className="text-xs text-muted-foreground">Always here to help</div>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
              Online
            </Badge>
          </div>
          
          <ScrollArea className="flex-grow p-4 pt-6">
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
                      "max-w-[80%] rounded-xl px-4 py-2.5 shadow-sm",
                      message.sender === 'user' 
                        ? 'bg-primary text-primary-foreground rounded-tr-none'
                        : 'bg-muted/50 backdrop-blur-lg border rounded-tl-none',
                      message.type === 'error' && 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
                      message.type === 'warning' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
                      message.type === 'info' && 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'assistant' && !message.isLoading && (
                        <Sparkles size={16} className="mt-1 text-primary" />
                      )}
                      
                      <div className="space-y-1">
                        <div className="whitespace-pre-line">
                          {message.isLoading ? (
                            <div className="flex items-center h-6">
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
          
          <div className="p-3 border-t bg-card/30 backdrop-blur-sm">
            <div className="mb-3">
              <div className="text-xs font-medium mb-2">Quick actions:</div>
              <div className="flex flex-wrap gap-2">
                {quickActions.map(action => (
                  <Button 
                    key={action.id}
                    variant="outline" 
                    size="sm"
                    className="gap-1 rounded-full text-xs py-0 h-8"
                    onClick={action.action}
                  >
                    <action.icon size={14} />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message here..."
                className="bg-background"
                disabled={isTyping}
              />
              <Button 
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
              >
                <ArrowUpCircle size={18} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <style jsx global>{`
        .dot-typing {
          position: relative;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: currentColor;
          color: currentColor;
          animation: dot-typing 1s infinite linear;
        }
        
        .dot-typing::before, .dot-typing::after {
          content: '';
          position: absolute;
          top: 0;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: currentColor;
          color: currentColor;
        }
        
        .dot-typing::before {
          left: -15px;
          animation: dot-typing 1s infinite 0.3s linear;
        }
        
        .dot-typing::after {
          left: 15px;
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

export default AIAssistant;
