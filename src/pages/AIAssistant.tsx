
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, X, Loader2, BrainCircuit, Info, Package, Rocket } from 'lucide-react';

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const AIAssistant = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Initialize with welcome messages
  useEffect(() => {
    const initialMessages: MessageType[] = [
      {
        id: '1',
        content: 'Hello, how can I assist you with the ISS Inventory System today?',
        sender: 'bot',
        timestamp: new Date()
      },
      {
        id: '2',
        content: 'You can ask me about inventory items, station procedures, or quick actions.',
        sender: 'bot',
        timestamp: new Date()
      }
    ];
    setMessages(initialMessages);
  }, []);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = getBotResponse(inputValue);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (message: string): string => {
    const normalizedMessage = message.toLowerCase();
    
    if (normalizedMessage.includes('hello') || normalizedMessage.includes('hi')) {
      return 'Hello! How can I help you with the ISS inventory today?';
    } else if (normalizedMessage.includes('inventory') || normalizedMessage.includes('items')) {
      return 'The inventory system currently has 127 items tracked. You can search for specific items, check expiry dates, or manage storage locations. Would you like me to help with any of these?';
    } else if (normalizedMessage.includes('emergency') || normalizedMessage.includes('procedure')) {
      return 'For emergency procedures, please refer to the ISS Guidelines section. I can direct you there or summarize key protocols if needed.';
    } else if (normalizedMessage.includes('expiry') || normalizedMessage.includes('expiration')) {
      return 'There are currently 3 items approaching expiration in the next 7 days. Would you like me to show you the list?';
    } else if (normalizedMessage.includes('thank')) {
      return 'You\'re welcome! If you need anything else, just ask.';
    } else {
      return 'I\'m still learning about this topic. Would you like me to search the inventory database for relevant information?';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            AI Assistant
          </h1>
          <p className="text-muted-foreground mt-1">
            Your intelligent companion for ISS operations and inventory management
          </p>
        </div>
      </div>

      <Card className="space-card shadow-lg border-primary/20 bg-gradient-to-b from-background to-primary/5">
        <CardContent className="p-0">
          <div className="flex flex-col h-[calc(80vh-10rem)]">
            {/* Chat header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">ISS Assistant</div>
                  <div className="text-xs text-muted-foreground">Online</div>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 shadow-sm animate-in fade-in-0 slide-in-from-bottom-4 duration-300 ${
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted border border-border/30 backdrop-blur-sm'
                      }`}
                    >
                      <div className="text-sm">{message.content}</div>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl px-4 py-2 bg-muted border border-border/30 shadow-sm">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            {/* Suggestion buttons */}
            <div className="p-2 border-t flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => setInputValue("What items are expiring soon?")}
              >
                <Info size={14} />
                Expiring items
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => setInputValue("Find medical supplies")}
              >
                <Package size={14} />
                Find supplies
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1"
                onClick={() => setInputValue("Emergency procedures")}
              >
                <Rocket size={14} />
                Procedures
              </Button>
            </div>
            
            {/* Chat input */}
            <div className="p-4 border-t flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
