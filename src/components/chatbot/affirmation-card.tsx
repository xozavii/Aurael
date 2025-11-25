'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Loader, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAffirmation } from '@/lib/actions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  }, [selectedMood]);

  return (
    <Card className="bg-card/60 backdrop-blur-lg border-white/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-headline font-semibold flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Your Daily Affirmation
        </CardTitle>
        <div className="flex items-center gap-2">
            <Select value={selectedMood} onValueChange={setSelectedMood}>
                <SelectTrigger className="w-[120px] text-xs h-8 bg-card/80">
                    <SelectValue placeholder="Your mood" />
                </SelectTrigger>
                <SelectContent>
                    {moods.map(mood => (
                        <SelectItem key={mood} value={mood} className="text-xs">{mood}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button size="icon" variant="ghost" onClick={() => fetchAffirmation(selectedMood)} disabled={loading} className="h-8 w-8">
              <Wand2 className="w-4 h-4"/>
            </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader className="w-4 h-4 animate-spin" />
            <span>Generating your personal affirmation...</span>
          </div>
        ) : (
          <p className="text-xl font-medium text-center py-4 text-foreground/80 italic">
            &ldquo;{affirmation}&rdquo;
          </p>
        )}
      </CardContent>
    </Card>
  );
}
