
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent,
  TabsList,
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  ArrowUpCircle, 
  Bot,
  Sparkles, 
  Cpu, 
  FileText, 
  Search, 
  PackageSearch, 
  RefreshCw, 
  Rocket, 
  CircleDot,
  Calendar,
  LayoutDashboard,
  PinIcon,
  Map
} from 'lucide-react';
import { inventoryDatabase } from '@/data/mockData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isLoading?: boolean;
  type?: 'normal' | 'error' | 'warning' | 'info';
  itemData?: any;
  isLocationData?: boolean;
}

interface RecentQuery {
  id: string;
  text: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
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
  const [activeTab, setActiveTab] = useState('chat');
  const [pinnedQueries, setPinnedQueries] = useState<string[]>([
    'Where is the medical kit?',
    'Show me expiring items',
    'Locate emergency oxygen'
  ]);
  const [recentQueries, setRecentQueries] = useState<RecentQuery[]>([
    {
      id: '1',
      text: 'Where is the emergency kit?',
      timestamp: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: '2',
      text: 'How many freeze-dried meals do we have left?',
      timestamp: new Date(Date.now() - 7200000) // 2 hours ago
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const findItemInInventory = (query: string): any => {
    const normalizedQuery = query.toLowerCase();
    
    // Check for specific item queries
    if (normalizedQuery.includes('medical kit') || normalizedQuery.includes('first aid')) {
      return {
        id: 'MED-1234',
        name: 'Medical Kit',
        location: 'Module A - Cabinet 3',
        condition: 'Good, 95% contents intact',
        lastChecked: '2 days ago',
        expiryDate: '2025-08-15',
        coordinates: {
          module: 'A',
          section: 'Medical Bay',
          cabinet: 3,
          shelf: 2
        }
      };
    } else if (normalizedQuery.includes('oxygen') || normalizedQuery.includes('o2')) {
      return {
        id: 'OXY-9012',
        name: 'Oxygen Canisters',
        location: 'Module B - Life Support Section',
        condition: 'Excellent, pressure at optimal levels',
        lastChecked: '1 day ago',
        expiryDate: 'N/A',
        coordinates: {
          module: 'B',
          section: 'Life Support',
          cabinet: 1,
          shelf: 1
        }
      };
    } else if (normalizedQuery.includes('food') || normalizedQuery.includes('meal') || normalizedQuery.includes('freeze-dried')) {
      return {
        id: 'FOOD-5678',
        name: 'Freeze-Dried Meals',
        location: 'Cargo Bay - Food Storage',
        condition: 'Good, 3 meals remaining',
        lastChecked: '12 hours ago',
        expiryDate: '2025-06-30',
        coordinates: {
          module: 'Cargo',
          section: 'Food Storage',
          cabinet: 2,
          shelf: 3
        }
      };
    } else if (normalizedQuery.includes('tool') || normalizedQuery.includes('repair')) {
      return {
        id: 'TOOL-5678',
        name: 'Multi-Tool',
        location: 'Module B - Tool Rack',
        condition: 'Excellent, all attachments intact',
        lastChecked: '3 days ago',
        expiryDate: 'N/A',
        coordinates: {
          module: 'B',
          section: 'Maintenance',
          cabinet: 4,
          shelf: 2
        }
      };
    }
    
    // If no specific item was found
    return null;
  };
  
  const generateResponse = async (userMessage: string): Promise<Message> => {
    // Wait a bit to simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Check if this is a location or item query
    if (
      lowerMessage.includes('where') || 
      lowerMessage.includes('find') || 
      lowerMessage.includes('locate') || 
      lowerMessage.includes('search')
    ) {
      const item = findItemInInventory(lowerMessage);
      
      if (item) {
        // Return a detailed response with item information
        return {
          id: Date.now().toString(),
          text: `I found the ${item.name} (ID: ${item.id}) for you!`,
          sender: 'assistant',
          timestamp: new Date(),
          itemData: item,
          isLocationData: true
        };
      } else {
        return {
          id: Date.now().toString(),
          text: "I'm sorry, I couldn't find that specific item in the inventory database. Could you provide more details or check if the item name is correct?",
          sender: 'assistant',
          timestamp: new Date()
        };
      }
    }
    
    // Check for inventory status queries
    if (
      lowerMessage.includes('how many') || 
      lowerMessage.includes('count') || 
      lowerMessage.includes('remaining')
    ) {
      const item = findItemInInventory(lowerMessage);
      
      if (item) {
        // Return detailed inventory information
        return {
          id: Date.now().toString(),
          text: `According to inventory records, we have: ${item.name} (ID: ${item.id})`,
          sender: 'assistant',
          timestamp: new Date(),
          itemData: item
        };
      }
    }
    
    // Default responses for other types of queries
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return {
        id: Date.now().toString(),
        text: "Hello! I'm your ISS Inventory Assistant. How can I help you today?",
        sender: 'assistant',
        timestamp: new Date()
      };
    } else if (lowerMessage.includes('thank')) {
      return {
        id: Date.now().toString(),
        text: "You're welcome! Let me know if you need anything else.",
        sender: 'assistant',
        timestamp: new Date()
      };
    } else {
      return {
        id: Date.now().toString(),
        text: "I'll help you with that. Please provide more details about what you're looking for, or try asking about specific items like 'Where is the medical kit?' or 'How many freeze-dried meals do we have left?'",
        sender: 'assistant',
        timestamp: new Date()
      };
    }
  };
  
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
    
    // Add to recent queries
    const newQuery = {
      id: Date.now().toString(),
      text: inputValue,
      timestamp: new Date()
    };
    
    setRecentQueries(prev => [newQuery, ...prev.slice(0, 9)]); // Keep only the 10 most recent
    
    try {
      const response = await generateResponse(inputValue);
      
      // Replace loading message with actual response
      setMessages(prev => prev.map(msg => 
        msg.id === loadingMessage.id ? response : msg
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
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage();
    }
  };
  
  const handlePinnedQuery = (query: string) => {
    setInputValue(query);
    inputRef.current?.focus();
  };
  
  const handleRecentQuery = (query: string) => {
    setInputValue(query);
    inputRef.current?.focus();
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.round(diffMs / 60000);
    const diffHours = Math.round(diffMs / 3600000);
    
    if (diffMin < 60) {
      return `${diffMin} min ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="container max-w-6xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-2">AI Assistant</h1>
      <p className="text-muted-foreground mb-6">
        Intelligent assistant for inventory management and location tracking
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-220px)] flex flex-col shadow-lg">
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                ISS Inventory Assistant
              </CardTitle>
              <CardDescription>
                Ask questions about inventory items, locations, and status
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col overflow-hidden pt-4">
              <ScrollArea className="flex-1 pr-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`
                          rounded-lg px-4 py-3 shadow-sm max-w-[80%]
                          ${message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-tr-none' 
                            : 'bg-card border rounded-tl-none'}
                        `}
                      >
                        {message.isLoading ? (
                          <div className="flex items-center h-5 space-x-1">
                            <div className="dot-typing"></div>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="flex items-start gap-2">
                              {message.sender === 'assistant' && (
                                <Sparkles size={16} className="text-primary mt-1 shrink-0" />
                              )}
                              <div>
                                {message.text}
                              </div>
                            </div>
                            
                            {message.itemData && (
                              <div className="bg-muted/40 backdrop-blur p-3 rounded-md mt-2 space-y-2 text-sm">
                                <div className="font-medium">{message.itemData.name}</div>
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                  <div className="flex items-center gap-1">
                                    <Map size={14} className="text-muted-foreground" />
                                    <span>Location: {message.itemData.location}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <CircleDot size={14} className="text-muted-foreground" />
                                    <span>Condition: {message.itemData.condition}</span>
                                  </div>
                                  {message.itemData.expiryDate !== 'N/A' && (
                                    <div className="flex items-center gap-1">
                                      <Calendar size={14} className="text-muted-foreground" />
                                      <span>Expires: {message.itemData.expiryDate}</span>
                                    </div>
                                  )}
                                </div>
                                
                                {message.isLocationData && (
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    className="w-full mt-2 text-xs flex items-center gap-1"
                                    onClick={() => {
                                      window.location.href = `/storage-map?highlight=${message.itemData.coordinates.module}-${message.itemData.coordinates.section}-${message.itemData.coordinates.cabinet}`;
                                    }}
                                  >
                                    <LayoutDashboard size={12} />
                                    View on Storage Map
                                  </Button>
                                )}
                              </div>
                            )}
                            
                            <div className="text-right text-xs opacity-70">
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="pt-4 flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask about inventory items or locations..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                >
                  <ArrowUpCircle size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="pinned" className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="pinned">
                    <PinIcon size={14} className="mr-2" />
                    Pinned
                  </TabsTrigger>
                  <TabsTrigger value="recent">
                    <RefreshCw size={14} className="mr-2" />
                    Recent
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="pinned" className="space-y-2">
                  {pinnedQueries.map((query, index) => (
                    <Button 
                      key={index} 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2 px-3"
                      onClick={() => handlePinnedQuery(query)}
                    >
                      <Search size={14} className="mr-2 shrink-0" />
                      <span className="truncate">{query}</span>
                    </Button>
                  ))}
                </TabsContent>
                
                <TabsContent value="recent" className="space-y-2">
                  {recentQueries.map((query) => (
                    <Button 
                      key={query.id} 
                      variant="outline" 
                      className="w-full justify-start text-left h-auto py-2 px-3"
                      onClick={() => handleRecentQuery(query.text)}
                    >
                      <div className="flex flex-col items-start">
                        <span className="truncate w-full">{query.text}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(query.timestamp)}
                        </span>
                      </div>
                    </Button>
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Assistant Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-2">
                <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <PackageSearch size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Item Location</h3>
                    <p className="text-xs text-muted-foreground">Find any inventory item with detailed location data</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <FileText size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Status Reports</h3>
                    <p className="text-xs text-muted-foreground">Get detailed reports on inventory statuses</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Cpu size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Predictive Analysis</h3>
                    <p className="text-xs text-muted-foreground">AI predictions for inventory needs</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Rocket size={16} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Mission Support</h3>
                    <p className="text-xs text-muted-foreground">Contextual assistance for current mission tasks</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <style jsx>{`
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

export default AIAssistant;
