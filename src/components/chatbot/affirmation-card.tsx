'use client';

import { useState, useEffect } from 'react';
import { Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAffirmation } from '@/lib/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';

const moods = ["Happy", "Sad", "Anxious", "Calm", "Tired", "Energetic", "Stressed"];

export default function AffirmationCard() {
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedMood, setSelectedMood] = useState('Calm');

  const fetchAffirmation = async (mood: string) => {
    setLoading(true);
    const result = await getAffirmation(mood);
    if (result.affirmation) {
      setAffirmation(result.affirmation);
    } else {
      setAffirmation("Today is a new opportunity to grow and shine.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAffirmation(selectedMood);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMoodChange = (mood: string) => {
    setSelectedMood(mood);
    fetchAffirmation(mood);
  }

  return (
    <div className="w-full max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-4 mb-6">
            <Select value={selectedMood} onValueChange={handleMoodChange}>
                <SelectTrigger className="w-[180px] text-base h-11 bg-card/80">
                    <SelectValue placeholder="How are you feeling?" />
                </SelectTrigger>
                <SelectContent>
                    {moods.map(mood => (
                        <SelectItem key={mood} value={mood} className="text-base">{mood}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button size="lg" onClick={() => fetchAffirmation(selectedMood)} disabled={loading}>
              <Wand2 className="mr-2 h-5 w-5"/>
              Get New Affirmation
            </Button>
        </div>
      
        {loading ? (
           <div className="flex flex-col items-center space-y-2 py-4">
            <Skeleton className="h-6 w-3/4 shimmer" />
            <Skeleton className="h-6 w-1/2 shimmer" />
          </div>
        ) : (
          <p className="text-2xl font-medium text-center py-4 text-foreground/80 italic">
            &ldquo;{affirmation}&rdquo;
          </p>
        )}
    </div>
  );
}
