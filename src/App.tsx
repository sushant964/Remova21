/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { HSL, HarmonyMode, SavedPalette } from './types';
import { hslToRgb, rgbToHex, hexToRgb, rgbToHsl, getRandomColor } from './utils/colorUtils';
import { Navbar } from './components/Navbar';
import { ColorWheel } from './components/ColorWheel';
import { PaletteGenerator } from './components/PaletteGenerator';
import { GradientGenerator } from './components/GradientGenerator';
import { FavoritesList } from './components/FavoritesList';
import { MoreColorTools } from './components/MoreColorTools';
import { EducationalGuide } from './components/EducationalGuide';
import { AdPlaceholder } from './components/AdPlaceholder';
import { Footer, PageView } from './components/Footer';
import { Toast } from './components/Toast';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

function getPageFromHash(): PageView {
  const hash = window.location.hash.toLowerCase();
  if (hash.includes('about')) return 'about';
  if (hash.includes('contact')) return 'contact';
  if (hash.includes('privacy')) return 'privacy';
  if (hash.includes('terms')) return 'terms';
  return 'home';
}

export default function App() {
  // Page Navigation State
  const [currentPage, setCurrentPage] = useState<PageView>(getPageFromHash);

  // Main Color State (starts on a vibrant friendly Indigo #4F46E5)
  const [hsl, setHsl] = useState<HSL>({ h: 243, s: 75, l: 59 });
  const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  // Saved Palettes State (persisted in localStorage with backwards compatibility)
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(() => {
    const stored =
      localStorage.getItem('remova_palettes') || localStorage.getItem('chromawheel_palettes');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Toast feedback state
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  // Ensure light mode is strictly active at all times
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('remova_theme');
    localStorage.removeItem('chromawheel_theme');
  }, []);

  // Listen to browser hash changes (for back/forward navigation and links)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Persist saved palettes
  useEffect(() => {
    localStorage.setItem('remova_palettes', JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  const handleNavigate = useCallback((page: PageView) => {
    setCurrentPage(page);
    if (page === 'home') {
      window.location.hash = '';
    } else {
      window.location.hash = `#${page}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const showToast = useCallback((message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 2000);
  }, []);

  const handleCopyText = useCallback(
    (text: string, label: string) => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(
          () => showToast(`Copied ${label}!`),
          () => showToast(`Copied: ${text}`)
        );
      } else {
        showToast(`Copied ${label}!`);
      }
    },
    [showToast]
  );

  const handleRandomizeColor = useCallback(() => {
    const random = getRandomColor();
    setHsl(random.hsl);
  }, []);

  const handleHexChange = useCallback((newHex: string) => {
    const newRgb = hexToRgb(newHex);
    if (newRgb) {
      setHsl(rgbToHsl(newRgb.r, newRgb.g, newRgb.b));
    }
  }, []);

  const handleSavePalette = useCallback(
    (name: string, colors: string[], mode: HarmonyMode) => {
      const newPalette: SavedPalette = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        mode,
        colors,
        createdAt: Date.now(),
      };
      setSavedPalettes((prev) => [newPalette, ...prev]);
      showToast('Saved to your favorites!');
    },
    [showToast]
  );

  const handleRemovePalette = useCallback(
    (id: string) => {
      setSavedPalettes((prev) => prev.filter((p) => p.id !== id));
      showToast('Removed from favorites');
    },
    [showToast]
  );

  const handleClearAllPalettes = useCallback(() => {
    if (window.confirm('Clear all your saved colors?')) {
      setSavedPalettes([]);
      showToast('All saved colors cleared');
    }
  }, [showToast]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-200">
      {/* 1. SIMPLE HEADER */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* RENDER ACTIVE PAGE */}
      {currentPage === 'about' && (
        <main className="flex-1">
          <AboutPage onNavigateHome={() => handleNavigate('home')} />
        </main>
      )}

      {currentPage === 'contact' && (
        <main className="flex-1">
          <ContactPage onNavigateHome={() => handleNavigate('home')} />
        </main>
      )}

      {currentPage === 'privacy' && (
        <main className="flex-1">
          <PrivacyPolicyPage onNavigateHome={() => handleNavigate('home')} />
        </main>
      )}

      {currentPage === 'terms' && (
        <main className="flex-1">
          <TermsPage onNavigateHome={() => handleNavigate('home')} />
        </main>
      )}

      {currentPage === 'home' && (
        /* MAIN COLOR WHEEL HOME CONTAINER */
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10">
          {/* 2. SIMPLE INTRODUCTION */}
          <section className="text-center space-y-2 pt-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Find Your Perfect Color
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-lg mx-auto">
              Pick a color, discover beautiful combinations, and copy your color code in seconds.
            </p>
          </section>

          {/* 3 & 4. MAIN COLOR WHEEL & SELECTED COLOR */}
          <section aria-label="Color Wheel">
            <ColorWheel
              hsl={hsl}
              hex={hex}
              rgb={rgb}
              onChangeColor={setHsl}
              onRandomize={handleRandomizeColor}
              onCopyText={handleCopyText}
            />
          </section>

          {/* 5. MATCHING COLORS / PALETTES */}
          <section aria-label="Matching Colors">
            <PaletteGenerator
              baseHsl={hsl}
              onSelectColor={setHsl}
              onCopyText={handleCopyText}
              onSavePalette={handleSavePalette}
            />
          </section>

          {/* 10. ADVERTISEMENT 1: Below main color tool and its palette */}
          <AdPlaceholder slotId="palette-ad" />

          {/* 6. COLLAPSIBLE GRADIENT TOOL */}
          <section aria-label="Gradient Generator">
            <GradientGenerator
              initialColor1={hex}
              initialColor2="#EC4899"
              onCopyText={handleCopyText}
            />
          </section>

          {/* 7. COLLAPSIBLE FAVORITES: My Saved Colors */}
          <section aria-label="My Saved Colors">
            <FavoritesList
              palettes={savedPalettes}
              onSelectColor={setHsl}
              onRemovePalette={handleRemovePalette}
              onClearAll={handleClearAllPalettes}
              onCopyText={handleCopyText}
            />
          </section>

          {/* 8. COLLAPSIBLE MORE COLOR TOOLS (Contrast & Converter) */}
          <section aria-label="More Color Tools">
            <MoreColorTools
              currentColorHex={hex}
              onColorChange={handleHexChange}
              onCopyText={handleCopyText}
            />
          </section>

          {/* 10. ADVERTISEMENT 2: Near bottom of page, before FAQ */}
          <AdPlaceholder slotId="bottom-ad" />

          {/* 9. HOW TO USE & FAQ */}
          <section aria-label="How to use">
            <EducationalGuide />
          </section>
        </main>
      )}

      {/* FOOTER */}
      <Footer currentPage={currentPage} onNavigate={handleNavigate} />

      {/* TOAST FEEDBACK */}
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
}
