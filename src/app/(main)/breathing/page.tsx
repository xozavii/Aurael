'use client';

import BreathingExercise from "@/components/breathing/breathing-exercise";
import { LotusIcon } from "@/components/icons/lotus-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FloatingHearts = () => {
    const hearts = Array.from({ length: 15 });
  
    return (
      <div className="floating-hearts-container">
        {hearts.map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 10 + 25}s`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`, 
            }}
          >
            &#x2764; {/* HTML heart entity */}
          </div>
        ))}
      </div>
    );
  };


export default function BreathingPage() {
    return (
        <div className="container mx-auto h-full flex flex-col items-center justify-center gap-8 relative overflow-hidden">
            <FloatingHearts />
            <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-white/20 z-10 with-left-shadow">
                <CardHeader className="text-center items-center">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
                        <LotusIcon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl mt-4">
                        Guided Breathing
                    </CardTitle>
                    <CardDescription>
                        Follow the guide to calm your mind and body.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BreathingExercise />
                </CardContent>
            </Card>
        </div>
    );
}
