import React from 'react';
import { experienceItems } from '../data/experienceData';

export default function SensoryExperience() {
  return (
    <section className="w-full py-space-xl bg-primary text-surface" id="the-experience">
      <div className="max-w-[1320px] mx-auto px-margin-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.22em] block mb-2">
              Sensory Architecture
            </span>
            <h2 className="font-headline-lg text-headline-lg text-surface font-normal">
              The Tactile Salon Experience
            </h2>
          </div>
          <p className="font-body-md text-body-md text-surface-container-high max-w-md">
            A physical homage to the 1920s Parisian bistro. Unvarnished authenticity woven into every material contact point.
          </p>
        </div>

        {/* Sensory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
          {experienceItems.map((item) => (
            <div
              key={item.id}
              className="p-space-lg bg-primary-container/40 border border-secondary/25 relative group hover:border-secondary hover:bg-primary-container/60 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-secondary text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 block">
                {item.icon}
              </span>
              <h3 className="font-headline-sm text-headline-sm text-surface mb-2">
                {item.title}
              </h3>
              <p className="font-body-sm text-body-sm text-surface-dim leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

