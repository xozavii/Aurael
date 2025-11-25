'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';

const breathingCycle = [
  { text: 'Breathe In', duration: 4000 },
  { text: 'Hold', duration: 7000 },
  { text: 'Breathe Out', duration: 8000 },
];

const totalCycleTime = breathingCycle.reduce((sum, item) => sum + item.duration, 0);

export default function BreathingExercise() {
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 100;
          if (newTime >= totalCycleTime) {
            setPhase(0);
            return 0;
          }

          if (newTime >= 4000 && newTime < 11000) setPhase(1);
          else if (newTime >= 11000) setPhase(2);
          else setPhase(0);

          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhase(0);
    setTime(0);
  };

  const animationStyle = {
    animationName: isRunning ? 'breathing-animation' : 'none',
    animationDuration: `${totalCycleTime / 1000}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  };

  return (
    <div className="flex flex-col items-center gap-8 py-8">
      <style>{`
        @keyframes breathing-animation {
          0% { transform: scale(0.6); }
          ${(4000 / totalCycleTime) * 100}% { transform: scale(1); }
          ${(11000 / totalCycleTime) * 100}% { transform: scale(1); }
          ${(19000 / totalCycleTime) * 100}% { transform: scale(0.6); }
          100% { transform: scale(0.6); }
        }
      `}</style>
      <div className="relative w-48 h-48 flex items-center justify-center">
        <div 
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000"
          style={animationStyle}
        >
          <svg
            className="w-full h-full text-primary/30"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div 
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-1000"
          style={{...animationStyle, animationDelay: '50ms'}}
        >
           <svg
            className="w-full h-full text-primary/20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <p className="text-2xl font-semibold z-10 text-primary-foreground">{breathingCycle[phase].text}</p>
      </div>

      <div className="flex gap-4">
        <Button onClick={handleToggle} size="lg" className="w-24">
          {isRunning ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleReset} size="lg" variant="outline" className="w-24">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
