/**
 * Marble & Stone Product Database
 * Valure Studio — Premium Marble Supplier
 * 25 Products | 7 Categories | INR Pricing
 */

const marbleProducts = [

  // ========== ITALIAN MARBLE ==========
  {
    id: "italian-statuario-001",
    name: "Italian Statuario Marble",
    category: "italian",
    price: 450,
    originalPrice: 520,
    color: "White",
    colorHex: "#F5F5F0",
    finish: "Polished",
    thickness: "18mm",
    origin: "Carrara, Italy",
    size: "60×60 cm / 60×120 cm",
    application: "Flooring, Wall Cladding, Countertops",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "The king of Italian marbles — pure white canvas with delicate grey veins. Sourced from the historic Carrara quarries of Tuscany. Ideal for luxury flooring and feature walls.",
    shortDesc: "Pure white marble with elegant grey veining from Carrara quarries.",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.2%",
      "Compressive Strength": "131 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "100 sq.ft."
    },
    tags: ["popular", "luxury", "white", "italian"]
  },

  {
    id: "italian-calacatta-gold-002",
    name: "Italian Calacatta Gold",
    category: "italian",
    price: 520,
    originalPrice: 620,
    color: "White & Gold",
    colorHex: "#FAF6E8",
    finish: "Polished",
    thickness: "20mm",
    origin: "Apuan Alps, Italy",
    size: "60×60 cm / Custom",
    application: "Feature Walls, Bathrooms, Flooring",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "Calacatta Gold is among the rarest Italian marbles. Distinguished by its bright white background and bold golden-brown veins. A symbol of ultimate opulence in luxury interiors.",
    shortDesc: "Bold gold veins on bright white — the pinnacle of Italian marble luxury.",
    images: [
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.15%",
      "Compressive Strength": "140 MPa",
      "Slip Resistance": "R10",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "50 sq.ft."
    },
    tags: ["popular", "luxury", "gold", "italian"]
  },

  {
    id: "italian-portoro-003",
    name: "Italian Portoro Black",
    category: "italian",
    price: 680,
    originalPrice: null,
    color: "Black & Gold",
    colorHex: "#1A1A1A",
    finish: "Polished",
    thickness: "18mm",
    origin: "Porto Venere, Italy",
    size: "60×60 cm / 30×60 cm",
    application: "Accent Walls, Countertops, Staircases",
    availability: "limited",
    isNew: false,
    isPopular: true,
    description: "A dramatic and rare Italian marble — jet black with bold golden-yellow veins. Portoro creates breathtaking contrast in contemporary luxury spaces. Each slab is unique.",
    shortDesc: "Dramatic jet black with brilliant gold veins — exceedingly rare Italian stone.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.1%",
      "Compressive Strength": "160 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "30 sq.ft."
    },
    tags: ["luxury", "black", "gold", "rare", "italian"]
  },

  {
    id: "italian-carrara-bianco-004",
    name: "Italian Carrara Bianco",
    category: "italian",
    price: 380,
    originalPrice: 440,
    color: "White",
    colorHex: "#F8F8F5",
    finish: "Polished / Honed",
    thickness: "18mm",
    origin: "Carrara, Tuscany, Italy",
    size: "60×60 cm",
    application: "Flooring, Bathrooms, Kitchens",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Classic Carrara Bianco is the most iconic Italian marble. Subtle grey veining on a bright white background makes it perfect for bathrooms, kitchens and residential flooring.",
    shortDesc: "Classic white with subtle grey veins — timeless Italian elegance.",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.2%",
      "Compressive Strength": "128 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3",
      "Min. Order": "100 sq.ft."
    },
    tags: ["italian", "white", "classic"]
  },

  // ========== INDIAN MARBLE ==========
  {
    id: "indian-makrana-005",
    name: "Makrana White Marble",
    category: "indian",
    price: 180,
    originalPrice: 210,
    color: "Pure White",
    colorHex: "#FAFAFA",
    finish: "Polished",
    thickness: "18mm",
    origin: "Makrana, Rajasthan, India",
    size: "60×60 cm / Custom",
    application: "Flooring, Temples, Monuments",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "The legendary marble used to build the Taj Mahal. Makrana White is India's finest marble — pure white, virtually vein-free, and enduringly beautiful. Quarried for 500+ years.",
    shortDesc: "The marble of the Taj Mahal — pure white, iconic, sourced from Rajasthan.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.3%",
      "Compressive Strength": "115 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3",
      "Min. Order": "200 sq.ft."
    },
    tags: ["popular", "indian", "white", "heritage"]
  },

  {
    id: "indian-kishangarh-pink-006",
    name: "Kishangarh Pink Marble",
    category: "indian",
    price: 150,
    originalPrice: null,
    color: "Pink",
    colorHex: "#E8C4C0",
    finish: "Polished",
    thickness: "18mm",
    origin: "Kishangarh, Rajasthan, India",
    size: "60×60 cm",
    application: "Flooring, Decorative Walls",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Quarried from the royal town of Kishangarh, this soft pink marble adds warmth and femininity to interiors. Widely used in premium residential projects across India.",
    shortDesc: "Warm soft pink marble from Kishangarh — adds romance to any interior.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.4%",
      "Compressive Strength": "110 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3",
      "Min. Order": "150 sq.ft."
    },
    tags: ["indian", "pink"]
  },

  {
    id: "indian-rainforest-brown-007",
    name: "Rainforest Brown Marble",
    category: "indian",
    price: 220,
    originalPrice: 260,
    color: "Brown & Green",
    colorHex: "#6B4226",
    finish: "Polished",
    thickness: "18mm",
    origin: "Rajasthan, India",
    size: "60×60 cm / 60×120 cm",
    application: "Feature Walls, Flooring, Bar Counters",
    availability: "in-stock",
    isNew: true,
    isPopular: true,
    description: "A stunning Indian marble with intricate brown, green, and gold pattern resembling a tropical rainforest canopy. Each slab is a unique work of natural art.",
    shortDesc: "Striking brown-green marble with forest-like patterns — uniquely dramatic.",
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.3%",
      "Compressive Strength": "118 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "100 sq.ft."
    },
    tags: ["popular", "indian", "brown", "new"]
  },

  {
    id: "indian-rajnagar-008",
    name: "Rajnagar White Marble",
    category: "indian",
    price: 160,
    originalPrice: null,
    color: "Off White",
    colorHex: "#F5F0E8",
    finish: "Polished / Honed",
    thickness: "18mm",
    origin: "Rajnagar, Rajasthan, India",
    size: "60×60 cm",
    application: "Flooring, Walls",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Rajnagar marble is a premium Indian white marble with a warm ivory tone. Perfect for residential flooring, it offers excellent durability at an affordable price point.",
    shortDesc: "Warm ivory white marble — premium quality at competitive Indian pricing.",
    images: [
      "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.4%",
      "Compressive Strength": "108 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3",
      "Min. Order": "200 sq.ft."
    },
    tags: ["indian", "white", "affordable"]
  },

  // ========== IMPORTED MARBLE ==========
  {
    id: "imported-turkish-onyx-009",
    name: "Turkish Honey Onyx",
    category: "imported",
    price: 550,
    originalPrice: null,
    color: "Honey Gold",
    colorHex: "#C8962A",
    finish: "Polished",
    thickness: "15mm",
    origin: "Denizli, Turkey",
    size: "30×60 cm / 60×60 cm",
    application: "Backlit Panels, Feature Walls, Countertops",
    availability: "limited",
    isNew: true,
    isPopular: true,
    description: "Translucent honey-golden onyx from Turkey — extraordinary when backlit. Creates warm amber glow through stone. Used in hotel lobbies, bars, and luxury bathrooms worldwide.",
    shortDesc: "Translucent honey gold — breathtaking when backlit in hotel lobbies.",
    images: [
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.2%",
      "Compressive Strength": "95 MPa",
      "Translucency": "High",
      "Hardness (Mohs)": "6–7",
      "Min. Order": "50 sq.ft."
    },
    tags: ["popular", "imported", "onyx", "backlit", "new"]
  },

  {
    id: "imported-spanish-cream-010",
    name: "Spanish Crema Marfil",
    category: "imported",
    price: 350,
    originalPrice: 400,
    color: "Cream Beige",
    colorHex: "#E8D8B8",
    finish: "Polished / Brushed",
    thickness: "18mm",
    origin: "Alicante, Spain",
    size: "60×60 cm / 60×120 cm",
    application: "Flooring, Bathrooms, Living Areas",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "Spain's most exported marble — Crema Marfil offers a warm cream-beige tone with subtle ivory veining. Extremely versatile and used in millions of luxury homes worldwide.",
    shortDesc: "Spain's most beloved marble — warm cream tones, universally versatile.",
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.3%",
      "Compressive Strength": "125 MPa",
      "Slip Resistance": "R10",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "100 sq.ft."
    },
    tags: ["popular", "imported", "beige", "cream"]
  },

  {
    id: "imported-nero-marquina-011",
    name: "Nero Marquina Black",
    category: "imported",
    price: 480,
    originalPrice: null,
    color: "Black & White",
    colorHex: "#0D0D0D",
    finish: "Polished",
    thickness: "18mm",
    origin: "Basque Country, Spain",
    size: "60×60 cm",
    application: "Feature Walls, Bathrooms, Stairs",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Nero Marquina is a premium black marble with distinctive white calcite veins. Its bold contrast makes it a top choice for designers creating dramatic, high-impact interiors.",
    shortDesc: "Bold black with white veins — the designer's choice for dramatic interiors.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.2%",
      "Compressive Strength": "135 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "80 sq.ft."
    },
    tags: ["imported", "black", "white"]
  },

  // ========== GRANITE ==========
  {
    id: "granite-black-galaxy-012",
    name: "Black Galaxy Granite",
    category: "granite",
    price: 120,
    originalPrice: 145,
    color: "Black & Gold",
    colorHex: "#0A0A0A",
    finish: "Polished",
    thickness: "18mm",
    origin: "Andhra Pradesh, India",
    size: "60×60 cm / Custom",
    application: "Kitchen Countertops, Flooring, Exterior",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "Black Galaxy granite features a stunning night-sky appearance — deep black with golden bronzite and feldspar specks. India's most exported and iconic granite worldwide.",
    shortDesc: "Night sky in stone — deep black with golden specks, India's finest granite.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.1%",
      "Compressive Strength": "245 MPa",
      "Slip Resistance": "R11",
      "Hardness (Mohs)": "6–7",
      "Min. Order": "200 sq.ft."
    },
    tags: ["popular", "granite", "black", "kitchen"]
  },

  {
    id: "granite-kashmir-white-013",
    name: "Kashmir White Granite",
    category: "granite",
    price: 150,
    originalPrice: null,
    color: "White & Grey",
    colorHex: "#E8E8E0",
    finish: "Polished",
    thickness: "18mm",
    origin: "Tamil Nadu, India",
    size: "60×60 cm / Custom",
    application: "Kitchen Countertops, Flooring",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "Kashmir White features a light grey-white background with dark grey and reddish mineral deposits. One of India's most prestigious granites, highly sought internationally.",
    shortDesc: "Light white-grey background with mineral flecks — versatile and prestigious.",
    images: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.15%",
      "Compressive Strength": "230 MPa",
      "Slip Resistance": "R11",
      "Hardness (Mohs)": "6–7",
      "Min. Order": "200 sq.ft."
    },
    tags: ["popular", "granite", "white", "kitchen"]
  },

  {
    id: "granite-tan-brown-014",
    name: "Tan Brown Granite",
    category: "granite",
    price: 130,
    originalPrice: 155,
    color: "Brown & Black",
    colorHex: "#5C3D2E",
    finish: "Polished",
    thickness: "18mm",
    origin: "Andhra Pradesh, India",
    size: "60×60 cm / Custom",
    application: "Kitchen Countertops, Exterior Cladding",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Tan Brown granite displays a warm chocolate-brown background with black and dark red feldspar crystals. Extremely durable — ideal for high-traffic areas and kitchen countertops.",
    shortDesc: "Rich chocolate brown with dark crystals — excellent for kitchen countertops.",
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.1%",
      "Compressive Strength": "255 MPa",
      "Slip Resistance": "R11",
      "Hardness (Mohs)": "6–7",
      "Min. Order": "200 sq.ft."
    },
    tags: ["granite", "brown", "kitchen", "exterior"]
  },

  {
    id: "granite-absolute-black-015",
    name: "Absolute Black Granite",
    category: "granite",
    price: 100,
    originalPrice: 120,
    color: "Jet Black",
    colorHex: "#050505",
    finish: "Polished / Honed",
    thickness: "18mm",
    origin: "Karnataka, India",
    size: "60×60 cm / Custom",
    application: "Flooring, Countertops, Stairs",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Pure jet black granite with an absolute uniform color — no veins, no variation. Creates sleek, modern interiors. Highly resistant and low maintenance.",
    shortDesc: "Uniform jet black — zero veins, maximum sleekness for modern spaces.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.08%",
      "Compressive Strength": "260 MPa",
      "Slip Resistance": "R11",
      "Hardness (Mohs)": "7",
      "Min. Order": "200 sq.ft."
    },
    tags: ["granite", "black", "affordable"]
  },

  // ========== QUARTZ ==========
  {
    id: "quartz-calacatta-016",
    name: "Calacatta Quartz",
    category: "quartz",
    price: 320,
    originalPrice: 380,
    color: "White & Grey",
    colorHex: "#F2EDE5",
    finish: "Polished",
    thickness: "20mm",
    origin: "Engineered (Spain/India)",
    size: "Custom Slabs",
    application: "Kitchen Countertops, Vanities, Islands",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "Engineered quartz combining 93% natural quartz with premium pigments. Calacatta Quartz replicates natural marble beauty with superior durability, stain and scratch resistance.",
    shortDesc: "Marble beauty with superior durability — stain and scratch resistant quartz.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Quartz Content": "93%",
      "Scratch Resistance": "Excellent",
      "Stain Resistance": "High",
      "Hardness (Mohs)": "7",
      "Min. Order": "50 sq.ft."
    },
    tags: ["popular", "quartz", "white", "kitchen"]
  },

  {
    id: "quartz-pure-white-017",
    name: "Pure White Quartz",
    category: "quartz",
    price: 280,
    originalPrice: null,
    color: "Pure White",
    colorHex: "#FFFFFF",
    finish: "Polished",
    thickness: "20mm",
    origin: "Engineered",
    size: "Custom Slabs",
    application: "Countertops, Bathrooms, Commercial",
    availability: "in-stock",
    isNew: true,
    isPopular: false,
    description: "Brilliant white quartz with uniform coloring and smooth surface. Zero-maintenance, hygienic, and highly resistant. Ideal for modern kitchens and minimalist bathrooms.",
    shortDesc: "Brilliant white, zero maintenance — perfect for modern minimalist kitchens.",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Quartz Content": "93%",
      "Scratch Resistance": "Excellent",
      "Stain Resistance": "High",
      "Hardness (Mohs)": "7",
      "Min. Order": "50 sq.ft."
    },
    tags: ["quartz", "white", "new"]
  },

  {
    id: "quartz-midnight-black-018",
    name: "Midnight Black Quartz",
    category: "quartz",
    price: 350,
    originalPrice: 410,
    color: "Black",
    colorHex: "#111111",
    finish: "Polished",
    thickness: "20mm",
    origin: "Engineered",
    size: "Custom Slabs",
    application: "Kitchen Islands, Feature Walls, Bars",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Deep black quartz with subtle veining that adds sophistication to any space. Creates dramatic contrast in kitchens and commercial environments. Extremely easy to maintain.",
    shortDesc: "Deep black with subtle veining — dramatic, sophisticated, low maintenance.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Quartz Content": "93%",
      "Scratch Resistance": "Excellent",
      "Stain Resistance": "High",
      "Hardness (Mohs)": "7",
      "Min. Order": "50 sq.ft."
    },
    tags: ["quartz", "black"]
  },

  // ========== ONYX ==========
  {
    id: "onyx-honey-019",
    name: "Honey Onyx",
    category: "onyx",
    price: 800,
    originalPrice: null,
    color: "Honey Gold",
    colorHex: "#C88B30",
    finish: "Polished",
    thickness: "15mm",
    origin: "Turkey / Iran",
    size: "30×60 cm / Custom",
    application: "Backlit Panels, Feature Walls, Luxury Bathrooms",
    availability: "limited",
    isNew: false,
    isPopular: true,
    description: "Honey Onyx is nature's stained glass. When backlit, it radiates a stunning warm amber glow. Used in the world's most exclusive hotels, bars, and luxury spas.",
    shortDesc: "Nature's stained glass — radiates warm amber glow when backlit.",
    images: [
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Translucency": "High",
      "Hardness (Mohs)": "6.5–7",
      "Slip Resistance": "R9",
      "Backlit": "Yes",
      "Min. Order": "30 sq.ft."
    },
    tags: ["luxury", "onyx", "backlit", "rare"]
  },

  {
    id: "onyx-green-020",
    name: "Forest Green Onyx",
    category: "onyx",
    price: 750,
    originalPrice: null,
    color: "Green",
    colorHex: "#2D5016",
    finish: "Polished",
    thickness: "15mm",
    origin: "Pakistan / Iran",
    size: "30×60 cm",
    application: "Feature Walls, Bars, Vanity Tops",
    availability: "limited",
    isNew: true,
    isPopular: false,
    description: "Rich forest green onyx with swirling patterns of lighter green and white. Creates an extraordinary natural focal point. Highly prized in hospitality and luxury retail design.",
    shortDesc: "Rich forest green with swirling patterns — a commanding natural focal point.",
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Translucency": "Medium",
      "Hardness (Mohs)": "6.5–7",
      "Slip Resistance": "R9",
      "Backlit": "Yes",
      "Min. Order": "30 sq.ft."
    },
    tags: ["luxury", "onyx", "green", "rare", "new"]
  },

  // ========== TRAVERTINE ==========
  {
    id: "travertine-classic-021",
    name: "Classic Roman Travertine",
    category: "travertine",
    price: 250,
    originalPrice: 290,
    color: "Ivory Beige",
    colorHex: "#D4C4A8",
    finish: "Filled & Honed / Polished",
    thickness: "18mm",
    origin: "Tivoli, Italy / Turkey",
    size: "60×60 cm / Custom",
    application: "Outdoor Paving, Flooring, Pool Areas",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    description: "The stone of the Roman Colosseum — travertine has a timeless warmth and natural porous texture. Unfilled for rustic charm or filled for smooth elegance. UV-resistant outdoors.",
    shortDesc: "The stone of the Roman Colosseum — timeless warmth for indoor and outdoor.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.6%",
      "Compressive Strength": "105 MPa",
      "Slip Resistance": "R10",
      "UV Resistance": "Excellent",
      "Min. Order": "100 sq.ft."
    },
    tags: ["popular", "travertine", "beige", "outdoor"]
  },

  {
    id: "travertine-silver-022",
    name: "Silver Travertine",
    category: "travertine",
    price: 290,
    originalPrice: null,
    color: "Silver Grey",
    colorHex: "#A8A8A8",
    finish: "Polished",
    thickness: "18mm",
    origin: "Turkey",
    size: "60×60 cm",
    application: "Interior Flooring, Bathrooms",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Silver travertine offers a cooler, contemporary take on the classic stone. The silver-grey tones work beautifully in modern minimalist and Scandinavian interiors.",
    shortDesc: "Cool silver-grey tones — perfect for modern minimalist and Scandi interiors.",
    images: [
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.5%",
      "Compressive Strength": "110 MPa",
      "Slip Resistance": "R10",
      "UV Resistance": "Good",
      "Min. Order": "100 sq.ft."
    },
    tags: ["travertine", "grey", "silver"]
  },

  {
    id: "travertine-noce-023",
    name: "Noce Dark Travertine",
    category: "travertine",
    price: 270,
    originalPrice: 310,
    color: "Walnut Brown",
    colorHex: "#5C3D1E",
    finish: "Honed",
    thickness: "18mm",
    origin: "Turkey",
    size: "60×60 cm / 45×90 cm",
    application: "Outdoor Paving, Rustic Flooring",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Noce travertine features rich walnut-brown tones with natural pitting and flowing movement. Creates a warm, rustic Mediterranean atmosphere in courtyards and living spaces.",
    shortDesc: "Rich walnut brown with natural pitting — perfect for rustic Mediterranean style.",
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.7%",
      "Compressive Strength": "100 MPa",
      "Slip Resistance": "R11",
      "UV Resistance": "Excellent",
      "Min. Order": "100 sq.ft."
    },
    tags: ["travertine", "brown", "outdoor", "rustic"]
  },

  // ========== ADDITIONAL FEATURED ==========
  {
    id: "granite-labradorite-024",
    name: "Labradorite Blue Granite",
    category: "granite",
    price: 250,
    originalPrice: null,
    color: "Blue & Silver",
    colorHex: "#1A2E4A",
    finish: "Polished",
    thickness: "18mm",
    origin: "Finland / Madagascar",
    size: "60×60 cm / Custom",
    application: "Feature Walls, Countertops, Art Installations",
    availability: "limited",
    isNew: true,
    isPopular: true,
    description: "Labradorite exhibits a phenomenon called 'labradorescence' — iridescent blue, green, and gold flashes shift magically under light. Unlike any other stone on earth.",
    shortDesc: "Magical iridescent blue flashes that shift under light — truly extraordinary.",
    images: [
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.1%",
      "Compressive Strength": "240 MPa",
      "Slip Resistance": "R11",
      "Hardness (Mohs)": "6–7",
      "Min. Order": "30 sq.ft."
    },
    tags: ["popular", "granite", "blue", "rare", "new"]
  },

  {
    id: "italian-emperador-025",
    name: "Italian Emperador Brown",
    category: "italian",
    price: 420,
    originalPrice: 500,
    color: "Brown & Cream",
    colorHex: "#7B4B2A",
    finish: "Polished",
    thickness: "18mm",
    origin: "Spain / Turkey",
    size: "60×60 cm",
    application: "Feature Walls, Bathrooms, Bars",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    description: "Emperor Brown marble delivers rich chocolate brown tones with intricate cream veining. A regal and sophisticated choice for bathrooms, feature walls, and bar fronts.",
    shortDesc: "Rich chocolate brown with cream veins — regal and sophisticated warmth.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800"
    ],
    specs: {
      "Water Absorption": "< 0.25%",
      "Compressive Strength": "125 MPa",
      "Slip Resistance": "R9",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "80 sq.ft."
    },
    tags: ["italian", "brown", "luxury"]
  }

];

// Helper functions
function getProductById(id) {
  return marbleProducts.find(p => p.id === id);
}

function getProductsByCategory(category) {
  if (category === 'all') return marbleProducts;
  return marbleProducts.filter(p => p.category === category);
}

function getFeaturedProducts(count = 6) {
  return marbleProducts.filter(p => p.isPopular).slice(0, count);
}

function getSimilarProducts(product, count = 3) {
  return marbleProducts
    .filter(p => p.id !== product.id && (p.category === product.category || p.color === product.color))
    .slice(0, count);
}

function sortProducts(products, sortBy) {
  switch(sortBy) {
    case 'price-asc': return [...products].sort((a, b) => a.price - b.price);
    case 'price-desc': return [...products].sort((a, b) => b.price - a.price);
    case 'new': return [...products].filter(p => p.isNew).concat(products.filter(p => !p.isNew));
    case 'popular': return [...products].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    default: return products;
  }
}

const categoryInfo = {
  all:        { label: "All Products", icon: "fas fa-th-large", count: marbleProducts.length },
  italian:    { label: "Italian Marble", icon: "fas fa-archway", count: marbleProducts.filter(p=>p.category==='italian').length },
  indian:     { label: "Indian Marble", icon: "fas fa-monument", count: marbleProducts.filter(p=>p.category==='indian').length },
  imported:   { label: "Imported Marble", icon: "fas fa-globe", count: marbleProducts.filter(p=>p.category==='imported').length },
  granite:    { label: "Granite", icon: "fas fa-mountain", count: marbleProducts.filter(p=>p.category==='granite').length },
  quartz:     { label: "Quartz", icon: "fas fa-gem", count: marbleProducts.filter(p=>p.category==='quartz').length },
  onyx:       { label: "Onyx", icon: "fas fa-star", count: marbleProducts.filter(p=>p.category==='onyx').length },
  travertine: { label: "Travertine", icon: "fas fa-leaf", count: marbleProducts.filter(p=>p.category==='travertine').length }
};
