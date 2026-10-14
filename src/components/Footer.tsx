import React from 'react';

export type PageView = 'home' | 'about' | 'contact' | 'privacy' | 'terms';

interface FooterProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentPage, onNavigate }) => {
  const handlePageClick = (e: React.MouseEvent, page: PageView) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHowToUseClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('how-to-use');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('how-to-use');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="mt-16 border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
        {/* TOP ROW: Brand and Description */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-800 dark:text-slate-100 text-sm">Remova</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                100% Free Color Tool
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
              Free online color wheel picker, harmony generator, and CSS gradient builder for everyone.
            </p>
          </div>

          <div className="text-xs text-slate-400 dark:text-slate-500">
            <span>Supported by future advertisements</span>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
          <button
            type="button"
            onClick={(e) => handlePageClick(e, 'home')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer ${
              currentPage === 'home' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            Color Picker
          </button>

          <button
            type="button"
            onClick={handleHowToUseClick}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            How to Use
          </button>

          <button
            type="button"
            onClick={(e) => handlePageClick(e, 'about')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer ${
              currentPage === 'about' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            About Us
          </button>

          <button
            type="button"
            onClick={(e) => handlePageClick(e, 'contact')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer ${
              currentPage === 'contact' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            Contact Us
          </button>

          <button
            type="button"
            onClick={(e) => handlePageClick(e, 'privacy')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer ${
              currentPage === 'privacy' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            Privacy Policy
          </button>

          <button
            type="button"
            onClick={(e) => handlePageClick(e, 'terms')}
            className={`hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer ${
              currentPage === 'terms' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            Terms of Use
          </button>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400 dark:text-slate-500">
          <p>© {new Date().getFullYear()} Remova. All rights reserved.</p>
          <p>Client-side color calculations • No account required • remova.in</p>
        </div>
      </div>
    </footer>
  );
};
