'use client';

import { Status } from '@/lib/types';

const STATUS_STYLES: Record<Status, string> = {
  'Idea': 'bg-gray-700 text-gray-300',
  'Script Ready': 'bg-blue-900/60 text-blue-300',
  'Visual Ready': 'bg-purple-900/60 text-purple-300',
  'Published': 'bg-green-900/60 text-green-300',
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}>
      {status}
    </span>
  );
}
