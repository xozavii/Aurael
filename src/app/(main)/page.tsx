'use client';

import { useEffect, useState } from 'react';
import AffirmationCard from '@/components/chatbot/affirmation-card';
import ChatInterface from '@/components/chatbot/chat-interface';
import { useRouter } from 'next/navigation';
import DashboardCard from '@/components/dashboard/dashboard-card';
import { BotMessageSquare, BookHeart, ClipboardCheck, Wind, ListMusic } from 'lucide-react';

const dashboardItems = [
  { href: '/chat', icon: BotMessageSquare, label: 'Chat', description: "Talk with Ceevi, your AI companion." },
  { href: '/journal', icon: BookHeart, label: 'Journal', description: "Reflect on your thoughts and feelings." },
  { href: '/habits', icon: ClipboardCheck, label: 'Habits', description: "Track and build positive routines." },
  { href: '/breathing', icon: Wind, label: 'Breathing', description: "Find calm with guided exercises." },
  { href: '/playlists', icon: ListMusic, label: 'Playlists', description: "Listen to music for your mood." },
];


export default function ChatPage() {
  const [user, setUser] = useState<{name: string, email: string, dob: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('ceevi-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) {
    // You can add a loader here
    return null;
  }
  
  return (
     <div className="h-full flex flex-col items-center justify-center gap-8">
        <div className="text-center">
            <h1 className="text-5xl font-headline text-primary">Welcome back, {user.name.split(' ')[0]}!</h1>
            <p className="text-foreground/80 mt-2 text-lg">What would you like to do today? 💖</p>
        </div>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <DashboardCard
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              description={item.description}
              className={index === 0 ? 'md:col-start-1' : index === 1 ? 'md:col-start-2' : index === 2 ? 'md:col-start-3' : index === 3 ? 'md:col-start-1 md:col-span-1' : 'md:col-start-2 md:col-span-2'}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
