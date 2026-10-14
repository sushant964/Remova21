import React from 'react';
import { HelpCircle, Palette, Sun, Moon } from 'lucide-react';
import { PageView } from './Footer';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  darkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  darkMode = false,
  onToggleDarkMode,
}) => {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHowToUseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById('how-to-use');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById('how-to-use');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <button
            type="button"
            className="flex items-center gap-2.5 group focus:outline-none cursor-pointer text-left"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 rounded-full p-[2px] bg-gradient-to-tr from-pink-500 via-amber-400 via-emerald-400 to-indigo-600 shadow-sm group-hover:rotate-45 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500" />
              </div>
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Remova
            </span>
          </button>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            {currentPage !== 'home' ? (
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors cursor-pointer"
              >
                <Palette className="w-4 h-4" />
                <span>Color Picker</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleHowToUseClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>How to use</span>
              </button>
            )}

            {/* Dark mode toggle */}
            {onToggleDarkMode && (
              <button
                type="button"
                onClick={onToggleDarkMode}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
