import React, { useState } from 'react';
import { galleryItems } from '../data/galleryData';

export default function AtmosphericGallery() {
  const [activePhoto, setActivePhoto] = useState(null);

  return (
    <section className="w-full py-space-xl bg-surface" id="gallery">
      <div className="max-w-[1320px] mx-auto px-margin-desktop">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.22em] block mb-1">
              Archival Visuals
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-normal">
              Atmospheric Gallery
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
            Parisian Registry • Series 24
          </span>
        </div>

        {/* Asymmetrical Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActivePhoto(item)}
              className={`${item.colSpan} relative group overflow-hidden border border-secondary/30 bg-primary cursor-pointer`}
            >
              <div className={`${item.aspectRatio} w-full overflow-hidden`}>
                <img
                  alt={item.alt}
                  src={item.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Plaque Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-space-md bg-gradient-to-t from-primary/95 via-primary/70 to-transparent flex justify-between items-end">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                    {item.tag}
                  </span>
                  <p className="font-headline-sm text-headline-sm text-surface">
                    {item.title}
                  </p>
                </div>
                <span className="font-label-sm text-label-sm text-surface-dim hidden sm:inline">
                  {item.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setActivePhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-primary border border-secondary/50 p-3 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 bg-primary/80 text-surface p-2 hover:text-secondary-fixed transition-colors"
                aria-label="Close photo"
              >
                <span className="material-symbols-outlined text-3xl">close</span>
              </button>

              <div className="w-full max-h-[75vh] overflow-hidden flex items-center justify-center">
                <img
                  alt={activePhoto.alt}
                  src={activePhoto.image}
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              <div className="mt-4 p-3 bg-primary-container border-t border-secondary/30 flex justify-between items-center text-surface">
                <div>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                    {activePhoto.tag}
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-surface">
                    {activePhoto.title}
                  </h4>
                </div>
                <span className="font-label-sm text-label-sm text-surface-dim">
                  {activePhoto.subtext}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

