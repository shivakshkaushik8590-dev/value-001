import React from 'react';

const HERO_BG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCvKNc-7cp0nfpw9BXrTDr4zlwxERIDEQvrTlxabxdSNMKu7WSdM9jhQlBtnhs8BDUv4FeeqardEpqzWDX1cAoW6H9GEPMoJnoen_dtVTpP8vXWKNJg2EtoAAMfWbtQ4i2VnnQYjIye_HYoUX_uyT_RRHC3fN1DSTzaX6tJvtwWFF3WrctqjvipqYzquJd-7IZt-xs-vWd44tx6JizrW1n71MLFT7EGHbWIufQy_ho";

export default function Hero({ onExploreMenu, onDiscoverStory }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden bg-primary pt-20"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('${HERO_BG}')` }}
      />
      
      {/* Editorial Mood Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,37,29,0.7)_100%)]" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-margin-desktop w-full py-space-xl text-center flex flex-col items-center">
        
        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center gap-space-sm mb-space-lg">
          <span className="px-space-md py-1 bg-surface-container-highest/20 backdrop-blur-md border border-secondary/40 text-secondary-fixed font-label-sm text-label-sm uppercase tracking-[0.24em]">
            Salon N° 14 • 48°51'24"N 2°21'07"E
          </span>
          <span className="px-space-md py-1 bg-surface-container-highest/15 backdrop-blur-md border border-secondary/30 text-surface-container-high font-label-sm text-label-sm uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-ping" />
            Open 02:00 AM — Midnight
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-display lg:text-[76px] lg:leading-[84px] text-surface font-normal tracking-tight max-w-4xl mb-space-md">
          2AM to PM
        </h1>

        <p className="font-display italic text-headline-md lg:text-[34px] text-secondary-fixed mb-space-sm">
          From Late Night Conversations to Golden Morning Coffee.
        </p>

        <p className="font-body-lg text-body-lg text-surface-container-high/90 max-w-2xl font-light tracking-wide mb-space-xl">
          Good Coffee. Timeless Moments. An unbroken sanctuary of European salon heritage where midnight reflections quietly yield to dawn’s first extraction.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-space-md w-full sm:w-auto">
          <a
            href="#signature-menu"
            onClick={(e) => {
              e.preventDefault();
              if (onExploreMenu) onExploreMenu();
              else scrollTo('signature-menu');
            }}
            className="w-full sm:w-auto px-8 py-4 bg-secondary text-primary font-label-md text-label-md tracking-[0.16em] uppercase hover:bg-secondary-fixed transition-colors duration-300 shadow-lg shadow-black/20 font-semibold text-center"
          >
            Explore Our Menu
          </a>
          <a
            href="#our-story"
            onClick={(e) => {
              e.preventDefault();
              if (onDiscoverStory) onDiscoverStory();
              else scrollTo('our-story');
            }}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-secondary/60 text-secondary-fixed font-label-md text-label-md tracking-[0.16em] uppercase hover:bg-secondary/15 transition-all duration-300 text-center"
          >
            Discover Our Story
          </a>
        </div>

        {/* Scroll Indicator */}
        <div 
          onClick={() => scrollTo('our-story')}
          className="mt-space-xl flex flex-col items-center opacity-70 cursor-pointer hover:opacity-100 transition-opacity"
        >
          <span className="font-label-sm text-label-sm text-secondary tracking-[0.25em] uppercase mb-2">
            Descend to Salon
          </span>
          <span className="material-symbols-outlined text-secondary animate-bounce text-xl">
            south
          </span>
        </div>

      </div>
    </section>
  );
}

