import JournalEditor from "@/components/journal/journal-editor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookHeart } from "lucide-react";

export default function JournalPage() {
    return (
        <div className="container mx-auto max-w-4xl">
            <Card className="bg-card/60 backdrop-blur-lg border-white/20">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <BookHeart className="w-8 h-8 text-primary" />
                        AI Journal
                    </CardTitle>
                    <CardDescription>
                        Write down your thoughts and let our AI help you reflect and find perspective.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <JournalEditor />
                </CardContent>
            </Card>
        </div>
    );
}
