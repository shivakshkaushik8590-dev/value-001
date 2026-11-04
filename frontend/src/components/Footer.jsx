import React, { useState } from 'react';

const LOGO_URL = "https://lh3.googleusercontent.com/aida/AEtjO1V1bFhWW7LQOU-aU5AZCdURq8XCNU2lBHiUx_-LyWEngNlkaelf4jiwPNPNh4vqqqTR56Jq6abK4_VE34QVXMNzm5lUm5rKZRZXjgv-_NznwUayyS-aeX5RipwNFDYgHTAxxV9TUlYii0G8_Po313ussHVSZDoLzCjhI7mPN71pAPSrQ5B-ZfBg2RMqZIDmO48zmIAejEbOtnqRy7tuB6G58muTYxGZgrfo-E3CCdA";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <>
      {/* EXTENDED FOOTER BRAND FINALE */}
      <section className="w-full py-space-xl bg-primary text-surface border-t border-secondary/30">
        <div className="max-w-[1320px] mx-auto px-margin-desktop text-center">
          <span className="w-12 h-px bg-secondary mx-auto block mb-4" />
          <p className="font-display italic text-headline-lg lg:text-[44px] text-secondary-fixed max-w-3xl mx-auto leading-relaxed">
            “2AM to PM — Every Hour Has Its Own Story.”
          </p>
          <div className="mt-space-lg flex flex-wrap justify-center items-center gap-space-lg text-secondary font-label-sm text-label-sm uppercase tracking-[0.2em]">
            <a className="hover:text-surface transition-colors" href="#signature-menu">
              Curated Cellar
            </a>
            <span>•</span>
            <a
              className="hover:text-surface transition-colors"
              href="https://instagram.com"
              rel="noopener noreferrer"
              target="_blank"
            >
              @2AMtoPM.Salon
            </a>
            <span>•</span>
            <a className="hover:text-surface transition-colors" href="#our-story">
              The Paris Archives
            </a>
            <span>•</span>
            <a className="hover:text-surface transition-colors" href="#visit-us">
              Salon Privé Inquiries
            </a>
          </div>
        </div>
      </section>

      {/* MAIN FOOTER */}
      <footer className="w-full bg-primary text-surface-container-high pt-space-xl pb-space-lg border-t border-secondary/15">
        <div className="max-w-[1320px] mx-auto px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop pb-space-xl">
            
            {/* Column 1: Brand & Hours */}
            <div className="space-y-space-md md:col-span-1">
              <div className="flex items-center gap-space-sm">
                <img
                  alt="2AM to PM Logo"
                  className="h-7 w-auto object-contain"
                  src={LOGO_URL}
                />
                <span className="font-headline-sm text-headline-sm text-surface tracking-wider uppercase">
                  2AM to PM
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-surface-dim leading-relaxed">
                An unbroken ritual of European bistro heritage, transition hours, fine roast roasteries, and salon gastronomy.
              </p>
              <div className="pt-space-xs">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-[0.16em]">
                  Salon Hours
                </span>
                <p className="font-body-sm text-body-sm text-surface">
                  02:00 AM – 11:59 PM • Seven Days
                </p>
              </div>
            </div>

            {/* Column 2: Address */}
            <div className="space-y-space-sm">
              <h4 className="font-headline-sm text-headline-sm text-surface-bright">
                The Address
              </h4>
              <p className="font-body-sm text-body-sm text-surface-dim leading-loose">
                Galerie Vivienne Passage<br />
                4 Rue des Petits-Champs<br />
                75002 Paris, France
              </p>
              <p className="font-label-sm text-label-sm text-secondary tracking-widest pt-space-xs uppercase">
                Valet &amp; Private Salon Arrival
              </p>
            </div>

            {/* Column 3: Inquiries */}
            <div className="space-y-space-sm">
              <h4 className="font-headline-sm text-headline-sm text-surface-bright">
                Direct Inquiries
              </h4>
              <p className="font-body-sm text-body-sm text-surface-dim leading-loose">
                Concierge: +33 (0)1 42 68 02 00<br />
                Table Reservation: salon@2amtopm.eu<br />
                Private Hire: events@2amtopm.eu
              </p>
            </div>

            {/* Column 4: The Salon Bulletin */}
            <div className="space-y-space-md">
              <h4 className="font-headline-sm text-headline-sm text-surface-bright">
                The Salon Bulletin
              </h4>
              <p className="font-body-sm text-body-sm text-surface-dim">
                Dispatches on seasonal vintages, midnight roasts, and literary salons.
              </p>

              {subscribed ? (
                <div className="p-3 bg-primary-container border border-secondary/40 text-secondary-fixed font-label-sm text-label-sm">
                  Honorary correspondence registered with the concierge.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex w-full">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-primary-container px-space-md py-space-sm font-body-sm text-body-sm text-surface placeholder:text-surface-dim focus:outline-none border border-secondary/25 focus:border-secondary"
                    placeholder="Your honorable correspondence"
                  />
                  <button
                    type="submit"
                    className="px-space-md bg-secondary text-on-secondary font-label-md text-label-md uppercase tracking-wider hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-surface-dim border-t border-secondary/15">
            <p>© MMXXIV 2AM to PM Salon &amp; Brasserie. All privileges reserved.</p>
            <div className="flex items-center gap-space-md">
              <a className="hover:text-secondary transition-colors" href="#signature-menu">
                Cellar Registry
              </a>
              <a className="hover:text-secondary transition-colors" href="#">
                Terms of Privilège
              </a>
              <a className="hover:text-secondary transition-colors" href="#">
                Privacy Manifesto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

