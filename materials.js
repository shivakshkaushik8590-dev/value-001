// ==========================================================================
// VALURE STUDIO - Premium Material Library Controller
// Handles material database, search keywords, category tab filters, LocalStorage
// wishlist, floating comparison bar, and technical specification comparison table.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. COMPREHENSIVE MATERIAL DATABASE (20 ITEMS ACROSS 10 CATEGORIES)
    const materialsData = [
        // MARBLE
        {
            id: "mar-carrara",
            name: "Carrara White Marble",
            category: "marble",
            price: 650, // INR per sqft
            origin: "Tuscany, Italy",
            finish: "Polished / Honed",
            image: "assets/images/mat-library-marble.png",
            desc: "Timeless Italian white marble with soft grey feather veining. Elegant, polished finish that provides natural brightness.",
            badge: "Premium Choice",
            rating: 4.9,
            specs: { thickness: "20mm", durability: "High (Indoor)", maintenance: "Medium", ecoRating: "A+", application: "Flooring, Vanities" },
            reviews: [
                { user: "Rajesh S.", text: "Stunning veining. Installed it in our master bathroom, looks exceptional!" },
                { user: "Preeti K.", text: "High quality stone. Very happy with the polish and density." }
            ]
        },
        {
            id: "mar-statuario",
            name: "Statuario Gold Marble",
            category: "marble",
            price: 950,
            origin: "Carrara, Italy",
            finish: "High-Gloss Polished",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400",
            desc: "Ultra-luxury Italian marble featuring bold, dramatic gold and dark grey veins. The ultimate choice for luxury focal points.",
            badge: "Premium Choice",
            rating: 5.0,
            specs: { thickness: "20mm", durability: "High (Indoor)", maintenance: "Medium-High", ecoRating: "A", application: "Feature Walls, Flooring" },
            reviews: [
                { user: "Vikram A.", text: "Absolute masterpiece. Sourced directly for our villa hallway flooring." }
            ]
        },

        // GRANITE
        {
            id: "gra-galaxy",
            name: "Black Galaxy Granite",
            category: "granite",
            price: 380,
            origin: "Andhra Pradesh, India",
            finish: "Mirror Polish",
            image: "assets/images/mat-library-granite.png",
            desc: "Deep black granite containing golden-bronze crystalline speckles resembling a star-studded sky. Highly durable.",
            badge: "Popular",
            rating: 4.8,
            specs: { thickness: "20mm / 30mm", durability: "Ultra-High", maintenance: "Low", ecoRating: "A", application: "Kitchen Counters, Stairs" },
            reviews: [
                { user: "Anil M.", text: "Super durable. Resists heat and scratches perfectly in the kitchen." }
            ]
        },
        {
            id: "gra-kashmir",
            name: "Kashmir White Granite",
            category: "granite",
            price: 320,
            origin: "Tamil Nadu, India",
            finish: "Polished / Matte",
            image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=400",
            desc: "Light greyish-white background granite with black spots and garnet speckles. Creates clean, modern outlines.",
            badge: "Popular",
            rating: 4.7,
            specs: { thickness: "20mm", durability: "Ultra-High", maintenance: "Low", ecoRating: "A+", application: "Countertops, Flooring" },
            reviews: []
        },

        // FLOOR TILES
        {
            id: "tile-terrazzo",
            name: "Classic Terrazzo Tiles",
            category: "tiles",
            price: 180,
            origin: "Gujarat, India",
            finish: "Matte / Satin",
            image: "assets/images/mat-library-floor-tiles.png",
            desc: "Modern terrazzo composites containing real marble chips cast in a durable cementitious matrix. Eco-friendly and chic.",
            badge: "Popular",
            rating: 4.6,
            specs: { thickness: "12mm", durability: "High (Heavy Traffic)", maintenance: "Low", ecoRating: "A++", application: "Flooring, Accent Walls" },
            reviews: [
                { user: "Meera J.", text: "Love the organic look and durability. Perfect for our patio." }
            ]
        },
        {
            id: "tile-porcelain",
            name: "Calacatta Porcelain Slab",
            category: "tiles",
            price: 240,
            origin: "Morbi, India",
            finish: "High-Gloss Glazed",
            image: "https://images.unsplash.com/photo-1544078751-58feb2dcbda2?auto=format&fit=crop&q=80&w=400",
            desc: "Large format vitrified porcelain tiles reproducing high-end Calacatta veins. Extremely resistant to stains.",
            badge: "Premium Choice",
            rating: 4.8,
            specs: { thickness: "9mm", durability: "Ultra-High", maintenance: "Very Low", ecoRating: "A+", application: "Living Room, Bathroom" },
            reviews: []
        },

        // WOODEN FLOORING
        {
            id: "wood-oak",
            name: "European Oak Herringbone",
            category: "wood",
            price: 480,
            origin: "Bavaria, Germany",
            finish: "Matte Lacquer / Wire-Brushed",
            image: "assets/images/mat-library-wooden-flooring.png",
            desc: "Wire-brushed European oak boards. Installed in a classic herringbone layout to expand room perspectives.",
            badge: "Premium Choice",
            rating: 4.9,
            specs: { thickness: "15mm (4mm veneer)", durability: "High (Residential)", maintenance: "Medium", ecoRating: "A++", application: "Living Room, Bedroom" },
            reviews: [
                { user: "Devendra P.", text: "Beautiful texture. It instantly added luxury warmth to our living room." }
            ]
        },
        {
            id: "wood-walnut",
            name: "Smoked Walnut Planks",
            category: "wood",
            price: 550,
            origin: "Oregon, USA",
            finish: "Satin / Brushed",
            image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400",
            desc: "Rich dark walnut showing deep grain patterns and smoked highlights. Cultivates an intimate, warm luxury feel.",
            badge: "Premium Choice",
            rating: 5.0,
            specs: { thickness: "18mm Solid", durability: "High", maintenance: "Medium", ecoRating: "A+", application: "Bedrooms, Home Offices" },
            reviews: []
        },

        // WALL PANELS
        {
            id: "panel-timber",
            name: "Fluted Oak Wall Panels",
            category: "panels",
            price: 350,
            origin: "Kyoto, Japan",
            finish: "Natural Matte Wood",
            image: "assets/images/mat-library-wall-panels.png",
            desc: "Linear fluted wood paneling that creates soft acoustic dampening and stunning vertical shadow lines.",
            badge: "Popular",
            rating: 4.8,
            specs: { thickness: "22mm", durability: "High (Indoor Only)", maintenance: "Low", ecoRating: "A++", application: "TV Unit, Bed Backdrop" },
            reviews: [
                { user: "Suresh G.", text: "Amazing TV wall backdrop. The shadows it casts under spotlight look great." }
            ]
        },
        {
            id: "panel-charcoal",
            name: "Charcoal Louver Panel",
            category: "panels",
            price: 280,
            origin: "Seoul, South Korea",
            finish: "Matte Textured Poly",
            image: "https://images.unsplash.com/photo-1600566753190-17f0bab26412?auto=format&fit=crop&q=80&w=400",
            desc: "Premium charcoal louver panels. 100% waterproof and termite-proof, ideal for damp-prone accent walls.",
            badge: "Popular",
            rating: 4.7,
            specs: { thickness: "12mm", durability: "Ultra-High", maintenance: "Zero", ecoRating: "A", application: "Bathrooms, Living Accents" },
            reviews: []
        },

        // PAINT COLLECTIONS
        {
            id: "paint-alabaster",
            name: "Warm Alabaster Matte",
            category: "paint",
            price: 85,
            origin: "Valure Lab Sourced",
            finish: "Velvet Chalky Matte",
            image: "assets/images/mat-library-paint-colors.png",
            desc: "Exquisite off-white paint with zero shine. High coverage, washable, and completely VOC-free.",
            badge: "Popular",
            rating: 4.9,
            specs: { thickness: "2 Coats Recommended", durability: "High (Washable)", maintenance: "Low", ecoRating: "A++", application: "All Internal Walls" },
            reviews: []
        },
        {
            id: "paint-navy",
            name: "Deep Navy Slate Satin",
            category: "paint",
            price: 95,
            origin: "Valure Lab Sourced",
            finish: "Velvet Satin",
            image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400",
            desc: "Rich dark navy blue paint with charcoal undertones. Reflects ambient light softly for premium master bedrooms.",
            badge: "Premium Choice",
            rating: 4.8,
            specs: { thickness: "2 Coats", durability: "Ultra-Durable", maintenance: "Low", ecoRating: "A++", application: "Accent Walls, Cabinets" },
            reviews: []
        },

        // KITCHEN MATERIALS
        {
            id: "kit-quartz",
            name: "Calacatta Quartz Slab",
            category: "kitchen",
            price: 450,
            origin: "Rajasthan, India",
            finish: "Polished Quartz",
            image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=400",
            desc: "Engineered quartz slabs with dramatic grey veining. Non-porous, completely scratch-resistant, and stain-free.",
            badge: "Premium Choice",
            rating: 4.9,
            specs: { thickness: "20mm", durability: "Ultra-High", maintenance: "Zero", ecoRating: "A+", application: "Countertops, Islands" },
            reviews: [
                { user: "Pooja V.", text: "Doesn't stain at all. Turmeric or tea marks wipe away instantly." }
            ]
        },

        // BATHROOM MATERIALS
        {
            id: "bath-onyx",
            name: "Honey Onyx Translucent",
            category: "bathroom",
            price: 1200,
            origin: "Afyon, Turkey",
            finish: "Mirror Polished Travertine",
            image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400",
            desc: "Beautiful semi-precious golden-honey stone. Highly translucent, designed to be backlit behind luxury vanity sinks.",
            badge: "Premium Choice",
            rating: 5.0,
            specs: { thickness: "16mm", durability: "Medium (Indoor Only)", maintenance: "High", ecoRating: "A", application: "Backlit Vanities, Bar Tops" },
            reviews: []
        },

        // CEILING DESIGNS
        {
            id: "ceil-beams",
            name: "Acoustic Walnut Beams",
            category: "ceiling",
            price: 320,
            origin: "Bordeaux, France",
            finish: "Teak Wax Oiled",
            image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=400",
            desc: "Linear hollow walnut beams mounted onto acoustic felt sound absorbing panel backings. Reduces room echo.",
            badge: "Popular",
            rating: 4.7,
            specs: { thickness: "40mm Beams", durability: "High", maintenance: "Low", ecoRating: "A++", application: "Ceiling Accents" },
            reviews: []
        },

        // DOORS & WINDOWS
        {
            id: "door-pivot",
            name: "Steel Pivot Glass Door",
            category: "doors",
            price: 1800,
            origin: "Mumbai, India",
            finish: "Powder Coated Matte",
            image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=400",
            desc: "Minimal steel frame pivot entry door featuring double-glazed safety glass panels. Clean lines for modern entries.",
            badge: "Premium Choice",
            rating: 4.9,
            specs: { thickness: "45mm Frame", durability: "Ultra-High", maintenance: "Low", ecoRating: "A+", application: "Main Entrance, Partition" },
            reviews: [
                { user: "Nitin P.", text: "Absolute showstopper entrance door. Smooth rotation." }
            ]
        }
    ];

    // 2. STATE CONTROLS
    let favoritesList = JSON.parse(localStorage.getItem('value001_materials_favs')) || [];
    let compareList = JSON.parse(localStorage.getItem('value001_materials_compare')) || [];
    let projectMaterials = JSON.parse(localStorage.getItem('valure_selected_project_materials')) || [];
    let activeCategory = 'all';
    let searchQuery = '';
    let showFavoritesOnly = false;

    // DOM Elements
    const grid = document.getElementById('materials-grid');
    const searchInput = document.getElementById('mat-search');
    const categoryTabs = document.querySelectorAll('.mat-tab');
    const favToggleBtn = document.getElementById('mat-fav-toggle');
    const previewModal = document.getElementById('preview-modal');
    const closeModal = document.getElementById('close-preview-modal');

    // Compare Elements
    const compareBar = document.getElementById('compare-bar');
    const compareCount = document.getElementById('compare-count');
    const compareClearBtn = document.getElementById('compare-clear-btn');
    const compareTriggerBtn = document.getElementById('compare-trigger-btn');
    const compareModal = document.getElementById('compare-modal');
    const closeCompareModal = document.getElementById('close-compare-modal');

    // ==========================================================================
    // RENDER MATERIAL LIBRARY
    // ==========================================================================
    const renderLibrary = () => {
        if (!grid) return;
        grid.innerHTML = '';

        // Filter elements
        const filtered = materialsData.filter(item => {
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.origin.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesFavorites = !showFavoritesOnly || favoritesList.includes(item.id);

            return matchesCategory && matchesSearch && matchesFavorites;
        });

        // Empty state check
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-muted);">
                    <i class="fas fa-boxes" style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 20px;"></i>
                    <h3>No Premium Finishes Found</h3>
                    <p>Modify your search criteria or category filter.</p>
                </div>
            `;
            return;
        }

        // Render card nodes
        filtered.forEach(item => {
            const isFav = favoritesList.includes(item.id);
            const isCompared = compareList.includes(item.id);
            const isAdded = projectMaterials.includes(item.id);
            const card = document.createElement('div');
            card.classList.add('material-card', 'reveal', 'active');

            card.innerHTML = `
                <div class="material-img-wrapper" style="height: 220px;">
                    <img src="${item.image}" alt="${item.name}" loading="lazy" style="width: 100%; height: 100%; object-fit: cover;">
                    <button class="fav-card-btn ${isFav ? 'active' : ''}" data-id="${item.id}" aria-label="Favorite">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    ${item.badge ? `<span class="canvas-mode-badge" style="position:absolute;top:15px;left:15px;background:var(--primary-blue);color:var(--accent-gold);border:1px solid var(--accent-gold);padding:4px 10px;font-size:0.65rem;border-radius:20px;font-weight:700;text-transform:uppercase;z-index:9;">${item.badge}</span>` : ''}
                    <div class="material-card-overlay">
                        <button class="btn btn-primary btn-mini btn-preview" data-id="${item.id}" style="font-size:0.75rem;">View Specifications</button>
                    </div>
                </div>
                <div class="material-card-info" style="padding: 20px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <span class="mat-category-label">${item.category}</span>
                        <div style="color:var(--accent-gold);font-size:0.8rem;font-weight:700;"><i class="fas fa-star" style="margin-right:3px;"></i> ${item.rating}</div>
                    </div>
                    <h4 style="margin-bottom:8px;font-size:1.15rem;font-family:'Outfit',sans-serif;color:var(--primary-blue);">${item.name}</h4>
                    <p style="font-size:0.8rem;color:var(--text-muted);line-height:1.5;margin-bottom:15px;height:45px;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">${item.desc}</p>
                    <div class="mat-card-footer" style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid #f0f0f0;padding-top:15px;">
                        <span style="font-size:0.8rem;font-weight:700;color:var(--primary-blue);">₹${item.price} <span style="font-size:0.7rem;font-weight:400;color:var(--text-muted);">/ Sq. Ft.</span></span>
                        <div style="display:flex;gap:6px;">
                            <button class="compare-toggle-btn ${isCompared ? 'active' : ''}" data-id="${item.id}" title="Compare Finish" style="background:none;border:1px solid #ddd;border-radius:4px;padding:6px 10px;cursor:pointer;font-size:0.75rem;transition:0.3s;"><i class="fas fa-columns" style="color:${isCompared ? 'var(--accent-gold)' : '#777'}"></i> Compare</button>
                            <button class="project-add-btn ${isAdded ? 'active' : ''}" data-id="${item.id}" title="Add to Estimator Project" style="background:var(--primary-blue);border:none;border-radius:4px;padding:6px 10px;cursor:pointer;color:var(--white);font-size:0.75rem;transition:0.3s;"><i class="${isAdded ? 'fas fa-check' : 'fas fa-plus'}" style="color:var(--accent-gold)"></i></button>
                        </div>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });

        bindCardActions();
    };

    // ==========================================================================
    // ACTION BINDINGS (FAVORITE, COMPARE, PROJECT ADD, PREVIEW)
    // ==========================================================================
    const bindCardActions = () => {
        // Heart Wishlist Toggle
        document.querySelectorAll('.fav-card-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const idx = favoritesList.indexOf(id);
                if (idx === -1) {
                    favoritesList.push(id);
                    btn.classList.add('active');
                    btn.querySelector('i').className = 'fas fa-heart';
                } else {
                    favoritesList.splice(idx, 1);
                    btn.classList.remove('active');
                    btn.querySelector('i').className = 'far fa-heart';
                }
                localStorage.setItem('value001_materials_favs', JSON.stringify(favoritesList));
                if (showFavoritesOnly) renderLibrary();
            });
        });

        // Add to Project list Toggle
        document.querySelectorAll('.project-add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const idx = projectMaterials.indexOf(id);
                if (idx === -1) {
                    projectMaterials.push(id);
                    btn.classList.add('active');
                    btn.innerHTML = '<i class="fas fa-check" style="color:var(--accent-gold)"></i>';
                    alert('Material added to Estimator Project configuration preset!');
                } else {
                    projectMaterials.splice(idx, 1);
                    btn.classList.remove('active');
                    btn.innerHTML = '<i class="fas fa-plus" style="color:var(--accent-gold)"></i>';
                    alert('Material removed from Project configuration preset.');
                }
                localStorage.setItem('valure_selected_project_materials', JSON.stringify(projectMaterials));
            });
        });

        // Compare Toggle
        document.querySelectorAll('.compare-toggle-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = btn.dataset.id;
                const idx = compareList.indexOf(id);
                
                if (idx === -1) {
                    if (compareList.length >= 3) {
                        alert('You can compare a maximum of 3 materials side-by-side.');
                        return;
                    }
                    compareList.push(id);
                    btn.classList.add('active');
                    btn.querySelector('i').style.color = 'var(--accent-gold)';
                } else {
                    compareList.splice(idx, 1);
                    btn.classList.remove('active');
                    btn.querySelector('i').style.color = '#777';
                }

                localStorage.setItem('value001_materials_compare', JSON.stringify(compareList));
                updateCompareBar();
            });
        });

        // Quick Preview
        document.querySelectorAll('.btn-preview').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = btn.dataset.id;
                const item = materialsData.find(m => m.id === id);
                if (item) openQuickPreviewModal(item);
            });
        });
    };

    // ==========================================================================
    // FLOATING COMPARE BAR UPDATES & RENDER LOGIC
    // ==========================================================================
    const updateCompareBar = () => {
        if (!compareBar) return;
        compareCount.textContent = compareList.length;

        if (compareList.length > 0) {
            compareBar.classList.add('active');
        } else {
            compareBar.classList.remove('active');
        }
    };

    if (compareClearBtn) {
        compareClearBtn.addEventListener('click', () => {
            compareList = [];
            localStorage.setItem('value001_materials_compare', JSON.stringify(compareList));
            updateCompareBar();
            renderLibrary();
        });
    }

    if (compareTriggerBtn) {
        compareTriggerBtn.addEventListener('click', () => {
            if (compareList.length < 2) {
                alert('Please select at least 2 materials to compare.');
                return;
            }
            openCompareModal();
        });
    }

    const openCompareModal = () => {
        const headerRow = document.getElementById('compare-header-row');
        const bodyRows = document.getElementById('compare-body-rows');
        if (!headerRow || !bodyRows || !compareModal) return;

        // Reset Table
        headerRow.innerHTML = '<th style="padding:15px;border-bottom:2px solid #ddd;font-family:\'Outfit\',sans-serif;font-weight:700;color:var(--primary-blue);">Specification</th>';
        bodyRows.innerHTML = '';

        // Extract compared items
        const items = compareList.map(id => materialsData.find(m => m.id === id)).filter(Boolean);

        // Add headers
        items.forEach(item => {
            headerRow.innerHTML += `
                <th style="padding:15px;border-bottom:2px solid #ddd;min-width:200px;">
                    <div style="text-align:center;">
                        <img src="${item.image}" alt="${item.name}" style="width:100px;height:70px;object-fit:cover;border-radius:6px;margin-bottom:8px;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
                        <h4 style="font-family:'Outfit',sans-serif;font-size:0.95rem;color:var(--primary-blue);">${item.name}</h4>
                        <span style="font-size:0.75rem;color:var(--accent-gold);font-weight:700;text-transform:uppercase;">${item.category}</span>
                    </div>
                </th>
            `;
        });

        // Rows to render
        const specKeys = [
            { label: "Price (INR)", eval: (item) => `₹${item.price} / Sq. Ft.` },
            { label: "Sourcing Origin", eval: (item) => item.origin },
            { label: "Surface Finish", eval: (item) => item.finish },
            { label: "Available Thickness", eval: (item) => item.specs.thickness },
            { label: "Durability Standard", eval: (item) => item.specs.durability },
            { label: "Maintenance Level", eval: (item) => item.specs.maintenance },
            { label: "Eco Sustainability", eval: (item) => item.specs.ecoRating },
            { label: "Recommended Use", eval: (item) => item.specs.application },
            { label: "Customer Rating", eval: (item) => `${item.rating} / 5.0` }
        ];

        specKeys.forEach(spec => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td style="padding:14px 18px;font-weight:700;border-bottom:1px solid #f0f0f0;color:var(--text-muted);font-size:0.85rem;">${spec.label}</td>`;
            items.forEach(item => {
                tr.innerHTML += `<td style="padding:14px 18px;border-bottom:1px solid #f0f0f0;font-size:0.85rem;color:var(--primary-blue);">${spec.eval(item)}</td>`;
            });
            bodyRows.appendChild(tr);
        });

        compareModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeCompare = () => {
        if (compareModal) {
            compareModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (closeCompareModal) closeCompareModal.addEventListener('click', closeCompare);
    if (compareModal) {
        window.addEventListener('click', (e) => {
            if (e.target === compareModal) closeCompare();
        });
    }

    // ==========================================================================
    // DETAIL MODAL PREVIEW & RELATED PRODUCT RECOMMENDATION DRAWER
    // ==========================================================================
    const openQuickPreviewModal = (item) => {
        if (!previewModal) return;

        // Details Populate
        document.getElementById('modal-img').src = item.image;
        document.getElementById('modal-title').textContent = item.name;
        document.getElementById('modal-category').textContent = item.category.toUpperCase();
        document.getElementById('modal-desc').textContent = item.desc;

        document.getElementById('spec-origin').textContent = item.origin;
        document.getElementById('spec-finish').textContent = item.finish;
        document.getElementById('spec-thick').textContent = item.specs.thickness;
        document.getElementById('spec-durability').textContent = item.specs.durability;
        document.getElementById('spec-maintenance').textContent = item.specs.maintenance;
        document.getElementById('spec-eco').textContent = item.specs.ecoRating;
        document.getElementById('spec-application').textContent = item.specs.application;
        document.getElementById('spec-price').textContent = `₹${item.price} / Sq. Ft.`;

        // Render reviews
        const reviewsList = document.getElementById('modal-reviews-list');
        if (reviewsList) {
            reviewsList.innerHTML = '';
            if (item.reviews && item.reviews.length > 0) {
                item.reviews.forEach(r => {
                    reviewsList.innerHTML += `
                        <div style="background:var(--light-beige);padding:12px;border-radius:6px;margin-bottom:8px;font-size:0.8rem;border:1px solid #eee;">
                            <div style="display:flex;justify-content:space-between;margin-bottom:4px;font-weight:700;color:var(--primary-blue);"><span>${r.user}</span> <span style="color:var(--accent-gold);"><i class="fas fa-star"></i> Rated</span></div>
                            <p style="color:var(--text-dark);line-height:1.4;">"${r.text}"</p>
                        </div>
                    `;
                });
            } else {
                reviewsList.innerHTML = `<p style="font-size:0.8rem;color:var(--text-muted);font-style:italic;">No feedback posted yet for this finish.</p>`;
            }
        }

        // Render Related Products (products inside the same category, maximum 2)
        const relatedGrid = document.getElementById('modal-related-grid');
        if (relatedGrid) {
            relatedGrid.innerHTML = '';
            const related = materialsData.filter(m => m.category === item.category && m.id !== item.id).slice(0, 2);
            if (related.length > 0) {
                related.forEach(rel => {
                    const card = document.createElement('div');
                    card.style.display = 'flex';
                    card.style.gap = '10px';
                    card.style.alignItems = 'center';
                    card.style.background = 'var(--light-beige)';
                    card.style.padding = '8px';
                    card.style.borderRadius = '6px';
                    card.style.cursor = 'pointer';
                    card.style.border = '1px solid #eee';

                    card.innerHTML = `
                        <img src="${rel.image}" style="width:50px;height:40px;object-fit:cover;border-radius:4px;">
                        <div style="flex:1;min-width:0;">
                            <h5 style="font-size:0.75rem;font-family:'Outfit',sans-serif;margin-bottom:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--primary-blue);">${rel.name}</h5>
                            <span style="font-size:0.7rem;font-weight:700;color:var(--accent-gold);">₹${rel.price}/sqft</span>
                        </div>
                    `;
                    card.addEventListener('click', () => {
                        openQuickPreviewModal(rel);
                    });
                    relatedGrid.appendChild(card);
                });
            } else {
                relatedGrid.innerHTML = `<p style="font-size:0.8rem;color:var(--text-muted);grid-column: 1 / -1;font-style:italic;">No other materials in this category.</p>`;
            }
        }

        // Quote inquiry setup
        document.getElementById('sample-item-name').value = item.name;

        // Slide Modal open
        previewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeQuickPreview = () => {
        if (previewModal) {
            previewModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    if (closeModal) closeModal.addEventListener('click', closeQuickPreview);
    if (previewModal) {
        window.addEventListener('click', (e) => {
            if (e.target === previewModal) closeQuickPreview();
        });
    }

    // Inquiry form submit
    const requestForm = document.getElementById('sample-request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = requestForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Submitting Request...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Quote Request Received!';
                btn.style.backgroundColor = '#10b981';
                requestForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    closeQuickPreview();
                }, 2000);
            }, 1200);
        });
    }

    // ==========================================================================
    // SELECTION SEARCHES, TAB FILTERS & FAVORITES TOGGLE
    // ==========================================================================
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            renderLibrary();
        });
    }

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            activeCategory = tab.dataset.category;
            renderLibrary();
        });
    });

    if (favToggleBtn) {
        favToggleBtn.addEventListener('click', () => {
            showFavoritesOnly = !showFavoritesOnly;
            
            if (showFavoritesOnly) {
                favToggleBtn.classList.add('active');
                favToggleBtn.innerHTML = '<i class="fas fa-heart"></i> Showing Wishlist';
            } else {
                favToggleBtn.classList.remove('active');
                favToggleBtn.innerHTML = '<i class="far fa-heart"></i> Show Favorites';
            }
            renderLibrary();
        });
    }

    // Initializations
    renderLibrary();
    updateCompareBar();
});
