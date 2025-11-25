import type { LucideIcon } from "lucide-react";

export type Habit = {
    id: string;
    name: string;
    icon: LucideIcon;
    frequency: 'daily';
    streak: number;
    lastCompleted: string | null; // ISO string
};

export type Playlist = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageHint: string;
};

export type Message = {
    id: string;
    role: 'user' | 'model' | 'system';
    content: string;
};
