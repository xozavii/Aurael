'use client';
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { meditations } from '@/lib/meditations';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, ChevronLeft, Brain, Sparkles, Wind, Info, Volume2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export default function MeditationPlayerPage() {
    const { id } = useParams();
    const router = useRouter();
    const meditation = meditations.find(m => m.id === id);

    const [hasStarted, setHasStarted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(meditation ? meditation.duration * 60 : 0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const instructionAudioRef = useRef<HTMLAudioElement | null>(null);


    useEffect(() => {
        if (meditation) {
            setTimeLeft(meditation.duration * 60);
            if (!audioRef.current) {
                audioRef.current = new Audio(meditation.audio);
            } else {
                audioRef.current.src = meditation.audio;
            }
    
            if (meditation.instructionAudio) {
                if (!instructionAudioRef.current) {
                    instructionAudioRef.current = new Audio(meditation.instructionAudio);
                } else {
                    instructionAudioRef.current.src = meditation.instructionAudio;
                }
            }
        }
    }, [meditation]);
    

    useEffect(() => {
        if (!isPlaying || !hasStarted || timeLeft <= 0) {
            return;
        }
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isPlaying, hasStarted, timeLeft]);

    const handleStartSession = () => {
        setHasStarted(true);
        if (audioRef.current) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(e => console.error("Audio autoplay failed:", e));
        }
    }

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

    const handlePlayInstructions = () => {
        if (instructionAudioRef.current) {
            if (!instructionAudioRef.current.paused) {
                instructionAudioRef.current.pause();
                instructionAudioRef.current.currentTime = 0;
            } else {
                instructionAudioRef.current.play().catch(e => console.error("Instruction audio failed:", e));
            }
        }
    }

    const handleRestart = () => {
        if (meditation && audioRef.current) {
            setTimeLeft(meditation.duration * 60);
            audioRef.current.currentTime = 0;
            if(hasStarted){
                audioRef.current.play();
                setIsPlaying(true);
            }
        }
    };

    if (!meditation) {
        return <div className="flex items-center justify-center h-full">Meditation not found.</div>;
    }
    
    const isFinished = timeLeft <= 0 && hasStarted;

    const getPhaseIcon = (phase: string) => {
        switch(phase.toLowerCase()) {
            case 'breathing': return <Wind className="w-4 h-4 mr-2" />;
            case 'visualization': return <Sparkles className="w-4 h-4 mr-2" />;
            case 'affirmations': return <Brain className="w-4 h-4 mr-2" />;
            default: return null;
        }
    }

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-x-hidden">
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
                 <div className="absolute inset-0 animate-aurora-glow-slow -z-10 rounded-lg"/>
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
                        <div className="flex justify-center items-center gap-8">
                            <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                                <svg className="absolute w-full h-full" viewBox="0 0 100 100">
                                    <circle className="stroke-current text-primary/10" strokeWidth="4" cx="50" cy="50" r="45" fill="transparent"></circle>
                                    {hasStarted && (
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
                                    )}
                                </svg>
                                <span className="text-4xl font-bold font-mono">{formatTime(timeLeft)}</span>
                            </div>
                            
                            <div className="relative w-36 h-36 flex items-center justify-center">
                                <div className="breathing-orb" style={{ animationPlayState: hasStarted && isPlaying ? 'running' : 'paused' }}/>
                                <div className="breathing-particles" />
                            </div>
                        </div>
                
                        <div className="flex justify-center items-center gap-4">
                            {!hasStarted ? (
                                <Button onClick={handleStartSession} size="lg" className="w-full">
                                    <Play className="mr-2 h-5 w-5" />
                                    Start Session
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={togglePlayPause} size="lg" className="w-28">
                                        {isPlaying ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
                                        {isPlaying ? 'Pause' : 'Resume'}
                                    </Button>
                                    <Button onClick={handleRestart} variant="outline" size="lg">
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Restart
                                    </Button>
                                </>
                            )}
                        </div>
                    </>
                )}
            </Card>

            <div className="w-full max-w-4xl mt-8">
                 <div className="grid md:grid-cols-2 gap-8 items-start">
                    <Card className="bg-card/30 backdrop-blur-xl border-white/10 text-center">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center gap-2 justify-center"><Info className="w-5 h-5"/> Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground italic">{meditation.description}</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/30 backdrop-blur-xl border-white/10">
                        <CardHeader>
                            <CardTitle className="text-lg font-semibold flex items-center justify-between">
                                <span>How to Do This Meditation</span>
                                {meditation.instructionAudio && (
                                <Button variant="ghost" size="icon" onClick={handlePlayInstructions} className="w-8 h-8 rounded-full">
                                    <Volume2 className="w-5 h-5" />
                                </Button>
                                )}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground text-left">
                                {meditation.instructions.map((step, index) => (
                                    <li key={index}>{step}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                 </div>
            </div>

            {!isFinished && (
            <div className="w-full max-w-md mt-8 space-y-6">
                <Card className="bg-card/30 backdrop-blur-xl border-white/10">
                    <CardContent className="p-3">
                        <div className="flex justify-center items-center gap-2">
                             {meditation.phases.map((phase, index) => (
                                <div
                                key={index}
                                className="flex items-center px-3 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium"
                                >
                                    {getPhaseIcon(phase)}
                                    <span>{phase}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
            )}
        </div>
    );
}
