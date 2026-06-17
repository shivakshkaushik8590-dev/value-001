/**
 * Premium Marble & Stone Product Database
 * Valure Studio — Premium Stone Supplier
 * 20 Products | 7 Categories | INR Pricing
 * Version: 2.0.0
 */

const marbleProducts = [
  // ========== MARBLE ==========
  {
    id: "italian-statuario-001",
    name: "Italian Statuario Marble",
    category: "marble",
    price: 480,
    originalPrice: 550,
    color: "White",
    colorHex: "#F5F5F0",
    finish: "Polished",
    thickness: "18mm",
    origin: "Carrara, Italy",
    size: "60×60 cm / Custom Slabs",
    application: "Flooring, Wall Cladding, Countertops",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    isPremium: true,
    description: "Pure white canvas with elegant bold grey veining sourced directly from the Carrara quarries of Tuscany. Slabs are meticulously selected for luxury flooring, bath spaces, and accent installations.",
    shortDesc: "The king of Italian marbles — pure white canvas with delicate grey veins.",
    images: ["assets/images/italian_statuario.png"],
    specs: {
      "Water Absorption": "< 0.2%",
      "Compressive Strength": "130 MPa",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "100 sq.ft."
    },
    tags: ["popular", "luxury", "white", "italian"]
  },
  {
    id: "calacatta-gold-002",
    name: "Calacatta Gold Marble",
    category: "marble",
    price: 580,
    originalPrice: 650,
    color: "White & Gold",
    colorHex: "#FAF6E8",
    finish: "Polished",
    thickness: "20mm",
    origin: "Apuan Alps, Italy",
    size: "60×120 cm / Custom",
    application: "Feature Walls, Bathrooms, Flooring",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    isPremium: true,
    description: "Calacatta Gold is among the rarest Italian marbles. Distinguished by its bright white background and bold, dramatic golden-brown veins, it represents the ultimate opulence in luxury interior design.",
    shortDesc: "Bold gold veins on bright white — the pinnacle of Italian marble luxury.",
    images: ["assets/images/calacatta_gold.png"],
    specs: {
      "Water Absorption": "< 0.15%",
      "Compressive Strength": "140 MPa",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "50 sq.ft."
    },
    tags: ["popular", "luxury", "gold", "italian"]
  },
  {
    id: "carrara-white-003",
    name: "Carrara White Marble",
    category: "marble",
    price: 340,
    originalPrice: 400,
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
    isPremium: false,
    description: "Classic white background with subtle grey veins. Sourced from Tuscany, Carrara White offers a timeless aesthetic and high durability, making it perfect for vanity tops and flooring.",
    shortDesc: "Classic white with subtle grey veins — timeless Italian elegance.",
    images: ["assets/images/carrara_white.png"],
    specs: {
      "Water Absorption": "< 0.2%",
      "Compressive Strength": "128 MPa",
      "Hardness (Mohs)": "3",
      "Min. Order": "100 sq.ft."
    },
    tags: ["italian", "white", "classic"]
  },
  {
    id: "black-marquina-004",
    name: "Black Marquina Marble",
    category: "marble",
    price: 290,
    originalPrice: 350,
    color: "Black & White",
    colorHex: "#0D0D0D",
    finish: "Polished",
    thickness: "18mm",
    origin: "Basque Country, Spain",
    size: "60×60 cm / Custom",
    application: "Feature Walls, Bathrooms, Stairs",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "Premium black marble with distinctive white calcite veins. Sourced from Spain, its stark, bold contrast makes it a top choice for designers creating high-impact contemporary interiors.",
    shortDesc: "Bold black with white veins — the designer's choice for dramatic interiors.",
    images: ["assets/images/black_marquina.png"],
    specs: {
      "Water Absorption": "< 0.2%",
      "Compressive Strength": "135 MPa",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "80 sq.ft."
    },
    tags: ["black", "white", "spanish"]
  },
  {
    id: "panda-white-005",
    name: "Panda White Marble",
    category: "marble",
    price: 450,
    originalPrice: 520,
    color: "White & Black",
    colorHex: "#FAFAFA",
    finish: "Polished",
    thickness: "18mm",
    origin: "Sichuan, China",
    size: "60×120 cm / Custom",
    application: "Feature Walls, Countertops, Flooring",
    availability: "limited",
    isNew: true,
    isPopular: true,
    isPremium: true,
    description: "Features a stark white background with bold, dramatic, flowing black veins that resemble artistic brushstrokes on a canvas. Panda White creates a striking, modern focal point in luxury villas.",
    shortDesc: "Stark white marble with bold, artistic black flowing veins.",
    images: ["assets/images/panda_white.png"],
    specs: {
      "Water Absorption": "< 0.25%",
      "Compressive Strength": "120 MPa",
      "Hardness (Mohs)": "3",
      "Min. Order": "50 sq.ft."
    },
    tags: ["new", "artistic", "white", "black"]
  },
  {
    id: "armani-grey-006",
    name: "Armani Grey Marble",
    category: "marble",
    price: 310,
    originalPrice: 380,
    color: "Grey",
    colorHex: "#8E8E8A",
    finish: "Polished / Leathered",
    thickness: "18mm",
    origin: "Afyon, Turkey",
    size: "60×60 cm",
    application: "Flooring, Accent Walls, Living Areas",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "A sophisticated warm grey marble with fine white and gold veins. Sourced from Turkey, it delivers a modern, minimalist elegance to floors, hallways, and fireplace surrounds.",
    shortDesc: "Elegant warm grey marble with fine white and gold veins.",
    images: ["assets/images/armani_grey.png"],
    specs: {
      "Water Absorption": "< 0.3%",
      "Compressive Strength": "118 MPa",
      "Hardness (Mohs)": "3",
      "Min. Order": "100 sq.ft."
    },
    tags: ["grey", "modern", "minimalist"]
  },
  {
    id: "volakas-marble-007",
    name: "Volakas Marble",
    category: "marble",
    price: 360,
    originalPrice: 420,
    color: "White",
    colorHex: "#F2F2F2",
    finish: "Polished",
    thickness: "18mm",
    origin: "Drama, Greece",
    size: "60×120 cm / Custom",
    application: "Flooring, Bathrooms, Columns",
    availability: "in-stock",
    isNew: true,
    isPopular: false,
    isPremium: false,
    description: "A famous white marble with diagonal light grey, beige, and faint purple veins. Sourced from Greece, it brings classical antiquity and soft light-reflecting luxury to modern spaces.",
    shortDesc: "Soft diagonal grey and light purple veins on clean white marble.",
    images: ["https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 0.22%",
      "Compressive Strength": "122 MPa",
      "Hardness (Mohs)": "3",
      "Min. Order": "80 sq.ft."
    },
    tags: ["white", "greek", "classical", "new"]
  },

  // ========== LIMESTONE & TRAVERTINE ==========
  {
    id: "travertine-beige-008",
    name: "Travertine Beige Stone",
    category: "limestone",
    price: 260,
    originalPrice: 320,
    color: "Beige",
    colorHex: "#D4C4A8",
    finish: "Filled & Honed",
    thickness: "18mm",
    origin: "Tivoli, Italy",
    size: "60×60 cm / Custom",
    application: "Flooring, Pool Decks, Cladding",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    isPremium: false,
    description: "The historic stone of the Roman Colosseum. This Travertine Beige offers warm ivory tones, linear movement, and natural porous textures that can be unfilled for rustic charm or filled for smooth elegance.",
    shortDesc: "Timeless warm beige travertine with classic porous or filled finish.",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 0.6%",
      "Compressive Strength": "105 MPa",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "100 sq.ft."
    },
    tags: ["popular", "beige", "travertine", "outdoor"]
  },
  {
    id: "luxury-limestone-019",
    name: "Luxury Limestone",
    category: "limestone",
    price: 130,
    originalPrice: 160,
    color: "Cream",
    colorHex: "#EAE6D9",
    finish: "Honed / Brushed",
    thickness: "20mm",
    origin: "Jura, Germany",
    size: "60×60 cm",
    application: "Wall Cladding, Facades, Flooring",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "A fine-grained, warm ivory limestone featuring micro-fossils and soft, uniform texturing. Sourced from Germany, it delivers a clean, contemporary aesthetic for modern villa walls and premium exterior facades.",
    shortDesc: "Warm ivory limestone with a uniform, contemporary fine-grain finish.",
    images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 1.2%",
      "Compressive Strength": "95 MPa",
      "Hardness (Mohs)": "3–4",
      "Min. Order": "200 sq.ft."
    },
    tags: ["limestone", "facade", "cream"]
  },

  // ========== QUARTZITE & QUARTZ ==========
  {
    id: "patagonia-quartzite-009",
    name: "Patagonia Quartzite",
    category: "quartzite",
    price: 780,
    originalPrice: 900,
    color: "Beige & Crystal",
    colorHex: "#E5DEC9",
    finish: "Polished",
    thickness: "20mm",
    origin: "Bahia, Brazil",
    size: "Custom Slabs",
    application: "Feature Walls, Countertops, Bar Tops",
    availability: "limited",
    isNew: true,
    isPopular: true,
    isPremium: true,
    description: "A breathtaking natural masterpiece featuring dramatic chunks of translucent quartz crystals clustered with golden-brown and grey feldspar veins. Ideal for high-end backlit luxury feature walls.",
    shortDesc: "Exotic translucent quartzite with dramatic crystal clustering.",
    images: ["assets/images/patagonia_quartzite.png"],
    specs: {
      "Water Absorption": "< 0.1%",
      "Compressive Strength": "180 MPa",
      "Hardness (Mohs)": "7",
      "Min. Order": "30 sq.ft."
    },
    tags: ["backlit", "quartzite", "crystal", "rare"]
  },
  {
    id: "blue-roma-quartzite-010",
    name: "Blue Roma Quartzite",
    category: "quartzite",
    price: 850,
    originalPrice: 1100,
    color: "Blue & Gold",
    colorHex: "#7E92A2",
    finish: "Polished",
    thickness: "20mm",
    origin: "Ceara, Brazil",
    size: "Custom Slabs",
    application: "Feature Walls, Countertops, Kitchen Islands",
    availability: "limited",
    isNew: false,
    isPopular: true,
    isPremium: true,
    description: "One of the most exotic natural stones in the world. Features a soft blue-grey quartzite canvas accented with striking copper, gold, and brown linear veins, producing an unmatched visual impact.",
    shortDesc: "Exotic soft blue-grey quartzite with striking golden-copper veining.",
    images: ["https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 0.1%",
      "Compressive Strength": "195 MPa",
      "Hardness (Mohs)": "7",
      "Min. Order": "30 sq.ft."
    },
    tags: ["quartzite", "blue", "luxury", "exotic"]
  },
  {
    id: "crystal-white-quartz-020",
    name: "Crystal White Quartz",
    category: "quartzite",
    price: 280,
    originalPrice: 340,
    color: "Pure White",
    colorHex: "#FFFFFF",
    finish: "Polished",
    thickness: "20mm",
    origin: "Engineered",
    size: "Custom Slabs",
    application: "Kitchen Countertops, Vanities, Commercial",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "Brilliant white engineered quartz embedded with fine reflective crystals. Zero maintenance, highly stain resistant, and incredibly hygienic, it is perfect for heavy-duty kitchen countertops.",
    shortDesc: "Brilliant white quartz with fine reflective crystal sparkles.",
    images: ["https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Quartz Content": "93%",
      "Scratch Resistance": "Excellent",
      "Stain Resistance": "High",
      "Hardness (Mohs)": "7",
      "Min. Order": "50 sq.ft."
    },
    tags: ["quartz", "white", "sparkle"]
  },

  // ========== ONYX ==========
  {
    id: "onyx-ivory-011",
    name: "Onyx Ivory Stone",
    category: "onyx",
    price: 650,
    originalPrice: 780,
    color: "Ivory",
    colorHex: "#ECEAE0",
    finish: "Polished",
    thickness: "16mm",
    origin: "Yazd, Iran",
    size: "30×60 cm / Custom",
    application: "Backlit Panels, Feature Walls, Luxury Bathrooms",
    availability: "limited",
    isNew: true,
    isPopular: false,
    isPremium: true,
    description: "Translucent ivory onyx with soft amber and cream banding. Sourced from Iran, it radiates a warm, ethereal glow when backlit, making it ideal for luxurious lobby walls and high-end bar fronts.",
    shortDesc: "Translucent ivory onyx that glows beautifully when backlit.",
    images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Translucency": "High",
      "Hardness (Mohs)": "6.5",
      "Backlit": "Yes",
      "Min. Order": "30 sq.ft."
    },
    tags: ["onyx", "backlit", "ivory", "new"]
  },
  {
    id: "onyx-green-012",
    name: "Onyx Green Stone",
    category: "onyx",
    price: 720,
    originalPrice: 850,
    color: "Green",
    colorHex: "#224A24",
    finish: "Polished",
    thickness: "15mm",
    origin: "Balochistan, Pakistan",
    size: "30×60 cm / Custom",
    application: "Feature Walls, Bars, Vanity Tops",
    availability: "limited",
    isNew: false,
    isPopular: true,
    isPremium: true,
    description: "Rich emerald and forest green onyx with swirling patterns of gold, brown, and white. Fully translucent and perfect for high-end accent panels and vanity installations.",
    shortDesc: "Rich forest green onyx with dramatic swirling patterns.",
    images: ["https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Translucency": "High",
      "Hardness (Mohs)": "6.5",
      "Backlit": "Yes",
      "Min. Order": "30 sq.ft."
    },
    tags: ["onyx", "green", "luxury", "rare"]
  },

  // ========== GRANITE ==========
  {
    id: "absolute-black-granite-013",
    name: "Absolute Black Granite",
    category: "granite",
    price: 120,
    originalPrice: 150,
    color: "Black",
    colorHex: "#0D0D0D",
    finish: "Polished / Honed",
    thickness: "18mm",
    origin: "Karnataka, India",
    size: "60×60 cm / Custom Slabs",
    application: "Kitchen Countertops, Flooring, Exterior",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "Uniform jet black granite with a polished surface. Highly resistant to heat, scratches, and stains. Sourced from Karnataka, it is the definitive choice for modern kitchen countertops.",
    shortDesc: "Uniform jet black granite — maximum durability and sleekness.",
    images: ["assets/images/absolute_black_granite.png"],
    specs: {
      "Water Absorption": "< 0.08%",
      "Compressive Strength": "260 MPa",
      "Hardness (Mohs)": "7",
      "Min. Order": "200 sq.ft."
    },
    tags: ["granite", "black", "countertop", "durable"]
  },
  {
    id: "alaska-white-granite-014",
    name: "Alaska White Granite",
    category: "granite",
    price: 150,
    originalPrice: 180,
    color: "White & Silver",
    colorHex: "#E1E1E1",
    finish: "Polished",
    thickness: "18mm",
    origin: "Espirito Santo, Brazil",
    size: "60×60 cm / Custom",
    application: "Kitchen Countertops, Flooring",
    availability: "in-stock",
    isNew: false,
    isPopular: true,
    isPremium: false,
    description: "A frosty blend of silver, white, and grey with dramatic black and brown mineral deposits. Sourced from Brazil, it offers a high-end luxury granite look suitable for kitchens and backsplashes.",
    shortDesc: "Silver, white, and grey granite with dark dramatic minerals.",
    images: ["https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 0.12%",
      "Compressive Strength": "220 MPa",
      "Hardness (Mohs)": "6",
      "Min. Order": "150 sq.ft."
    },
    tags: ["granite", "white", "brazil", "popular"]
  },
  {
    id: "river-white-granite-015",
    name: "River White Granite",
    category: "granite",
    price: 140,
    originalPrice: 170,
    color: "White",
    colorHex: "#ECEAE6",
    finish: "Polished",
    thickness: "18mm",
    origin: "Andhra Pradesh, India",
    size: "60×60 cm / Custom",
    application: "Kitchen Countertops, Flooring, Stairs",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "Features a soft white canvas with sweeping light grey veins and small deep burgundy spots. Brings fluid movement and bright elegance to kitchen countertops and accent steps.",
    shortDesc: "Soft white granite with sweeping grey veins and burgundy flecks.",
    images: ["https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 0.15%",
      "Compressive Strength": "215 MPa",
      "Hardness (Mohs)": "6.5",
      "Min. Order": "150 sq.ft."
    },
    tags: ["granite", "white", "india", "kitchen"]
  },
  {
    id: "himalayan-brown-granite-016",
    name: "Himalayan Brown Granite",
    category: "granite",
    price: 160,
    originalPrice: 200,
    color: "Brown",
    colorHex: "#4E3C32",
    finish: "Polished / Leathered",
    thickness: "18mm",
    origin: "Himachal Pradesh, India",
    size: "60×60 cm",
    application: "Outdoor Paving, Countertops, Accent Pillars",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "A dark chocolate brown granite accented by black and deep grey crystal clusters. Highly durable, this stone adds majestic earthy warmth to both interiors and exterior facades.",
    shortDesc: "Deep brown granite with majestic black crystal clusters.",
    images: ["https://images.unsplash.com/photo-1549187774-b4e9b0445b41?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 0.1%",
      "Compressive Strength": "240 MPa",
      "Hardness (Mohs)": "6.5",
      "Min. Order": "150 sq.ft."
    },
    tags: ["granite", "brown", "india", "exterior"]
  },

  // ========== SANDSTONE & SLATE ==========
  {
    id: "desert-sandstone-017",
    name: "Desert Sandstone",
    category: "sandstone",
    price: 100,
    originalPrice: 130,
    color: "Yellow",
    colorHex: "#E2A76F",
    finish: "Natural Cleft / Honed",
    thickness: "22mm",
    origin: "Jaisalmer, Rajasthan, India",
    size: "60×60 cm / 60×90 cm",
    application: "Cladding, Patios, Pool Areas, Landscaping",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "A warm golden-yellow sandstone with rich natural textures. Highly slip-resistant, weather-proof, and durable, making it excellent for outdoor villa cladding, pool copings, and gardens.",
    shortDesc: "Warm golden sandstone with natural slip-resistant texture.",
    images: ["https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 1.8%",
      "Compressive Strength": "85 MPa",
      "Hardness (Mohs)": "6",
      "Min. Order": "200 sq.ft."
    },
    tags: ["sandstone", "yellow", "outdoor", "cladding"]
  },
  {
    id: "premium-slate-018",
    name: "Premium Slate Stone",
    category: "slate",
    price: 90,
    originalPrice: 120,
    color: "Charcoal",
    colorHex: "#383E42",
    finish: "Natural Cleft",
    thickness: "15mm",
    origin: "Kund, India",
    size: "30×60 cm / 40×40 cm",
    application: "Wall Cladding, Rustic Flooring, Fireplace",
    availability: "in-stock",
    isNew: false,
    isPopular: false,
    isPremium: false,
    description: "Deep grey to charcoal black slate with a layered, natural cleft texture. Highly durable, non-slip, and water-resistant. Ideal for rustic floor tiles and high-end textured feature walls.",
    shortDesc: "Layered charcoal black slate with a rustic, non-slip cleft finish.",
    images: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=800"],
    specs: {
      "Water Absorption": "< 0.4%",
      "Compressive Strength": "150 MPa",
      "Hardness (Mohs)": "5–6",
      "Min. Order": "200 sq.ft."
    },
    tags: ["slate", "charcoal", "rustic", "cladding"]
  }
];

// Synchronize with CRM Admin database if exists (with app version upgrade protection)
const APP_VERSION = '2.0.0';
const localVersion = localStorage.getItem('valure_custom_marbles_version');
const localCustomMarbles = localStorage.getItem('valure_custom_marbles');

if (localCustomMarbles && localVersion === APP_VERSION) {
    try {
        const parsed = JSON.parse(localCustomMarbles);
        marbleProducts.length = 0;
        parsed.forEach(p => marbleProducts.push(p));
    } catch (e) {
        console.error('Error synchronizing local custom marbles:', e);
    }
} else {
    localStorage.setItem('valure_custom_marbles', JSON.stringify(marbleProducts));
    localStorage.setItem('valure_custom_marbles_version', APP_VERSION);
}

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
  marble:     { label: "Marble", icon: "fas fa-archway", count: marbleProducts.filter(p=>p.category==='marble').length },
  granite:    { label: "Granite", icon: "fas fa-mountain", count: marbleProducts.filter(p=>p.category==='granite').length },
  quartzite:  { label: "Quartzite & Quartz", icon: "fas fa-gem", count: marbleProducts.filter(p=>p.category==='quartzite').length },
  onyx:       { label: "Onyx", icon: "fas fa-star", count: marbleProducts.filter(p=>p.category==='onyx').length },
  limestone:  { label: "Limestone & Travertine", icon: "fas fa-leaf", count: marbleProducts.filter(p=>p.category==='limestone').length },
  sandstone:  { label: "Sandstone", icon: "fas fa-sun", count: marbleProducts.filter(p=>p.category==='sandstone').length },
  slate:      { label: "Slate", icon: "fas fa-layer-group", count: marbleProducts.filter(p=>p.category==='slate').length }
};
