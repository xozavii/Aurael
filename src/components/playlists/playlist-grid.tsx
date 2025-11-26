'use client';

import type { Playlist } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PlaylistSkeleton } from './playlist-skeleton';

const mockPlaylists: Omit<Playlist, 'imageUrl' | 'imageHint'>[] = [
  { id: 'calm-playlist', title: 'Calm Reflections', description: 'Gentle soundscapes for peace and focus.' },
  { id: 'upbeat-playlist', title: 'Sunny Disposition', description: 'Feel-good tracks to lift your spirits.' },
  { id: 'focus-playlist', title: 'Deep Focus', description: 'Instrumental beats to help you concentrate.' },
  { id: 'melancholy-playlist', title: 'Rainy Day Feelings', description: 'Soothing tunes for contemplative moments.' },
  { id: 'energetic-playlist', title: 'Morning Boost', description: 'High-energy songs to start your day right.' },
  { id: 'romantic-playlist', title: 'Heartfelt Melodies', description: 'Sweet and romantic background music.' },
];

const playlistsData: Playlist[] = mockPlaylists.map(p => {
    const imageData = PlaceHolderImages.find(img => img.id === p.id);
    return {
        ...p,
        imageUrl: imageData?.imageUrl || 'https://picsum.photos/seed/default/600/600',
        imageHint: imageData?.imageHint || 'music'
    }
})

export default function PlaylistGrid() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setPlaylists(playlistsData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <PlaylistSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {playlists.map((playlist) => (
        <Link href="#" key={playlist.id} className="group block">
          <Card className="overflow-hidden h-full bg-background/50 transition-all duration-300 group-hover:shadow-2xl group-hover:border-primary/50 group-hover:-translate-y-1 with-left-shadow">
            <div className="relative aspect-square">
              <Image
                src={playlist.imageUrl}
                alt={playlist.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={playlist.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-2 right-2 p-2 bg-black/30 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-xl">{playlist.title}</CardTitle>
              <CardDescription>{playlist.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
