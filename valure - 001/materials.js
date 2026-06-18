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
            image: "assets/images/mat-carrara.png",
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
            image: "assets/images/mat-oak.png",
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
            origin: "Valure Paint Lab",
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
            origin: "Valure Paint Lab",
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
    let compareList = [];

    const priceValues = {
        "$": 1,
        "$$": 2,
        "$$$": 3,
        "$$$$": 4,
        "$$$$$": 5
    };

    // Dom elements
    const grid = document.getElementById('materials-grid');
    const searchInput = document.getElementById('mat-search');
    const sortInput = document.getElementById('mat-sort');
    const categoryTabs = document.querySelectorAll('.mat-tab');
    const favToggleBtn = document.getElementById('mat-fav-toggle');
    const previewModal = document.getElementById('preview-modal');
    const closeModal = document.getElementById('close-preview-modal');

    // 3. RENDER FUNCTION
    const renderLibrary = () => {
        if (!grid) return;
        grid.innerHTML = '';

        // Filter list
        let filtered = materialsData.filter(item => {
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

        // Sorting Logic
        const sortBy = sortInput ? sortInput.value : 'default';
        if (sortBy !== 'default') {
            filtered.sort((a, b) => {
                if (sortBy === 'name-asc') {
                    return a.name.localeCompare(b.name);
                } else if (sortBy === 'name-desc') {
                    return b.name.localeCompare(a.name);
                } else if (sortBy === 'price-asc') {
                    return (priceValues[a.price] || 0) - (priceValues[b.price] || 0);
                } else if (sortBy === 'price-desc') {
                    return (priceValues[b.price] || 0) - (priceValues[a.price] || 0);
                }
                return 0;
            });
        }

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
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                        <h4 style="margin: 0; line-height: 1.25;">${item.name}</h4>
                        <button class="btn-compare-add" data-id="${item.id}" style="font-size: 0.7rem; background: transparent; border: 1px solid var(--accent-gold); color: var(--accent-gold); border-radius: 4px; padding: 2px 6px; cursor: pointer; font-family: 'Outfit', sans-serif;"><i class="fas fa-plus"></i> Compare</button>
                    </div>
                    <div class="mat-card-footer" style="margin-top: 10px;">
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

        // Compare Add toggle
        document.querySelectorAll('.btn-compare-add').forEach(btn => {
            const id = btn.dataset.id;
            const inCompare = compareList.includes(id);
            if (inCompare) {
                btn.innerHTML = '<i class="fas fa-check"></i> Compared';
                btn.style.background = 'var(--accent-gold)';
                btn.style.color = 'var(--primary-blue)';
            }
            
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const idx = compareList.indexOf(id);
                if (idx === -1) {
                    if (compareList.length >= 3) {
                        alert("You can compare up to 3 materials at once.");
                        return;
                    }
                    compareList.push(id);
                    btn.innerHTML = '<i class="fas fa-check"></i> Compared';
                    btn.style.background = 'var(--accent-gold)';
                    btn.style.color = 'var(--primary-blue)';
                } else {
                    compareList.splice(idx, 1);
                    btn.innerHTML = '<i class="fas fa-plus"></i> Compare';
                    btn.style.background = '';
                    btn.style.color = '';
                }
                updateCompareDrawer();
            });
        });
    };

    // Update comparison drawer view state
    const updateCompareDrawer = () => {
        const drawer = document.getElementById('compare-drawer');
        const countSpan = document.getElementById('compare-count');
        const thumbContainer = document.getElementById('compare-thumbnails');
        
        if (!drawer) return;
        
        if (compareList.length === 0) {
            drawer.style.display = 'none';
            return;
        }
        
        drawer.style.display = 'flex';
        countSpan.textContent = compareList.length;
        thumbContainer.innerHTML = '';
        
        compareList.forEach(id => {
            const item = materialsData.find(m => m.id === id);
            if (item) {
                const thumb = document.createElement('div');
                thumb.style.position = 'relative';
                thumb.style.width = '40px';
                thumb.style.height = '40px';
                thumb.style.borderRadius = '4px';
                thumb.style.overflow = 'hidden';
                thumb.style.border = '1px solid var(--accent-gold)';
                thumb.innerHTML = `
                    <img src="${item.image}" style="width:100%; height:100%; object-fit:cover;">
                    <button class="remove-thumb-btn" data-id="${id}" style="position:absolute; top:-2px; right:-2px; background:rgba(0,0,0,0.7); color:#fff; border:none; border-radius:50%; width:15px; height:15px; font-size:9px; display:flex; align-items:center; justify-content:center; cursor:pointer;">&times;</button>
                `;
                thumb.querySelector('.remove-thumb-btn').addEventListener('click', (e) => {
                    e.stopPropagation();
                    const idx = compareList.indexOf(id);
                    if (idx !== -1) {
                        compareList.splice(idx, 1);
                        renderLibrary(); // Re-render to update card button states
                        updateCompareDrawer();
                    }
                });
                thumbContainer.appendChild(thumb);
            }
        });
    };

    // Compare matrix logic
    const compareModal = document.getElementById('compare-modal');
    const closeCompareModalBtn = document.getElementById('close-compare-modal');
    const compareModalOverlay = document.getElementById('compare-modal-overlay');
    const btnCompareNow = document.getElementById('btn-compare-now');
    const btnCompareClear = document.getElementById('btn-compare-clear');

    const openCompareModal = () => {
        if (!compareModal) return;
        
        const headersRow = document.getElementById('compare-table-headers');
        const body = document.getElementById('compare-table-body');
        
        headersRow.innerHTML = '<th style="padding: 12px; color: var(--primary-blue); font-weight: 700; width: 25%;">Feature</th>';
        body.innerHTML = '';
        
        const selectedItems = compareList.map(id => materialsData.find(m => m.id === id)).filter(Boolean);
        
        // Populate headers
        selectedItems.forEach(item => {
            const th = document.createElement('th');
            th.style.padding = '12px';
            th.style.textAlign = 'center';
            th.style.width = `${75 / selectedItems.length}%`;
            th.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <img src="${item.image}" style="width:70px; height:70px; object-fit:cover; border-radius:4px; border:1px solid rgba(0,0,0,0.1);">
                    <span style="font-family:'Outfit',sans-serif; color:var(--primary-blue); font-weight:700; font-size:0.9rem;">${item.name}</span>
                </div>
            `;
            headersRow.appendChild(th);
        });
        
        // Features list to compare
        const features = [
            { label: "Category", key: "category" },
            { label: "Origin", key: "origin" },
            { label: "Finish Type", key: "finish" },
            { label: "Thickness", key: "specs", subKey: "thickness" },
            { label: "Durability", key: "specs", subKey: "durability" },
            { label: "Price Range", key: "price" },
            { label: "Eco Rating", key: "specs", subKey: "ecoRating" },
            { label: "Description", key: "desc" }
        ];
        
        features.forEach((feat, index) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid rgba(0,0,0,0.08)';
            if (index % 2 === 1) tr.style.background = '#fcf8f2';
            
            const labelTd = document.createElement('td');
            labelTd.style.padding = '12px';
            labelTd.style.fontWeight = '700';
            labelTd.style.color = 'var(--primary-blue)';
            labelTd.textContent = feat.label;
            tr.appendChild(labelTd);
            
            selectedItems.forEach(item => {
                const valTd = document.createElement('td');
                valTd.style.padding = '12px';
                valTd.style.textAlign = 'center';
                
                let value = '';
                if (feat.subKey) {
                    value = item[feat.key] ? (item[feat.key][feat.subKey] || 'N/A') : 'N/A';
                } else {
                    value = item[feat.key] || 'N/A';
                }
                
                valTd.textContent = value;
                tr.appendChild(valTd);
            });
            
            body.appendChild(tr);
        });
        
        compareModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    const closeCompareModal = () => {
        if (compareModal) {
            compareModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    if (btnCompareNow) btnCompareNow.addEventListener('click', openCompareModal);
    if (closeCompareModalBtn) closeCompareModalBtn.addEventListener('click', closeCompareModal);
    if (compareModalOverlay) compareModalOverlay.addEventListener('click', closeCompareModal);
    
    if (btnCompareClear) {
        btnCompareClear.addEventListener('click', () => {
            compareList = [];
            renderLibrary();
            updateCompareDrawer();
        });
    }


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
        requestForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const successToast = document.getElementById('materials-success');
            const errorToast = document.getElementById('materials-error');
            const errorText = document.getElementById('materials-error-text');
            
            if (successToast) successToast.classList.remove('show');
            if (errorToast) errorToast.classList.remove('show');
            
            const clientName = document.getElementById('client-name').value.trim();
            const clientPhone = document.getElementById('client-phone').value.trim();
            const clientEmail = document.getElementById('client-email').value.trim();
            const clientAddr = document.getElementById('client-addr').value.trim();
            const sampleItemName = document.getElementById('sample-item-name').value || 'Unknown Material';
            const honeypotVal = document.getElementById('materials-honeypot').value;

            // Local duplicate protection
            const existingInquiries = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
            const isDuplicate = existingInquiries.some(inq => 
                inq.name === clientName && inq.phone === clientPhone && inq.product === `Sample: ${sampleItemName}`
            );

            if (isDuplicate) {
                if (errorToast && errorText) {
                    errorText.textContent = "You have already requested a sample of this material.";
                    errorToast.classList.add('show');
                }
                return;
            }

            const btn = requestForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Requesting Sample...';
            btn.disabled = true;

            const inquiry = {
                id: 'inq_' + Date.now(),
                name: clientName,
                phone: clientPhone,
                email: clientEmail,
                product: `Sample: ${sampleItemName}`,
                message: `Concierge sample request. Delivery address: ${clientAddr}`,
                date: new Date().toLocaleDateString('en-IN'),
                status: 'New'
            };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: clientName,
                        phone: clientPhone,
                        email: clientEmail,
                        product: `Sample: ${sampleItemName}`,
                        message: `Concierge sample request. Delivery address: ${clientAddr}`,
                        honeypot: honeypotVal
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    let inquiries = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
                    inquiries.unshift(inquiry);
                    localStorage.setItem('valure_inquiries', JSON.stringify(inquiries));
                    
                    if (successToast) successToast.classList.add('show');
                    redirectToWhatsApp(clientName, clientPhone, clientEmail, `Sample: ${sampleItemName}`, `Concierge sample request. Delivery address: ${clientAddr}`, 'quote');
                    btn.textContent = 'Sample Requested Successfully!';
                    btn.style.backgroundColor = '#10b981';
                    requestForm.reset();

                    setTimeout(() => {
                        btn.textContent = originalText;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                        if (successToast) successToast.classList.remove('show');
                        closeQuickPreviewModal();
                    }, 2000);
                } else {
                    throw new Error(data.error || 'Server failed to request sample.');
                }
            } catch (err) {
                console.error("Materials contact API error (offline fallback):", err);
                
                // Offline fallback
                let inquiries = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
                inquiries.unshift(inquiry);
                localStorage.setItem('valure_inquiries', JSON.stringify(inquiries));
                
                if (successToast) successToast.classList.add('show');
                redirectToWhatsApp(clientName, clientPhone, clientEmail, `Sample: ${sampleItemName}`, `Concierge sample request. Delivery address: ${clientAddr}`, 'quote');
                btn.textContent = 'Sample Requested Successfully!';
                btn.style.backgroundColor = '#10b981';
                requestForm.reset();

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    if (successToast) successToast.classList.remove('show');
                    closeQuickPreviewModal();
                }, 2000);
            }
        });

        // Handle secondary WhatsApp button inside requestForm
        const wpCta = requestForm.querySelector('.btn-whatsapp-cta');
        if (wpCta) {
            wpCta.addEventListener('click', (e) => {
                e.preventDefault();
                if (requestForm.reportValidity()) {
                    requestForm.requestSubmit();
                }
            });
        }
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

    if (sortInput) {
        sortInput.addEventListener('change', () => {
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
