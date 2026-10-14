import React, { useState } from 'react';
import { hexToRgb, getContrastRatio, isValidHex, cleanHex } from '../utils/colorUtils';
import { ArrowLeftRight, CheckCircle2, XCircle, ShieldCheck } from 'lucide-react';

interface ContrastCheckerProps {
  initialFg?: string;
  initialBg?: string;
}

export const ContrastChecker: React.FC<ContrastCheckerProps> = ({
  initialFg = '#0F172A',
  initialBg = '#FFFFFF',
}) => {
  const [fgHex, setFgHex] = useState(initialFg);
  const [bgHex, setBgHex] = useState(initialBg);

  const fgRgb = hexToRgb(fgHex) || { r: 15, g: 23, b: 42 };
  const bgRgb = hexToRgb(bgHex) || { r: 255, g: 255, b: 255 };

  const ratio = getContrastRatio(fgRgb, bgRgb);

  // WCAG 2.1 specifications:
  // Normal text (< 18pt or < 14pt bold): AA requires 4.5:1, AAA requires 7:1
  // Large text (>= 18pt or >= 14pt bold): AA requires 3:1, AAA requires 4.5:1
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  const aaaNormal = ratio >= 7.0;
  const aaaLarge = ratio >= 4.5;

  const handleSwap = () => {
    setFgHex(bgHex);
    setBgHex(fgHex);
  };

  const setPreset = (fg: string, bg: string) => {
    setFgHex(fg);
    setBgHex(bg);
  };

  const getBadgeColor = () => {
    if (ratio >= 7) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800';
    if (ratio >= 4.5) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800';
    if (ratio >= 3) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800';
  };

  return (
    <div id="contrast-checker" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              WCAG Color Contrast Checker
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Evaluate accessibility ratios against WCAG 2.1 AA and AAA standards for normal and large typography.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSwap}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer active:scale-95"
            title="Swap foreground and background"
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>Swap Colors</span>
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* COLOR INPUTS */}
        <div className="lg:col-span-5 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Foreground */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Text / Foreground
              </span>
              <div className="flex items-center gap-3">
                <label className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-300 dark:border-slate-600 cursor-pointer shrink-0">
                  <input
                    type="color"
                    value={fgHex}
                    onChange={(e) => setFgHex(e.target.value)}
                    className="absolute -top-4 -left-4 w-20 h-20 opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full" style={{ backgroundColor: fgHex }} />
                </label>
                <input
                  type="text"
                  value={fgHex}
                  onChange={(e) => {
                    setFgHex(e.target.value);
                  }}
                  className="font-mono font-bold text-sm uppercase bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:outline-none w-24 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Background */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 space-y-3">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                Background
              </span>
              <div className="flex items-center gap-3">
                <label className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm border border-slate-300 dark:border-slate-600 cursor-pointer shrink-0">
                  <input
                    type="color"
                    value={bgHex}
                    onChange={(e) => setBgHex(e.target.value)}
                    className="absolute -top-4 -left-4 w-20 h-20 opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full" style={{ backgroundColor: bgHex }} />
                </label>
                <input
                  type="text"
                  value={bgHex}
                  onChange={(e) => {
                    setBgHex(e.target.value);
                  }}
                  className="font-mono font-bold text-sm uppercase bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-blue-500 focus:outline-none w-24 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Quick Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setPreset('#0F172A', '#FFFFFF')}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Dark on White
              </button>
              <button
                type="button"
                onClick={() => setPreset('#FFFFFF', '#0F172A')}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                White on Dark
              </button>
              <button
                type="button"
                onClick={() => setPreset('#4338CA', '#EEF2FF')}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Indigo on Tint
              </button>
              <button
                type="button"
                onClick={() => setPreset('#047857', '#ECFDF5')}
                className="text-xs px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Emerald on Mint
              </button>
            </div>
          </div>

          {/* Ratio Score Card */}
          <div className={`p-6 rounded-2xl border ${getBadgeColor()} flex items-center justify-between`}>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider block opacity-80">
                Contrast Ratio
              </span>
              <div className="text-4xl font-extrabold font-mono mt-1">
                {ratio.toFixed(2)} : 1
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-white/60 dark:bg-black/30 shadow-sm">
                {ratio >= 7 ? 'Superb' : ratio >= 4.5 ? 'Good' : ratio >= 3 ? 'Fair' : 'Poor'}
              </span>
            </div>
          </div>
        </div>

        {/* COMPLIANCE CRITERIA & PREVIEW */}
        <div className="lg:col-span-7 space-y-6">
          {/* WCAG AA & AAA checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* AA Normal */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  AA Normal
                </span>
                <span className="text-[10px] text-slate-400">Min 4.5:1</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 font-bold text-xs">
                {aaNormal ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400">PASS</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-rose-600 dark:text-rose-400">FAIL</span>
                  </>
                )}
              </div>
            </div>

            {/* AA Large */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  AA Large
                </span>
                <span className="text-[10px] text-slate-400">Min 3.0:1 (18pt+)</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 font-bold text-xs">
                {aaLarge ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400">PASS</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-rose-600 dark:text-rose-400">FAIL</span>
                  </>
                )}
              </div>
            </div>

            {/* AAA Normal */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  AAA Normal
                </span>
                <span className="text-[10px] text-slate-400">Min 7.0:1</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 font-bold text-xs">
                {aaaNormal ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400">PASS</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-rose-600 dark:text-rose-400">FAIL</span>
                  </>
                )}
              </div>
            </div>

            {/* AAA Large */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  AAA Large
                </span>
                <span className="text-[10px] text-slate-400">Min 4.5:1</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 font-bold text-xs">
                {aaaLarge ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-emerald-600 dark:text-emerald-400">PASS</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="text-rose-600 dark:text-rose-400">FAIL</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Live Sample Box */}
          <div
            className="rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-200"
            style={{ backgroundColor: bgHex, color: fgHex }}
          >
            <h3 className="text-2xl font-bold tracking-tight">
              Sample Heading (Large Text)
            </h3>
            <p className="mt-2 text-sm leading-relaxed opacity-95">
              The quick brown fox jumps over the lazy dog. Good design ensures that digital interfaces remain readable and delightful for individuals with varying visual acuity and lighting conditions.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-transform cursor-pointer"
                style={{ backgroundColor: fgHex, color: bgHex }}
              >
                Sample Inverted Button
              </button>
              <span className="text-xs font-mono font-medium opacity-80">
                Foreground: {fgHex} / Background: {bgHex}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
