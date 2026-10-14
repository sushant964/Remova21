import React, { useState } from 'react';
import { Copy, Check, ChevronDown, Sparkles, RotateCw } from 'lucide-react';
import { getRandomColor } from '../utils/colorUtils';

interface GradientGeneratorProps {
  initialColor1?: string;
  initialColor2?: string;
  onCopyText: (text: string, label: string) => void;
}

export const GradientGenerator: React.FC<GradientGeneratorProps> = ({
  initialColor1 = '#4F46E5',
  initialColor2 = '#EC4899',
  onCopyText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color1, setColor1] = useState(initialColor1);
  const [color2, setColor2] = useState(initialColor2);
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(false);

  const cssValue = `linear-gradient(${angle}deg, ${color1}, ${color2})`;
  const fullCss = `background: ${cssValue};`;

  const handleCopy = () => {
    onCopyText(fullCss, 'CSS Gradient');
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleRandom = () => {
    setColor1(getRandomColor().hex);
    setColor2(getRandomColor().hex);
    setAngle(Math.floor(Math.random() * 8) * 45);
  };

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
          <div
            className="w-8 h-8 rounded-xl shadow-sm shrink-0 border border-black/10"
            style={{ background: cssValue }}
          />
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Create a Color Gradient
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Blend two colors together and copy the CSS code.
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
          {/* Live Gradient Preview */}
          <div
            className="w-full h-36 sm:h-44 rounded-2xl shadow-inner border border-black/10 dark:border-white/10 flex items-end p-3 transition-all"
            style={{ background: cssValue }}
          >
            <span className="px-3 py-1 rounded-xl bg-black/40 text-white text-xs font-mono backdrop-blur-sm">
              {angle}°
            </span>
          </div>

          {/* Two Color Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Color 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Color 1
                </span>
                <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
                  {color1}
                </span>
              </div>
              <label className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-300 dark:border-slate-600 cursor-pointer shrink-0">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="absolute -top-4 -left-4 w-20 h-20 opacity-0 cursor-pointer"
                />
                <div className="w-full h-full" style={{ backgroundColor: color1 }} />
              </label>
            </div>

            {/* Color 2 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase block mb-1">
                  Color 2
                </span>
                <span className="font-mono font-bold text-sm text-slate-800 dark:text-slate-200">
                  {color2}
                </span>
              </div>
              <label className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-300 dark:border-slate-600 cursor-pointer shrink-0">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="absolute -top-4 -left-4 w-20 h-20 opacity-0 cursor-pointer"
                />
                <div className="w-full h-full" style={{ backgroundColor: color2 }} />
              </label>
            </div>
          </div>

          {/* Simple Angle Control */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <RotateCw className="w-3.5 h-3.5 text-indigo-500" />
                Gradient Angle
              </span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400">{angle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            />
          </div>

          {/* Actions: Copy CSS + Random */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              type="button"
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all cursor-pointer shadow-sm active:scale-98"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied CSS!' : 'Copy CSS Code'}</span>
            </button>

            <button
              type="button"
              onClick={handleRandom}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Random Gradient</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
