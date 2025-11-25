'use client';

import type { Message } from '@/lib/types';
import { getChatResponse } from '@/lib/actions';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, Loader } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';

export default function ChatInterface() {
  const [age, setAge] = useState<number | null>(null);
  const [tempAge, setTempAge] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content: 'Hey there! Before we start, how old are you? This helps me vibe with you better.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleAgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ageNum = parseInt(tempAge, 10);
    if (ageNum > 0 && ageNum < 120) {
      setAge(ageNum);
      setMessages([
        {
          id: '2',
          role: 'system',
          content: "Awesome, thanks! What's on your mind today?",
        },
      ]);
    } else {
      toast({
        title: 'Invalid Age',
        description: 'Please enter a valid age to continue.',
        variant: 'destructive',
      });
    }
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getChatResponse([...messages, userMessage], age!);
    
    if (response.error) {
      toast({
        title: 'Error',
        description: response.error,
        variant: 'destructive',
      });
       const aiErrorMessage: Message = {
        id: Date.now().toString() + 'error',
        role: 'model',
        content: response.error,
       };
       setMessages(prev => [...prev, aiErrorMessage]);
    } else if (response.response) {
       const aiMessage: Message = {
        id: Date.now().toString() + 'ai',
        role: 'model',
        content: response.response,
       };
       setMessages(prev => [...prev, aiMessage]);
    }
    setIsLoading(false);
  };
  
  if (!age) {
    return (
      <Card className="max-w-md mx-auto bg-card/60 backdrop-blur-lg border-white/20">
        <CardHeader>
          <h2 className="text-xl font-headline text-center">Welcome to Aurael</h2>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground mb-4">
            Hey there! Before we start, how old are you? This helps me vibe with you better.
          </p>
          <form onSubmit={handleAgeSubmit} className="flex gap-2">
            <Input
              type="number"
              value={tempAge}
              onChange={(e) => setTempAge(e.target.value)}
              placeholder="Enter your age"
              className="bg-background/80"
              required
            />
            <Button type="submit">Let's Go</Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col bg-card/60 backdrop-blur-lg border-white/20 max-h-[65vh]">
      <CardHeader className="border-b border-white/10 p-4">
        <h2 className="text-lg font-headline font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Aurael AI
        </h2>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn('flex items-end gap-2', {
                  'justify-end': msg.role === 'user',
                })}
              >
                {msg.role !== 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      <Sparkles className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2',
                    msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-secondary rounded-bl-none',
                    {'text-muted-foreground italic': msg.role === 'system'}
                  )}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/20 text-primary">
                    <Sparkles className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-secondary rounded-2xl rounded-bl-none px-4 py-2">
                  <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t border-white/10">
        <form onSubmit={handleChatSubmit} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="bg-background/80"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
