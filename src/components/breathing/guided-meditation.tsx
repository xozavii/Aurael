'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader, Play, Sparkles } from 'lucide-react';
import { getGuidedMeditation } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';

export default function GuidedMeditation() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerateMeditation = async () => {
    setIsLoading(true);
    setAudioUrl(null);

    const result = await getGuidedMeditation('a short 30 second meditation for stress relief');
    
    if (result.error) {
      toast({
        title: 'Error Generating Meditation',
        description: result.error,
        variant: 'destructive',
      });
    } else if (result.audioUrl) {
      setAudioUrl(result.audioUrl);
      toast({
        title: 'Meditation Ready',
        description: 'Press play to begin your moment of calm. ✨',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <Button onClick={handleGenerateMeditation} disabled={isLoading} size="lg">
        {isLoading ? (
          <Loader className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-5 w-5" />
        )}
        Generate Meditation
      </Button>

      {audioUrl && !isLoading && (
        <audio controls src={audioUrl} className="w-full rounded-full">
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
}
