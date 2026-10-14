import React, { useState } from 'react';
import { SavedPalette, HSL } from '../types';
import { hexToRgb, rgbToHsl } from '../utils/colorUtils';
import { Copy, Trash2, ArrowUpRight, Heart, ChevronDown } from 'lucide-react';

interface FavoritesListProps {
  palettes: SavedPalette[];
  onSelectColor: (hsl: HSL) => void;
  onRemovePalette: (id: string) => void;
  onClearAll: () => void;
  onCopyText: (text: string, label: string) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({
  palettes,
  onSelectColor,
  onRemovePalette,
  onClearAll,
  onCopyText,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCopyPalette = (palette: SavedPalette) => {
    onCopyText(palette.colors.join(', '), `Palette`);
  };

  const handleApplyPalette = (palette: SavedPalette) => {
    if (palette.colors.length > 0) {
      const rgb = hexToRgb(palette.colors[0]);
      if (rgb) {
        onSelectColor(rgbToHsl(rgb.r, rgb.g, rgb.b));
      }
    }
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
          <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                My Saved Colors
              </h2>
              {palettes.length > 0 && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {palettes.length}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Palettes saved in your browser.
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
        <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
          {palettes.length === 0 ? (
            <div className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
              Your favorite palettes will appear here.
            </div>
          ) : (
            <>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClearAll}
                  className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
                >
                  Clear all saved
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {palettes.map((palette) => (
                  <div
                    key={palette.id}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate">
                        {palette.name}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleCopyPalette(palette)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
                          title="Copy colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemovePalette(palette.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Swatches strip */}
                    <div
                      className="h-10 w-full rounded-xl overflow-hidden flex shadow-inner cursor-pointer"
                      onClick={() => handleApplyPalette(palette)}
                      title="Tap to load color"
                    >
                      {palette.colors.map((hex, i) => (
                        <div
                          key={`${hex}-${i}`}
                          className="flex-1 h-full"
                          style={{ backgroundColor: hex }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleApplyPalette(palette)}
                      className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span>Use this color</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
