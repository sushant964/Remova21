import React from 'react';
import { ArrowLeft, Palette, Sparkles, Layers, Sliders, ShieldCheck, Heart } from 'lucide-react';

interface AboutPageProps {
  onNavigateHome: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* BACK BUTTON */}
      <div>
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Color Picker</span>
        </button>
      </div>

      {/* HEADER */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
          <Palette className="w-3.5 h-3.5 text-indigo-500" />
          <span>About Remova</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Simple, Free Color Tools for Everyone
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          Remova is a completely free online tool built to make color selection, palette generation, and gradient creation intuitive, accessible, and fast.
        </p>
      </div>

      {/* MAIN CONTENT CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">What is Remova?</h2>
          <p>
            Remova is an interactive online color wheel picker, color harmony generator, and CSS gradient builder operating directly in your web browser at <strong>remova.in</strong>. Whether you are creating a modern website, painting digital artwork, styling a document, or choosing a brand color scheme, Remova helps you pick the right colors and find matching combinations with zero friction.
          </p>
        </section>

        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Who is Remova For?</h2>
          <p>
            Remova was created with accessibility and simplicity in mind. It is intended for:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Beginners & Students</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Anyone looking to explore colors without needing complicated graphic design software.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Web & App Developers</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Quickly grab HEX, RGB, HSL, and clean CSS gradient code to paste straight into stylesheets.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">UI & Graphic Designers</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Generate complementary, analogous, triadic, and monochromatic schemes in seconds.</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">Digital Artists & Creators</span>
              <span className="text-xs text-slate-600 dark:text-slate-400">Test color harmony balances, brightness adjustments, and contrast ratios on any device.</span>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">What Can You Do with Remova?</h2>
          <ul className="space-y-2.5 list-disc list-inside text-slate-600 dark:text-slate-300 text-sm">
            <li><strong>Interactive Color Wheel:</strong> Tap, click, or drag anywhere on the circular canvas to select any hue and saturation.</li>
            <li><strong>Instant Color Codes:</strong> Copy HEX, RGB, and HSL values with a single tap.</li>
            <li><strong>Color Harmonies:</strong> Explore Opposite, Similar, 3 Colors, 4 Colors, Lighter & Darker, and Split Color schemes.</li>
            <li><strong>CSS Gradient Generator:</strong> Blend two colors together at any angle and copy production-ready CSS code.</li>
            <li><strong>Accessibility Contrast Checker:</strong> Verify WCAG AA and AAA readability for text on backgrounds.</li>
            <li><strong>Multi-Format Converter:</strong> Switch between HEX, RGB, HSL, HSV, and CMYK print values.</li>
            <li><strong>Saved Favorites:</strong> Bookmark favorite color palettes locally in your browser without creating an account.</li>
          </ul>
        </section>

        <section className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Free, Client-Side, and Privacy-First</h2>
          <p>
            Remova performs all color calculations directly in your browser. No personal information is required to use any of the tools. There are no paid tiers, subscriptions, or locked features.
          </p>
        </section>
      </div>

      {/* BOTTOM RETURN CTA */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer active:scale-98"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Remova Color Picker</span>
        </button>
      </div>
    </div>
  );
};
