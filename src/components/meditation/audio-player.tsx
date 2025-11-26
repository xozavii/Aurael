'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';

interface AudioPlayerProps {
  src: string;
  title: string;
  onClose?: () => void;
}

const formatTime = (time: number) => {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function AudioPlayer({ src, title, onClose }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      // Create a new audio object if src changes
      audio.src = src;

      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      }
      const setAudioTime = () => setCurrentTime(audio.currentTime);

      const handlePlaybackEnded = () => setIsPlaying(false);

      audio.addEventListener('loadeddata', setAudioData);
      audio.addEventListener('timeupdate', setAudioTime);
      audio.addEventListener('ended', handlePlaybackEnded);
      
      // Auto-play when a new src is provided
      if (src) {
        audio.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio play failed", e));
      }

      return () => {
        audio.removeEventListener('loadeddata', setAudioData);
        audio.removeEventListener('timeupdate', setAudioTime);
        audio.removeEventListener('ended', handlePlaybackEnded);
      }
    }
  }, [src]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  return (
    <Card className="bg-card/80 backdrop-blur-xl border-primary/20 shadow-2xl shadow-primary/20 with-left-shadow animate-in slide-in-from-bottom-10 duration-500">
      <CardContent className="p-4 flex items-center gap-4">
        <audio ref={audioRef} />
        <Button onClick={togglePlayPause} size="icon" className="rounded-full h-12 w-12 flex-shrink-0">
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </Button>
        <div className="flex-grow space-y-1">
            <p className="font-semibold text-sm truncate">{title}</p>
            <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-10">{formatTime(currentTime)}</span>
                <Slider
                    value={[currentTime]}
                    max={duration || 1}
                    onValueChange={handleSeek}
                />
                <span className="text-xs text-muted-foreground w-10">{formatTime(duration)}</span>
            </div>
        </div>
        {onClose && (
            <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                <X className="w-5 h-5" />
            </Button>
        )}
      </CardContent>
    </Card>
  );
}
