'use server';
/**
 * @fileOverview Generates guided meditation audio from a text prompt.
 *
 * - generateGuidedMeditation - A function that generates audio.
 * - GenerateGuidedMeditationOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateGuidedMeditationOutputSchema = z.object({
  audioUrl: z.string().describe('The data URI of the generated audio file.'),
});
export type GenerateGuidedMeditationOutput = z.infer<typeof GenerateGuidedMeditationOutputSchema>;

export async function generateGuidedMeditation(prompt: string): Promise<GenerateGuidedMeditationOutput> {
  return generateGuidedMeditationFlow(prompt);
}

async function toWav(
    pcmData: Buffer,
    channels = 1,
    rate = 24000,
    sampleWidth = 2
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const writer = new wav.Writer({
        channels,
        sampleRate: rate,
        bitDepth: sampleWidth * 8,
      });
  
      let bufs = [] as any[];
      writer.on('error', reject);
      writer.on('data', function (d) {
        bufs.push(d);
      });
      writer.on('end', function () {
        resolve(Buffer.concat(bufs).toString('base64'));
      });
  
      writer.write(pcmData);
      writer.end();
    });
}

const generateGuidedMeditationFlow = ai.defineFlow(
  {
    name: 'generateGuidedMeditationFlow',
    inputSchema: z.string(),
    outputSchema: GenerateGuidedMeditationOutputSchema,
  },
  async (prompt) => {
    const { media } = await ai.generate({
        model: 'googleai/gemini-2.5-flash-preview-tts',
        config: {
          responseModalities: ['AUDIO'],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Algenib' },
            },
          },
        },
        prompt: `You are a calm and soothing meditation guide. Create a script for ${prompt}. Speak slowly and clearly, with pauses for reflection.`,
      });
      if (!media) {
        throw new Error('no media returned');
      }
      const audioBuffer = Buffer.from(
        media.url.substring(media.url.indexOf(',') + 1),
        'base64'
      );

      const wavBase64 = await toWav(audioBuffer);

    return { audioUrl: `data:audio/wav;base64,${wavBase64}` };
  }
);
