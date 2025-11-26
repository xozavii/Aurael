'use client';
import LoginForm from '@/components/auth/login-form';
import { ThemeToggle } from '@/components/theme-toggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
              animationDuration: `${Math.random() * 10 + 25}s`, // 25s to 35s
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`, // 0.5rem to 2rem
            }}
          >
            &#x2764; {/* HTML heart entity */}
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
          <CardTitle className="font-headline text-6xl text-primary">Ceevi</CardTitle>
          <CardDescription className="text-foreground/80 mt-2">
            the wave of aura ✨
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
