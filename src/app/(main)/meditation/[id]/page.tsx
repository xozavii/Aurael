'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { meditations } from '@/lib/meditations';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ChevronLeft } from 'lucide-react';
import { Card } from '@/components/ui/card';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default function MeditationPlayerPage() {
    const { id } = useParams();
    const router = useRouter();
    const meditation = meditations.find(m => m.id === id);

    const [isPlaying, setIsPlaying] = useState(true);
    const [timeLeft, setTimeLeft] = useState(meditation ? meditation.duration * 60 : 0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (meditation) {
            setTimeLeft(meditation.duration * 60);
        }
    }, [meditation]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && meditation) {
            audio.src = meditation.audio;
            audio.play().catch(e => console.error("Audio autoplay failed:", e));
            setIsPlaying(true);

            const handleEnd = () => setIsPlaying(false);
            audio.addEventListener('ended', handleEnd);
            return () => audio.removeEventListener('ended', handleEnd);
        }
    }, [meditation]);

    useEffect(() => {
        if (!isPlaying || timeLeft === 0) {
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, timeLeft]);

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleRestart = () => {
        if (meditation && audioRef.current) {
            setTimeLeft(meditation.duration * 60);
            audioRef.current.currentTime = 0;
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    if (!meditation) {
        return <div className="flex items-center justify-center h-full">Meditation not found.</div>;
    }
    
    const isFinished = timeLeft === 0;

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
            <div className="aurora-background">
                <div className="aurora-container">
                    <div className="aurora aurora-1"></div>
                    <div className="aurora aurora-2" style={{ backgroundColor: '#c1126f' }}></div>
                    <div className="aurora aurora-3" style={{ backgroundColor: '#f06292' }}></div>
                </div>
            </div>

            <Button
                variant="ghost"
                onClick={() => router.push('/breathing')}
                className="absolute top-6 left-6 z-20"
            >
                <ChevronLeft className="mr-2 h-5 w-5" />
                Back to Meditations
            </Button>
            
            <Card className="relative z-10 w-full max-w-md text-center bg-card/30 backdrop-blur-2xl border-white/10 p-8 space-y-6">
                {isFinished ? (
                    <div className="space-y-4 animate-in fade-in duration-1000">
                         <h1 className="text-3xl font-headline text-primary">Session Complete</h1>
                         <p className="text-muted-foreground">You did amazing. Take a moment to feel the peace.</p>
                         <Button onClick={handleRestart} size="lg">
                             <RotateCcw className="mr-2 h-4 w-4" />
                             Replay
                         </Button>
                    </div>
                ) : (
                    <>
                        <h1 className="text-3xl font-headline text-primary">{meditation.title}</h1>
                        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                            <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                                <circle className="stroke-current text-primary/10" strokeWidth="4" cx="50" cy="50" r="45" fill="transparent"></circle>
                                <circle
                                    className="stroke-current text-primary transition-all duration-1000 ease-linear"
                                    strokeWidth="4"
                                    strokeDasharray={2 * Math.PI * 45}
                                    strokeDashoffset={2 * Math.PI * 45 * (1 - timeLeft / (meditation.duration * 60))}
                                    strokeLinecap="round"
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    fill="transparent"
                                    transform="rotate(-90 50 50)"
                                ></circle>
                            </svg>
                            <span className="text-5xl font-bold font-mono">{formatTime(timeLeft)}</span>
                        </div>
                
                        <div className="flex justify-center items-center gap-4">
                            <Button onClick={togglePlayPause} size="lg" className="w-28">
                                {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                                {isPlaying ? 'Pause' : 'Resume'}
                            </Button>
                            <Button onClick={handleRestart} variant="outline" size="lg">
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Restart
                            </Button>
                        </div>
                    </>
                )}
            </Card>

            <audio ref={audioRef} />
        </div>
    );
}
