import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { CONTACT_EMAIL } from './ContactPage';

interface TermsPageProps {
  onNavigateHome: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigateHome }) => {
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
          <FileText className="w-3.5 h-3.5 text-indigo-500" />
          <span>Terms & Conditions</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Terms of Use
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: October 2026 • remova.in
        </p>
      </div>

      {/* TERMS CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using Remova (https://remova.in), you agree to these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the website.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Free Utility & Intended Use</h2>
          <p>
            Remova is provided completely free of charge as an interactive design and color utility. It is intended to help creators, students, developers, and designers pick colors, inspect hex/rgb/hsl values, generate color harmonies, create gradients, and test contrast ratios.
          </p>
          <p>
            No accounts, subscriptions, or payments are required to access any of the tools.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Use of Generated Colors & Code</h2>
          <p>
            You are entirely free to use any color hex codes, RGB values, HSL values, color palettes, and CSS gradient snippets generated with Remova in your personal, educational, or commercial projects (including websites, digital artwork, software, prints, and branding).
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <strong>Your Responsibility:</strong> You are solely responsible for how you apply and implement the colors and code in your own projects, including verifying brand suitability, print fidelity, and accessibility compliance.
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Availability & "As Is" Service</h2>
          <p>
            Remova is provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis without warranties of any kind, whether express or implied.
          </p>
          <p>
            While we strive for high reliability and smooth operation, we do not guarantee that the website will always be uninterrupted, error-free, or available at all times. Service may occasionally be updated, modified, or suspended for maintenance.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Acceptable Use</h2>
          <p>
            When using Remova, you agree not to:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-300 text-sm">
            <li>Attempt to disrupt, overload, or compromise the server infrastructure delivering the website.</li>
            <li>Use automated scripts or scrapers in an abusive manner that degrades site performance for others.</li>
            <li>Misrepresent your affiliation with Remova or attempt to impersonate the website.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Intellectual Property</h2>
          <p>
            The Remova name, logo, custom user interface graphics, and site layout are the property of Remova. You may not duplicate or resell the website itself as a competing software product.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Changes to Terms</h2>
          <p>
            We may revise these Terms of Use at any time. When changes occur, the updated version will be published here with a renewed "Last Updated" date. Continued use of Remova constitutes acceptance of the modified terms.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. Questions & Contact</h2>
          <p>
            If you have questions about these Terms of Use, please contact:
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
            Email:{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </div>

      {/* BOTTOM RETURN */}
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
