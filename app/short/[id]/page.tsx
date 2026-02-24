'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Short, CIVILIZATIONS, STATUSES, Civilization, Status } from '@/lib/types';
import StatusBadge from '@/components/StatusBadge';
import CivilizationBadge from '@/components/CivilizationBadge';
import GenerateButton from '@/components/GenerateButton';
import Toast from '@/components/Toast';

export default function ShortDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [short, setShort] = useState<Short | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Edit form state
  const [title, setTitle] = useState('');
  const [civilization, setCivilization] = useState<Civilization>('Egypt');
  const [status, setStatus] = useState<Status>('Idea');
  const [scheduledDate, setScheduledDate] = useState('');
  const [script, setScript] = useState('');
  const [imagePrompts, setImagePrompts] = useState('');

  useEffect(() => {
    const fetchShort = async () => {
      try {
        const res = await fetch(`/api/shorts/${params.id}`);
        if (!res.ok) {
          setShort(null);
          return;
        }
        const data = await res.json();
        setShort(data);
        setTitle(data.title);
        setCivilization(data.civilization);
        setStatus(data.status);
        setScheduledDate(data.scheduledDate);
        setScript(data.script);
        setImagePrompts(data.imagePrompts);
      } catch (err) {
        console.error('Failed to fetch short:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchShort();
  }, [params.id]);

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const closeToast = useCallback(() => {
    setToast({ show: false, message: '' });
  }, []);

  const handleCopy = async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard`);
    } catch {
      showToast('Failed to copy');
    }
  };

  const handleSave = async () => {
    if (!short) return;
    try {
      const res = await fetch(`/api/shorts/${short._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          civilization,
          status,
          scheduledDate,
          script,
          imagePrompts,
        }),
      });
      const updated = await res.json();
      setShort(updated);
      setEditing(false);
      showToast('Short updated successfully');
    } catch (err) {
      console.error('Failed to update short:', err);
      showToast('Failed to update short');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <svg
          className="animate-spin h-8 w-8 text-[#c9a84c]"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    );
  }

  if (!short) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[#888888]">Short not found</p>
      </div>
    );
  }

  // Parse image prompts into scenes
  const scenes = short.imagePrompts
    ? short.imagePrompts.split(/\n\n/).filter((s) => s.trim())
    : [];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#222222] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">
            <span className="mr-2">🏛️</span>
            <span className="text-[#c9a84c]">The Ancient Lens</span>
          </h1>
          <button
            onClick={() => router.push('/')}
            className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#888888] hover:text-[#e8e8e8] hover:bg-[#111111] transition-colors"
          >
            &larr; Back to Dashboard
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {editing ? (
          /* Edit Mode */
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[#888888] mb-1.5">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#888888] mb-1.5">Civilization</label>
                <select
                  value={civilization}
                  onChange={(e) => setCivilization(e.target.value as Civilization)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
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
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#888888] mb-1.5">Scheduled Date</label>
                <input
                  type="date"
                  value={scheduledDate}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors"
                />
              </div>
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
                rows={8}
                className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors resize-y"
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
                rows={12}
                className="w-full px-3 py-2.5 rounded-lg bg-[#111111] border border-[#222222] text-[#e8e8e8] text-sm focus:border-[#c9a84c]/50 focus:outline-none transition-colors resize-y"
              />
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-[#222222]">
              <button
                onClick={handleSave}
                className="px-5 py-2 rounded-lg text-sm font-bold bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#d4b85d] transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setTitle(short.title);
                  setCivilization(short.civilization);
                  setStatus(short.status);
                  setScheduledDate(short.scheduledDate);
                  setScript(short.script);
                  setImagePrompts(short.imagePrompts);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#888888] hover:text-[#e8e8e8] hover:bg-[#111111] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* View Mode */
          <div className="space-y-8">
            {/* Title & Meta */}
            <div>
              <h2 className="text-2xl font-bold text-[#e8e8e8] mb-3">{short.title}</h2>
              <div className="flex items-center gap-3 flex-wrap">
                <CivilizationBadge civilization={short.civilization} />
                <StatusBadge status={short.status} />
                {short.scheduledDate && (
                  <span className="text-[#888888] text-sm">
                    Scheduled: {new Date(short.scheduledDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 px-4 py-2 rounded-lg text-sm font-medium bg-[#111111] border border-[#222222] text-[#c9a84c] hover:bg-[#1a1a1a] hover:border-[#c9a84c]/30 transition-colors"
              >
                ✏️ Edit Short
              </button>
            </div>

            {/* Script Section */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#c9a84c]">Script</h3>
                <button
                  onClick={() => handleCopy(short.script, 'Script')}
                  disabled={!short.script}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-[#888888] hover:text-[#e8e8e8] hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  📋 Copy Script
                </button>
              </div>
              {short.script ? (
                <p className="text-[#e8e8e8] text-sm leading-relaxed whitespace-pre-wrap">
                  {short.script}
                </p>
              ) : (
                <p className="text-[#555555] text-sm italic">No script written yet</p>
              )}
            </div>

            {/* Image Prompts Section */}
            <div className="bg-[#111111] border border-[#222222] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-[#c9a84c]">Image Prompts</h3>
                <button
                  onClick={() => handleCopy(short.imagePrompts, 'All Image Prompts')}
                  disabled={!short.imagePrompts}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium text-[#888888] hover:text-[#e8e8e8] hover:bg-[#1a1a1a] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  📋 Copy All
                </button>
              </div>
              {scenes.length > 0 ? (
                <div className="space-y-4">
                  {scenes.map((scene, i) => (
                    <div
                      key={i}
                      className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <p className="text-[#e8e8e8] text-sm leading-relaxed whitespace-pre-wrap flex-1">
                          {scene}
                        </p>
                        <button
                          onClick={() => handleCopy(scene, `Scene ${i + 1}`)}
                          className="shrink-0 px-2 py-1 rounded text-xs text-[#888888] hover:text-[#e8e8e8] hover:bg-[#1a1a1a] transition-colors"
                          title={`Copy Scene ${i + 1}`}
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#555555] text-sm italic">No image prompts written yet</p>
              )}
            </div>
          </div>
        )}
      </main>

      <Toast message={toast.message} show={toast.show} onClose={closeToast} />
    </div>
  );
}
