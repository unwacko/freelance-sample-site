import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeSection } from './components/HomeSection';
import { ServicesSection } from './components/ServicesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'services' | 'contact'>('home');

  // Always ensure light theme
  useEffect(() => {
    document.documentElement.classList.remove('dark');
  }, []);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'services', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sec as 'home' | 'services' | 'contact');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: 'home' | 'services' | 'contact') => {
    setActiveSection(section);
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans transition-colors duration-200">
      
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <main>
        <HomeSection
          onNavigateToServices={() => handleNavigate('services')}
          onNavigateToContact={() => handleNavigate('contact')}
        />

        <ServicesSection />

        <ContactSection />
      </main>

      <Footer onNavigate={handleNavigate} />

    </div>
  );
}
