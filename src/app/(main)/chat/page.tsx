'use client';

import { useEffect, useState } from 'react';
import ChatInterface from '@/components/chatbot/chat-interface';
import { useRouter } from 'next/navigation';
import CeeviMascot from '@/components/chatbot/ceevi-mascot';

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
    <div className="h-full flex flex-col md:flex-row items-center justify-center gap-8">
      <div className="md:flex-1 md:order-2 max-w-2xl w-full">
        <ChatInterface user={user} />
      </div>
      <div className="md:flex-1 md:order-1 flex justify-center">
        <CeeviMascot />
      </div>
    </div>
  );
}
