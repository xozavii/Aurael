'use server';

import { generateMoodBasedAffirmations } from '@/ai/flows/generate-mood-based-affirmations';
import { adaptChatbotSpeakingStyle } from '@/ai/flows/adapt-chatbot-speaking-style';
import { summarizeJournalEntry } from '@/ai/flows/summarize-journal-entry';
import { reframeJournalEntry } from '@/ai/flows/reframe-journal-entry';
import { generateAvatar as genAvatar } from '@/ai/flows/generate-avatar';
import { generateGuidedMeditation as genGuidedMeditation } from '@/ai/flows/generate-guided-meditation';

export async function getAffirmation(mood: string, chatHistory: string = '') {
    try {
        const result = await generateMoodBasedAffirmations({ mood, chatHistory });
        return { affirmation: result.affirmation };
    } catch (error) {
        console.error('Error generating affirmation:', error);
        return { error: 'Could not generate affirmation. Please try again later.' };
    }
}

export async function getChatResponse(
  messages: { role: 'user' | 'model'; content: string }[],
  age: number
) {
  if (!messages || messages.length === 0) {
    return { error: 'No prompt provided.' };
  }

  const lastUserMessage = messages[messages.length - 1];
  if (lastUserMessage.role !== 'user') {
    return { error: 'Last message must be from user.' };
  }

  try {
    const result = await adaptChatbotSpeakingStyle({
      userAge: age,
      prompt: lastUserMessage.content,
    });
    return { response: result.response };
  } catch (e) {
    console.error(e);
    return { error: 'Sorry, I had some trouble understanding that. Could you rephrase?' };
  }
}

export async function getJournalSummary(entry: string) {
    if (!entry) return { error: 'Journal entry cannot be empty.' };
    try {
        const result = await summarizeJournalEntry({ journalEntry: entry });
        return { summary: result.summary };
    } catch (error) {
        console.error('Error summarizing journal entry:', error);
        return { error: 'Could not summarize entry. Please try again later.' };
    }
}

export async function getJournalReframe(entry: string) {
    if (!entry) return { error: 'Journal entry cannot be empty.' };
    try {
        const result = await reframeJournalEntry({ journalEntry: entry });
        return { reframed: result.reframedEntry };
    } catch (error) {
        console.error('Error reframing journal entry:', error);
        return { error: 'Could not reframe entry. Please try again later.' };
    }
}

export async function generateAvatar() {
    try {
        const result = await genAvatar();
        return { imageUrl: result.imageUrl };
    } catch (error) {
        console.error('Error generating avatar:', error);
        return { error: 'Could not generate avatar. Please try again later.' };
    }
}

export async function getGuidedMeditation(prompt: string) {
    if (!prompt) return { error: 'A prompt is required to generate a meditation.' };
    try {
        const result = await genGuidedMeditation(prompt);
        return { audioUrl: result.audioUrl };
    } catch (error) {
        console.error('Error generating guided meditation:', error);
        return { error: 'Could not generate meditation audio. Please try again later.' };
    }
}
