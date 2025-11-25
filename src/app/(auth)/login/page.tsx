import LoginForm from '@/components/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center p-4 overflow-hidden">
       <Heart 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vh] text-primary opacity-20 blur-3xl animate-heartbeat"
      />
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-white/20 z-10">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-6xl text-primary">Aurael</CardTitle>
          <CardDescription className="text-foreground/80">
            Welcome to your personal space for reflection and growth.
            <br />
            Let's get to know you. ✨
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
