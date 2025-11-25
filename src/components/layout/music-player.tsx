'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
        // Fallback ambient music. User should replace with Spotify track or their own.
        // For example: '/ambient-music.mp3'
        const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/11/22/audio_34b9a6b6ce.mp3'); 
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
        audioRef.current.muted = !audioRef.current.muted;
        setIsMuted(audioRef.current.muted);
        if (!audioRef.current.muted && audioRef.current.paused) {
            audioRef.current.play().catch(e => console.error("Audio play failed:", e));
        }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMute}
        className="rounded-full bg-card/60 backdrop-blur-md hover:bg-card/80 w-12 h-12"
        aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      >
        {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6 text-primary" />}
      </Button>
    </div>
  );
}
