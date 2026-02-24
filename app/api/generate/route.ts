import { NextRequest, NextResponse } from 'next/server';
import { generateWithGemini, buildScriptPrompt, buildImagePromptsPrompt } from '@/lib/gemini';
import { GenerateRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { type, context } = body;

    if (!context.title || !context.civilization) {
      return NextResponse.json(
        { error: 'Title and civilization are required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured' },
        { status: 500 }
      );
    }

    let prompt: string;

    if (type === 'script') {
      prompt = buildScriptPrompt(context.title, context.civilization);
    } else if (type === 'image_prompts') {
      prompt = buildImagePromptsPrompt(
        context.title,
        context.civilization,
        context.existingScript || ''
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid generation type' },
        { status: 400 }
      );
    }

    const result = await generateWithGemini(prompt);
    return NextResponse.json({ result });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
