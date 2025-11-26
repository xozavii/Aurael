'use client';

import type { Message } from '@/lib/types';
import { getChatResponse } from '@/lib/actions';
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Sparkles } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { differenceInYears } from 'date-fns';
import { ChatSkeleton } from './chat-skeleton';

interface ChatInterfaceProps {
  user: {
    name: string;
    dob: string;
    email: string;
  };
}

const addPoints = (points: number) => {
    const storedUser = localStorage.getItem('aurael-user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        const currentPoints = user.auraPoints || 0;
        user.auraPoints = currentPoints + points;
        localStorage.setItem('aurael-user', JSON.stringify(user));
    }
}

export default function ChatInterface({ user }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const age = differenceInYears(new Date(), new Date(user.dob));

  useEffect(() => {
    // Simulate initial message loading
    setTimeout(() => {
        setMessages([
          {
            id: '1',
            role: 'system',
            content: `Hey ${user.name}! What's on your mind today? ✨ You get 1 point for every message!`,
          },
        ]);
        setInitialLoading(false);
    }, 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    addPoints(1);

    const response = await getChatResponse([...messages, userMessage], age);
    
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

  return (
    <Card className="h-full flex flex-col bg-card/60 backdrop-blur-lg border-white/20 max-h-[75vh] with-left-shadow">
      <CardHeader className="border-b border-white/10 p-4">
        <h2 className="text-lg font-headline font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Ceevi AI
        </h2>
      </CardHeader>
      <CardContent className="flex-grow p-0 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {initialLoading ? (
              <ChatSkeleton />
            ) : (
              <>
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
                {isLoading && <ChatSkeleton isResponseLoading />}
              </>
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
            disabled={isLoading || initialLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || initialLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
