import React, { useState, useEffect } from 'react';
import { HSL, RGB, HSV, CMYK } from '../types';
import {
  hexToRgb,
  rgbToHex,
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  rgbToCmyk,
  isValidHex,
  cleanHex,
  getReadableTextColor,
} from '../utils/colorUtils';
import { Copy, Check, ArrowRightLeft, AlertCircle } from 'lucide-react';

interface ColorConverterProps {
  currentColorHex: string;
  onColorChange: (newHex: string) => void;
  onCopyText: (text: string, label: string) => void;
}

export const ColorConverter: React.FC<ColorConverterProps> = ({
  currentColorHex,
  onColorChange,
  onCopyText,
}) => {
  // Input fields state
  const [hexVal, setHexVal] = useState(currentColorHex);
  const [rVal, setRVal] = useState('0');
  const [gVal, setGVal] = useState('0');
  const [bVal, setBVal] = useState('0');

  const [hVal, setHVal] = useState('0');
  const [sVal, setSVal] = useState('0');
  const [lVal, setLVal] = useState('0');

  const [errorMsg, setErrorMsg] = useState<{ field: string; message: string } | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Sync inputs whenever external currentColorHex changes
  useEffect(() => {
    const rgb = hexToRgb(currentColorHex);
    if (rgb) {
      setHexVal(currentColorHex);
      setRVal(String(rgb.r));
      setGVal(String(rgb.g));
      setBVal(String(rgb.b));

      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      setHVal(String(hsl.h));
      setSVal(String(hsl.s));
      setLVal(String(hsl.l));
      setErrorMsg(null);
    }
  }, [currentColorHex]);

  // Derive secondary formats
  const currentRgb = hexToRgb(currentColorHex) || { r: 99, g: 102, b: 241 };
  const currentHsv = rgbToHsv(currentRgb.r, currentRgb.g, currentRgb.b);
  const currentCmyk = rgbToCmyk(currentRgb.r, currentRgb.g, currentRgb.b);

  const handleHexChange = (val: string) => {
    setHexVal(val);
    const clean = cleanHex(val);
    if (!val.trim()) {
      setErrorMsg({ field: 'hex', message: 'HEX code cannot be empty.' });
      return;
    }
    if (!isValidHex(clean)) {
      setErrorMsg({ field: 'hex', message: 'Invalid HEX code. Use format #RRGGBB (e.g. #3B82F6).' });
      return;
    }
    setErrorMsg(null);
    const rgb = hexToRgb(clean);
    if (rgb) {
      onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
    }
  };

  const handleRgbChange = (rStr: string, gStr: string, bStr: string) => {
    setRVal(rStr);
    setGVal(gStr);
    setBVal(bStr);

    const r = parseInt(rStr, 10);
    const g = parseInt(gStr, 10);
    const b = parseInt(bStr, 10);

    if (isNaN(r) || isNaN(g) || isNaN(b)) {
      setErrorMsg({ field: 'rgb', message: 'RGB values must be valid numbers.' });
      return;
    }
    if (r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      setErrorMsg({ field: 'rgb', message: 'RGB channels must be between 0 and 255.' });
      return;
    }

    setErrorMsg(null);
    onColorChange(rgbToHex(r, g, b));
  };

  const handleHslChange = (hStr: string, sStr: string, lStr: string) => {
    setHVal(hStr);
    setSVal(sStr);
    setLVal(lStr);

    const h = parseInt(hStr, 10);
    const s = parseInt(sStr, 10);
    const l = parseInt(lStr, 10);

    if (isNaN(h) || isNaN(s) || isNaN(l)) {
      setErrorMsg({ field: 'hsl', message: 'HSL values must be valid numbers.' });
      return;
    }
    if (h < 0 || h > 360) {
      setErrorMsg({ field: 'hsl', message: 'Hue (H) must be between 0° and 360°.' });
      return;
    }
    if (s < 0 || s > 100 || l < 0 || l > 100) {
      setErrorMsg({ field: 'hsl', message: 'Saturation and Lightness must be between 0% and 100%.' });
      return;
    }

    setErrorMsg(null);
    const rgb = hslToRgb(h, s, l);
    onColorChange(rgbToHex(rgb.r, rgb.g, rgb.b));
  };

  const copyField = (text: string, key: string) => {
    onCopyText(text, key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1600);
  };

  const rgbFormatted = `rgb(${currentRgb.r}, ${currentRgb.g}, ${currentRgb.b})`;
  const hslFormatted = `hsl(${hVal}, ${sVal}%, ${lVal}%)`;
  const hsvFormatted = `hsv(${currentHsv.h}°, ${currentHsv.s}%, ${currentHsv.v}%)`;
  const cmykFormatted = `cmyk(${currentCmyk.c}%, ${currentCmyk.m}%, ${currentCmyk.y}%, ${currentCmyk.k}%)`;

  return (
    <div id="color-converter" className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Color Converter
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Convert color formats in real-time across HEX, RGB, HSL, HSV, and CMYK with active input validation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl shadow-sm border border-black/10 shrink-0"
            style={{ backgroundColor: currentColorHex }}
            title="Active color"
          />
          <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
            {currentColorHex}
          </span>
        </div>
      </div>

      {errorMsg && (
        <div className="mt-6 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg.message}</span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* HEX INPUT */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              HEX
            </span>
            <button
              type="button"
              onClick={() => copyField(hexVal, 'hex')}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer"
              title="Copy HEX"
            >
              {copiedKey === 'hex' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <input
            type="text"
            value={hexVal}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full font-mono text-base font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
            placeholder="#3B82F6"
          />
          <span className="text-[10px] text-slate-400">e.g. #4F46E5</span>
        </div>

        {/* RGB INPUT */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              RGB (0-255)
            </span>
            <button
              type="button"
              onClick={() => copyField(rgbFormatted, 'rgb')}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer"
              title="Copy RGB"
            >
              {copiedKey === 'rgb' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">R</label>
              <input
                type="number"
                min="0"
                max="255"
                value={rVal}
                onChange={(e) => handleRgbChange(e.target.value, gVal, bVal)}
                className="w-full font-mono text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">G</label>
              <input
                type="number"
                min="0"
                max="255"
                value={gVal}
                onChange={(e) => handleRgbChange(rVal, e.target.value, bVal)}
                className="w-full font-mono text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">B</label>
              <input
                type="number"
                min="0"
                max="255"
                value={bVal}
                onChange={(e) => handleRgbChange(rVal, gVal, e.target.value)}
                className="w-full font-mono text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-mono truncate">{rgbFormatted}</span>
        </div>

        {/* HSL INPUT */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              HSL (Hue, Sat, Light)
            </span>
            <button
              type="button"
              onClick={() => copyField(hslFormatted, 'hsl')}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer"
              title="Copy HSL"
            >
              {copiedKey === 'hsl' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">H (°)</label>
              <input
                type="number"
                min="0"
                max="360"
                value={hVal}
                onChange={(e) => handleHslChange(e.target.value, sVal, lVal)}
                className="w-full font-mono text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">S (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={sVal}
                onChange={(e) => handleHslChange(hVal, e.target.value, lVal)}
                className="w-full font-mono text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 block mb-0.5">L (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={lVal}
                onChange={(e) => handleHslChange(hVal, sVal, e.target.value)}
                className="w-full font-mono text-sm font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-2 text-center text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-400 font-mono truncate">{hslFormatted}</span>
        </div>

        {/* HSV READOUT */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              HSV / HSB
            </span>
            <button
              type="button"
              onClick={() => copyField(hsvFormatted, 'hsv')}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer"
              title="Copy HSV"
            >
              {copiedKey === 'hsv' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="font-mono text-sm font-bold p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
            {hsvFormatted}
          </div>
          <span className="text-[10px] text-slate-400">Hue, Saturation, Value (Brightness)</span>
        </div>

        {/* CMYK READOUT (Print standard) */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              CMYK (Print)
            </span>
            <button
              type="button"
              onClick={() => copyField(cmykFormatted, 'cmyk')}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer"
              title="Copy CMYK"
            >
              {copiedKey === 'cmyk' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="font-mono text-sm font-bold p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100">
            {cmykFormatted}
          </div>
          <span className="text-[10px] text-slate-400">Cyan, Magenta, Yellow, Key (Black)</span>
        </div>

        {/* CSS COLOR NOTATION */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              CSS Modern Color 4
            </span>
            <button
              type="button"
              onClick={() => copyField(`color(srgb ${currentRgb.r/255} ${currentRgb.g/255} ${currentRgb.b/255})`, 'css4')}
              className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-pointer"
              title="Copy CSS notation"
            >
              {copiedKey === 'css4' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
          <div className="font-mono text-xs font-bold p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 truncate">
            {`hsl(${hVal}deg ${sVal}% ${lVal}%)`}
          </div>
          <span className="text-[10px] text-slate-400">Space-separated modern CSS syntax</span>
        </div>
      </div>
    </div>
  );
};
