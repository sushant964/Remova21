import { RGB, HSL, HSV, CMYK, HarmonyMode } from '../types';

/**
 * Validate and clean a hex string
 */
export function cleanHex(input: string): string {
  let clean = input.trim();
  if (clean.startsWith('#')) {
    clean = clean.slice(1);
  }
  return clean;
}

export function isValidHex(input: string): boolean {
  const clean = cleanHex(input);
  return /^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(clean);
}

/**
 * Convert HEX to RGB
 */
export function hexToRgb(hex: string): RGB | null {
  if (!isValidHex(hex)) return null;
  let clean = cleanHex(hex);
  if (clean.length === 3) {
    clean = clean
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Convert RGB to HEX string (#RRGGBB)
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (val: number) => clamp(val).toString(16).padStart(2, '0').toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(r: number, g: number, b: number): HSL {
  const rNorm = Math.max(0, Math.min(255, r)) / 255;
  const gNorm = Math.max(0, Math.min(255, g)) / 255;
  const bNorm = Math.max(0, Math.min(255, b)) / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / delta + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / delta + 4;
        break;
    }
    h = h * 60;
  }

  return {
    h: Math.round(h) % 360,
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(h: number, s: number, l: number): RGB {
  const hNorm = ((h % 360) + 360) % 360;
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;

  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const x = c * (1 - Math.abs(((hNorm / 60) % 2) - 1));
  const m = lNorm - c / 2;

  let rPrime = 0;
  let gPrime = 0;
  let bPrime = 0;

  if (hNorm >= 0 && hNorm < 60) {
    rPrime = c;
    gPrime = x;
    bPrime = 0;
  } else if (hNorm >= 60 && hNorm < 120) {
    rPrime = x;
    gPrime = c;
    bPrime = 0;
  } else if (hNorm >= 120 && hNorm < 180) {
    rPrime = 0;
    gPrime = c;
    bPrime = x;
  } else if (hNorm >= 180 && hNorm < 240) {
    rPrime = 0;
    gPrime = x;
    bPrime = c;
  } else if (hNorm >= 240 && hNorm < 300) {
    rPrime = x;
    gPrime = 0;
    bPrime = c;
  } else {
    rPrime = c;
    gPrime = 0;
    bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

/**
 * Convert HSL to HEX
 */
export function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

/**
 * Convert RGB to HSV
 */
export function rgbToHsv(r: number, g: number, b: number): HSV {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;

  let h = 0;
  const s = max === 0 ? 0 : delta / max;
  const v = max;

  if (delta !== 0) {
    if (max === rNorm) {
      h = (gNorm - bNorm) / delta + (gNorm < bNorm ? 6 : 0);
    } else if (max === gNorm) {
      h = (bNorm - rNorm) / delta + 2;
    } else {
      h = (rNorm - gNorm) / delta + 4;
    }
    h = h * 60;
  }

  return {
    h: Math.round(h) % 360,
    s: Math.round(s * 100),
    v: Math.round(v * 100),
  };
}

/**
 * Convert RGB to CMYK
 */
export function rgbToCmyk(r: number, g: number, b: number): CMYK {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const k = 1 - Math.max(rNorm, gNorm, bNorm);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }

  const c = (1 - rNorm - k) / (1 - k);
  const m = (1 - gNorm - k) / (1 - k);
  const y = (1 - bNorm - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

/**
 * Standard WCAG 2.1 relative luminance
 */
export function getRelativeLuminance(rgb: RGB): number {
  const channel = (val: number) => {
    const srgb = val / 255;
    return srgb <= 0.04045 ? srgb / 12.92 : Math.pow((srgb + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(rgb.r) + 0.7152 * channel(rgb.g) + 0.0722 * channel(rgb.b);
}

/**
 * Calculate WCAG contrast ratio between two colors
 */
export function getContrastRatio(rgb1: RGB, rgb2: RGB): number {
  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * High-contrast readable foreground text (#0F172A or #FFFFFF)
 */
export function getReadableTextColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return '#FFFFFF';
  const lum = getRelativeLuminance(rgb);
  return lum > 0.35 ? '#0F172A' : '#FFFFFF';
}

/**
 * Generate Harmony color palettes based on base HSL
 */
export function getHarmonies(baseHsl: HSL, mode: HarmonyMode): string[] {
  const { h, s, l } = baseHsl;
  const mod = (val: number) => ((val % 360) + 360) % 360;

  switch (mode) {
    case 'complementary': {
      return [
        hslToHex(h, s, l),
        hslToHex(mod(h + 180), s, l),
        hslToHex(h, Math.max(20, s - 30), Math.min(90, l + 20)),
        hslToHex(mod(h + 180), Math.max(20, s - 30), Math.max(15, l - 20)),
      ];
    }
    case 'analogous': {
      return [
        hslToHex(mod(h - 60), s, l),
        hslToHex(mod(h - 30), s, l),
        hslToHex(h, s, l),
        hslToHex(mod(h + 30), s, l),
        hslToHex(mod(h + 60), s, l),
      ];
    }
    case 'triadic': {
      return [
        hslToHex(h, s, l),
        hslToHex(mod(h + 120), s, l),
        hslToHex(mod(h + 240), s, l),
      ];
    }
    case 'split-complementary': {
      return [
        hslToHex(h, s, l),
        hslToHex(mod(h + 150), s, l),
        hslToHex(mod(h + 210), s, l),
      ];
    }
    case 'tetradic': {
      return [
        hslToHex(h, s, l),
        hslToHex(mod(h + 90), s, l),
        hslToHex(mod(h + 180), s, l),
        hslToHex(mod(h + 270), s, l),
      ];
    }
    case 'monochromatic': {
      return [
        hslToHex(h, Math.max(20, s - 20), Math.min(92, l + 32)),
        hslToHex(h, Math.max(30, s - 10), Math.min(80, l + 16)),
        hslToHex(h, s, l),
        hslToHex(h, Math.min(100, s + 10), Math.max(18, l - 16)),
        hslToHex(h, Math.min(100, s + 20), Math.max(10, l - 32)),
      ];
    }
  }
}

/**
 * Generate a random pleasing vibrant color
 */
export function getRandomColor(): { hex: string; hsl: HSL; rgb: RGB } {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 35) + 65; // 65-100% saturation
  const l = Math.floor(Math.random() * 25) + 45; // 45-70% lightness
  const hex = hslToHex(h, s, l);
  const rgb = hslToRgb(h, s, l);
  return { hex, hsl: { h, s, l }, rgb };
}
