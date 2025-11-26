import type { LucideIcon } from "lucide-react";

export type Habit = {
    id: string;
    name: string;
    icon: LucideIcon;
    frequency: 'daily';
    streak: number;
    lastCompleted: string | null; // ISO string
    history: string[];
};

export type Playlist = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageHint: string;
    spotifyUrl: string;
};

export type Message = {
    id: string;
    role: 'user' | 'model' | 'system';
    content: string;
};

export type JournalEntry = {
    id: string;
    date: string; // ISO string
    content: string;
    imageUrl?: string | null; // data URI
};

export type User = {
    name: string;
    email: string;
    dob: string;
    avatarUrl?: string;
}
