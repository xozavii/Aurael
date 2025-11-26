'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type BreathingPattern = {
  name: string;
  cycle: { text: string; duration: number }[];
};

const patterns: BreathingPattern[] = [
  { name: '4-7-8 Breathing', cycle: [{ text: 'Breathe In', duration: 4000 }, { text: 'Hold', duration: 7000 }, { text: 'Breathe Out', duration: 8000 }] },
  { name: 'Box Breathing', cycle: [{ text: 'Breathe In', duration: 4000 }, { text: 'Hold', duration: 4000 }, { text: 'Breathe Out', duration: 4000 }, { text: 'Hold', duration: 4000 }] },
  { name: 'Calm Breathing', cycle: [{ text: 'Breathe In', duration: 3000 }, { text: 'Breathe Out', duration: 6000 }] },
  { name: 'Deep Recharge', cycle: [{ text: 'Breathe In', duration: 5000 }, { text: 'Hold', duration: 2000 }, { text: 'Breathe Out', duration: 5000 }] },
];

export default function BreathingExercise() {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(patterns[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [time, setTime] = useState(0);

  const totalCycleTime = selectedPattern.cycle.reduce((sum, item) => sum + item.duration, 0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 100;
          if (newTime >= totalCycleTime) {
            setPhaseIndex(0);
            return 0;
          }

          let accumulatedDuration = 0;
          for (let i = 0; i < selectedPattern.cycle.length; i++) {
            accumulatedDuration += selectedPattern.cycle[i].duration;
            if (newTime < accumulatedDuration) {
              setPhaseIndex(i);
              break;
            }
          }
          return newTime;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning, totalCycleTime, selectedPattern]);

  useEffect(() => {
    handleReset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPattern]);

  const handleToggle = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setPhaseIndex(0);
    setTime(0);
  };
  
  const handlePatternChange = (patternName: string) => {
    const newPattern = patterns.find(p => p.name === patternName);
    if (newPattern) {
        setSelectedPattern(newPattern);
    }
  }

  const getAnimationKeyframes = () => {
    const cycle = selectedPattern.cycle;
    const totalDuration = totalCycleTime;
    let keyframes = '@keyframes breathing-animation {\n';
    let currentTime = 0;
    
    keyframes += `  0% { transform: scale(0.6); box-shadow: 0 0 0 0 hsl(var(--primary) / 0.4); }\n`;

    for (let i = 0; i < cycle.length; i++) {
      const phase = cycle[i];
      const startPercentage = (currentTime / totalDuration) * 100;
      currentTime += phase.duration;
      const endPercentage = (currentTime / totalDuration) * 100;
      
      let scale = 1;
      if (phase.text.includes('Out')) {
        scale = 0.6;
      } else if (phase.text.includes('In')) {
        scale = 1;
      }
      
      if (i === 0) { // First inhale
        keyframes += `  ${endPercentage}% { transform: scale(1); box-shadow: 0 0 40px 10px hsl(var(--primary) / 0.1); }\n`;
      } else {
        if(startPercentage !== endPercentage){
           keyframes += `  ${startPercentage}%, ${endPercentage}% { transform: scale(${scale}); }\n`;
        } else {
            keyframes += `  ${endPercentage}% { transform: scale(${scale}); }\n`;
        }
      }
    }

    keyframes += `  100% { transform: scale(0.6); box-shadow: 0 0 0 0 hsl(var(--primary) / 0.4); }\n`;
    keyframes += '}';
    return keyframes;
  };

  const animationStyle = {
    animationName: isRunning ? 'breathing-animation' : 'none',
    animationDuration: `${totalCycleTime / 1000}s`,
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <style>{getAnimationKeyframes()}</style>
      <Select value={selectedPattern.name} onValueChange={handlePatternChange}>
        <SelectTrigger className="w-[280px] text-base h-11 bg-card/80">
            <SelectValue placeholder="Choose a breathing pattern" />
        </SelectTrigger>
        <SelectContent>
            {patterns.map(p => (
                <SelectItem key={p.name} value={p.name} className="text-base">{p.name}</SelectItem>
            ))}
        </SelectContent>
      </Select>

      <div className="relative w-48 h-48 flex items-center justify-center my-4">
        <div 
            className="w-full h-full rounded-full bg-primary transition-all duration-1000"
            style={animationStyle}
        />
        <p className="absolute text-2xl font-semibold z-10 text-primary-foreground">{selectedPattern.cycle[phaseIndex].text}</p>
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
