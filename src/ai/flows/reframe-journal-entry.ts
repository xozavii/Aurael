'use server';

/**
 * @fileOverview AI agent that reframes negative thoughts in a journal entry to promote a more positive perspective.
 *
 * - reframeJournalEntry - A function that reframes a journal entry.
 * - ReframeJournalEntryInput - The input type for the reframeJournalEntry function.
 * - ReframeJournalEntryOutput - The return type for the reframeJournalEntry function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ReframeJournalEntryInputSchema = z.object({
  journalEntry: z
    .string()
    .describe('The journal entry to reframe with potentially negative thoughts.'),
});
export type ReframeJournalEntryInput = z.infer<typeof ReframeJournalEntryInputSchema>;

const ReframeJournalEntryOutputSchema = z.object({
  reframedEntry: z
    .string()
    .describe('The reframed journal entry with a more positive perspective.'),
});
export type ReframeJournalEntryOutput = z.infer<typeof ReframeJournalEntryOutputSchema>;

export async function reframeJournalEntry(input: ReframeJournalEntryInput): Promise<ReframeJournalEntryOutput> {
  return reframeJournalEntryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'reframeJournalEntryPrompt',
  input: {schema: ReframeJournalEntryInputSchema},
  output: {schema: ReframeJournalEntryOutputSchema},
  prompt: `You are an AI assistant designed to help users reframe negative thoughts in their journal entries into more positive perspectives.

  Please reframe the following journal entry to promote a more optimistic mindset and help the user cope with challenges effectively:
  \"{{{journalEntry}}}\"`,
});

const reframeJournalEntryFlow = ai.defineFlow(
  {
    name: 'reframeJournalEntryFlow',
    inputSchema: ReframeJournalEntryInputSchema,
    outputSchema: ReframeJournalEntryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
