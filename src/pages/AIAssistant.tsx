
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from '@/context/UserContext';
import { CircleUserRound, BrainCircuit } from "lucide-react";

const AIAssistant = () => {
  const { toast } = useToast();
  const { userName, profileImage } = useUser();
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "ai" }
  ]);
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response (replace with actual API call later)
    setTimeout(() => {
      const aiResponse = {
        text: generateAIResponse(input),
        sender: "ai"
      };
      setMessages([...newMessages, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string) => {
    // Placeholder AI response logic
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("inventory")) {
      return "I can help you manage your inventory. What would you like to do?";
    } else if (lowerCaseMessage.includes("location")) {
      return "I can assist you with finding items or locations. Please specify what you are looking for.";
    } else if (lowerCaseMessage.includes("guidelines")) {
      return "I can provide guidelines on various ISS protocols. Which guidelines are you interested in?";
    } else {
      return "I'm here to assist you with inventory management, location services, and guidelines. How can I help?";
    }
  };

  useEffect(() => {
    // Scroll to bottom on new message
    chatContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            <BrainCircuit className="mr-2 h-6 w-6 inline-block" />
            ISS Assistant
          </CardTitle>
          <CardDescription>Your AI assistant for managing the International Space Station</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-[400px] overflow-y-auto p-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={message.sender === "ai" ? "chat-message-ai" : "chat-message-user"}
                >
                  {message.sender === "ai" ? (
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-7 w-7">
                        <AvatarImage src="/astronaut.png" alt="AI Assistant" />
                        <AvatarFallback><CircleUserRound /></AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">ISS Assistant</p>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start space-x-2">
                      <Avatar className="h-7 w-7">
                        {profileImage ? (
                          <AvatarImage src={profileImage} alt={userName} />
                        ) : (
                          <AvatarFallback><CircleUserRound /></AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className="font-semibold">{userName}</p>
                        <p>{message.text}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatContainerRef} /> {/* Scroll anchor */}
            </div>

            <div className="flex space-x-2">
              <Input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
              />
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <style>
        {`
        .chat-message-ai {
          background-color: rgba(59, 130, 246, 0.1);
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .chat-message-user {
          background-color: rgba(75, 85, 99, 0.1);
          border-radius: 0.5rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        `}
      </style>
    </div>
  );
};

export default AIAssistant;
