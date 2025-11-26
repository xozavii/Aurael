'use server';
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-mood-based-affirmations.ts';
import '@/ai/flows/adapt-chatbot-speaking-style.ts';
import '@/ai/flows/summarize-journal-entry.ts';
import '@/ai/flows/reframe-journal-entry.ts';
import '@/ai/flows/generate-avatar.ts';
