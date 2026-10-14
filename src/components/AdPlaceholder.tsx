import React from 'react';

interface AdPlaceholderProps {
  slotId?: string;
  className?: string;
}

export const AdPlaceholder: React.FC<AdPlaceholderProps> = ({
  slotId = 'content-ad',
  className = '',
}) => {
  return (
    <div
      className={`w-full my-6 flex flex-col items-center justify-center ${className}`}
      aria-label="Advertisement Container"
    >
      <div className="w-full border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-2xl p-3 sm:p-4 text-center transition-colors">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
            Advertisement
          </span>
          <span className="text-[10px] text-slate-300 dark:text-slate-700">•</span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
            Reserved AdSense Space
          </span>
        </div>
        <div className="w-full h-16 sm:h-20 rounded-xl flex items-center justify-center bg-slate-100/50 dark:bg-slate-800/30 text-xs text-slate-400 dark:text-slate-500">
          <p className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500">
            Ad placement area (responsive)
          </p>
        </div>
      </div>
    </div>
  );
};
