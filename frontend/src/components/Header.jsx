import React, { useState, useEffect } from 'react';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1V1bFhWW7LQOU-aU5AZCdURq8XCNU2lBHiUx_-LyWEngNlkaelf4jiwPNPNh4vqqqTR56Jq6abK4_VE34QVXMNzm5lUm5rKZRZXjgv-_NznwUayyS-aeX5RipwNFDYgHTAxxV9TUlYii0G8_Po313ussHVSZDoLzCjhI7mPN71pAPSrQ5B-ZfBg2RMqZIDmO48zmIAejEbOtnqRy7tuB6G58muTYxGZgrfo-E3CCdA";

export default function Header({ activeSection, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'The Salon' },
    { id: 'our-story', label: 'Our Story' },
    { id: 'signature-menu', label: 'Signature Menu' },
    { id: 'the-experience', label: 'The Experience' },
    { id: 'why-2am-to-pm', label: 'Why 2AM to PM' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'visit-us', label: 'Visit Us' },
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-primary/95 backdrop-blur-md shadow-[0_16px_36px_-8px_rgba(45,28,21,0.25)]' 
        : 'bg-primary/90 backdrop-blur-sm'
    }`}>
      <div className="h-20 max-w-[1320px] mx-auto px-margin-desktop flex items-center justify-between">
        
        {/* Brand & Logo */}
        <div className="flex items-center gap-space-md">
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <img
              alt="2AM to PM Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-surface font-semibold tracking-wider uppercase">
                2AM to PM
              </span>
              <span className="font-label-sm text-label-sm text-secondary tracking-[0.2em] uppercase">
                Haute Salon &amp; Cafe
              </span>
            </div>
          </a>

          {/* Opening Status Badge */}
          <div className="hidden xl:flex items-center gap-space-xs pl-space-md ml-space-md border-l border-secondary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-[0.14em]">
              Salon Open: 02:00 AM – 11:59 PM
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-space-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`font-label-md text-label-md uppercase tracking-[0.12em] transition-all duration-200 ${
                  isActive
                    ? 'text-secondary font-medium underline underline-offset-8'
                    : 'text-surface-container-high hover:text-secondary-fixed'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Profile */}
        <div className="flex items-center gap-space-md">
          <a
            href="#visit-us"
            onClick={(e) => { e.preventDefault(); handleNavClick('visit-us'); }}
            className="px-space-md py-space-sm bg-transparent border border-secondary/40 hover:bg-secondary-container/20 text-secondary hover:text-secondary-fixed font-label-md text-label-md uppercase tracking-[0.14em] transition-all duration-300 hidden sm:inline-block"
          >
            Reserve a Table
          </a>

          <div 
            title="Dignitary Privileges"
            className="w-8 h-8 rounded-full bg-primary-container border border-secondary/40 flex items-center justify-center cursor-pointer hover:border-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[18px]">
              person
            </span>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-surface p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl text-secondary">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-primary border-t border-secondary/20 px-6 py-6 space-y-4 shadow-2xl">
          <div className="flex items-center gap-2 pb-2 border-b border-secondary/15">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary-fixed-dim uppercase tracking-wider">
              Continuous Vigil: 02:00 AM – Midnight
            </span>
          </div>
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`font-label-md text-label-md uppercase tracking-[0.12em] py-1 transition-colors ${
                  activeSection === item.id ? 'text-secondary font-semibold' : 'text-surface hover:text-secondary-fixed'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3">
              <a
                href="#visit-us"
                onClick={(e) => { e.preventDefault(); handleNavClick('visit-us'); }}
                className="block text-center w-full py-3 bg-secondary text-primary font-label-md text-label-md uppercase tracking-[0.14em] font-semibold"
              >
                Reserve a Table
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

