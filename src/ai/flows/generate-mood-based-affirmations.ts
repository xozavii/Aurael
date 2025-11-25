'use server';
/**
 * @fileOverview Generates personalized affirmations based on the user's mood and recent chat conversations.
 *
 * - generateMoodBasedAffirmations - A function that generates affirmations.
 * - GenerateMoodBasedAffirmationsInput - The input type for the generateMoodBasedAffirmations function.
 * - GenerateMoodBasedAffirmationsOutput - The return type for the generateMoodBasedAffirmations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoodBasedAffirmationsInputSchema = z.object({
  mood: z.string().describe('The current mood of the user.'),
  chatHistory: z.string().describe('Recent chat conversations with the AI chatbot.'),
});
export type GenerateMoodBasedAffirmationsInput = z.infer<typeof GenerateMoodBasedAffirmationsInputSchema>;

const GenerateMoodBasedAffirmationsOutputSchema = z.object({
  affirmation: z.string().describe('A personalized affirmation based on the user\u0027s mood and chat history.'),
});
export type GenerateMoodBasedAffirmationsOutput = z.infer<typeof GenerateMoodBasedAffirmationsOutputSchema>;

export async function generateMoodBasedAffirmations(input: GenerateMoodBasedAffirmationsInput): Promise<GenerateMoodBasedAffirmationsOutput> {
  return generateMoodBasedAffirmationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMoodBasedAffirmationsPrompt',
  input: {schema: GenerateMoodBasedAffirmationsInputSchema},
  output: {schema: GenerateMoodBasedAffirmationsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized affirmations.
  Based on the user's current mood: {{{mood}}} and recent chat history: {{{chatHistory}}},
  generate a single supportive and uplifting affirmation that is tailored to their emotional state.
  The affirmation should be positive, encouraging, and relevant to their specific situation.
  Keep the affirmation concise and easy to remember.
  Output only the affirmation. Do not add anything else. No quotes, intro, etc.

  Affirmation:`,
});

const generateMoodBasedAffirmationsFlow = ai.defineFlow(
  {
    name: 'generateMoodBasedAffirmationsFlow',
    inputSchema: GenerateMoodBasedAffirmationsInputSchema,
    outputSchema: GenerateMoodBasedAffirmationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
