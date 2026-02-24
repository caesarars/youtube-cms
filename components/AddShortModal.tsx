'use client';

import { useState } from 'react';
import { Short, CIVILIZATIONS, STATUSES, Civilization, Status } from '@/lib/types';
import GenerateButton from './GenerateButton';

interface AddShortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (short: Omit<Short, '_id' | 'createdAt' | 'updatedAt'> & { _id?: string }) => void;
  editShort?: Short | null;
}

export default function AddShortModal({ isOpen, onClose, onSave, editShort }: AddShortModalProps) {
  const [title, setTitle] = useState(editShort?.title || '');
  const [civilization, setCivilization] = useState<Civilization>(editShort?.civilization || 'Egypt');
  const [status, setStatus] = useState<Status>(editShort?.status || 'Idea');
  const [scheduledDate, setScheduledDate] = useState(editShort?.scheduledDate || '');
  const [script, setScript] = useState(editShort?.script || '');
  const [imagePrompts, setImagePrompts] = useState(editShort?.imagePrompts || '');

  if (!isOpen) return null;

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      _id: editShort?._id,
      title: title.trim(),
      civilization,
      status,
      scheduledDate,
      script,
      imagePrompts,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#111111] border border-[#222222] rounded-xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-[#c9a84c]">
            {editShort ? 'Edit Short' : 'Add New Short'}
          </h2>
          <button
            onClick={onClose}
            className="text-[#888888] hover:text-[#e8e8e8] transition-colors text-xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#888888] mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter short title..."
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#222222] text-[#e8e8e8] text-sm placeholder-[#555555] focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#888888] mb-1.5">Civilization</label>
              <select
                value={civilization}
                onChange={(e) => setCivilization(e.target.value as Civilization)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
              >
                {CIVILIZATIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#888888] mb-1.5">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#888888] mb-1.5">Scheduled Date</label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-[#888888]">Script</label>
              <GenerateButton
                type="script"
                title={title}
                civilization={civilization}
                onGenerated={setScript}
              />
            </div>
            <textarea
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Write or generate the voiceover script..."
              rows={6}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#222222] text-[#e8e8e8] text-sm placeholder-[#555555] focus:border-[#c9a84c]/50 focus:outline-none transition-colors resize-y"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-[#888888]">Image Prompts</label>
              <GenerateButton
                type="image_prompts"
                title={title}
                civilization={civilization}
                existingScript={script}
                onGenerated={setImagePrompts}
              />
            </div>
            <textarea
              value={imagePrompts}
              onChange={(e) => setImagePrompts(e.target.value)}
              placeholder="Write or generate image prompts for each scene..."
              rows={8}
              className="w-full px-3 py-2.5 rounded-lg bg-[#0a0a0a] border border-[#222222] text-[#e8e8e8] text-sm placeholder-[#555555] focus:border-[#c9a84c]/50 focus:outline-none transition-colors resize-y"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#222222]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-[#888888] hover:text-[#e8e8e8] hover:bg-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!title.trim()}
            className="px-5 py-2 rounded-lg text-sm font-bold bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#d4b85d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {editShort ? 'Update Short' : 'Save Short'}
          </button>
        </div>
      </div>
    </div>
  );
}
