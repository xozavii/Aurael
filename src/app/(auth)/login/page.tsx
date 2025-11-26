'use client';
import LoginForm from '@/components/auth/login-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuraelWaveIcon } from '@/components/icons/aurael-wave-icon';

const FloatingHearts = () => {
    const hearts = Array.from({ length: 20 }); // Increased count for a fuller effect
  
    return (
      <div className="floating-hearts-container">
        {hearts.map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}vw`,
              // Start some hearts from different vertical positions
              bottom: `${Math.random() * 100 - 5}vh`, 
              animationDuration: `${Math.random() * 10 + 25}s`,
              animationDelay: `${Math.random() * 15}s`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`, 
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
