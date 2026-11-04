import React, { useState } from 'react';

const MAP_BG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDXcTHXvzajPMVy66NsCGx83GN2ThrE9ZbgDsNOD89U_Qs3xXYrU1OYeMYRom39VcTdXlGgDzxNOQxmwWabGc1iq6fjPyuNB5-1Fg7el_jlodz7zBeJWl8YNcTYijlkCaYqk3IMfYP1noql1dfgMjSEkHFvcQ5ps1Z7WW7WfNLKt4JmxCRJ0Q5wF02yAy5FdQddCM8rCQHCVKq2VrOYLG8acRKtzoQyR9lBe6p29Fw";

export default function ReservationAndVisit() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '2 Guests',
    date: '2026-11-05',
    timeSlot: '10:00 PM (Nocturne)',
    atmosphere: 'Main Marble Hall',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
  };

  return (
    <section className="w-full py-space-xl bg-primary text-surface" id="visit-us">
      <div className="max-w-[1320px] mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop">
          
          {/* Left Column: Details & Map */}
          <div className="lg:col-span-6 space-y-space-lg">
            <div>
              <span className="font-label-md text-label-md text-secondary uppercase tracking-[0.22em] block mb-2">
                Location &amp; Access
              </span>
              <h2 className="font-headline-lg text-headline-lg text-surface font-normal">
                Palais-Royal Sanctuary
              </h2>
              <p className="font-body-md text-body-md text-surface-container-high mt-2">
                Discreet passage access. Valet parking on Rue de Beaujolais.
              </p>
            </div>

            <div className="space-y-space-md border-t border-secondary/30 pt-space-md">
              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Salon Addresses
                </span>
                <p className="font-body-md text-body-md text-surface mt-1">
                  14 Rue de Beaujolais, Galerie de Montpensier, 75001 Paris
                </p>
                <p className="font-body-sm text-body-sm text-surface-dim">
                  Secondary Pavilion: 28 Old Burlington St, Mayfair, London W1S
                </p>
              </div>

              {/* Schedule blocks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3 bg-primary-container/40 border border-secondary/20">
                  <span className="font-label-sm text-label-sm text-secondary uppercase block">
                    Vigil
                  </span>
                  <p className="font-label-md text-label-md text-surface">
                    02:00 — 11:00
                  </p>
                </div>
                <div className="p-3 bg-primary-container/40 border border-secondary/20">
                  <span className="font-label-sm text-label-sm text-secondary uppercase block">
                    Grand Day
                  </span>
                  <p className="font-label-md text-label-md text-surface">
                    11:00 — 19:00
                  </p>
                </div>
                <div className="p-3 bg-primary-container/40 border border-secondary/20">
                  <span className="font-label-sm text-label-sm text-secondary uppercase block">
                    Nocturne
                  </span>
                  <p className="font-label-md text-label-md text-surface">
                    19:00 — 02:00
                  </p>
                </div>
              </div>

              <div>
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                  Direct Concierge
                </span>
                <p className="font-body-md text-body-md text-surface mt-1">
                  +33 (0)1 42 96 56 27 • concierge@2amtopm.com
                </p>
              </div>
            </div>

            {/* Stylized Dark Map Container */}
            <div className="relative overflow-hidden border border-secondary/30">
              <div
                className="w-full h-56 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                data-location="14 Rue de Beaujolais, 75001 Paris"
                style={{ backgroundImage: `url('${MAP_BG}')` }}
              />
              <div className="absolute bottom-2 left-2 px-3 py-1 bg-primary/90 text-secondary font-label-sm text-label-sm border border-secondary/30">
                Arrondissement I • Paris
              </div>
            </div>
          </div>

          {/* Right Column: Table Reservation Folio Form */}
          <div className="lg:col-span-6 bg-surface-container-low text-on-surface p-space-lg lg:p-space-xl border border-secondary/40 shadow-2xl relative">
            <div className="border-b border-secondary/30 pb-space-sm mb-space-md">
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.2em] block">
                Salon Privé Registry
              </span>
              <h3 className="font-headline-md text-headline-md text-primary font-normal">
                Reserve a Salon Table
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Table reservations are honored across the full nocturnal cycle. Salon Privé reservations include dedicated sommelier service.
              </p>
            </div>

            {isSubmitted ? (
              <div className="space-y-6 py-6 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary flex items-center justify-center border border-secondary">
                  <span className="material-symbols-outlined text-secondary-fixed text-3xl">done</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-primary mb-2">
                    Privilege Confirmed, {formData.name || 'Honored Guest'}
                  </h4>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
                    Your salon reservation for <strong>{formData.guests}</strong> in the <strong>{formData.atmosphere}</strong> on <strong>{formData.date}</strong> at <strong>{formData.timeSlot}</strong> has been delivered to the Head Maître d’Hôtel.
                  </p>
                </div>
                <div className="p-4 bg-primary text-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider text-center border border-secondary/40">
                  A ceremonial invitation has been dispatched to {formData.email || 'your correspondence'}.
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 bg-secondary text-primary font-label-md text-label-md uppercase tracking-[0.14em] font-semibold hover:bg-secondary-fixed transition-colors"
                >
                  Book Another Privilege
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-space-md" id="reservation-form">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div>
                    <label className="block font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                      Guest Dignitary Name
                    </label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-space-md py-3 bg-surface border border-secondary/40 text-on-surface font-body-sm text-body-sm focus:border-secondary focus:outline-none"
                      placeholder="e.g. Lord Harrington"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                      Honorary Correspondence
                    </label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-space-md py-3 bg-surface border border-secondary/40 text-on-surface font-body-sm text-body-sm focus:border-secondary focus:outline-none"
                      placeholder="name@domain.eu"
                      required
                      type="email"
                    />
                  </div>
                </div>

                {/* Guests, Date, Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                  <div>
                    <label className="block font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                      Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-space-md py-3 bg-surface border border-secondary/40 text-on-surface font-body-sm text-body-sm focus:border-secondary focus:outline-none"
                    >
                      <option value="1 Dignitary">1 Dignitary</option>
                      <option value="2 Guests">2 Guests</option>
                      <option value="4 Guests">4 Guests</option>
                      <option value="Private Alcove (6+)">Private Alcove (6+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                      Date
                    </label>
                    <input
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-space-md py-3 bg-surface border border-secondary/40 text-on-surface font-body-sm text-body-sm focus:border-secondary focus:outline-none"
                      required
                      type="date"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                      Time Slot
                    </label>
                    <select
                      name="timeSlot"
                      value={formData.timeSlot}
                      onChange={handleChange}
                      className="w-full px-space-md py-3 bg-surface border border-secondary/40 text-on-surface font-body-sm text-body-sm focus:border-secondary focus:outline-none"
                    >
                      <option value="02:30 AM (Vigil)">02:30 AM (Vigil)</option>
                      <option value="04:00 AM (Early Roast)">04:00 AM (Early Roast)</option>
                      <option value="08:30 AM (Viennoiserie)">08:30 AM (Viennoiserie)</option>
                      <option value="02:30 PM (Grand Salon)">02:30 PM (Grand Salon)</option>
                      <option value="10:00 PM (Nocturne)">10:00 PM (Nocturne)</option>
                    </select>
                  </div>
                </div>

                {/* Preferred Salon Atmosphere */}
                <div>
                  <label className="block font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                    Preferred Salon Atmosphere
                  </label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <label className="flex items-center gap-2 p-2 bg-surface border border-secondary/30 cursor-pointer">
                      <input
                        type="radio"
                        name="atmosphere"
                        value="Main Marble Hall"
                        checked={formData.atmosphere === 'Main Marble Hall'}
                        onChange={handleChange}
                        className="text-primary focus:ring-0"
                      />
                      <span className="font-body-sm text-body-sm">Main Marble Hall</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 bg-surface border border-secondary/30 cursor-pointer">
                      <input
                        type="radio"
                        name="atmosphere"
                        value="Library Privé"
                        checked={formData.atmosphere === 'Library Privé'}
                        onChange={handleChange}
                        className="text-primary focus:ring-0"
                      />
                      <span className="font-body-sm text-body-sm">Library Privé</span>
                    </label>
                  </div>
                </div>

                {/* Special Courtesies */}
                <div>
                  <label className="block font-label-sm text-label-sm text-primary uppercase tracking-widest mb-1">
                    Special Courtesies / Tasting Preferences
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full px-space-md py-2 bg-surface border border-secondary/40 text-on-surface font-body-sm text-body-sm focus:border-secondary focus:outline-none"
                    placeholder="Dietary restrictions, vintage requests, literary preferences..."
                    rows={2}
                  />
                </div>

                {/* Submit button */}
                <button
                  className="w-full py-4 bg-primary text-secondary-fixed font-label-md text-label-md uppercase tracking-[0.18em] hover:bg-primary-container border border-secondary/50 transition-colors shadow-md font-semibold cursor-pointer"
                  type="submit"
                >
                  Confirm Salon Table Privilege
                </button>
              </form>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}

