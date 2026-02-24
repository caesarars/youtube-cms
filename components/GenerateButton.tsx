'use client';

import { useState } from 'react';

interface GenerateButtonProps {
  type: 'script' | 'image_prompts';
  title: string;
  civilization: string;
  existingScript?: string;
  onGenerated: (text: string) => void;
}

export default function GenerateButton({
  type,
  title,
  civilization,
  existingScript,
  onGenerated,
}: GenerateButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!title || !civilization) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          context: { title, civilization, existingScript },
        }),
      });
      const data = await res.json();
      if (data.result) {
        onGenerated(data.result);
      }
    } catch (err) {
      console.error('Generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGenerate}
      disabled={loading || !title || !civilization}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-[#c9a84c]/10 text-[#c9a84c] border border-[#c9a84c]/30 hover:bg-[#c9a84c]/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? (
        <svg
          className="animate-spin h-4 w-4 text-[#c9a84c]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <span>✨</span>
      )}
      {loading ? 'Generating...' : 'Generate with Gemini'}
    </button>
  );
}
