import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Is Remova free to use?',
    answer: 'Yes, Remova is 100% free with no sign-ups, no subscriptions, and no paid limits.',
  },
  {
    question: 'What is a HEX color code?',
    answer:
      'A HEX code (like #4F46E5) is a standard code used by websites, graphic software, and apps to display exact colors.',
  },
  {
    question: 'How do matching colors work?',
    answer:
      'Matching colors are based on classic color harmony rules (like opposite colors or similar colors) that naturally look good together in designs.',
  },
  {
    question: 'Can I use these colors in Figma, Canva, or website code?',
    answer:
      'Yes! Just click "Copy HEX" on any color and paste it directly into Canva, Figma, Photoshop, or your CSS styling.',
  },
];

export const EducationalGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div id="how-to-use" className="space-y-8 scroll-mt-20">
      {/* 3 STEPS SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          How to Use Remova
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col space-y-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Pick a color
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tap anywhere on the colorful wheel or adjust the brightness slider.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col space-y-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Copy or find matches
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Copy your HEX code with one click, or choose a style to discover matching colors.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 flex flex-col space-y-2">
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Use in your project
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Paste the codes straight into Figma, Canva, Photoshop, or your website code.
            </p>
          </div>
        </div>
      </div>

      {/* SHORT FAQ ACCORDION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 transition-colors">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-indigo-500" />
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Common Questions
          </h3>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between text-left gap-3 font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-indigo-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
