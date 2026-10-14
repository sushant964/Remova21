import React, { useState } from 'react';
import { HSL, HarmonyMode } from '../types';
import { getHarmonies, getReadableTextColor, hexToRgb, rgbToHsl } from '../utils/colorUtils';
import { Copy, Check, Bookmark, BookmarkCheck } from 'lucide-react';

interface PaletteGeneratorProps {
  baseHsl: HSL;
  onSelectColor: (hsl: HSL) => void;
  onCopyText: (text: string, label: string) => void;
  onSavePalette: (name: string, colors: string[], mode: HarmonyMode) => void;
  isAlreadySaved?: boolean;
}

interface SimpleModeOption {
  id: HarmonyMode;
  label: string;
  tooltip: string;
}

const SIMPLE_OPTIONS: SimpleModeOption[] = [
  { id: 'complementary', label: 'Opposite', tooltip: 'High contrast opposite colors' },
  { id: 'analogous', label: 'Similar', tooltip: 'Harmonious neighboring colors' },
  { id: 'triadic', label: '3 Colors', tooltip: 'Three evenly balanced colors' },
  { id: 'tetradic', label: '4 Colors', tooltip: 'Four rich matching colors' },
  { id: 'monochromatic', label: 'Lighter & Darker', tooltip: 'Shades and tints of this hue' },
  { id: 'split-complementary', label: 'Split Colors', tooltip: 'Gentle high-contrast balance' },
];

export const PaletteGenerator: React.FC<PaletteGeneratorProps> = ({
  baseHsl,
  onSelectColor,
  onCopyText,
  onSavePalette,
  isAlreadySaved = false,
}) => {
  const [activeMode, setActiveMode] = useState<HarmonyMode>('complementary');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [saved, setSaved] = useState(false);

  const colors = getHarmonies(baseHsl, activeMode);
  const currentOption = SIMPLE_OPTIONS.find((opt) => opt.id === activeMode);

  const handleCopySingle = (e: React.MouseEvent, hex: string, index: number) => {
    e.stopPropagation();
    onCopyText(hex, 'Color HEX');
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1600);
  };

  const handleCopyAll = () => {
    const text = colors.join(', ');
    onCopyText(text, 'All colors');
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1600);
  };

  const handleSave = () => {
    const name = `${currentOption?.label || 'Palette'} ${colors[0]}`;
    onSavePalette(name, colors, activeMode);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors space-y-6">
      {/* 2. FIND MATCHING COLORS HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            2. Find matching colors
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Choose a style to see colors that look great together.
          </p>
        </div>

        {/* Copy All Colors & Save */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-all cursor-pointer active:scale-95 shadow-sm"
          >
            {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'Copied all!' : 'Copy All Colors'}</span>
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={saved || isAlreadySaved}
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer disabled:opacity-60"
            title="Save palette"
          >
            {saved || isAlreadySaved ? (
              <BookmarkCheck className="w-4 h-4 text-indigo-500" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{saved ? 'Saved' : isAlreadySaved ? 'Saved' : 'Save'}</span>
          </button>
        </div>
      </div>

      {/* SIX SIMPLE SELECTABLE BUTTONS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {SIMPLE_OPTIONS.map((opt) => {
          const isActive = activeMode === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setActiveMode(opt.id)}
              title={opt.tooltip}
              className={`py-2 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer text-center ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* LARGE CLICKABLE SWATCHES WITH HEX BELOW */}
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {colors.map((hex, index) => {
            const isCopied = copiedIndex === index;
            const textColor = getReadableTextColor(hex);

            return (
              <div
                key={`${hex}-${index}`}
                onClick={() => {
                  const rgb = hexToRgb(hex);
                  if (rgb) onSelectColor(rgbToHsl(rgb.r, rgb.g, rgb.b));
                }}
                className="group flex flex-col rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 hover:shadow-md transition-all cursor-pointer"
                title="Tap to select as main color"
              >
                {/* Large Swatch */}
                <div
                  className="h-24 sm:h-28 w-full transition-transform group-hover:scale-[1.03] flex items-end justify-between p-2.5"
                  style={{ backgroundColor: hex }}
                >
                  <span
                    className="text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 rounded-md bg-black/40 text-white"
                  >
                    Select
                  </span>
                </div>

                {/* HEX below swatch + copy */}
                <div className="p-2.5 flex items-center justify-between bg-white dark:bg-slate-900">
                  <span className="font-mono font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                    {hex}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => handleCopySingle(e, hex, index)}
                    className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    title="Copy this color"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-center">
          Tap any color box to make it your current color.
        </p>
      </div>
    </div>
  );
};
