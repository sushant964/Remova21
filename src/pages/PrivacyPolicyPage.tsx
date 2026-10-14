import React from 'react';
import { ArrowLeft, Shield, ExternalLink } from 'lucide-react';
import { CONTACT_EMAIL } from './ContactPage';

interface PrivacyPolicyPageProps {
  onNavigateHome: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onNavigateHome }) => {
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
          <Shield className="w-3.5 h-3.5 text-indigo-500" />
          <span>Transparency & Privacy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: October 2026 • remova.in
        </p>
      </div>

      {/* POLICY CARD */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 space-y-6 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Overview</h2>
          <p>
            Remova (accessible at <strong>https://remova.in</strong>) is committed to protecting your privacy while offering free, easy-to-use color exploration and design tools. This Privacy Policy explains what information is processed when you visit our website, how browser-based features operate, and how planned future services like advertising handle data.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Browser-Local Color Processing</h2>
          <p>
            All color operations on Remova—including the circular color wheel, palette harmony calculations, gradient previews, contrast ratio formulas, and format conversions—are executed <strong>100% locally on your own device</strong> inside your web browser.
          </p>
          <p>
            The colors you click, generate, or copy are never transmitted to our servers or stored in an external database.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Local Storage Usage</h2>
          <p>
            Remova uses your browser’s standard HTML5 Local Storage (<code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">localStorage</code>) exclusively for the <strong>"My Saved Colors"</strong> feature:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-sm">
            <li>Saved color palettes are stored directly in your browser so they remain available when you refresh the page.</li>
            <li>No user account or login is required.</li>
            <li>This information remains on your device and is never sent to our servers.</li>
            <li>You can delete your saved palettes at any time by clicking "Clear all saved" within the tool, or by clearing your browser's site data.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Information Collected by Hosting & Infrastructure</h2>
          <p>
            Like virtually all websites, when you load Remova, the cloud hosting infrastructure (such as edge network servers and cloud runtime containers) automatically records standard web request data in server log files. This may include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-sm">
            <li>Your Internet Protocol (IP) address.</li>
            <li>Browser type and operating system version.</li>
            <li>Referring website addresses and timestamps of requests.</li>
            <li>Requested pages and resources.</li>
          </ul>
          <p className="text-xs text-slate-500">
            This technical log data is used by infrastructure providers to maintain security, prevent abuse (such as DDoS attacks), and ensure reliable service delivery.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Advertising & Cookies</h2>
          <p>
            Remova displays advertisements through third-party advertising partners (including <strong>Adsterra</strong> and future advertising networks such as Google AdSense) to keep all color tools completely free for visitors without charging subscriptions or fees:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 text-sm">
            <li>Advertising partners may use cookies, device identifiers, or web beacons to serve advertisements based on your visits to this website and other sites across the internet.</li>
            <li>These technologies help measure ad delivery, optimize performance, and prevent fraud.</li>
            <li>
              You can choose to opt out of personalized advertising by visiting the{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5"
              >
                Google Ads Settings
                <ExternalLink className="w-3 h-3" />
              </a>{' '}
              or through{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 font-semibold underline inline-flex items-center gap-0.5"
              >
                aboutads.info
                <ExternalLink className="w-3 h-3" />
              </a>.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Third-Party Services</h2>
          <p>
            Remova uses trusted third-party services to render the website:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400 text-sm">
            <li>
              <strong>Google Fonts:</strong> Web fonts are loaded from Google servers. Google may collect request telemetry in accordance with their privacy policy ({' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 dark:text-indigo-400 underline inline-flex items-center gap-0.5"
              >
                Google Privacy Policy
                <ExternalLink className="w-3 h-3" />
              </a>
              ).
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">7. Children’s Privacy</h2>
          <p>
            Remova is an open educational and design tool that does not knowingly collect personally identifiable information from anyone, including children under the age of 13.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">8. Updates to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time to reflect changes in our tools, legal requirements, or advertising integrations. Any updates will be posted on this page with an updated "Last Updated" date.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">9. Contacting Us About Privacy</h2>
          <p>
            If you have questions or concerns regarding this Privacy Policy or how data is handled on Remova, you can reach out via email:
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
