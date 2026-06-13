// ==========================================================================
// VALUE 001 - Material Library Controller
// Manages material database rendering, live keyword searching, category filters, 
// LocalStorage favorites, and Quick Preview modal specs.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. MATERIAL DATABASE
    const materialsData = [
        // MARBLE
        {
            id: "mar-carrara",
            name: "Carrara Honed Marble",
            category: "marble",
            price: "$$$$",
            origin: "Tuscany, Italy",
            finish: "Honed / Semi-Gloss",
            image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=400",
            desc: "Classic Italian white marble with soft grey feather veining. Perfect for bathroom vanities, splashbacks, and fireplace surrounds.",
            specs: { thickness: "20mm", durability: "High (Indoor)", ecoRating: "A+" }
        },
        {
            id: "mar-statuario",
            name: "Statuario Gold Marble",
            category: "marble",
            price: "$$$$$",
            origin: "Carrara, Italy",
            finish: "Polished",
            image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=400",
            desc: "Premium marble characterized by bold, dramatic dark grey and gold veining on a pure white backdrop. The pinnacle of luxury.",
            specs: { thickness: "20mm", durability: "High (Indoor)", ecoRating: "A" }
        },
        {
            id: "mar-black",
            name: "Black Galaxy Marble",
            category: "marble",
            price: "$$$$",
            origin: "Basque Country, Spain",
            finish: "Polished",
            image: "https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=400",
            desc: "Deep black marble containing micro-veins and crystalline speckles resembling a star-studded sky. High drama for accent floors.",
            specs: { thickness: "30mm", durability: "Ultra-High", ecoRating: "A" }
        },
        {
            id: "mar-beige",
            name: "Crema Marfil Beige",
            category: "marble",
            price: "$$$",
            origin: "Alicante, Spain",
            finish: "Polished",
            image: "https://images.unsplash.com/photo-1600566753190-17f0bab26412?auto=format&fit=crop&q=80&w=400",
            desc: "Warm cream-colored marble featuring soft calcite veins. Instills a calm, warm luxury ambience in living area surfaces.",
            specs: { thickness: "20mm", durability: "Medium-High", ecoRating: "A+" }
        },

        // TILES
        {
            id: "tile-porcelain",
            name: "Glossy Calacatta Porcelain",
            category: "tiles",
            price: "$$",
            origin: "Valencia, Spain",
            finish: "High Gloss",
            image: "https://images.unsplash.com/photo-1544078751-58feb2dcbda2?auto=format&fit=crop&q=80&w=400",
            desc: "Large-format porcelain tiles reproducing Calacatta veining with a highly durable, high-gloss glazed finish.",
            specs: { thickness: "10mm", durability: "Ultra-High (Heavy Traffic)", ecoRating: "A+" }
        },
        {
            id: "tile-pattern",
            name: "Handcrafted Zellige Pattern",
            category: "tiles",
            price: "$$$",
            origin: "Fez, Morocco",
            finish: "Glazed / Organic",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=400",
            desc: "Hand-molded terracotta tiles showing organic variations in tone and texture. Adds heritage charm to walls.",
            specs: { thickness: "12mm", durability: "Medium (Wall Only)", ecoRating: "A++" }
        },

        // WOODEN FLOORING
        {
            id: "wood-oak",
            name: "European Oak Herringbone",
            category: "wood",
            price: "$$$",
            origin: "Bavaria, Germany",
            finish: "Matte Oil / Wire-Brushed",
            image: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&q=80&w=400",
            desc: "Timeless wire-brushed European oak boards. Configured in a classic herringbone layout to expand room perspectives.",
            specs: { thickness: "15mm (4mm veneer)", durability: "High (Residential)", ecoRating: "A++" }
        },
        {
            id: "wood-walnut",
            name: "Smoked Walnut Planks",
            category: "wood",
            price: "$$$$",
            origin: "Oregon, USA",
            finish: "Satin / Brushed",
            image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=400",
            desc: "Rich dark walnut wood showing deep grain patterns and smoked highlights. Cultivates an intimate, warm luxury feel.",
            specs: { thickness: "18mm solid", durability: "High", ecoRating: "A+" }
        },

        // EPOXY FLOORING
        {
            id: "epoxy-metallic",
            name: "Metallic Gold-Dust Epoxy",
            category: "epoxy",
            price: "$$$",
            origin: "Studio Custom",
            finish: "Mirror Gloss",
            image: "https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=400",
            desc: "Seamless, self-leveling resin floor laced with shifting golden-bronze metallic pigments. Smooth, seamless, and futuristic.",
            specs: { thickness: "4mm", durability: "Industrial grade", ecoRating: "B" }
        },
        {
            id: "epoxy-ocean",
            name: "Ocean Reef Blue Epoxy",
            category: "epoxy",
            price: "$$$",
            origin: "Studio Custom",
            finish: "Mirror Gloss",
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=400",
            desc: "Seamless resin floor simulating ocean waves and deep water depth, ideal for premium commercial lounges and creative rooms.",
            specs: { thickness: "4mm", durability: "Industrial grade", ecoRating: "B" }
        },

        // WALLPAPERS
        {
            id: "wall-silk",
            name: "Gilded Silk Damask",
            category: "wallpapers",
            price: "$$$$",
            origin: "Lyon, France",
            finish: "Metallic Satin",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400",
            desc: "Woven silk wallcovering featuring complex floral motifs outlined in real gold leaf threads. Traditional elegance.",
            specs: { thickness: "0.8mm", durability: "Fragile (Accents)", ecoRating: "A" }
        },
        {
            id: "wall-grass",
            name: "Textured Grasscloth Sand",
            category: "wallpapers",
            price: "$$",
            origin: "Kyoto, Japan",
            finish: "Natural Matte",
            image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
            desc: "Hand-woven natural sea grass fibers laminated onto a paper backing. Provides wonderful organic texture and scent.",
            specs: { thickness: "1.2mm", durability: "Medium", ecoRating: "A++" }
        },

        // CEILING MATERIALS
        {
            id: "ceil-acoustic",
            name: "Acoustic Oak Slats",
            category: "ceiling",
            price: "$$$",
            origin: "Aarhus, Denmark",
            finish: "Matte Timber",
            image: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?auto=format&fit=crop&q=80&w=400",
            desc: "Linear timber slats mounted on thick acoustic sound-absorbent felt backing. Reduces echo while adding linear depth.",
            specs: { thickness: "22mm", durability: "High", ecoRating: "A++" }
        },

        // PAINT COLORS
        {
            id: "paint-alabaster",
            name: "Warm Alabaster (Matte)",
            category: "paint",
            price: "$",
            origin: "VALUE Paint Lab",
            finish: "Chalky Matte",
            image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=400",
            desc: "Exquisite warm off-white shade reflecting soft light. Completely covers wall imperfections with velvet matte depth.",
            specs: { thickness: "2 coats", durability: "Washable / Low VOC", ecoRating: "A++" }
        },
        {
            id: "paint-navy",
            name: "Deep Navy Slate (Satin)",
            category: "paint",
            price: "$",
            origin: "VALUE Paint Lab",
            finish: "Velvety Satin",
            image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=400",
            desc: "Rich dark navy blue paint containing charcoal undertones. Captures light beautifully across architectural surfaces.",
            specs: { thickness: "2 coats", durability: "Ultra-Durable", ecoRating: "A++" }
        }
    ];

    // 2. STATE VARIABLES
    let favoritesList = JSON.parse(localStorage.getItem('value001_materials_favs')) || [];
    let activeCategory = 'all';
    let searchQuery = '';
    let showFavoritesOnly = false;

    // Dom elements
    const grid = document.getElementById('materials-grid');
    const searchInput = document.getElementById('mat-search');
    const categoryTabs = document.querySelectorAll('.mat-tab');
    const favToggleBtn = document.getElementById('mat-fav-toggle');
    const previewModal = document.getElementById('preview-modal');
    const closeModal = document.getElementById('close-preview-modal');

    // 3. RENDER FUNCTION
    const renderLibrary = () => {
        if (!grid) return;
        grid.innerHTML = '';

        // Filter list
        const filtered = materialsData.filter(item => {
            // Category check
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            
            // Search query check
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                  item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  item.origin.toLowerCase().includes(searchQuery.toLowerCase());
            
            // Favorites check
            const matchesFavorites = !showFavoritesOnly || favoritesList.includes(item.id);

            return matchesCategory && matchesSearch && matchesFavorites;
        });

        // Handle empty states
        if (filtered.length === 0) {
            grid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--text-muted);">
                    <i class="fas fa-boxes" style="font-size: 3rem; color: var(--accent-gold); margin-bottom: 20px;"></i>
                    <h3>No Premium Materials Found</h3>
                    <p>Try modifying your keyword search or category filters.</p>
                </div>
            `;
            return;
        }

        // Render cards
        filtered.forEach(item => {
            const isFav = favoritesList.includes(item.id);
            const card = document.createElement('div');
            card.classList.add('material-card', 'reveal');
            card.classList.add('active'); // force reveal visibility

            card.innerHTML = `
                <div class="material-img-wrapper">
                    <img src="${item.image}" alt="${item.name}">
                    <button class="fav-card-btn ${isFav ? 'active' : ''}" data-id="${item.id}" aria-label="Favorite">
                        <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
                    </button>
                    <div class="material-card-overlay">
                        <button class="btn btn-primary btn-mini btn-preview" data-id="${item.id}">Quick Preview</button>
                    </div>
                </div>
                <div class="material-card-info">
                    <span class="mat-category-label">${item.category}</span>
                    <h4>${item.name}</h4>
                    <div class="mat-card-footer">
                        <span><i class="fas fa-map-marker-alt"></i> ${item.origin}</span>
                        <span class="mat-price-tag">${item.price}</span>
                    </div>
                </div>
            `;

            grid.appendChild(card);
        });

        // Re-bind click event listeners on newly generated nodes
        bindCardActions();
    };

    // Card Action bindings
    const bindCardActions = () => {
        // Heart favorite toggle
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
                if (showFavoritesOnly) renderLibrary(); // refresh list if favorites toggle active
            });
        });

        // Quick Preview trigger
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
    // MODAL PREVIEW & SAMPLE REQUEST FORM
    // ==========================================================================
    const openQuickPreviewModal = (item) => {
        if (!previewModal) return;

        // Populate details
        document.getElementById('modal-img').src = item.image;
        document.getElementById('modal-title').textContent = item.name;
        document.getElementById('modal-category').textContent = item.category.toUpperCase();
        document.getElementById('modal-desc').textContent = item.desc;
        
        document.getElementById('spec-origin').textContent = item.origin;
        document.getElementById('spec-finish').textContent = item.finish;
        document.getElementById('spec-thick').textContent = item.specs.thickness;
        document.getElementById('spec-durability').textContent = item.specs.durability;
        document.getElementById('spec-eco').textContent = item.specs.ecoRating;
        document.getElementById('spec-price').textContent = item.price;

        // Auto fill hidden sample request item
        document.getElementById('sample-item-name').value = item.name;

        // Slide modal open
        previewModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    };

    const closeQuickPreviewModal = () => {
        if (!previewModal) return;
        previewModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock scrolling
    };

    if (closeModal) closeModal.addEventListener('click', closeQuickPreviewModal);
    if (previewModal) {
        window.addEventListener('click', (e) => {
            if (e.target === previewModal) closeQuickPreviewModal();
        });
    }

    // Sample Request Form Handler
    const requestForm = document.getElementById('sample-request-form');
    if (requestForm) {
        requestForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = requestForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Requesting Sample...';
            btn.disabled = true;

            setTimeout(() => {
                btn.textContent = 'Sample Requested Successfully!';
                btn.style.backgroundColor = '#10b981';
                requestForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    closeQuickPreviewModal();
                }, 2000);
            }, 1200);
        });
    }


    // ==========================================================================
    // FILTER CONTROLS (SEARCH, TABS, FAVORITES TOGGLE)
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
                favToggleBtn.innerHTML = '<i class="fas fa-heart"></i> Showing Favorites';
            } else {
                favToggleBtn.classList.remove('active');
                favToggleBtn.innerHTML = '<i class="far fa-heart"></i> Show Favorites';
            }
            renderLibrary();
        });
    }

    // Run initial rendering
    renderLibrary();
});
