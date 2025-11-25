import LoginForm from '@/components/auth/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-white/20">
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
