import React, { useState } from 'react';
import { ArrowLeft, Mail, Copy, Check, Send } from 'lucide-react';

interface ContactPageProps {
  onNavigateHome: () => void;
}

export const CONTACT_EMAIL = 'remova.support@gmail.com';
export const CONTACT_EMAIL_PLACEHOLDER = CONTACT_EMAIL;

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigateHome }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* BACK BUTTON */}
      <div>
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Color Picker</span>
        </button>
      </div>

      {/* HEADER & INTRODUCTION */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5 text-indigo-500" />
          <span>Get in Touch</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Contact Us
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Have a question, found a bug, or want to share feedback? We'd love to hear from you!
        </p>
      </div>

      {/* MAIN EMAIL CONTACT CARD */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-6 text-center sm:text-left">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Email Support
          </span>
          <div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-indigo-600 hover:text-indigo-700 font-mono tracking-tight break-all transition-colors underline decoration-indigo-200 hover:decoration-indigo-500"
              title="Click to open email app"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
          {/* Main "Email Us" mailto button */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Email Us</span>
          </a>

          {/* Copy Email button */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
            title="Copy email address"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied Email!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-400" />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* RESPONSE NOTE */}
        <div className="pt-4 border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed">
            For the quickest way to reach us, send an email describing your question or feedback. We'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* BOTTOM RETURN CTA */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-sm transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Remova Color Picker</span>
        </button>
      </div>
    </div>
  );
};
