import React from 'react';

interface FooterProps {
  onNavigate: (section: 'home' | 'services' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-[#0a0a0a] text-slate-500 dark:text-slate-400 py-12 border-t border-slate-200 dark:border-[#262626] transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          © {new Date().getFullYear()} Piyush Pitre. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('home')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </button>
          <button onClick={() => onNavigate('services')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Services
          </button>
          <button onClick={() => onNavigate('contact')} className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};
