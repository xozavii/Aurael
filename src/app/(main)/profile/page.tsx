'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Heart, User, Music, AlertTriangle, CheckCircle, Wand2, Loader, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { generateAvatar } from '@/lib/actions';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

export default function ProfilePage() {
  const [user, setUser] = useState<{ name: string; email: string; dob: string; avatarUrl?: string; } | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  const [generatedAvatar, setGeneratedAvatar] = useState<string | null>(null);
  const [isGeneratingAvatar, setIsGeneratingAvatar] = useState(false);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isSpotifyConnected, setIsSpotifyConnected] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('aurael-user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setName(parsedUser.name);
      setEmail(parsedUser.email);
      setAvatarUrl(parsedUser.avatarUrl);
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleSaveChanges = () => {
    if (user) {
      const updatedUser = { ...user, name, email, avatarUrl };
      localStorage.setItem('aurael-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast({
        title: 'Saved successfully',
        description: 'Your profile has been updated.',
        variant: 'default',
      });
    }
  };

  const handleGenerateAvatar = async () => {
    setIsGeneratingAvatar(true);
    setGeneratedAvatar(null);
    setIsAvatarDialogOpen(true);
    const result = await generateAvatar();
    if (result.imageUrl) {
        setGeneratedAvatar(result.imageUrl);
    } else {
        toast({
            title: 'Error Generating Avatar',
            description: result.error || 'Could not generate a new avatar. Please try again.',
            variant: 'destructive',
        });
        setIsAvatarDialogOpen(false);
    }
    setIsGeneratingAvatar(false);
  };
  
  const handleSaveAvatar = () => {
    if (generatedAvatar) {
      setAvatarUrl(generatedAvatar);
      toast({
          title: 'Avatar Saved! 🧸',
          description: 'Your new cute teddy avatar is ready.',
      });
    }
    setIsAvatarDialogOpen(false);
    setGeneratedAvatar(null);
  };

  const handleNetworkError = () => {
    toast({
      title: 'Network error',
      description: 'Please try again.',
      variant: 'destructive',
    });
  };

  const handleSpotifyConnect = () => {
    setIsSpotifyConnected(true);
    toast({
      title: 'Spotify connected',
      description: 'You can now enjoy personalized playlists.',
    });
  };
  
  if (!user) {
    return null; // or a loading spinner
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };

  return (
    <div className="container mx-auto max-w-4xl">
      <Card className="bg-card/60 backdrop-blur-lg border-white/20 with-left-shadow">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center gap-2">
            <User className="w-8 h-8 text-primary" />
            Your Profile
          </CardTitle>
          <CardDescription>
            Manage your account settings and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="relative group">
                <Avatar className="w-24 h-24 text-3xl">
                     <AvatarImage src={avatarUrl} alt="User avatar" />
                    <AvatarFallback className="bg-primary/20 text-primary font-headline">
                        {getInitials(user.name)}
                    </AvatarFallback>
                </Avatar>
                <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg group-hover:animate-heartbeat"/>
            </div>
            <div className='space-y-1'>
                <h2 className='text-3xl font-bold'>{name}</h2>
                <p className='text-muted-foreground'>{email}</p>
                 <Button onClick={handleGenerateAvatar}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Generate Avatar
                </Button>
            </div>
          </div>
          
          <Separator />

          <div className="space-y-4">
              <h3 className='text-xl font-semibold'>Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-background/80" />
                  </div>
                  <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/80" />
                  </div>
              </div>
          </div>

          <Separator />
          
          <div className="space-y-4">
            <h3 className='text-xl font-semibold'>Integrations</h3>
            <Card className="bg-background/50">
                <CardContent className="p-4 flex items-center justify-between">
                    <div className='flex items-center gap-3'>
                        <Music className='w-6 h-6 text-green-500' />
                        <div>
                            <p className='font-semibold'>Spotify</p>
                            <p className='text-sm text-muted-foreground'>Connect to get personalized music.</p>
                        </div>
                    </div>
                    {isSpotifyConnected ? (
                        <div className='flex items-center gap-2 text-green-500'>
                           <CheckCircle className='w-5 h-5'/>
                           <span className='text-sm font-medium'>Connected</span>
                        </div>
                    ) : (
                        <Button onClick={handleSpotifyConnect}>Connect</Button>
                    )}
                </CardContent>
            </Card>
          </div>

          <Separator />
          
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleSaveChanges}>Save Changes</Button>
            <Button variant="destructive" onClick={handleNetworkError}>Simulate Network Error</Button>
          </div>

        </CardContent>
      </Card>
      
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent className="max-w-md bg-card/80 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl">Your New Avatar</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center items-center p-8 aspect-square">
            {isGeneratingAvatar ? (
              <div className="flex flex-col items-center gap-4">
                <Loader className="h-16 w-16 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your teddy...</p>
              </div>
            ) : generatedAvatar ? (
                <div className='relative w-64 h-64'>
                    <Image src={generatedAvatar} alt="Generated Avatar" fill className="rounded-full object-cover shadow-2xl shadow-primary/20" />
                </div>
            ) : null}
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveAvatar} disabled={isGeneratingAvatar || !generatedAvatar}>
              Save Avatar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
