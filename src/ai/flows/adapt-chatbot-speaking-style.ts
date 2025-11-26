'use server';
/**
 * @fileOverview This file defines a Genkit flow that adapts the AI Chatbot's speaking style (Gen Z or Millennial) based on the user's age.
 *
 * - adaptChatbotSpeakingStyle - A function that calls the adaptChatbotSpeakingStyleFlow.
 * - AdaptChatbotSpeakingStyleInput - The input type for the adaptChatbotSpeakingStyle function.
 * - AdaptChatbotSpeakingStyleOutput - The return type for the adaptChatbotSpeakingStyle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptChatbotSpeakingStyleInputSchema = z.object({
  userAge: z.number().describe('The age of the user.'),
  prompt: z.string().describe('The user prompt to the chatbot.'),
});
export type AdaptChatbotSpeakingStyleInput = z.infer<typeof AdaptChatbotSpeakingStyleInputSchema>;

const AdaptChatbotSpeakingStyleOutputSchema = z.object({
  response: z.string().describe('The chatbot response adapted to the user age.'),
});
export type AdaptChatbotSpeakingStyleOutput = z.infer<typeof AdaptChatbotSpeakingStyleOutputSchema>;

export async function adaptChatbotSpeakingStyle(
  input: AdaptChatbotSpeakingStyleInput
): Promise<AdaptChatbotSpeakingStyleOutput> {
  return adaptChatbotSpeakingStyleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adaptChatbotSpeakingStylePrompt',
  input: {schema: AdaptChatbotSpeakingStyleInputSchema},
  output: {schema: AdaptChatbotSpeakingStyleOutputSchema},
  prompt: `You are an AI chatbot that adapts its speaking style based on the user's age.

  If the user is under 26, respond using Gen Z slang and expressions. Be a little informal and use emojis. Think "no cap," "bet," "it's giving," and "vibe check".
  If the user is 26 or older, respond using Millennial slang and expressions. Be friendly and relatable. Think "adulting," "I can't even," and maybe use nostalgic references from the 90s/2000s.

  User age: {{{userAge}}}
  User prompt: {{{prompt}}}

  Chatbot response:`,
});

const adaptChatbotSpeakingStyleFlow = ai.defineFlow(
  {
    name: 'adaptChatbotSpeakingStyleFlow',
    inputSchema: AdaptChatbotSpeakingStyleInputSchema,
    outputSchema: AdaptChatbotSpeakingStyleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
