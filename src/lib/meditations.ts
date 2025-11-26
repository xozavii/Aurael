import data from './meditations.json';

export type Meditation = {
    id: string;
    title: string;
    duration: number;
    icon: string;
    audio: string;
    description: string;
    instructions: string[];
    phases: string[];
};

export const meditations: Meditation[] = data.meditations;
