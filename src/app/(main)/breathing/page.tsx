import BreathingExercise from "@/components/breathing/breathing-exercise";
import { MeditationIcon } from "@/components/icons/meditation-icon";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GuidedMeditation from "@/components/breathing/guided-meditation";

export default function BreathingPage() {
    return (
        <div className="container mx-auto h-full flex flex-col items-center justify-center gap-8">
            <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-white/20 z-10 with-left-shadow">
                <CardHeader className="text-center items-center">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
                        <MeditationIcon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl mt-4">
                        Breathing Exercise
                    </CardTitle>
                    <CardDescription>
                        Follow the guide to calm your mind and body.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BreathingExercise />
                </CardContent>
            </Card>
            <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-white/20 z-10 with-left-shadow">
                 <CardHeader className="text-center items-center">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
                        <MeditationIcon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl mt-4">
                        Guided Meditation
                    </CardTitle>
                    <CardDescription>
                        Listen to a short guided meditation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <GuidedMeditation />
                </CardContent>
            </Card>
        </div>
    );
}
