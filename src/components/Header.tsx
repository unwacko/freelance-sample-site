import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: 'home' | 'services' | 'contact';
  onNavigate: (section: 'home' | 'services' | 'contact') => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-[#0a0a0a]/90 border-b border-slate-200 dark:border-[#262626] transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Name / Brand */}
        <div 
          onClick={() => onNavigate('home')} 
          className="cursor-pointer group"
        >
          <div className="font-bold text-lg text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-red-500 transition-colors">
            Piyush Pitre
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Freelance Services
          </div>
        </div>

        {/* Desktop Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-[#141414] p-1.5 rounded-full border border-slate-200 dark:border-[#262626]">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 dark:bg-red-600 text-white font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive ? <strong>{item.label}</strong> : item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#141414]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-white dark:bg-[#0a0a0a] border-b border-slate-200 dark:border-[#262626] space-y-3">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-left font-medium text-base transition-colors ${
                    isActive
                      ? 'bg-blue-600 dark:bg-red-600 text-white font-bold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#141414]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
