import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { NFApplicationForm } from './NFApplicationForm';

interface NFApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTrack?: string;
  isDark?: boolean;
}

export const NFApplicationModal: React.FC<NFApplicationModalProps> = ({
  isOpen,
  onClose,
  initialTrack = 'student',
  isDark = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="app-modal-title"
        className={`relative w-full max-w-2xl rounded-2xl border shadow-xl overflow-hidden max-h-[92vh] flex flex-col transition-colors ${
          isDark ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-[#172334] border-[#DCE3EC]'
        }`}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 pb-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <div className="text-[11px] font-bold text-[#D9A72E] uppercase tracking-wider mb-1">
              Incubation Program Application
            </div>
            <h2 id="app-modal-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Apply to NF Venture Studio
            </h2>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
              Naree Foundation Initiative · Pune, Maharashtra
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with Reusable Form */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          <NFApplicationForm
            initialTrack={initialTrack}
            isDark={isDark}
            isModal={true}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};
