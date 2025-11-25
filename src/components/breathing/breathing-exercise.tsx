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
      <div 
        className="relative w-48 h-48 flex items-center justify-center transition-transform duration-1000"
        style={animationStyle}
      >
        <div 
            className="w-full h-full rounded-full bg-primary"
        />
        <p className="absolute text-2xl font-semibold z-10 text-primary-foreground">{breathingCycle[phase].text}</p>
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
