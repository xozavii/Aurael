'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader, Wand2, BookText } from 'lucide-react';
import { getJournalSummary, getJournalReframe } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Separator } from '../ui/separator';

export default function JournalEditor() {
  const [entry, setEntry] = useState('');
  const [isLoading, setIsLoading] = useState<'summary' | 'reframe' | null>(null);
  const [aiResult, setAiResult] = useState<{title: string, content: string} | null>(null);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (!entry.trim()) {
      toast({ title: 'Please write something first.', variant: 'destructive' });
      return;
    }
    setIsLoading('summary');
    setAiResult(null);
    const result = await getJournalSummary(entry);
    if (result.summary) {
      setAiResult({title: "Summary", content: result.summary});
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
    setIsLoading(null);
  };

  const handleReframe = async () => {
    if (!entry.trim()) {
      toast({ title: 'Please write something first.', variant: 'destructive' });
      return;
    }
    setIsLoading('reframe');
    setAiResult(null);
    const result = await getJournalReframe(entry);
    if (result.reframed) {
      setAiResult({title: "A New Perspective", content: result.reframed});
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
    setIsLoading(null);
  };

  return (
    <div className="space-y-6">
      <Textarea
        placeholder="What's on your mind...?"
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        className="min-h-[250px] bg-background/80 text-base"
      />
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSummarize} disabled={!!isLoading}>
          {isLoading === 'summary' ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BookText className="mr-2 h-4 w-4" />
          )}
          Summarize
        </Button>
        <Button onClick={handleReframe} disabled={!!isLoading}>
          {isLoading === 'reframe' ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Reframe Thoughts
        </Button>
      </div>
      
      {aiResult && (
        <>
            <Separator className="my-6 bg-white/20"/>
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary-foreground">{aiResult.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{aiResult.content}</p>
                </CardContent>
            </Card>
        </>
      )}
    </div>
  );
}
