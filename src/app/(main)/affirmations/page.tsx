import AffirmationCard from "@/components/chatbot/affirmation-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export default function AffirmationsPage() {
    return (
        <div className="container mx-auto h-full flex items-center justify-center">
             <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-lg border-white/20 with-left-shadow">
                <CardHeader className="text-center items-center">
                    <div className="mx-auto bg-primary/20 p-3 rounded-full w-fit mb-2">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline text-3xl">
                        Daily Affirmations
                    </CardTitle>
                    <CardDescription>
                        Select your mood and get a personalized affirmation to brighten your day.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AffirmationCard />
                </CardContent>
            </Card>
        </div>
    );
}
