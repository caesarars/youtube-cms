'use client';

import { useState, useEffect, useCallback } from 'react';
import { Short, Status } from '@/lib/types';
import { getShorts, saveShort, deleteShort } from '@/lib/storage';
import ShortCard from '@/components/ShortCard';
import AddShortModal from '@/components/AddShortModal';
import Toast from '@/components/Toast';

const FILTER_TABS: (Status | 'All')[] = ['All', 'Idea', 'Script Ready', 'Visual Ready', 'Published'];

export default function Dashboard() {
  const [shorts, setShorts] = useState<Short[]>([]);
  const [filter, setFilter] = useState<Status | 'All'>('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editShort, setEditShort] = useState<Short | null>(null);
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    setShorts(getShorts());
  }, []);

  const filteredShorts = filter === 'All'
    ? shorts
    : shorts.filter((s) => s.status === filter);

  const stats = {
    total: shorts.length,
    inProduction: shorts.filter((s) => s.status === 'Script Ready' || s.status === 'Visual Ready').length,
    ready: shorts.filter((s) => s.status === 'Visual Ready').length,
    published: shorts.filter((s) => s.status === 'Published').length,
  };

  const handleSave = (short: Short) => {
    saveShort(short);
    setShorts(getShorts());
    setEditShort(null);
    showToast(editShort ? 'Short updated successfully' : 'Short created successfully');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this short?')) {
      deleteShort(id);
      setShorts(getShorts());
      showToast('Short deleted');
    }
  };

  const handleCopy = async (text: string, label: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard`);
    } catch {
      showToast('Failed to copy');
    }
  };

  const showToast = (message: string) => {
    setToast({ show: true, message });
  };

  const closeToast = useCallback(() => {
    setToast({ show: false, message: '' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-[#222222] bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="mr-2">🏛️</span>
            <span className="text-[#c9a84c]">The Ancient Lens</span>
            <span className="text-[#888888] font-normal"> — Content Studio</span>
          </h1>
          <button
            onClick={() => {
              setEditShort(null);
              setModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-[#c9a84c] text-[#0a0a0a] hover:bg-[#d4b85d] transition-colors"
          >
            + Add New Short
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: 'Total Shorts', value: stats.total, color: 'text-[#c9a84c]' },
            { label: 'In Production', value: stats.inProduction, color: 'text-blue-400' },
            { label: 'Ready to Upload', value: stats.ready, color: 'text-purple-400' },
            { label: 'Published', value: stats.published, color: 'text-green-400' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111111] border border-[#222222] rounded-lg px-4 py-3"
            >
              <p className="text-[#888888] text-xs font-medium">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 mb-6 overflow-x-auto pb-1">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                filter === tab
                  ? 'bg-[#c9a84c]/15 text-[#c9a84c] border border-[#c9a84c]/30'
                  : 'text-[#888888] hover:text-[#e8e8e8] hover:bg-[#111111]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Shorts Grid */}
        {filteredShorts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#888888] text-lg">No shorts found</p>
            <p className="text-[#555555] text-sm mt-1">
              {filter === 'All' ? 'Create your first short to get started' : `No shorts with status "${filter}"`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredShorts.map((short) => (
              <ShortCard
                key={short.id}
                short={short}
                onDelete={handleDelete}
                onCopy={handleCopy}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <AddShortModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditShort(null);
        }}
        onSave={handleSave}
        editShort={editShort}
      />

      {/* Toast */}
      <Toast message={toast.message} show={toast.show} onClose={closeToast} />
    </div>
  );
}
