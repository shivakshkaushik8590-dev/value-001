document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // VIEW SWITCHER STATE
    // ==========================================================================
    const dashboardView = document.getElementById('dashboard-view');
    const workspaceView = document.getElementById('workspace-view');
    const startProjectBtn = document.getElementById('start-project-btn');
    const startProjectBannerBtn = document.getElementById('start-project-banner-btn');
    const backToDashBtn = document.getElementById('back-to-dash');
    const workspaceNavLink = document.getElementById('workspace-nav-link');
    const dashboardNavLink = document.getElementById('dashboard-nav-link');

    const showView = (viewName) => {
        if (viewName === 'workspace') {
            dashboardView.classList.add('hidden');
            workspaceView.classList.remove('hidden');
            workspaceNavLink.classList.add('nav-designer-link');
            dashboardNavLink.classList.remove('nav-designer-link');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            workspaceView.classList.add('hidden');
            dashboardView.classList.remove('hidden');
            dashboardNavLink.classList.add('nav-designer-link');
            workspaceNavLink.classList.remove('nav-designer-link');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    if (startProjectBtn) startProjectBtn.addEventListener('click', () => showView('workspace'));
    if (startProjectBannerBtn) startProjectBannerBtn.addEventListener('click', () => showView('workspace'));
    if (backToDashBtn) backToDashBtn.addEventListener('click', () => showView('dashboard'));
    if (workspaceNavLink) workspaceNavLink.addEventListener('click', (e) => { e.preventDefault(); showView('workspace'); });
    if (dashboardNavLink) dashboardNavLink.addEventListener('click', (e) => { e.preventDefault(); showView('dashboard'); });


    // ==========================================================================
    // ACCORDION PANELS
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
            
            // Toggle active state
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // ==========================================================================
    // PARAMETER SELECTION STATES & SWATCHES
    // ==========================================================================
    // General card selection
    document.querySelectorAll('.select-card').forEach(card => {
        card.addEventListener('click', () => {
            const group = card.dataset.group;
            if (group) {
                document.querySelectorAll(`.select-card[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
            }
        });
    });

    // Swatch picking
    document.querySelectorAll('.swatch-btn').forEach(swatch => {
        swatch.addEventListener('click', () => {
            const group = swatch.dataset.group;
            if (group) {
                document.querySelectorAll(`.swatch-btn[data-group="${group}"]`).forEach(s => s.classList.remove('selected'));
                swatch.classList.add('selected');
            }
        });
    });

    // Texture selector
    document.querySelectorAll('.texture-card').forEach(texture => {
        texture.addEventListener('click', () => {
            const group = texture.dataset.group;
            if (group) {
                document.querySelectorAll(`.texture-card[data-group="${group}"]`).forEach(t => t.classList.remove('selected'));
                texture.classList.add('selected');
            }
        });
    });

    // Slider Range Label Updates
    const rangeSliders = document.querySelectorAll('.designer-range');
    rangeSliders.forEach(slider => {
        const valSpan = document.getElementById(`${slider.id}-val`);
        if (valSpan) {
            slider.addEventListener('input', () => {
                valSpan.textContent = slider.value + (slider.id.includes('intensity') ? '%' : '');
            });
        }
    });


    // ==========================================================================
    // DRAG-AND-DROP FILE UPLOADER
    // ==========================================================================
    const uploadOverlay = document.getElementById('upload-overlay');
    const uploadBox = document.getElementById('upload-box');
    const fileInput = document.getElementById('file-input');
    const sliderContainer = document.getElementById('slider-container');
    const beforeImg = document.getElementById('before-img');
    const afterImg = document.getElementById('after-img');

    // MASK BRUSH CANVAS TOOL
    const canvas = document.getElementById('mask-canvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    const brushSizeInput = document.getElementById('brush-size');
    const brushSizeVal = document.getElementById('brush-size-val');
    const btnClearMask = document.getElementById('btn-clear-mask');
    const btnToggleMaskVisibility = document.getElementById('btn-toggle-mask-visibility');

    let isDrawing = false;
    let brushSize = 30;
    let showMaskOverlay = false;

    const initMaskCanvas = () => {
        if (!canvas || !beforeImg || !beforeImg.src) return;
        setTimeout(() => {
            const rect = beforeImg.getBoundingClientRect();
            canvas.width = rect.width || beforeImg.clientWidth || 800;
            canvas.height = rect.height || beforeImg.clientHeight || 500;
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'block';
            canvas.style.width = beforeImg.clientWidth + 'px';
            canvas.style.height = beforeImg.clientHeight + 'px';
        }, 100);
    };

    if (beforeImg) {
        beforeImg.addEventListener('load', initMaskCanvas);
    }

    if (brushSizeInput && brushSizeVal) {
        brushSizeInput.addEventListener('input', (e) => {
            brushSize = parseInt(e.target.value);
            brushSizeVal.textContent = brushSize + 'px';
        });
    }

    if (btnClearMask) {
        btnClearMask.addEventListener('click', () => {
            if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    if (btnToggleMaskVisibility) {
        btnToggleMaskVisibility.addEventListener('click', () => {
            showMaskOverlay = !showMaskOverlay;
            if (showMaskOverlay) {
                canvas.style.background = 'rgba(0,0,0,0.85)';
                btnToggleMaskVisibility.innerHTML = '<i class="fas fa-eye-slash"></i> Hide Mask';
            } else {
                canvas.style.background = 'transparent';
                btnToggleMaskVisibility.innerHTML = '<i class="fas fa-eye"></i> Show Mask';
            }
        });
    }

    if (canvas) {
        const getMousePos = (e) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const startDrawing = (x, y) => {
            isDrawing = true;
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
        };

        const drawSegment = (x, y) => {
            if (!isDrawing || !ctx) return;
            ctx.lineWidth = brushSize;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            if (showMaskOverlay) {
                ctx.strokeStyle = '#FFFFFF';
            } else {
                ctx.strokeStyle = 'rgba(201, 168, 76, 0.6)';
            }
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        };

        canvas.addEventListener('mousedown', (e) => {
            const pos = getMousePos(e);
            startDrawing(pos.x, pos.y);
        });

        canvas.addEventListener('mousemove', (e) => {
            const pos = getMousePos(e);
            drawSegment(pos.x, pos.y);
        });

        window.addEventListener('mouseup', () => {
            isDrawing = false;
        });

        canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                startDrawing(x, y);
                e.preventDefault();
            }
        });

        canvas.addEventListener('touchmove', (e) => {
            if (isDrawing && e.touches.length > 0) {
                const rect = canvas.getBoundingClientRect();
                const x = e.touches[0].clientX - rect.left;
                const y = e.touches[0].clientY - rect.top;
                drawSegment(x, y);
                e.preventDefault();
            }
        });

        canvas.addEventListener('touchend', () => {
            isDrawing = false;
        });
    }

    const generateReplicateMask = () => {
        if (!canvas || !ctx) return '';
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.fillStyle = '#000000';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const tempImgData = tempCtx.createImageData(canvas.width, canvas.height);
        const tempData = tempImgData.data;

        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 0) {
                tempData[i] = 255;
                tempData[i + 1] = 255;
                tempData[i + 2] = 255;
                tempData[i + 3] = 255;
            } else {
                tempData[i] = 0;
                tempData[i + 1] = 0;
                tempData[i + 2] = 0;
                tempData[i + 3] = 255;
            }
        }
        tempCtx.putImageData(tempImgData, 0, 0);
        return tempCanvas.toDataURL('image/png');
    };

    // DYNAMIC MATERIALS CATALOG INJECTION
    let materialsList = [];
    let selectedMaterialId = '';

    const fetchMaterials = async () => {
        try {
            const response = await fetch('/api/materials');
            if (response.ok) {
                materialsList = await response.json();
                renderMaterialsGrid();
            }
        } catch (err) {
            console.error('Failed to load materials catalog:', err);
        }
    };

    const renderMaterialsGrid = () => {
        const grid = document.getElementById('flooring-material-grid');
        if (!grid) return;
        grid.innerHTML = '';
        
        materialsList.forEach((mat, idx) => {
            const card = document.createElement('div');
            card.className = 'texture-card' + (idx === 0 ? ' selected' : '');
            card.dataset.group = 'floor';
            card.dataset.value = mat.id;
            
            card.innerHTML = `
                <img src="${mat.texture}" alt="${mat.name}">
                <span>${mat.name}</span>
            `;
            
            card.addEventListener('click', () => {
                document.querySelectorAll('#flooring-material-grid .texture-card').forEach(t => t.classList.remove('selected'));
                card.classList.add('selected');
                selectedMaterialId = mat.id;
                updateShoppableMaterialCard(mat);
            });
            
            grid.appendChild(card);
            
            if (idx === 0) {
                selectedMaterialId = mat.id;
                updateShoppableMaterialCard(mat);
            }
        });
    };

    const updateShoppableMaterialCard = (mat) => {
        const infoBlock = document.getElementById('shoppable-material-info');
        const nameEl = document.getElementById('shoppable-material-name');
        const priceEl = document.getElementById('shoppable-material-price');
        
        if (infoBlock && nameEl && priceEl) {
            nameEl.textContent = mat.name;
            priceEl.innerHTML = `Estimated Price: <span style="color: var(--accent-gold); font-weight: 600;">₹${mat.price} / sq.ft.</span>`;
            infoBlock.style.display = 'block';
        }
    };

    fetchMaterials();

    // Room style mock imagery mapped to room types
    const mockRoomRenders = {
        living: 'https://images.unsplash.com/photo-1600210491866-e742330efc00?auto=format&fit=crop&q=80&w=1000',
        bedroom: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&q=80&w=1000',
        dining: 'https://images.unsplash.com/photo-1617806118233-18e1db207f62?auto=format&fit=crop&q=80&w=1000',
        office: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000',
        kitchen: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1000'
    };

    const processUpload = (file) => {
        if (!file || !file.type.match('image.*')) {
            alert('Please select a valid image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            beforeImg.src = e.target.result;
            const activeRoomType = document.querySelector('.select-card[data-group="room-type"].selected')?.dataset.value || 'living';
            afterImg.src = mockRoomRenders[activeRoomType] || mockRoomRenders.living;
            
            uploadOverlay.classList.add('hidden');
            resetSlider();
            initMaskCanvas();
        };
        reader.readAsDataURL(file);
    };

    if (uploadBox && fileInput) {
        uploadBox.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) processUpload(e.target.files[0]);
        });

        // Drag and drop events
        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = 'var(--accent-gold)';
            uploadBox.style.background = 'rgba(255, 255, 255, 0.08)';
        });

        uploadBox.addEventListener('dragleave', () => {
            uploadBox.style.borderColor = '';
            uploadBox.style.background = '';
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.style.borderColor = '';
            uploadBox.style.background = '';
            if (e.dataTransfer.files.length > 0) processUpload(e.dataTransfer.files[0]);
        });
    }

    const resetUpload = () => {
        uploadOverlay.classList.remove('hidden');
        beforeImg.src = '';
        afterImg.src = '';
        fileInput.value = '';
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvas) canvas.style.display = 'none';
        const stamps = document.querySelectorAll('.draggable-element');
        stamps.forEach(s => s.remove());
    };

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', resetUpload);


    // ==========================================================================
    // INTERACTIVE BEFORE/AFTER SLIDER
    // ==========================================================================
    const sliderHandle = document.getElementById('slider-handle');
    const afterImgWrapper = document.getElementById('slider-img-after');
    let isResizing = false;

    const setSliderPos = (xPos) => {
        const rect = sliderContainer.getBoundingClientRect();
        let percentage = ((xPos - rect.left) / rect.width) * 100;
        
        // Clamp percentage
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        
        sliderHandle.style.left = `${percentage}%`;
        afterImgWrapper.style.width = `${percentage}%`;
    };

    const resetSlider = () => {
        sliderHandle.style.left = '50%';
        afterImgWrapper.style.width = '50%';
    };

    if (sliderHandle && sliderContainer) {
        // Mouse Down
        sliderHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            e.preventDefault();
        });

        // Touch Start
        sliderHandle.addEventListener('touchstart', (e) => {
            isResizing = true;
        });

        // Mouse Move
        window.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            setSliderPos(e.clientX);
        });

        // Touch Move
        window.addEventListener('touchmove', (e) => {
            if (!isResizing) return;
            if (e.touches.length > 0) setSliderPos(e.touches[0].clientX);
        });

        // Release
        window.addEventListener('mouseup', () => { isResizing = false; });
        window.addEventListener('touchend', () => { isResizing = false; });
    }


    // ==========================================================================
    // INTERACTIVE DRAG-AND-DROP DESIGN ELEMENTS STAMPS
    // ==========================================================================
    const dragItems = document.querySelectorAll('.drag-item');
    const interactiveOverlay = document.getElementById('canvas-interactive-overlay');

    dragItems.forEach(item => {
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                img: item.dataset.img,
                title: item.dataset.title,
                price: item.dataset.price,
                type: item.dataset.type
            }));
            e.dataTransfer.effectAllowed = 'copy';
        });
    });

    if (interactiveOverlay) {
        interactiveOverlay.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        interactiveOverlay.addEventListener('drop', (e) => {
            e.preventDefault();
            
            // Check if uploaded image exists first
            if (uploadOverlay && !uploadOverlay.classList.contains('hidden')) {
                alert('Please upload a room photo before dragging items onto the canvas.');
                return;
            }

            const data = JSON.parse(e.dataTransfer.getData('text/plain'));
            const rect = interactiveOverlay.getBoundingClientRect();
            
            // Calculate coordinates in percentages to maintain responsiveness
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            createDraggableElement(data, x, y);
        });
        
        // Deselect dropped elements when clicking the canvas itself
        interactiveOverlay.addEventListener('mousedown', (e) => {
            if (e.target === interactiveOverlay) {
                deselectAllElements();
            }
        });
    }

    const deselectAllElements = () => {
        document.querySelectorAll('.draggable-element').forEach(el => el.classList.remove('selected'));
    };

    const createDraggableElement = (data, pctX, pctY) => {
        deselectAllElements();

        const stamp = document.createElement('div');
        stamp.classList.add('draggable-element', 'selected');
        stamp.style.left = `${pctX - 10}%`; // Center offset
        stamp.style.top = `${pctY - 10}%`;
        stamp.style.width = '120px';
        stamp.style.height = '120px';
        stamp.style.zIndex = '18';

        const img = document.createElement('img');
        img.src = data.img;
        img.alt = data.title;
        stamp.appendChild(img);

        // Control box wrapper
        const controls = document.createElement('div');
        controls.classList.add('element-controls');

        // Delete button
        const deleteBtn = document.createElement('div');
        deleteBtn.classList.add('element-btn');
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.title = 'Remove Element';
        deleteBtn.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            stamp.remove();
            removeMaterialFromLedger(data.title);
        });
        controls.appendChild(deleteBtn);
        stamp.appendChild(controls);

        // Resizer Handle
        const resizer = document.createElement('div');
        resizer.classList.add('element-resizer');
        stamp.appendChild(resizer);

        interactiveOverlay.appendChild(stamp);
        addDragMoveLogic(stamp);
        addResizeLogic(stamp, resizer);
        addMaterialToLedger(data);

        // Handle item selection clicks
        stamp.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            deselectAllElements();
            stamp.classList.add('selected');
        });
    };

    // Custom Drag-to-Move handler for elements placed on canvas
    const addDragMoveLogic = (el) => {
        let isDragging = false;
        let startX, startY, origLeft, origTop;

        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('element-btn') || e.target.classList.contains('element-resizer')) return;
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            origLeft = el.offsetLeft;
            origTop = el.offsetTop;
            
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            const parentWidth = interactiveOverlay.clientWidth;
            const parentHeight = interactiveOverlay.clientHeight;

            let newLeftPct = ((origLeft + dx) / parentWidth) * 100;
            let newTopPct = ((origTop + dy) / parentHeight) * 100;

            // Clamp bounds
            if (newLeftPct < 0) newLeftPct = 0;
            if (newLeftPct > 90) newLeftPct = 90;
            if (newTopPct < 0) newTopPct = 0;
            if (newTopPct > 90) newTopPct = 90;

            el.style.left = `${newLeftPct}%`;
            el.style.top = `${newTopPct}%`;
        });

        window.addEventListener('mouseup', () => { isDragging = false; });
    };

    // Custom Resize handler
    const addResizeLogic = (el, handle) => {
        let isResizing = false;
        let startX, startWidth, startHeight;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startWidth = el.clientWidth;
            startHeight = el.clientHeight;
            e.stopPropagation();
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!isResizing) return;
            const dx = e.clientX - startX;
            const newWidth = Math.max(50, startWidth + dx);
            const newHeight = Math.max(50, startHeight + dx); // Maintain 1:1 aspect ratio roughly

            el.style.width = `${newWidth}px`;
            el.style.height = `${newHeight}px`;
        });

        window.addEventListener('mouseup', () => { isResizing = false; });
    };


    // ==========================================================================
    // SOURCING LEDGER DYNAMICS
    // ==========================================================================
    const ledgerTableBody = document.querySelector('.ledger-table tbody');

    const addMaterialToLedger = (data) => {
        // Check if item already exists in list
        const existingRow = Array.from(ledgerTableBody.querySelectorAll('tr')).find(row => row.dataset.title === data.title);
        if (existingRow) return;

        const row = document.createElement('tr');
        row.dataset.title = data.title;
        row.innerHTML = `
            <td><strong>${data.title}</strong></td>
            <td>${data.type}</td>
            <td class="item-cost">${data.price}</td>
            <td><a href="#contact" class="sourcing-action-link">Source Consult <i class="fas fa-arrow-right"></i></a></td>
        `;
        ledgerTableBody.appendChild(row);
    };

    const removeMaterialFromLedger = (title) => {
        const row = Array.from(ledgerTableBody.querySelectorAll('tr')).find(row => row.dataset.title === title);
        if (row) row.remove();
    };


    // ==========================================================================
    // MOCK AI GENERATION & DESIGN VARIATIONS
    // ==========================================================================
    const generateBtn = document.getElementById('generate-btn');
    const renderLoadingOverlay = document.getElementById('render-loading-overlay');
    const loadingPhases = document.querySelectorAll('.loading-phase');

    const setPhaseState = (index, status, iconClass) => {
        const phase = loadingPhases[index];
        if (!phase) return;
        phase.className = `loading-phase ${status}`;
        const icon = phase.querySelector('.status-icon');
        if (icon) icon.className = `status-icon fas ${iconClass}`;
    };

    // Suggestions database
    const suggestionsDatabase = {
        living: [
            "Replacing central lighting with an accent gold chandelier establishes a bold luxurious focal point.",
            "Incorporating minimalist wood paneling behind the sofa softens acoustics and adds rich texture.",
            "Consider a Calacatta marble slab coffee table to ground the seat layout with natural refinement."
        ],
        bedroom: [
            "A royal velvet floor-to-ceiling headboard enhances structural height and offers supreme comfort.",
            "Introduce low-profile warm spotlight sconces to promote relaxation and circadian alignment.",
            "Scandinavian oak flooring pairs perfectly with plush beige rugs to cultivate quiet luxury."
        ],
        dining: [
            "We recommend adding an geometric bronze mirror on the accent wall to amplify incoming daylight.",
            "Use deep navy chair upholstery to anchor the space and complement gold tableware palettes.",
            "A drop coffered ceiling layout with warm perimeter LED bands adds dramatic visual height."
        ],
        office: [
            "Incorporate custom floor-to-ceiling shelving in slate-blue with integrated warm strip lights.",
            "A marble top desk matches your high-performance aesthetic and defines executive authority.",
            "A tall fiddle leaf fig plant in a concrete planter helps introduce restorative natural elements."
        ],
        kitchen: [
            "Calacatta Gold Quartz splashbacks and waterfall islands establish continuous premium texture.",
            "Gold linear pendant bars provide efficient spotlighting while aligning with minimalist themes.",
            "Opt for dark oak custom cabinetry to introduce architectural contrast to white plaster walls."
        ]
    };

    // Material suggestions lists based on style/room
    const mockMaterialsList = {
        living: [
            { name: "Suede Lounge Sofa (Slate)", type: "Furniture", price: "$4,200" },
            { name: "Calacatta Marble Coffee Table", type: "Furniture", price: "$2,850" },
            { name: "Gold Halo Chandelier", type: "Lighting", price: "$1,800" },
            { name: "Plush Wool Rug (Beige)", type: "Decoration", price: "$1,450" }
        ],
        bedroom: [
            { name: "Royal King Bed (Velvet Headboard)", type: "Furniture", price: "$3,900" },
            { name: "Warm Brass Sconce Set", type: "Lighting", price: "$650" },
            { name: "Oak Herringbone Planks (sqft)", type: "Flooring", price: "$1,200" },
            { name: "Linen Curtains (Off-White)", type: "Decoration", price: "$950" }
        ],
        dining: [
            { name: "Calacatta Gold Dining Table", type: "Furniture", price: "$5,400" },
            { name: "Velvet Upholstered Chairs (Navy)", type: "Furniture", price: "$2,100" },
            { name: "Bronze Arch Wall Mirror", type: "Decoration", price: "$850" },
            { name: "Brass Chandelier (12-Light)", type: "Lighting", price: "$2,250" }
        ],
        office: [
            { name: "Executive Marble Desk", type: "Furniture", price: "$3,600" },
            { name: "Slate Blue Custom Shelving", type: "Furniture", price: "$4,800" },
            { name: "Gold Arc Task Light", type: "Lighting", price: "$450" },
            { name: "Potted Fiddle Leaf Fig Tree", type: "Decoration", price: "$250" }
        ],
        kitchen: [
            { name: "Dark Oak Cabinetry Set", type: "Furniture", price: "$12,500" },
            { name: "Calacatta Gold Quartz Island", type: "Furniture", price: "$7,200" },
            { name: "Gold Linear Pendant Bar", type: "Lighting", price: "$980" },
            { name: "Terrazzo Floor Tiling (sqft)", type: "Flooring", price: "$1,850" }
        ]
    };

    if (generateBtn) {
        generateBtn.addEventListener('click', async () => {
            if (uploadOverlay && !uploadOverlay.classList.contains('hidden')) {
                alert('Please upload a room photo before initiating AI generation.');
                return;
            }

            const activeRoomType = document.querySelector('.select-card[data-group="room-type"].selected')?.dataset.value || 'living';
            const promptTweaker = document.querySelector('.prompt-area')?.value || '';
            const originalImageBase64 = beforeImg.src;
            const maskImageBase64 = generateReplicateMask();

            renderLoadingOverlay.classList.add('active');

            // Reset phases
            loadingPhases.forEach((p, idx) => {
                p.className = 'loading-phase';
                const icon = p.querySelector('.status-icon');
                if (icon) icon.className = 'status-icon fas fa-circle-notch fa-spin';
                if (idx === 0) p.classList.add('active');
            });

            try {
                // Call serverless visualizer endpoint
                const response = await fetch('/api/generate-render', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        image: originalImageBase64,
                        mask: maskImageBase64,
                        materialId: selectedMaterialId,
                        roomType: activeRoomType,
                        prompt: promptTweaker
                    })
                });

                const data = await response.json();
                if (!response.ok || !data.success) {
                    throw new Error(data.error || 'Failed to initiate render prediction.');
                }

                setPhaseState(0, 'completed', 'fa-check');
                setPhaseState(1, 'active', 'fa-circle-notch fa-spin');

                const predictionId = data.id;
                let pollAttempts = 0;
                
                const pollInterval = setInterval(async () => {
                    pollAttempts++;
                    try {
                        const statusResponse = await fetch(`/api/render-status?id=${predictionId}&materialId=${selectedMaterialId}&roomType=${activeRoomType}`);
                        const statusData = await statusResponse.json();

                        if (!statusResponse.ok || !statusData.success) {
                            throw new Error(statusData.error || 'Failed to poll rendering status.');
                        }

                        const status = statusData.status;

                        if (pollAttempts === 2) {
                            setPhaseState(1, 'completed', 'fa-check');
                            setPhaseState(2, 'active', 'fa-circle-notch fa-spin');
                        } else if (pollAttempts === 4) {
                            setPhaseState(2, 'completed', 'fa-check');
                            setPhaseState(3, 'active', 'fa-circle-notch fa-spin');
                        }

                        if (status === 'succeeded') {
                            clearInterval(pollInterval);
                            setPhaseState(3, 'completed', 'fa-check');
                            
                            setTimeout(() => {
                                renderLoadingOverlay.classList.remove('active');
                                afterImg.src = statusData.output;
                                resetSlider();
                                updateDesignerRecommendations(activeRoomType);
                                alert('AI Luxury Rendering completed successfully! Your bespoke room model is updated.');
                            }, 500);

                        } else if (status === 'failed' || status === 'canceled') {
                            clearInterval(pollInterval);
                            throw new Error(statusData.error || 'AI visualizer job failed or was canceled.');
                        }

                    } catch (err) {
                        clearInterval(pollInterval);
                        console.error('AI Visualizer status polling error:', err);
                        renderLoadingOverlay.classList.remove('active');
                        alert('Error during AI luxury rendering: ' + err.message);
                    }
                }, 2000);

            } catch (err) {
                console.error('AI Visualizer submission error:', err);
                renderLoadingOverlay.classList.remove('active');
                alert('Error submitting AI rendering: ' + err.message);
            }
        });
    }

    const updateDesignerRecommendations = (roomType) => {
        const suggestionsList = document.querySelector('.suggestions-list');
        if (suggestionsList) {
            suggestionsList.innerHTML = '';
            const suggestions = suggestionsDatabase[roomType] || suggestionsDatabase.living;
            suggestions.forEach(sug => {
                const li = document.createElement('li');
                li.innerHTML = `<i class="fas fa-magic"></i> <span>${sug}</span>`;
                suggestionsList.appendChild(li);
            });
        }

        if (ledgerTableBody) {
            ledgerTableBody.innerHTML = '';
            const materials = mockMaterialsList[roomType] || mockMaterialsList.living;
            materials.forEach(mat => {
                addMaterialToLedger(mat);
            });
        }
    };

    // --- Design Proposal Modal & Form Handling ---
    const emailDesignModal = document.getElementById('email-design-modal');
    const btnEmailDesign = document.getElementById('btn-email-design');
    const emailModalClose = document.getElementById('email-modal-close');
    const emailModalOverlay = document.getElementById('email-modal-overlay');
    const emailDesignForm = document.getElementById('email-design-form');

    if (btnEmailDesign && emailDesignModal) {
        btnEmailDesign.addEventListener('click', () => {
            emailDesignModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    const closeEmailModal = () => {
        if (emailDesignModal) {
            emailDesignModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    if (emailModalClose) emailModalClose.addEventListener('click', closeEmailModal);
    if (emailModalOverlay) emailModalOverlay.addEventListener('click', closeEmailModal);

    if (emailDesignForm) {
        emailDesignForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const successToast = document.getElementById('design-success');
            const errorToast = document.getElementById('design-error');
            const errorText = document.getElementById('design-error-text');
            
            if (successToast) successToast.classList.remove('show');
            if (errorToast) errorToast.classList.remove('show');

            const clientName = document.getElementById('email-client-name').value.trim();
            const clientPhone = document.getElementById('email-client-phone').value.trim();
            const clientEmail = document.getElementById('email-client-email').value.trim();
            const honeypotVal = document.getElementById('design-honeypot').value;

            // Extract selected design options in the visualizer
            const activeRoom = document.querySelector('.select-card[data-group="room-type"].selected')?.dataset.value || 'living';
            const activeStyle = document.querySelector('.select-card[data-group="style"].selected')?.dataset.value || 'minimalist';
            const activeWallColor = document.querySelector('.swatch-btn[data-group="wall-color"].selected')?.title || 'Warm Alabaster';
            const activeWallTex = document.querySelector('.texture-card[data-group="wall-tex"].selected')?.dataset.value || 'plaster';
            const activeCeiling = document.querySelector('.select-card[data-group="ceiling"].selected')?.dataset.value || 'flat';
            const activeFloor = document.querySelector('.texture-card[data-group="floor"].selected')?.dataset.value || 'hardwood';
            const activeLighting = document.querySelector('.select-card[data-group="lighting"].selected')?.dataset.value || 'chandelier';
            const activeFurniture = document.querySelector('.select-card[data-group="furniture"].selected')?.dataset.value || 'italian-modern';
            const activeFabColor = document.querySelector('.swatch-btn[data-group="fab-color"].selected')?.title || 'Boucle Beige';

            const designSpecs = `3D Studio Design Configurations:
- Room Type: ${activeRoom.toUpperCase()}
- Style Concept: ${activeStyle.toUpperCase()}
- Flooring: ${activeFloor.toUpperCase()}
- Wall Color: ${activeWallColor}
- Wall Texture: ${activeWallTex.toUpperCase()}
- Ceiling: ${activeCeiling.toUpperCase()}
- Lighting: ${activeLighting.toUpperCase()}
- Furniture Style: ${activeFurniture.toUpperCase()}
- Fabric Color: ${activeFabColor}`;

            const proposalMessage = `Client requested full design package details.
${designSpecs}`;

            const proposalProduct = `3D Designer Proposal: ${activeRoom.toUpperCase()} (${activeStyle.toUpperCase()})`;

            // Duplicate Protection
            const existingInquiries = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
            const isDuplicate = existingInquiries.some(inq => 
                inq.name === clientName && inq.phone === clientPhone && inq.product === proposalProduct
            );

            if (isDuplicate) {
                if (errorToast && errorText) {
                    errorText.textContent = "You have already sent a design proposal request for this room configuration.";
                    errorToast.classList.add('show');
                }
                return;
            }

            const btnSubmit = e.target.querySelector('button[type="submit"]');
            const originalBtnText = btnSubmit.textContent;
            btnSubmit.disabled = true;
            btnSubmit.textContent = 'Compiling & Sending...';

            const newLead = {
                id: 'inq_' + Date.now(),
                name: clientName,
                phone: clientPhone,
                email: clientEmail,
                product: proposalProduct,
                message: proposalMessage,
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
                        product: proposalProduct,
                        message: proposalMessage,
                        honeypot: honeypotVal
                    })
                });

                const data = await response.json();

                if (response.ok && data.success) {
                    let inquiries = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
                    inquiries.unshift(newLead);
                    localStorage.setItem('valure_inquiries', JSON.stringify(inquiries));
                    
                    if (successToast) successToast.classList.add('show');
                    redirectToWhatsApp(clientName, clientPhone, clientEmail, proposalProduct, proposalMessage, 'quote');
                    btnSubmit.textContent = 'Proposal Sent!';
                    e.target.reset();

                    setTimeout(() => {
                        btnSubmit.disabled = false;
                        btnSubmit.textContent = originalBtnText;
                        if (successToast) successToast.classList.remove('show');
                        closeEmailModal();
                    }, 2000);
                } else {
                    throw new Error(data.error || 'Server failed to send design proposal.');
                }
            } catch (err) {
                console.error("Designer contact API error (offline fallback):", err);
                
                // Offline fallback
                let inquiries = JSON.parse(localStorage.getItem('valure_inquiries')) || [];
                inquiries.unshift(newLead);
                localStorage.setItem('valure_inquiries', JSON.stringify(inquiries));
                
                if (successToast) successToast.classList.add('show');
                redirectToWhatsApp(clientName, clientPhone, clientEmail, proposalProduct, proposalMessage, 'quote');
                btnSubmit.textContent = 'Proposal Sent!';
                e.target.reset();

                setTimeout(() => {
                    btnSubmit.disabled = false;
                    btnSubmit.textContent = originalBtnText;
                    if (successToast) successToast.classList.remove('show');
                    closeEmailModal();
                }, 2000);
            }
        });

        // Handle secondary WhatsApp button inside emailDesignForm
        const wpCta = emailDesignForm.querySelector('.btn-whatsapp-cta');
        if (wpCta) {
            wpCta.addEventListener('click', (e) => {
                e.preventDefault();
                if (emailDesignForm.reportValidity()) {
                    emailDesignForm.requestSubmit();
                }
            });
        }
    }
});
