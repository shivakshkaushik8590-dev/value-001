import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import SignatureMenu from './components/SignatureMenu';
import SensoryExperience from './components/SensoryExperience';
import PillarsOfDistinction from './components/PillarsOfDistinction';
import AtmosphericGallery from './components/AtmosphericGallery';
import ReservationAndVisit from './components/ReservationAndVisit';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sections = ['hero', 'our-story', 'signature-menu', 'the-experience', 'why-2am-to-pm', 'gallery', 'visit-us'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased selection:bg-secondary selection:text-surface min-h-screen flex flex-col">
      {/* Fixed Sticky Header */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Sections */}
      <main className="w-full flex-grow">
        <Hero
          onExploreMenu={() => handleNavigate('signature-menu')}
          onDiscoverStory={() => handleNavigate('our-story')}
        />
        <OurStory />
        <SignatureMenu />
        <SensoryExperience />
        <PillarsOfDistinction />
        <AtmosphericGallery />
        <ReservationAndVisit />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

