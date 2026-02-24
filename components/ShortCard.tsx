'use client';

import Link from 'next/link';
import { Short } from '@/lib/types';
import StatusBadge from './StatusBadge';
import CivilizationBadge from './CivilizationBadge';

interface ShortCardProps {
  short: Short;
  onDelete: (id: string) => void;
  onCopy: (text: string, label: string) => void;
}

export default function ShortCard({ short, onDelete, onCopy }: ShortCardProps) {
  const formattedDate = short.scheduledDate
    ? new Date(short.scheduledDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No date set';

  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-5 hover:border-[#c9a84c]/30 transition-all group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Link href={`/short/${short.id}`} className="flex-1 min-w-0">
          <h3 className="text-[#e8e8e8] font-semibold text-sm leading-snug group-hover:text-[#c9a84c] transition-colors line-clamp-2">
            {short.title}
          </h3>
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <CivilizationBadge civilization={short.civilization} />
        <StatusBadge status={short.status} />
      </div>

      <p className="text-[#888888] text-xs mb-4">
        Scheduled: {formattedDate}
      </p>

      <div className="flex items-center gap-1.5 pt-3 border-t border-[#222222]">
        <button
          onClick={() => onCopy(short.script, 'Script')}
          disabled={!short.script}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#888888] hover:text-[#e8e8e8] hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Copy Script"
        >
          <span>📋</span> Script
        </button>
        <button
          onClick={() => onCopy(short.imagePrompts, 'Image Prompts')}
          disabled={!short.imagePrompts}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#888888] hover:text-[#e8e8e8] hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          title="Copy Image Prompts"
        >
          <span>🎨</span> Prompts
        </button>
        <Link
          href={`/short/${short.id}`}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#888888] hover:text-[#e8e8e8] hover:bg-[#1a1a1a] transition-colors"
          title="Edit"
        >
          <span>✏️</span> Edit
        </Link>
        <button
          onClick={() => onDelete(short.id)}
          className="flex items-center gap-1 px-2 py-1 rounded text-xs text-[#888888] hover:text-red-400 hover:bg-red-900/20 transition-colors ml-auto"
          title="Delete"
        >
          <span>🗑️</span>
        </button>
      </div>
    </div>
  );
}
