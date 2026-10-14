export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

export interface HSV {
  h: number; // 0-360
  s: number; // 0-100
  v: number; // 0-100
}

export interface CMYK {
  c: number; // 0-100
  m: number; // 0-100
  y: number; // 0-100
  k: number; // 0-100
}

export interface ColorData {
  hex: string;
  rgb: RGB;
  hsl: HSL;
}

export type HarmonyMode =
  | 'complementary'
  | 'analogous'
  | 'triadic'
  | 'split-complementary'
  | 'tetradic'
  | 'monochromatic';

export interface SavedPalette {
  id: string;
  name: string;
  mode: HarmonyMode | 'custom';
  colors: string[]; // HEX array
  createdAt: number;
}

export interface GradientStop {
  id: string;
  color: string; // HEX
  position: number; // 0-100%
}
