'use client';

import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader, Wand2, BookText, Save, Trash2, ChevronDown, Paperclip } from 'lucide-react';
import { getJournalSummary, getJournalReframe } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Separator } from '../ui/separator';
import type { JournalEntry } from '@/lib/types';
import { format } from 'date-fns';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible';
import { JournalSkeleton } from './journal-skeleton';
import { AiResultSkeleton } from './ai-result-skeleton';
import Image from 'next/image';

const addPoints = (points: number) => {
    const storedUser = localStorage.getItem('aurael-user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        const currentPoints = user.auraPoints || 0;
        user.auraPoints = currentPoints + points;
        localStorage.setItem('aurael-user', JSON.stringify(user));
    }
}

export default function JournalEditor() {
  const [entry, setEntry] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<'summary' | 'reframe' | null>(null);
  const [aiResult, setAiResult] = useState<{title: string, content: string} | null>(null);
  const [savedEntries, setSavedEntries] = useState<JournalEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState(true);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    setTimeout(() => {
        const storedEntries = localStorage.getItem('ceevi-journal');
        if (storedEntries) {
          setSavedEntries(JSON.parse(storedEntries));
        }
        setEntriesLoading(false);
    }, 1500)
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImageUrl(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!entry.trim()) {
      toast({ title: 'Your entry is empty.', variant: 'destructive' });
      return;
    }
    const newEntry: JournalEntry = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      content: entry,
      imageUrl: imageUrl,
    };
    const updatedEntries = [newEntry, ...savedEntries];
    setSavedEntries(updatedEntries);
    localStorage.setItem('ceevi-journal', JSON.stringify(updatedEntries));
    addPoints(5);
    setEntry('');
    setImageUrl(null);
    setAiResult(null);
    toast({ title: 'Journal entry saved! +5 points 💖' });
  };

  const handleDelete = (id: string) => {
    const updatedEntries = savedEntries.filter(e => e.id !== id);
    setSavedEntries(updatedEntries);
    localStorage.setItem('ceevi-journal', JSON.stringify(updatedEntries));
    toast({ title: 'Entry deleted.', variant: 'destructive' });
  };

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
      {imageUrl && (
        <div className="relative w-full h-64 rounded-md overflow-hidden border">
            <Image src={imageUrl} alt="Journal entry" fill className="object-cover" />
            <Button variant="destructive" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => setImageUrl(null)}>
                <Trash2 className="w-4 h-4"/>
            </Button>
        </div>
      )}
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSave} disabled={!!isLoading || !entry.trim()}>
            <Save className="mr-2 h-4 w-4" />
          Save Entry
        </Button>
         <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Paperclip className="mr-2 h-4 w-4" />
            {imageUrl ? 'Change Photo' : 'Add Photo'}
        </Button>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
            accept="image/*"
        />
        <div className='flex-grow' />
        <Button onClick={handleSummarize} disabled={!!isLoading || !entry.trim()}>
          {isLoading === 'summary' ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BookText className="mr-2 h-4 w-4" />
          )}
          Summarize
        </Button>
        <Button onClick={handleReframe} disabled={!!isLoading || !entry.trim()}>
          {isLoading === 'reframe' ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Reframe Thoughts
        </Button>
      </div>
      
      {isLoading && <AiResultSkeleton />}
      {aiResult && !isLoading && (
        <>
            <Separator className="my-6 bg-white/20"/>
            <Card className="bg-primary/5 border-primary/20 with-left-shadow">
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-primary-foreground">{aiResult.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{aiResult.content}</p>
                </CardContent>
            </Card>
        </>
      )}

      {(savedEntries.length > 0 || entriesLoading) && (
        <>
            <Separator className="my-6 bg-white/20"/>
            <div className="space-y-4">
                <h3 className="text-2xl font-headline text-primary-foreground">Your Saved Entries</h3>
                {entriesLoading ? (
                    <JournalSkeleton />
                ) : (
                    savedEntries.map((savedEntry) => (
                    <Collapsible key={savedEntry.id} className="group">
                        <Card className='bg-background/50 with-left-shadow'>
                            <CardHeader className='flex-row items-center justify-between p-4'>
                                <div>
                                    <CardTitle className='text-lg'>{format(new Date(savedEntry.date), "MMMM d, yyyy 'at' h:mm a")}</CardTitle>
                                    <CardDescription>{savedEntry.content.substring(0, 50)}...</CardDescription>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(savedEntry.id)}>
                                        <Trash2 className="w-4 h-4 text-destructive"/>
                                    </Button>
                                    <CollapsibleTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <ChevronDown className="w-5 h-5 transition-transform group-data-[state=open]:rotate-180" />
                                        </Button>
                                    </CollapsibleTrigger>
                                </div>
                            </CardHeader>
                            <CollapsibleContent>
                                <CardContent className='p-4 pt-0'>
                                    {savedEntry.imageUrl && (
                                        <div className="relative w-full h-64 rounded-md overflow-hidden border my-4">
                                            <Image src={savedEntry.imageUrl} alt="Journal entry" fill className="object-cover" />
                                        </div>
                                    )}
                                    <p className="text-muted-foreground whitespace-pre-wrap">{savedEntry.content}</p>
                                </CardContent>
                            </CollapsibleContent>
                        </Card>
                    </Collapsible>
                )))}
            </div>
        </>
      )}
    </div>
  );
}
