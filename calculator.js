// ==========================================================================
// VALUE 001 - Smart Cost Estimator & AI Recommendations Controller
// Manages room dimensions sliders, billing invoicing breakdowns, budget meters, 
// and auto-populates settings from style/budget recommendation inputs.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. DATA DICTIONARIES
    const floorRates = {
        oak: 220,
        walnut: 280,
        teak: 320,
        ash: 180,
        italian_white: 450,
        black_galaxy: 380,
        statuario: 500,
        calacatta_gold: 550,
        carrara: 400,
        black_marquina: 420,
        panda_white: 480,
        armani_grey: 410,
        glossy: 120,
        matte: 100,
        wooden_tile: 140,
        metallic_epoxy: 180,
        marble_epoxy: 220,
        ocean_epoxy: 260,
        galaxy_epoxy: 240
    };

    const wallRates = {
        pearl_white: 15,
        ivory_cream: 18,
        champagne_gold: 35,
        royal_beige: 22,
        slate_grey: 20,
        charcoal_black: 25,
        graphite_grey: 22,
        silver_mist: 28,
        sage_green: 24,
        olive_green: 26,
        forest_green: 28,
        earth_brown: 22,
        navy_blue: 25,
        emerald_green: 32,
        burgundy: 35,
        deep_purple: 35,
        // Materials
        plaster: 0, // base paint
        marble_panel: 450,
        wood_panel: 250,
        stone_cladding: 320,
        wallpaper: 120,
        textured_paint: 60,
        metallic_finish: 90,
        concrete_finish: 75
    };

    const ceilRates = {
        white: 15,
        beige: 18,
        gold: 45,
        grey: 22,
        black: 28,
        wood: 55,
        // Types
        flat: 0,
        pop: 90,
        false: 120,
        wooden: 180,
        geometric: 150,
        cove: 110,
        hotel: 220,
        floating: 160,
        multi: 240
    };

    const productPrices = {
        // Lighting
        chandelier: 45000,
        pendant: 3500,
        spotlight: 450,
        sconce: 1500,
        // Furniture
        sofa: 85000,
        bed: 75000,
        dining: 95000,
        desk: 45000,
        wardrobe: 120000,
        bookshelf: 35000,
        coffee: 25000,
        chair: 18000,
        // Decoration
        plant: 2500,
        painting: 12000,
        mirror: 6500,
        curtain: 7500,
        rug: 15000,
        sculpture: 22000
    };

    // Style labor multipliers
    const styleLaborRates = {
        modern: 0.25,
        minimalist: 0.15,
        scandinavian: 0.20,
        contemporary: 0.22,
        industrial: 0.22,
        bohemian: 0.20,
        traditional: 0.28,
        zen: 0.25,
        mediterranean: 0.25,
        smarthome: 0.30,
        palace: 0.35,
        hotel: 0.30
    };

    // 2. DYNAMIC CALCULATION ENGINE
    const recalculateCosts = () => {
        // Dimension inputs
        const length = parseInt(document.getElementById('room-length').value);
        const width = parseInt(document.getElementById('room-width').value);
        const height = parseInt(document.getElementById('room-height').value);

        // Update dimension labels
        document.getElementById('room-length-val').textContent = `${length} ft`;
        document.getElementById('room-width-val').textContent = `${width} ft`;
        document.getElementById('room-height-val').textContent = `${height} ft`;

        // Derived areas
        const floorArea = length * width;
        const perimeter = 2 * (length + width);
        const wallArea = perimeter * height;

        // Selection elements rates
        const floorMat = document.getElementById('calc-floor').value;
        const wallColor = document.getElementById('calc-wall-color').value;
        const wallMat = document.getElementById('calc-wall-mat').value;
        const ceilColor = document.getElementById('calc-ceil-color').value;
        const ceilType = document.getElementById('calc-ceil-type').value;
        const styleSelect = document.getElementById('calc-style').value;

        // Base costs
        const floorRate = floorRates[floorMat] || 150;
        const wallRate = (wallRates[wallColor] || 15) + (wallRates[wallMat] || 0);
        const ceilRate = (ceilRates[ceilColor] || 15) + (ceilRates[ceilType] || 0);

        const floorCost = floorArea * floorRate;
        const wallCost = wallArea * wallRate;
        const ceilCost = floorArea * ceilRate;

        // Surcharge coves
        const includeLED = document.getElementById('calc-led').checked;
        const ledCost = includeLED ? perimeter * 120 : 0;
        const ceilingTotalCost = ceilCost + ledCost;

        // Product counts
        const countChandelier = parseInt(document.getElementById('count-chandelier').value) || 0;
        const countPendant = parseInt(document.getElementById('count-pendant').value) || 0;
        const countSpotlight = parseInt(document.getElementById('count-spotlight').value) || 0;
        const countSconce = parseInt(document.getElementById('count-sconce').value) || 0;

        const lightingCost = (countChandelier * productPrices.chandelier) +
                             (countPendant * productPrices.pendant) +
                             (countSpotlight * productPrices.spotlight) +
                             (countSconce * productPrices.sconce);

        // Furniture Checklists
        let furnitureCost = 0;
        document.querySelectorAll('.furniture-checkbox:checked').forEach(cb => {
            furnitureCost += productPrices[cb.value] || 0;
        });

        // Decoration Checklists
        let decorationCost = 0;
        document.querySelectorAll('.decor-checkbox:checked').forEach(cb => {
            decorationCost += productPrices[cb.value] || 0;
        });

        // Retrieve global rates overrides from admin dashboard
        let ratesOverride = { palace: 0.35, gst: 18, fee: 15 };
        const savedRates = localStorage.getItem('valure_rates_override');
        if (savedRates) {
            try {
                ratesOverride = JSON.parse(savedRates);
            } catch (e) {
                console.error('Error loading rates override:', e);
            }
        }
        
        styleLaborRates.palace = ratesOverride.palace;

        // Labor cost based on complexity
        const laborRate = styleLaborRates[styleSelect] || 0.25;
        const materialsSubtotal = floorCost + wallCost + ceilingTotalCost + lightingCost + furnitureCost + decorationCost;
        const laborCost = materialsSubtotal * laborRate;

        const subtotal = materialsSubtotal + laborCost;
        const designFee = subtotal * (ratesOverride.fee / 100);
        const tax = subtotal * (ratesOverride.gst / 100);
        const grandTotal = subtotal + designFee + tax;

        // Update labels dynamically on invoice card
        const taxLabel = document.getElementById('bill-tax').previousElementSibling;
        const feeLabel = document.getElementById('bill-fee').previousElementSibling;
        if (taxLabel) taxLabel.textContent = `Shipping, Packing & GST (${ratesOverride.gst}%)`;
        if (feeLabel) feeLabel.textContent = `Luxury Architecture Consulting Fee (${ratesOverride.fee}%)`;

        // Update bills on interface
        document.getElementById('bill-floor').textContent = `₹${Math.round(floorCost).toLocaleString('en-IN')}`;
        document.getElementById('bill-wall').textContent = `₹${Math.round(wallCost).toLocaleString('en-IN')}`;
        document.getElementById('bill-ceil').textContent = `₹${Math.round(ceilingTotalCost).toLocaleString('en-IN')}`;
        document.getElementById('bill-light').textContent = `₹${Math.round(lightingCost).toLocaleString('en-IN')}`;
        document.getElementById('bill-furn').textContent = `₹${Math.round(furnitureCost).toLocaleString('en-IN')}`;
        document.getElementById('bill-decor').textContent = `₹${Math.round(decorationCost).toLocaleString('en-IN')}`;
        document.getElementById('bill-labor').textContent = `₹${Math.round(laborCost).toLocaleString('en-IN')}`;
        
        document.getElementById('bill-tax').textContent = `₹${Math.round(tax).toLocaleString('en-IN')}`;
        document.getElementById('bill-fee').textContent = `₹${Math.round(designFee).toLocaleString('en-IN')}`;
        document.getElementById('bill-total').textContent = `₹${Math.round(grandTotal).toLocaleString('en-IN')}`;

        // Dynamic budget allocation bars
        updateBudgetFillBars(floorCost, wallCost, ceilingTotalCost, lightingCost, furnitureCost, decorationCost, laborCost, grandTotal);
    };

    const updateBudgetFillBars = (floor, wall, ceil, light, furn, decor, labor, total) => {
        const floorPct = (floor / total) * 100;
        const wallPct = (wall / total) * 100;
        const fittingsPct = ((light + furn + decor) / total) * 100;
        const laborPct = (labor / total) * 100;

        document.getElementById('meter-floor-fill').style.width = `${floorPct}%`;
        document.getElementById('meter-wall-fill').style.width = `${wallPct}%`;
        document.getElementById('meter-fit-fill').style.width = `${fittingsPct}%`;
        document.getElementById('meter-labor-fill').style.width = `${laborPct}%`;

        document.getElementById('meter-floor-val').textContent = `${Math.round(floorPct)}%`;
        document.getElementById('meter-wall-val').textContent = `${Math.round(wallPct)}%`;
        document.getElementById('meter-fit-val').textContent = `${Math.round(fittingsPct)}%`;
        document.getElementById('meter-labor-val').textContent = `${Math.round(laborPct)}%`;
    };

    // Bind slider events
    const sliders = ['room-length', 'room-width', 'room-height'];
    sliders.forEach(id => {
        const slider = document.getElementById(id);
        if (slider) slider.addEventListener('input', recalculateCosts);
    });

    // Bind dropdowns, checkboxes and inputs
    const inputs = ['calc-floor', 'calc-wall-color', 'calc-wall-mat', 'calc-ceil-color', 'calc-ceil-type', 'calc-style', 'calc-led',
                    'count-chandelier', 'count-pendant', 'count-spotlight', 'count-sconce'];
    inputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('change', recalculateCosts);
    });

    document.querySelectorAll('.furniture-checkbox, .decor-checkbox').forEach(cb => {
        cb.addEventListener('change', recalculateCosts);
    });


    // ==========================================================================
    // AI RECOMMENDATION GENERATOR & AUTO-POPULATION
    // ==========================================================================
    const getRecBtn = document.getElementById('calc-get-rec-btn');
    const applyRecBtn = document.getElementById('calc-apply-rec-btn');
    const recReportBox = document.getElementById('calc-rec-report');

    // Matching sets recommendations data
    const aiRecommendations = {
        // Modern Luxury + Ultra-Luxury
        "modern_ultra": {
            dims: { l: 24, w: 18, h: 11 },
            style: "palace",
            floor: "statuario",
            wallCol: "champagne_gold",
            wallMat: "marble_panel",
            ceilCol: "ceil_gold",
            ceilType: "coffered",
            led: true,
            counts: { chandelier: 1, pendant: 0, spotlight: 12, sconce: 4 },
            furniture: ["sofa", "chair", "coffee"],
            decor: ["painting", "rug", "sculpture"],
            text: "For an Ultra-Luxury budget in a spacious area, we recommend Carrara Statuario Gold Marble paired with rich champagne walls and golden coffered ceiling grids. Layered spotlights and a crystal chandelier expand vertical perspectives."
        },
        // Scandinavian + Premium
        "scandinavian_premium": {
            dims: { l: 18, w: 14, h: 9 },
            style: "scandinavian",
            floor: "oak",
            wallCol: "ivory_cream",
            wallMat: "plaster",
            ceilCol: "ceil_white",
            ceilType: "flat",
            led: false,
            counts: { chandelier: 0, pendant: 2, spotlight: 6, sconce: 2 },
            furniture: ["sofa", "chair", "bookshelf"],
            decor: ["plant", "rug", "curtain"],
            text: "For a Scandinavian Premium setup, European Oak Herringbone wood flooring establishes organic warmth. Matte ivory cream paint and flat ceilings keep sightlines clean, while spotlights provide bright, natural lighting."
        },
        // Zen + Premium
        "zen_premium": {
            dims: { l: 16, w: 12, h: 9 },
            style: "zen",
            floor: "walnut",
            wallCol: "royal_beige",
            wallMat: "wood_panel",
            ceilCol: "ceil_wood",
            ceilType: "beams",
            led: false,
            counts: { chandelier: 0, pendant: 0, spotlight: 8, sconce: 2 },
            furniture: ["sofa", "chair"],
            decor: ["plant", "rug", "mirror"],
            text: "A Zen-inspired premium layout incorporates solid Walnut wide planks and natural beige wood paneling. Ceiling timbers and warm ambient spotlights promote relaxation."
        },
        // Default / Basic/Minimalist
        "minimalist_basic": {
            dims: { l: 14, w: 10, h: 9 },
            style: "minimalist",
            floor: "concrete",
            wallCol: "pearl_white",
            wallMat: "plaster",
            ceilCol: "ceil_white",
            ceilType: "flat",
            led: false,
            counts: { chandelier: 0, pendant: 1, spotlight: 4, sconce: 0 },
            furniture: ["sofa"],
            decor: ["rug", "plant"],
            text: "A clean Minimalist Basic design focuses on polished concrete flooring, pure white matte painted walls, and flat plaster ceilings. Spotlight bars minimize clutter."
        }
    };

    let activeRecommendation = null;

    if (getRecBtn) {
        getRecBtn.addEventListener('click', () => {
            const size = document.getElementById('rec-size').value; // small, medium, large
            const budget = document.getElementById('rec-budget').value; // basic, premium, luxury, ultra
            const style = document.getElementById('rec-style').value; // modern, minimalist, scandinavian, zen, etc.

            // Derive key
            let key = "minimalist_basic";
            if (budget === 'ultra' || budget === 'luxury') {
                key = "modern_ultra";
            } else if (style === 'scandinavian') {
                key = "scandinavian_premium";
            } else if (style === 'zen') {
                key = "zen_premium";
            }

            const rec = aiRecommendations[key] || aiRecommendations.minimalist_basic;
            activeRecommendation = rec;

            // Update Report display
            if (recReportBox) {
                recReportBox.style.opacity = '0.3';
                setTimeout(() => {
                    recReportBox.style.opacity = '1';
                    recReportBox.classList.remove('hidden');

                    document.getElementById('rec-report-text').textContent = rec.text;
                    
                    // Format display options
                    document.getElementById('rec-report-wall').innerHTML = `<i class="fas fa-palette"></i> <strong>Wall:</strong> ${rec.wallCol.replace('_', ' ')} (${rec.wallMat})`;
                    document.getElementById('rec-report-floor').innerHTML = `<i class="fas fa-layer-group"></i> <strong>Floor:</strong> ${rec.floor.replace('_', ' ')}`;
                    document.getElementById('rec-report-ceil').innerHTML = `<i class="fas fa-border-all"></i> <strong>Ceiling:</strong> ${rec.ceilType}`;
                    document.getElementById('rec-report-light').innerHTML = `<i class="fas fa-lightbulb"></i> <strong>Lights:</strong> ${rec.counts.chandelier > 0 ? 'Chandelier + ' : ''}${rec.counts.spotlight} Spots`;
                    
                    applyRecBtn.classList.remove('hidden');
                    alert('AI Recommendations computed! Review the report and click Apply to update sliders.');
                }, 500);
            }
        });
    }

    if (applyRecBtn) {
        applyRecBtn.addEventListener('click', () => {
            if (!activeRecommendation) return;

            const rec = activeRecommendation;

            // 1. Dimensions
            document.getElementById('room-length').value = rec.dims.l;
            document.getElementById('room-width').value = rec.dims.w;
            document.getElementById('room-height').value = rec.dims.h;

            // 2. Selectors
            document.getElementById('calc-floor').value = rec.floor;
            document.getElementById('calc-wall-color').value = rec.wallCol;
            document.getElementById('calc-wall-mat').value = rec.wallMat;
            document.getElementById('calc-ceil-color').value = rec.ceilCol;
            document.getElementById('calc-ceil-type').value = rec.ceilType;
            document.getElementById('calc-style').value = rec.style;
            document.getElementById('calc-led').checked = rec.led;

            // 3. Lighting quantities
            document.getElementById('count-chandelier').value = rec.counts.chandelier;
            document.getElementById('count-pendant').value = rec.counts.pendant;
            document.getElementById('count-spotlight').value = rec.counts.spotlight;
            document.getElementById('count-sconce').value = rec.counts.sconce;

            // 4. Checklists reset
            document.querySelectorAll('.furniture-checkbox, .decor-checkbox').forEach(cb => {
                cb.checked = false;
            });

            // Furniture checklists set
            rec.furniture.forEach(val => {
                const cb = document.querySelector(`.furniture-checkbox[value="${val}"]`);
                if (cb) cb.checked = true;
            });

            // Decor checklists set
            rec.decor.forEach(val => {
                const cb = document.querySelector(`.decor-checkbox[value="${val}"]`);
                if (cb) cb.checked = true;
            });

            // Trigger Recalculate
            recalculateCosts();
            alert('AI recommendations applied to invoice calculations!');
        });
    }

    // Run initial rendering math
    recalculateCosts();
});


// ==========================================================================
// DESIGN MODELS GALLERY - Filter + Apply Controller
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

    const dmCards = document.querySelectorAll('.dm-card');
    const dmFilterBtns = document.querySelectorAll('.dm-filter-btn');
    const dmApplyBtns = document.querySelectorAll('.dm-apply-btn');

    // -------------------------------------------------------
    // FILTER PILLS
    // -------------------------------------------------------
    dmFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dmFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            dmCards.forEach(card => {
                const tags = card.dataset.tags || '';
                const matches = filter === 'all' || tags.includes(filter);

                card.classList.remove('dm-hidden', 'dm-visible');

                if (matches) {
                    card.classList.remove('dm-hidden');
                    // Small stagger for animation
                    requestAnimationFrame(() => card.classList.add('dm-visible'));
                } else {
                    card.classList.add('dm-hidden');
                }
            });
        });
    });

    // -------------------------------------------------------
    // "USE THIS STYLE" BUTTON — Populate Calculator
    // -------------------------------------------------------
    dmApplyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Find the parent card
            const card = btn.closest('.dm-card');
            if (!card) return;

            // Read data attributes from the card
            const floor    = card.dataset.floor    || 'oak';
            const wall     = card.dataset.wall     || 'pearl_white';
            const wallMat  = card.dataset.wallMat  || 'plaster';
            const ceilType = card.dataset.ceil      || 'flat';
            const ceilCol  = card.dataset.ceilColor || 'white';
            const style    = card.dataset.style    || 'modern';

            // Map ceiling color token from data attribute to calc select value
            // (calc selects use plain values like "gold", "white", "black", "wood")
            const ceilColMap = {
                gold: 'gold',
                white: 'white',
                black: 'black',
                wood: 'wood',
                beige: 'beige'
            };

            // Apply to calculator selects
            const setVal = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val;
            };

            setVal('calc-floor',      floor);
            setVal('calc-wall-color', wall);
            setVal('calc-wall-mat',   wallMat);
            setVal('calc-ceil-type',  ceilType);
            setVal('calc-ceil-color', ceilColMap[ceilCol] || 'white');
            setVal('calc-style',      style);

            // Mark this card as selected, deselect others
            dmCards.forEach(c => {
                c.classList.remove('dm-card--selected');
                const badge = c.querySelector('.dm-active-badge');
                if (badge) badge.classList.add('hidden');
            });

            card.classList.add('dm-card--selected');
            const activeBadge = card.querySelector('.dm-active-badge');
            if (activeBadge) activeBadge.classList.remove('hidden');

            // Trigger recalculation (fires through change event)
            const calcFloor = document.getElementById('calc-floor');
            if (calcFloor) calcFloor.dispatchEvent(new Event('change'));

            // Visual feedback on button
            const origText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Style Applied!';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            setTimeout(() => {
                btn.innerHTML = origText;
                btn.style.background = '';
                btn.style.borderColor = '';
            }, 2000);

            // Smooth scroll down to the calculator
            const calcSection = document.querySelector('.calc-grid');
            if (calcSection) {
                setTimeout(() => {
                    calcSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
            }
        });
    });

    // Clicking anywhere on the card (not on button) also triggers apply
    dmCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't double-fire if the actual button was clicked
            if (e.target.closest('.dm-apply-btn')) return;
            const applyBtn = card.querySelector('.dm-apply-btn');
            if (applyBtn) applyBtn.click();
        });
    });
    });

    // ==========================================================================
    // PRE-LOAD QUIZ SELECTIONS DYNAMICALLY
    // ==========================================================================
    const urlParams = new URLSearchParams(window.location.search);
    const presetParam = urlParams.get('preset');
    if (presetParam === 'quiz') {
        const storedSelections = localStorage.getItem('valure_quiz_selections');
        if (storedSelections) {
            try {
                const selections = JSON.parse(storedSelections);
                
                // Map selections
                const colorMap = {
                    white: 'pearl_white',
                    gold: 'champagne_gold',
                    blue: 'slate_grey',
                    green: 'sage_green'
                };
                const floorMap = {
                    marble: 'statuario',
                    wood: 'oak',
                    concrete: 'walnut',
                    epoxy: 'metallic_epoxy'
                };
                const ceilMap = {
                    flat: 'flat',
                    coffered: 'coffered',
                    beams: 'beams',
                    hotel: 'hotel'
                };

                const mappedColor = colorMap[selections.color] || 'pearl_white';
                const mappedFloor = floorMap[selections.floor] || 'oak';
                const mappedCeil = ceilMap[selections.ceil] || 'flat';

                // Prepopulate
                const calcColor = document.getElementById('calc-wall-color');
                const calcFloor = document.getElementById('calc-floor');
                const calcCeil = document.getElementById('calc-ceil-type');

                if (calcColor) calcColor.value = mappedColor;
                if (calcFloor) calcFloor.value = mappedFloor;
                if (calcCeil) calcCeil.value = mappedCeil;

                // Trigger change event to update math sub-elements
                if (calcFloor) calcFloor.dispatchEvent(new Event('change'));
                
                // Visual toast feedback
                const toast = document.createElement('div');
                toast.style.position = 'fixed';
                toast.style.top = '100px';
                toast.style.right = '30px';
                toast.style.background = 'var(--primary-blue)';
                toast.style.color = '#fff';
                toast.style.border = '1px solid var(--accent-gold)';
                toast.style.padding = '12px 24px';
                toast.style.borderRadius = '8px';
                toast.style.zIndex = '99999';
                toast.style.boxShadow = 'var(--shadow-premium)';
                toast.innerHTML = `<i class="fas fa-magic" style="color: var(--accent-gold); margin-right: 8px;"></i> Quiz selections applied to ledger!`;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 4000);
            } catch (err) {
                console.error('Error loading quiz selections:', err);
            }
        }
    }

    // ==========================================================================
    // RECENT PROJECTS - Apply specs to estimator
    // ==========================================================================
    const rpCards = document.querySelectorAll('.rp-card');
    const rpApplyBtns = document.querySelectorAll('.rp-apply-btn');

    rpApplyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            const card = btn.closest('.rp-card');
            if (!card) return;

            // Load data attributes
            const length = parseInt(card.dataset.length) || 18;
            const width = parseInt(card.dataset.width) || 14;
            const height = parseInt(card.dataset.height) || 10;
            const floor = card.dataset.floor || 'oak';
            const wallColor = card.dataset.wallColor || 'pearl_white';
            const wallMat = card.dataset.wallMat || 'plaster';
            const ceilType = card.dataset.ceilType || 'flat';
            const ceilCol = card.dataset.ceilColor || 'white';
            const style = card.dataset.style || 'modern';
            const led = card.dataset.led === 'true';
            
            const chandelier = parseInt(card.dataset.chandelier) || 0;
            const pendant = parseInt(card.dataset.pendant) || 0;
            const spotlight = parseInt(card.dataset.spotlight) || 0;
            const sconce = parseInt(card.dataset.sconce) || 0;

            const furnitureList = (card.dataset.furniture || '').split(',').filter(Boolean);
            const decorList = (card.dataset.decor || '').split(',').filter(Boolean);

            // Update range slider values & visual text
            const setSlider = (id, val) => {
                const slider = document.getElementById(id);
                if (slider) {
                    slider.value = val;
                    // Trigger input event to update label visual text
                    slider.dispatchEvent(new Event('input'));
                }
            };
            setSlider('room-length', length);
            setSlider('room-width', width);
            setSlider('room-height', height);

            // Update dropdown values
            const setSelect = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val;
            };
            setSelect('calc-floor', floor);
            setSelect('calc-wall-color', wallColor);
            setSelect('calc-wall-mat', wallMat);
            setSelect('calc-ceil-type', ceilType);
            setSelect('calc-ceil-color', ceilCol);
            setSelect('calc-style', style);

            // LED checkbox
            const ledCheckbox = document.getElementById('calc-led');
            if (ledCheckbox) ledCheckbox.checked = led;

            // Update quantities
            const setQty = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val;
            };
            setQty('count-chandelier', chandelier);
            setQty('count-pendant', pendant);
            setQty('count-spotlight', spotlight);
            setQty('count-sconce', sconce);

            // Furniture Checkboxes reset and toggle
            document.querySelectorAll('.furniture-checkbox').forEach(cb => {
                cb.checked = furnitureList.includes(cb.value);
            });

            // Decor Checkboxes reset and toggle
            document.querySelectorAll('.decor-checkbox').forEach(cb => {
                cb.checked = decorList.includes(cb.value);
            });

            // Toggle active styles on cards
            rpCards.forEach(c => {
                c.classList.remove('rp-card--selected');
                const badge = c.querySelector('.rp-active-badge');
                if (badge) badge.classList.add('hidden');
            });
            card.classList.add('rp-card--selected');
            const activeBadge = card.querySelector('.rp-active-badge');
            if (activeBadge) activeBadge.classList.remove('hidden');

            // Force recalculation
            recalculateCosts();

            // Provide visual feedback on button
            const origHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> Applied!';
            btn.style.background = '#10b981';
            btn.style.borderColor = '#10b981';
            btn.style.color = '#fff';
            setTimeout(() => {
                btn.innerHTML = origHTML;
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 2000);

            // Smooth scroll to estimator inputs or billing invoice
            const targetSection = document.getElementById('calc-floor');
            if (targetSection) {
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
        });
    });

    // Make clicking the card act as applying the specs
    rpCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.rp-apply-btn')) return;
            const applyBtn = card.querySelector('.rp-apply-btn');
            if (applyBtn) applyBtn.click();
        });
    });

    const printDateEl = document.getElementById('print-date');
    if (printDateEl) {
        printDateEl.textContent = 'Date: ' + new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
    }
});

