import React, { useRef, useEffect, useCallback, useState } from 'react';
import { HSL, RGB } from '../types';
import { hslToRgb, rgbToHex, hexToRgb, rgbToHsl, getReadableTextColor, isValidHex, cleanHex } from '../utils/colorUtils';
import { Copy, Check, Pipette, Sparkles } from 'lucide-react';

interface ColorWheelProps {
  hsl: HSL;
  hex: string;
  rgb: RGB;
  onChangeColor: (newHsl: HSL) => void;
  onRandomize: () => void;
  onCopyText: (text: string, label: string) => void;
}

export const ColorWheel: React.FC<ColorWheelProps> = ({
  hsl,
  hex,
  rgb,
  onChangeColor,
  onRandomize,
  onCopyText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [manualHex, setManualHex] = useState(hex);

  // Keep manual hex field in sync
  useEffect(() => {
    setManualHex(hex);
  }, [hex]);

  // Size definition: 300px standard, responsive on smaller viewports
  const WHEEL_SIZE = 290;
  const RADIUS = WHEEL_SIZE / 2;

  // Draw the circular color wheel
  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = WHEEL_SIZE * dpr;
    canvas.height = WHEEL_SIZE * dpr;
    ctx.scale(dpr, dpr);

    const imgData = ctx.createImageData(WHEEL_SIZE, WHEEL_SIZE);
    const data = imgData.data;

    for (let y = 0; y < WHEEL_SIZE; y++) {
      for (let x = 0; x < WHEEL_SIZE; x++) {
        const dx = x - RADIUS;
        const dy = y - RADIUS;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const index = (y * WHEEL_SIZE + x) * 4;

        if (dist <= RADIUS) {
          let angle = Math.atan2(dy, dx) * (180 / Math.PI);
          if (angle < 0) angle += 360;

          const sat = Math.min(1, dist / RADIUS);
          const rgbCol = hslToRgb(angle, sat * 100, 50);

          let alpha = 255;
          if (dist > RADIUS - 1.5) {
            alpha = Math.max(0, Math.min(255, Math.round(((RADIUS - dist + 1.5) / 1.5) * 255)));
          }

          data[index] = rgbCol.r;
          data[index + 1] = rgbCol.g;
          data[index + 2] = rgbCol.b;
          data[index + 3] = alpha;
        } else {
          data[index + 3] = 0;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);
  }, [RADIUS, WHEEL_SIZE]);

  useEffect(() => {
    drawWheel();
  }, [drawWheel]);

  // Pointer position inside the wheel
  const angleRad = (hsl.h * Math.PI) / 180;
  const dist = (hsl.s / 100) * RADIUS;
  const pointerX = RADIUS + Math.cos(angleRad) * dist;
  const pointerY = RADIUS + Math.sin(angleRad) * dist;

  // Coordinate resolution
  const handlePointerFromCoord = useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scale = WHEEL_SIZE / rect.width;
      const x = (clientX - rect.left) * scale;
      const y = (clientY - rect.top) * scale;

      const dx = x - RADIUS;
      const dy = y - RADIUS;
      const distance = Math.sqrt(dx * dx + dy * dy);

      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (angle < 0) angle += 360;

      const newSat = Math.max(0, Math.min(100, Math.round((distance / RADIUS) * 100)));
      const newHue = Math.round(angle) % 360;

      onChangeColor({
        h: newHue,
        s: newSat,
        l: hsl.l,
      });
    },
    [RADIUS, WHEEL_SIZE, hsl.l, onChangeColor]
  );

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handlePointerFromCoord(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handlePointerFromCoord(e.clientX, e.clientY);
    };
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handlePointerFromCoord]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    setIsDragging(true);
    handlePointerFromCoord(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length === 0) return;
    handlePointerFromCoord(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const copyWithFeedback = (text: string, key: string) => {
    onCopyText(text, key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  const handleNativeColorInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    const newRgb = hexToRgb(newHex);
    if (newRgb) {
      onChangeColor(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  };

  const handleManualHexBlur = () => {
    const clean = cleanHex(manualHex);
    if (isValidHex(clean)) {
      const newRgb = hexToRgb(clean);
      if (newRgb) {
        onChangeColor(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
      }
    } else {
      setManualHex(hex);
    }
  };

  const textColor = getReadableTextColor(hex);
  const rgbString = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslString = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* 1. PICK A COLOR HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          1. Pick a color
        </h2>
        <button
          type="button"
          onClick={onRandomize}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="Pick a random color"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span>Random color</span>
        </button>
      </div>

      {/* WHEEL CONTAINER */}
      <div className="flex flex-col items-center">
        <div
          ref={containerRef}
          className="relative cursor-crosshair select-none touch-none rounded-full p-2 bg-slate-50 dark:bg-slate-800/40 shadow-inner flex items-center justify-center max-w-full"
          style={{ width: 'min(290px, 80vw)', height: 'min(290px, 80vw)' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          role="slider"
          aria-label="Color Wheel"
          aria-valuetext={`Hue ${hsl.h} degrees, Saturation ${hsl.s} percent`}
          tabIndex={0}
        >
          <canvas
            ref={canvasRef}
            className="rounded-full shadow-sm w-full h-full"
          />

          {/* Selector Handle */}
          <div
            className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(pointerX / WHEEL_SIZE) * 100}%`,
              top: `${(pointerY / WHEEL_SIZE) * 100}%`,
            }}
          >
            <div
              className="w-7 h-7 rounded-full border-2 border-white shadow-lg ring-2 ring-black/20 flex items-center justify-center"
              style={{ backgroundColor: hex }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        </div>

        {/* Short Instruction */}
        <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 text-center font-medium">
          Tap anywhere on the wheel to choose a color.
        </p>

        {/* Lightness / Brightness Slider */}
        <div className="w-full max-w-sm mt-4 px-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
            <span>Brightness</span>
            <span className="font-mono">{hsl.l}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={hsl.l}
            onChange={(e) => onChangeColor({ ...hsl, l: Number(e.target.value) })}
            className="w-full h-3 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #000000 0%, hsl(${hsl.h}, ${hsl.s}%, 50%) 50%, #ffffff 100%)`,
            }}
            aria-label="Brightness slider"
          />
        </div>
      </div>

      {/* 4. SHOW THE SELECTED COLOR CLEARLY */}
      <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Your color
        </h3>

        {/* Large Rectangular Preview */}
        <div
          className="w-full h-24 sm:h-28 rounded-2xl p-4 shadow-sm transition-colors duration-150 flex items-center justify-between"
          style={{ backgroundColor: hex, color: textColor }}
        >
          <div>
            <span className="text-xs uppercase font-bold opacity-75 block">Current color</span>
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
              {hex}
            </span>
          </div>

          {/* Simple "Choose a color" device picker */}
          <label className="relative flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md bg-white/20 hover:bg-white/30 cursor-pointer transition-colors shadow-sm text-xs font-bold">
            <Pipette className="w-4 h-4" />
            <span className="hidden sm:inline">Choose a color</span>
            <input
              type="color"
              value={hex}
              onChange={handleNativeColorInput}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
          </label>
        </div>

        {/* Action Bar: Large Copy HEX button + manual hex input */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            onClick={() => copyWithFeedback(hex, 'HEX')}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base shadow-sm transition-all cursor-pointer active:scale-98"
          >
            {copiedKey === 'HEX' ? (
              <>
                <Check className="w-5 h-5 text-emerald-300" />
                <span>Copied {hex}!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span>Copy HEX</span>
              </>
            )}
          </button>

          {/* Quick HEX text edit */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono">
            <span className="text-slate-400">HEX:</span>
            <input
              type="text"
              value={manualHex}
              onChange={(e) => setManualHex(e.target.value)}
              onBlur={handleManualHexBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleManualHexBlur();
              }}
              className="w-20 font-bold bg-transparent focus:outline-none text-slate-800 dark:text-slate-100 uppercase"
              placeholder="#000000"
            />
          </div>
        </div>

        {/* Smaller, easy-to-find options for RGB and HSL */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {/* RGB */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400 uppercase">RGB</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{rgbString}</span>
            </div>
            <button
              type="button"
              onClick={() => copyWithFeedback(rgbString, 'RGB')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {copiedKey === 'RGB' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'RGB' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {/* HSL */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-400 uppercase">HSL</span>
              <span className="font-mono font-medium text-slate-800 dark:text-slate-200">{hslString}</span>
            </div>
            <button
              type="button"
              onClick={() => copyWithFeedback(hslString, 'HSL')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
            >
              {copiedKey === 'HSL' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'HSL' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
