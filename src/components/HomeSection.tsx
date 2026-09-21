import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface HomeSectionProps {
  onNavigateToServices: () => void;
  onNavigateToContact: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  onNavigateToServices,
  onNavigateToContact
}) => {
  return (
    <section id="home" className="py-24 md:py-36 relative overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-red-950/30 text-blue-700 dark:text-red-400 text-xs font-semibold border border-blue-200 dark:border-red-900/50">
            Freelance Services
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Piyush Pitre
          </h1>

          <p className="text-xl sm:text-2xl font-normal text-slate-600 dark:text-slate-300 leading-relaxed">
            Independent contractor and platform specialist offering professional data annotation, data labelling, and translation services.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-8 rounded-3xl bg-slate-50 dark:bg-[#141414] border border-slate-200 dark:border-[#262626] space-y-6"
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Platforms & Independent Work
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            I perform freelance services across major industry platforms including <strong className="text-slate-900 dark:text-white">Mercor, Welocalize, OneForma, and Outlier</strong>, alongside direct independent projects for organizations and researchers.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <a
              href="https://www.mercor.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-center font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              Mercor
            </a>
            <a
              href="https://www.welocalize.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-center font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              Welocalize
            </a>
            <a
              href="https://www.oneforma.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-center font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              OneForma
            </a>
            <a
              href="https://outlier.ai/?utm_source=google&utm_medium=paid&utm_term=entry%20level%20marketing%20jobs%20near%20me&language=EN"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-center font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 hover:border-blue-500 hover:text-blue-600 transition-colors"
            >
              Outlier
            </a>
            <div className="p-3.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-[#262626] text-center font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-200 col-span-2 sm:col-span-1">
              Independent
            </div>
          </div>
        </motion.div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={onNavigateToServices}
            className="px-6 py-3.5 rounded-xl bg-blue-600 dark:bg-red-600 text-white font-bold text-sm hover:opacity-95 transition-opacity flex items-center gap-2 shadow-sm"
          >
            <span>View Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onNavigateToContact}
            className="px-6 py-3.5 rounded-xl bg-slate-100 dark:bg-[#141414] text-slate-900 dark:text-white font-bold text-sm border border-slate-200 dark:border-[#262626] hover:bg-slate-200 dark:hover:bg-[#1f1f1f] transition-colors"
          >
            Contact Inquiry
          </button>
        </div>

      </div>
    </section>
  );
};
