'use server';
/**
 * @fileOverview Generates a cute teddy bear avatar.
 *
 * - generateAvatar - A function that generates an avatar.
 * - GenerateAvatarOutput - The return type for the generateAvatar function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAvatarOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated avatar image.'),
});
export type GenerateAvatarOutput = z.infer<typeof GenerateAvatarOutputSchema>;

export async function generateAvatar(): Promise<GenerateAvatarOutput> {
  return generateAvatarFlow();
}

const generateAvatarFlow = ai.defineFlow(
  {
    name: 'generateAvatarFlow',
    outputSchema: GenerateAvatarOutputSchema,
  },
  async () => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt:
        'A cute, adorable teddy bear avatar. Digital art, vibrant colors, suitable for a profile picture in a well-being app.',
      config: {
        aspectRatio: '1:1',
      },
    });
    
    if (!media.url) {
      throw new Error('Image generation failed to return a URL.');
    }

    return {imageUrl: media.url};
  }
);
