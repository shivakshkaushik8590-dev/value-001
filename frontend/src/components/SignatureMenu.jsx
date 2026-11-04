import React, { useState } from 'react';
import { menuCategories, menuItems } from '../data/menuData';

export default function SignatureMenu({ onSelectItem }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCard, setSelectedCard] = useState(null);

  const filteredItems = activeCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  const handleCardClick = (item) => {
    setSelectedCard(item);
    if (onSelectItem) onSelectItem(item);
  };

  return (
    <section className="w-full py-space-xl bg-surface" id="signature-menu">
      <div className="max-w-[1320px] mx-auto px-margin-desktop">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-space-lg">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.2em]">
            The Grand Folio
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary mt-1 mb-2 font-normal">
            Signature Offerings
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Hand-pulled extractions, ancestral viennoiserie, and nocturnal confectionery served with ceremonial grace.
          </p>
        </div>

        {/* Menu Category Tabs */}
        <div className="flex flex-wrap justify-center gap-space-xs sm:gap-space-sm mb-space-lg border-b border-secondary/20 pb-4">
          {menuCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`menu-tab-btn px-space-md py-2 font-label-md text-label-md uppercase tracking-[0.14em] transition-all duration-300 ${
                  isActive
                    ? 'border-b-2 border-secondary text-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:text-primary hover:border-b-2 hover:border-secondary/40'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleCardClick(item)}
              className="menu-card bg-surface-container-low p-space-md border border-secondary/25 flex flex-col justify-between hover:border-secondary hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-secondary transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-label-md text-label-md text-secondary font-semibold ml-2 whitespace-nowrap">
                    {item.price}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-secondary/20 flex justify-between items-center text-on-surface-variant">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                  {item.tag}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {item.volume}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal Preview if an item is clicked */}
        {selectedCard && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSelectedCard(null)}
          >
            <div 
              className="bg-surface border border-secondary max-w-md w-full p-6 shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-2xl">close</span>
              </button>
              <div className="border-b border-secondary/20 pb-3 mb-4">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  {selectedCard.tag} • {selectedCard.volume}
                </span>
                <h3 className="font-headline-md text-headline-md text-primary mt-1">
                  {selectedCard.name}
                </h3>
                <span className="font-display text-xl text-secondary font-semibold">
                  {selectedCard.price}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                {selectedCard.description}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href="#visit-us"
                  onClick={() => setSelectedCard(null)}
                  className="px-6 py-2.5 bg-primary text-surface font-label-md text-label-md uppercase tracking-wider hover:bg-primary-container transition-colors"
                >
                  Order at Salon
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="px-4 py-2 border border-secondary/40 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider hover:bg-surface-container"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

