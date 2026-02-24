'use client';

import { Civilization } from '@/lib/types';

const CIV_STYLES: Record<Civilization, string> = {
  'Egypt': 'bg-amber-900/50 text-amber-300 border-amber-700/50',
  'Rome': 'bg-red-900/50 text-red-300 border-red-700/50',
  'Greece': 'bg-sky-900/50 text-sky-300 border-sky-700/50',
  'Mesopotamia': 'bg-emerald-900/50 text-emerald-300 border-emerald-700/50',
  'Persia': 'bg-violet-900/50 text-violet-300 border-violet-700/50',
};

export default function CivilizationBadge({ civilization }: { civilization: Civilization }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium border ${CIV_STYLES[civilization]}`}>
      {civilization}
    </span>
  );
}
