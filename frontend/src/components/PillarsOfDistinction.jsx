import React from 'react';
import { pillarsData } from '../data/pillarsData';

export default function PillarsOfDistinction() {
  return (
    <section className="w-full py-space-xl bg-surface-container-high/60" id="why-2am-to-pm">
      <div className="max-w-[1320px] mx-auto px-margin-desktop">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-space-xl">
          <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.2em]">
            Pillars of Distinction
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary mt-1 font-normal">
            Why 2AM to PM
          </h2>
        </div>

        {/* 5 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {pillarsData.map((pillar) => (
            <div
              key={pillar.numeral}
              className="bg-surface p-space-md border border-secondary/30 relative flex flex-col justify-between hover:border-secondary transition-all duration-300 hover:shadow-md group"
            >
              <div>
                <span className="font-display text-headline-md text-secondary/50 font-normal group-hover:text-secondary transition-colors">
                  {pillar.numeral}
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary mt-2 mb-2">
                  {pillar.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-6 pt-2 border-t border-secondary/20">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                  {pillar.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

