# 2AM to PM — Haute European Salon & Cafe (React Application)

This project is the complete, high-fidelity React conversion of the European salon codespace (`code.html`), created following the Parisian Old Money luxury aesthetic and tokens defined in `DESIGN.md`.

---

## 🏛 Project Structure

```
frontend/
├── index.html                   # HTML shell for Vite with fonts & CSS linkages
├── package.json                 # Modern dependencies (React 18, Vite, Tailwind)
├── vite.config.js               # Vite configuration with React plugin
├── tailwind.config.js           # Exact luxury theme tokens, colors, typography & spacing
├── postcss.config.js            # PostCSS configuration for Tailwind & Autoprefixer
├── standalone-preview.html      # Zero-install browser preview (React 18 + Babel in-browser)
├── README.md                    # Project documentation
└── src/
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Master container with scroll-spy & navigation
    ├── index.css                # Base Tailwind & luxury scrollbar configuration
    ├── data/
    │   ├── menuData.js          # Signature offerings catalog (Coffee, Patisserie, Libations)
    │   ├── experienceData.js    # Sensory architecture & tactile salon items
    │   ├── pillarsData.js       # Five Pillars of Distinction (I - V)
    │   └── galleryData.js       # Archival gallery photography & captions
    └── components/
        ├── Header.jsx           # Fixed glassmorphism nav with live vigil badge & mobile drawer
        ├── Hero.jsx             # Hero landing with editorial gradients, coordinates & CTAs
        ├── OurStory.jsx         # Archival extraction photo, quote plaque & history narrative
        ├── SignatureMenu.jsx    # Interactive category filter tabs & tasting detail modal
        ├── SensoryExperience.jsx# 6 tactile salon cards with vintage brass iconography
        ├── PillarsOfDistinction.jsx # Roman numeral pillars (I to V)
        ├── AtmosphericGallery.jsx # Asymmetric editorial grid & interactive photo lightbox
        ├── ReservationAndVisit.jsx# Concierge details, dark map, & full interactive booking form
        └── Footer.jsx           # Grand finale quotation, bulletin subscription & legal links
```

---

## ⚡ Quick Start Options

### Option 1: Instant Browser Preview (Zero Installation)
If Node.js is not yet installed on your system:
- Open [`frontend/standalone-preview.html`](file:///c:/Users/shiva/Downloads/stitch_2am_to_pm_luxury_cafe/frontend/standalone-preview.html) directly in any web browser (Google Chrome, Microsoft Edge, Firefox, Brave, Safari).
- It runs the complete React 18 component tree dynamically with Babel standalone and the full Tailwind design system!

### Option 2: Standard Vite Development Server
When Node.js is available:
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the live hot-reloading development server.

### Option 3: Production Build
```bash
cd frontend
npm run build
npm run preview
```

---

## 🎨 Design Tokens & Aesthetic System
- **Primary Color**: Deep British Racing Green (`#00251d` / `#183b32`)
- **Secondary Color**: Antique Gold (`#725b29` / `#b69a62` / `#ffdfa0`)
- **Canvas / Surface**: Warm Ivory (`#fef9ee`) and aged limestone containers
- **Typography**: `Playfair Display` for classical headlines and `DM Sans` for body / uppercase tracked labels
- **Corners**: Architectural right angles (`0px`) matching fine stationery and Carrara marble slabs

