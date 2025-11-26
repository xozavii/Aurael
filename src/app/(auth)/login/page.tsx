'use client';
import LoginForm from '@/components/auth/login-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuraelWaveIcon } from '@/components/icons/aurael-wave-icon';

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
            &#x2764;
          </div>
        ))}
      </div>
    );
};

const StaticHearts = () => {
    const hearts = [
        { top: '15%', left: '10%', size: '1.5rem', duration: '3s' },
        { top: '25%', left: '85%', size: '1rem', duration: '4s' },
        { top: '75%', left: '12%', size: '1.2rem', duration: '3.5s' },
        { top: '85%', left: '90%', size: '1.8rem', duration: '5s' },
        { top: '50%', left: '50%', size: '2.5rem', duration: '2.5s' },
    ];
  
    return (
      <div className="static-hearts-container">
        {hearts.map((heart, i) => (
          <div
            key={i}
            className="pulsing-heart"
            style={{
              top: heart.top,
              left: heart.left,
              fontSize: heart.size,
              animationDuration: heart.duration,
            }}
          >
            &#x2764;
          </div>
        ))}
      </div>
    );
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
        <div className="absolute top-4 right-4 z-20">
            <ThemeToggle />
        </div>
       <StaticHearts />
       <FloatingHearts />
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-white/20 z-10">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-8xl text-primary">Aurael</CardTitle>
          <CardDescription className="text-foreground/80 mt-2 flex items-center justify-center gap-2">
            the wave of aura <AuraelWaveIcon className="w-8 h-8" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
