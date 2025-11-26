import PlaylistGrid from "@/components/playlists/playlist-grid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListMusic } from "lucide-react";

export default function PlaylistsPage() {
    return (
        <div className="container mx-auto max-w-5xl">
            <Card className="bg-card/60 backdrop-blur-lg border-white/20 with-left-shadow">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <ListMusic className="w-8 h-8 text-primary" />
                        Mood Playlists 🎶
                    </CardTitle>
                    <CardDescription>
                        Tune into your mood. Curated playlists to match your feelings.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <PlaylistGrid />
                </CardContent>
            </Card>
        </div>
    );
}
