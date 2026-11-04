import React from 'react';

const STORY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAYLEJoSkfOlUmA5V29-Oqx4oF2LP5Lbfogcsq8nue3Ttc9WRfSHVs06ODxZTwu4dQBocF6QXvhiI2LaN-wUrodKApwsiKrClVsQsH4QKQfcMnkMVTJXbJcuXGC9fnV68vLS8K_V6JPpLgjWsXNwu56WTlyG2tDpoCbTdhuFL8KDdTDpVU8jD-VHAXialBvzlMP9gu0-hjzoPo0ZR-aoon0inh3F30vnI5T3Ufyb1A";

export default function OurStory() {
  return (
    <section className="w-full py-space-xl bg-surface-container-low" id="our-story">
      <div className="max-w-[1320px] mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-center">
          
          {/* Left: Image Frame & Quote Plaque */}
          <div className="lg:col-span-6 relative">
            <div className="p-3 bg-surface-container border border-secondary/30 shadow-md">
              <div className="relative overflow-hidden aspect-[4/5] bg-primary">
                <img
                  alt="Artisanal hand-lever espresso extraction"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  src={STORY_IMG}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Editorial Plaque */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-primary text-surface p-space-md max-w-xs border border-secondary/40 shadow-xl">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] block mb-1">
                Rituel du Matin
              </span>
              <p className="font-display italic text-headline-sm text-secondary-fixed leading-tight">
                “Coffee conceived as an art of time.”
              </p>
            </div>
          </div>

          {/* Right: Narrative & Heritage Milestones */}
          <div className="lg:col-span-6 space-y-space-md lg:pl-space-md mt-10 lg:mt-0">
            <div className="flex items-center gap-space-xs">
              <span className="w-8 h-px bg-secondary" />
              <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.22em]">
                An Ode to Unhurried Hours
              </span>
            </div>

            <h2 className="font-headline-lg text-headline-lg text-primary leading-tight font-normal">
              Where the nocturne mingles with first daylight.
            </h2>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Conceived inside Paris’s historic Galerie Vivienne passage, <em>2AM to PM</em> honors the uninterrupted rhythm of the Grand Continental Salon. While the capital sleeps, our hearth remains aglow with hand-carved Carrara marble, polished copper extraction levers, and the gentle murmur of writers and nocturnal thinkers.
            </p>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Here, coffee is never administered in haste. Beans are procured from micro-lot estates in Yirgacheffe and Huila, rested to peak maturity, and drawn through manual piston machinery calibrated to vintage precision. It is an intentional sanctuary dedicated to authentic salon communion.
            </p>

            {/* Heritage Archival Milestones */}
            <div className="pt-space-sm grid grid-cols-2 gap-space-md border-t border-secondary/30">
              <div className="p-3 bg-surface/50 border border-secondary/15">
                <span className="font-display text-headline-md text-secondary block font-semibold">
                  1924
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Heritage Interior Archival
                </span>
              </div>
              <div className="p-3 bg-surface/50 border border-secondary/15">
                <span className="font-display text-headline-md text-secondary block font-semibold">
                  22 hrs
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Continuous Table Hospitality
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

