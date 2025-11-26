'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getGuidedMeditation } from '@/lib/actions';
import { Loader, Wand2, Sparkles, Wind, Bed, Star, Brain, Heart, Clock, Waves, Play } from 'lucide-react';
import AudioPlayer from '@/components/meditation/audio-player';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { meditations } from '@/lib/meditations';

const aiMeditationTopics = [
    { value: 'releasing anxiety', label: 'Releasing Anxiety' },
    { value: 'finding inner peace', label: 'Finding Inner Peace' },
    { value: 'a morning energy boost', label: 'Morning Energy Boost' },
    { value: 'winding down for bed', label: 'Winding Down for Bed' },
    { value: 'practicing gratitude', label: 'Practicing Gratitude' },
];

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
              animationDuration: `${Math.random() * 10 + 25}s`,
              animationDelay: `${Math.random() * 10}s`,
              fontSize: `${Math.random() * 1.5 + 0.5}rem`, 
            }}
          >
            &#x2764; {/* HTML heart entity */}
          </div>
        ))}
      </div>
    );
};

export default function BreathingPage() {
    const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(aiMeditationTopics[0].value);
    const [generatedAudio, setGeneratedAudio] = useState<string | null>(null);
    const [currentPlaying, setCurrentPlaying] = useState<{title: string, audio: string} | null>(null);
    const { toast } = useToast();

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGeneratedAudio(null);
        
        const fullPrompt = `Generate a soft, calming guided meditation in a warm Gen-Z tone for 3 minutes that helps with ${selectedTopic}.`;

        const result = await getGuidedMeditation(fullPrompt);

        if (result.audioUrl) {
            setGeneratedAudio(result.audioUrl);
        } else {
            toast({
                title: 'Error Generating Meditation',
                description: result.error || 'Could not generate audio. Please try again.',
                variant: 'destructive',
            });
            setIsAiDialogOpen(false);
        }
        setIsGenerating(false);
    };

    const handlePlayGenerated = () => {
        if (generatedAudio) {
            setCurrentPlaying({ title: `AI: ${selectedTopic}`, audio: generatedAudio });
            setIsAiDialogOpen(false);
            setGeneratedAudio(null);
        }
    }
    
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case 'Wind': return Wind;
            case 'Bed': return Bed;
            case 'Star': return Star;
            case 'Sparkles': return Sparkles;
            case 'Heart': return Heart;
            case 'Brain': return Brain;
            default: return Waves;
        }
    };


    return (
        <div className="container mx-auto h-full flex flex-col items-center justify-center gap-8 relative overflow-hidden">
            <FloatingHearts />
            
            <div className="w-full max-w-4xl z-10">
                <div className="space-y-6">
                    <Card className="w-full bg-card/60 backdrop-blur-lg border-white/20 with-left-shadow">
                        <CardHeader>
                            <CardTitle className="font-headline text-3xl flex items-center gap-2">
                                <Waves className="w-8 h-8 text-primary" />
                                Guided Meditations
                            </CardTitle>
                            <CardDescription>
                                Find your inner peace or create your own with AI.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button size="lg" onClick={() => setIsAiDialogOpen(true)}>
                                <Wand2 className="mr-2 h-5 w-5"/>
                                Generate AI Meditation
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {meditations.map((meditation) => {
                            const Icon = getIcon(meditation.icon);
                            return (
                                <Link href={`/meditation/${meditation.id}`} key={meditation.id} className="group block">
                                    <Card className="group relative overflow-hidden bg-card/60 backdrop-blur-lg border-white/20 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl h-full">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        <CardHeader className="relative z-10">
                                            <div className="flex items-center justify-between">
                                                <div className="p-3 bg-primary/20 rounded-full mb-3">
                                                    <Icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <span className="text-xs font-semibold text-muted-foreground bg-secondary px-2 py-1 rounded-full flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {meditation.duration} min
                                                </span>
                                            </div>
                                            <CardTitle className="font-headline text-xl">{meditation.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="relative z-10">
                                            <Button className="w-full">
                                                <Play className="mr-2 h-4 w-4" />
                                                Start
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>

            {currentPlaying && (
                <div className="fixed bottom-0 left-0 right-0 z-50 p-4 max-w-lg mx-auto">
                    <AudioPlayer 
                        title={currentPlaying.title} 
                        src={currentPlaying.audio}
                        onClose={() => setCurrentPlaying(null)}
                    />
                </div>
            )}
            
            <Dialog open={isAiDialogOpen} onOpenChange={setIsAiDialogOpen}>
                <DialogContent className="max-w-md bg-card/80 backdrop-blur-xl">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-2xl">Generate AI Meditation</DialogTitle>
                    </DialogHeader>
                    {generatedAudio ? (
                        <div className="flex flex-col items-center justify-center p-8 gap-4">
                            <p className="text-center text-muted-foreground">Your meditation for "{selectedTopic}" is ready!</p>
                             <div className="w-full">
                                <AudioPlayer title={`AI: ${selectedTopic}`} src={generatedAudio} />
                            </div>
                        </div>
                    ) : isGenerating ? (
                        <div className="flex flex-col items-center justify-center p-8 gap-4">
                            <Loader className="h-16 w-16 animate-spin text-primary" />
                            <p className="text-muted-foreground">Generating your meditation...</p>
                        </div>
                    ) : (
                        <div className="space-y-4 py-4">
                            <p className="text-muted-foreground">What would you like to focus on?</p>
                            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                                <SelectTrigger className="w-full text-base h-11 bg-background/80">
                                    <SelectValue placeholder="Choose a topic" />
                                </SelectTrigger>
                                <SelectContent>
                                    {aiMeditationTopics.map(topic => (
                                        <SelectItem key={topic.value} value={topic.value} className="text-base">{topic.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">Cancel</Button>
                        </DialogClose>
                        {generatedAudio ? (
                            <Button onClick={handlePlayGenerated}>Play Full</Button>
                        ) : (
                            <Button onClick={handleGenerate} disabled={isGenerating}>
                                {isGenerating ? 'Generating...' : 'Generate'}
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
