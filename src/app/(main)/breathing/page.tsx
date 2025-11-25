import BreathingExercise from "@/components/breathing/breathing-exercise";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind } from "lucide-react";

export default function BreathingPage() {
    return (
        <div className="container mx-auto h-full flex items-center justify-center">
            <Card className="w-full max-w-md bg-card/60 backdrop-blur-lg border-white/20">
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit">
                        <Wind className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl mt-4">
                        Mindful Breathing
                    </CardTitle>
                    <CardDescription>
                        Follow the guide to calm your mind and body.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BreathingExercise />
                </CardContent>
            </Card>
        </div>
    );
}
