'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !visible) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#c9a84c]/30 text-[#c9a84c] text-sm font-medium shadow-lg shadow-black/50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      }`}
    >
      {message}
    </div>
  );
}
