import HabitTracker from "@/components/habits/habit-tracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck } from "lucide-react";

export default function HabitsPage() {
    return (
        <div className="container mx-auto max-w-4xl">
            <Card className="bg-card/60 backdrop-blur-lg border-white/20 with-left-shadow">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center gap-2">
                        <ClipboardCheck className="w-8 h-8 text-primary" />
                        Habit Tracker ✅
                    </CardTitle>
                    <CardDescription>
                        Cultivate positive routines and watch your progress grow. 🌱
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <HabitTracker />
                </CardContent>
            </Card>
        </div>
    );
}
