import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const result = await model.generateContent(prompt);
  const response = result.response;
  return response.text();
}

export function buildScriptPrompt(title: string, civilization: string): string {
  return `You are a YouTube Shorts scriptwriter for "The Ancient Lens", a cinematic history channel.

Write a 45-60 second voiceover script for a Short titled: "${title}"
Civilization: ${civilization}
Format: Daily life reconstruction

Rules:
- Start with a shocking or surprising hook (first 3 seconds must grab attention)
- Include 3-4 fascinating facts most people don't know
- End with a cliffhanger or mind-blowing final fact
- Tone: cinematic, authoritative, like a documentary narrator
- Length: exactly 100-130 words
- No emojis, no hashtags

Return only the script text, nothing else.`;
}

export function buildImagePromptsPrompt(
  title: string,
  civilization: string,
  existingScript: string
): string {
  return `You are an expert AI image prompt writer for Midjourney and Leonardo.ai.

Create exactly 4 image prompts for a YouTube Short about: "${title}"
Civilization: ${civilization}
Script context: ${existingScript}

Each prompt must follow this structure:
[Scene description], [time period] BC/AD, [lighting description], [camera shot type], photorealistic, cinematic, ultra detailed, 8k, historically accurate, no modern elements

Label them:
Scene 1 - [Hook visual]
Scene 2 - [Action/main scene]
Scene 3 - [Detail/close-up]
Scene 4 - [Epic closing shot]

Return only the 4 prompts with their labels, nothing else.`;
}
