import data from './meditations.json';

export type Meditation = {
    id: string;
    title: string;
    duration: number;
    icon: string;
    audio: string;
};

export const meditations: Meditation[] = data.meditations;
