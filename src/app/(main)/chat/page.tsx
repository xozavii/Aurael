'use client';

import { useEffect, useState } from 'react';
import ChatInterface from '@/components/chatbot/chat-interface';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const [user, setUser] = useState<{name: string, email: string, dob: string} | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('aurael-user');
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
    <div className="h-full flex flex-col gap-8">
      <div className="flex-grow">
        <ChatInterface user={user} />
      </div>
    </div>
  );
}
