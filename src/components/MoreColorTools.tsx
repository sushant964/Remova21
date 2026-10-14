import React, { useState } from 'react';
import { ContrastChecker } from './ContrastChecker';
import { ColorConverter } from './ColorConverter';
import { Sliders, ChevronDown } from 'lucide-react';

interface MoreColorToolsProps {
  currentColorHex: string;
  onColorChange: (newHex: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const MoreColorTools: React.FC<MoreColorToolsProps> = ({
  currentColorHex,
  onColorChange,
  onCopyText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'contrast' | 'converter'>('contrast');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors overflow-hidden">
      {/* COLLAPSIBLE HEADER */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 sm:p-7 flex items-center justify-between text-left hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-500 flex items-center justify-center shrink-0">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              More Color Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Check contrast accessibility and convert color formats.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hidden sm:inline">
            {isOpen ? 'Close' : 'Open'}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180 text-indigo-500' : ''
            }`}
          />
        </div>
      </button>

      {/* EXPANDABLE BODY */}
      {isOpen && (
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-6">
          {/* Sub tabs */}
          <div className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
            <button
              type="button"
              onClick={() => setActiveTab('contrast')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'contrast'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Contrast Checker
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('converter')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'converter'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Color Converter
            </button>
          </div>

          {activeTab === 'contrast' ? (
            <ContrastChecker initialFg={currentColorHex} initialBg="#FFFFFF" />
          ) : (
            <ColorConverter
              currentColorHex={currentColorHex}
              onColorChange={onColorChange}
              onCopyText={onCopyText}
            />
          )}
        </div>
      )}
    </div>
  );
};
