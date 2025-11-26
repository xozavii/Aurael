'use client';
import LoginForm from '@/components/auth/login-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuraelWaveIcon } from '@/components/icons/aurael-wave-icon';

const FloatingHearts = () => {
    const hearts = Array.from({ length: 25 });
  
    return (
      <div className="floating-hearts-container">
        {hearts.map((_, i) => (
          <div
            key={i}
            className="floating-heart"
            style={{
              left: `${Math.random() * 100}vw`,
              animationDuration: `${Math.random() * 15 + 20}s`, // Slower, more varied speeds
              animationDelay: `${Math.random() * 20}s`, // Staggered start times
              fontSize: `${Math.random() * 1.25 + 0.5}rem`, 
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
            the wave of aura <AuraelWaveIcon className="w-16 h-16" />
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
