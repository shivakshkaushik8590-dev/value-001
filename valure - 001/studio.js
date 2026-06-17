// ==========================================================================
// VALUE 001 - AI Room Designer Studio Controller
// Manages Three.js WebGL Room, Before/After Slider, Drag & Drop Elements, 
// Day/Night mode illumination, and Invoicing Cost calculations.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Check if Three.js is loaded
    if (typeof THREE === 'undefined') {
        console.error('Three.js is not loaded. 3D visualizer will fall back.');
        return;
    }

    // ==========================================================================
    // 3D THREE.JS WEBGL PREVIEW ENGINE
    // ==========================================================================
    let scene, camera, renderer, controls;
    let roomBox, floorMesh, ceilingMesh, backWall, leftWall, rightWall;
    let mainLight, ambientLight, spotlightMesh;
    const canvasContainer = document.getElementById('canvas-3d');

    // Mapped color hex values from lists
    const colorHexes = {
        white_pearl: '#f8fafc',
        ivory_cream: '#fff8e7',
        beige_luxury: '#e8dcc4',
        royal_blue: '#0f172a',
        emerald_green: '#2e4f3f',
        charcoal_black: '#1e293b',
        matte_grey: '#64748b',
        champagne_gold: '#c5a059',
        
        // Ceiling colors
        ceil_white: '#f8fafc',
        ceil_beige: '#f5f5f4',
        ceil_gold: '#c5a059',
        ceil_grey: '#64748b',
        ceil_black: '#0f172a',
        ceil_wood: '#8b5a2b'
    };

    // Initialize 3D Scene
    const init3DScene = () => {
        if (!canvasContainer) return;
        
        // 1. Scene setup
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0c1220);

        // 2. Camera setup
        camera = new THREE.PerspectiveCamera(50, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 1000);
        camera.position.set(0, 5, 12);

        // 3. Renderer setup
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvasContainer.appendChild(renderer.domElement);

        // 4. Orbit Controls (Loaded from CDN)
        if (typeof THREE.OrbitControls !== 'undefined') {
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below floor
            controls.minDistance = 4;
            controls.maxDistance = 18;
        }

        // 5. Room geometry (A Box flipped inside out)
        // We create separate meshes for Floor, Ceiling, Back Wall, Left Wall, Right Wall to control materials independently
        const floorGeo = new THREE.PlaneGeometry(10, 10);
        const ceilGeo = new THREE.PlaneGeometry(10, 10);
        const wallBackGeo = new THREE.PlaneGeometry(10, 6);
        const wallSideGeo = new THREE.PlaneGeometry(10, 6);

        // Standard materials
        const floorMat = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.4, metalness: 0.1 });
        const ceilMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.9 });
        const wallMatDefault = new THREE.MeshStandardMaterial({ color: 0xe8dcc4, roughness: 0.8 });

        // Floor Mesh
        floorMesh = new THREE.Mesh(floorGeo, floorMat);
        floorMesh.rotation.x = -Math.PI / 2;
        floorMesh.position.y = -3;
        floorMesh.receiveShadow = true;
        scene.add(floorMesh);

        // Ceiling Mesh
        ceilingMesh = new THREE.Mesh(ceilGeo, ceilMat);
        ceilingMesh.rotation.x = Math.PI / 2;
        ceilingMesh.position.y = 3;
        ceilingMesh.receiveShadow = true;
        scene.add(ceilingMesh);

        // Back Wall
        backWall = new THREE.Mesh(wallBackGeo, wallMatDefault);
        backWall.position.set(0, 0, -5);
        backWall.receiveShadow = true;
        scene.add(backWall);

        // Left Wall
        leftWall = new THREE.Mesh(wallSideGeo, wallMatDefault);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.set(-5, 0, 0);
        leftWall.receiveShadow = true;
        scene.add(leftWall);

        // Right Wall
        rightWall = new THREE.Mesh(wallSideGeo, wallMatDefault);
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.position.set(5, 0, 0);
        rightWall.receiveShadow = true;
        scene.add(rightWall);

        // 6. Furniture Placeholders (Simple visual blocks representing layout)
        const sofaGeo = new THREE.BoxGeometry(4, 1, 1.5);
        const sofaMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
        const sofaMesh = new THREE.Mesh(sofaGeo, sofaMat);
        sofaMesh.position.set(0, -2.5, 2);
        sofaMesh.castShadow = true;
        sofaMesh.receiveShadow = true;
        scene.add(sofaMesh);

        const tableGeo = new THREE.BoxGeometry(2, 0.8, 1.2);
        const tableMat = new THREE.MeshStandardMaterial({ color: 0xc5a059, roughness: 0.2, metalness: 0.4 });
        const tableMesh = new THREE.Mesh(tableGeo, tableMat);
        tableMesh.position.set(0, -2.6, 0);
        tableMesh.castShadow = true;
        scene.add(tableMesh);

        // Decorative plant block
        const potGeo = new THREE.CylinderGeometry(0.4, 0.3, 0.8, 12);
        const potMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
        const pot = new THREE.Mesh(potGeo, potMat);
        pot.position.set(-4, -2.6, -4);
        scene.add(pot);

        const leafGeo = new THREE.SphereGeometry(0.6, 8, 8);
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x3b4e43, roughness: 0.9 });
        const leaf = new THREE.Mesh(leafGeo, leafMat);
        leaf.position.set(-4, -1.8, -4);
        scene.add(leaf);

        // 7. Lighting setup
        ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);

        mainLight = new THREE.DirectionalLight(0xfffaed, 0.6);
        mainLight.position.set(5, 8, 5);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 1024;
        mainLight.shadow.mapSize.height = 1024;
        scene.add(mainLight);

        // 8. Chandelier / Ceiling Spotlight mesh representation
        const chGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const chMat = new THREE.MeshBasicMaterial({ color: 0xc5a059 });
        spotlightMesh = new THREE.Mesh(chGeo, chMat);
        spotlightMesh.position.set(0, 2.5, 0);
        scene.add(spotlightMesh);

        const chandelierLight = new THREE.PointLight(0xffdf80, 0.5, 10);
        chandelierLight.position.set(0, 2, 0);
        scene.add(chandelierLight);

        // Render Loop
        const animate = () => {
            requestAnimationFrame(animate);
            if (controls) controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        window.addEventListener('resize', () => {
            if (!camera || !renderer) return;
            camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        });
    };

    // Dynamic Swapping Handlers
    const update3DWallColor = (hexString) => {
        if (!backWall) return;
        const color = new THREE.Color(hexString);
        backWall.material.color = color;
        leftWall.material.color = color;
        rightWall.material.color = color;
    };

    const update3DWallMaterial = (materialType) => {
        if (!backWall) return;
        
        // Simulating material properties
        if (materialType === 'marble') {
            backWall.material.roughness = 0.1;
            backWall.material.metalness = 0.1;
            backWall.material.color.setHex(0xf1ebd9);
        } else if (materialType === 'wood') {
            backWall.material.roughness = 0.7;
            backWall.material.metalness = 0.0;
            backWall.material.color.setHex(0x5c4033);
        } else if (materialType === 'brick') {
            backWall.material.roughness = 0.9;
            backWall.material.color.setHex(0x8b5a2b);
        } else { // textured / standard paint
            backWall.material.roughness = 0.8;
            backWall.material.metalness = 0.0;
        }
    };

    const update3DFlooring = (flooringMaterial) => {
        if (!floorMesh) return;
        
        if (flooringMaterial === 'marble') {
            floorMesh.material.color.setHex(0xffffff);
            floorMesh.material.roughness = 0.05;
            floorMesh.material.metalness = 0.15;
        } else if (flooringMaterial === 'wood') {
            floorMesh.material.color.setHex(0x8b5a2b);
            floorMesh.material.roughness = 0.45;
            floorMesh.material.metalness = 0.0;
        } else if (flooringMaterial === 'epoxy') {
            floorMesh.material.color.setHex(0x1e293b);
            floorMesh.material.roughness = 0.1;
            floorMesh.material.metalness = 0.3;
        } else if (flooringMaterial === 'granite') {
            floorMesh.material.color.setHex(0x36454f);
            floorMesh.material.roughness = 0.15;
            floorMesh.material.metalness = 0.0;
        } else { // laminate / tiles
            floorMesh.material.color.setHex(0xdedede);
            floorMesh.material.roughness = 0.3;
            floorMesh.material.metalness = 0.05;
        }
    };

    const update3DCeiling = (colorHex) => {
        if (!ceilingMesh) return;
        ceilingMesh.material.color.set(colorHex);
    };

    const update3DIllumination = (mode, brightness, temperature) => {
        if (!ambientLight || !mainLight) return;

        // Shift color temperature
        // Warm temperature is yellowish-orange, cool is pale-blue
        const tempColor = new THREE.Color();
        const factor = (temperature - 2000) / 4000; // 0 (warm) to 1 (cool)
        tempColor.lerpColors(new THREE.Color(0xffdf80), new THREE.Color(0xdceeff), factor);
        mainLight.color = tempColor;

        if (mode === 'night') {
            ambientLight.intensity = 0.2;
            ambientLight.color.setHex(0x111625); // dark blue
            mainLight.intensity = 0.25;
            spotlightMesh.material.color.setHex(0xffdf80); // light bulb glows
        } else { // day mode
            ambientLight.intensity = 0.7 * (brightness / 100);
            ambientLight.color.setHex(0xffffff);
            mainLight.intensity = 0.6 * (brightness / 100);
            spotlightMesh.material.color.setHex(0xc5a059);
        }
    };

    // Run WebGL scene initialization
    init3DScene();


    // ==========================================================================
    // VISUALIZATION TABS (3D vs Before/After vs Variations)
    // ==========================================================================
    const canvasTabs = document.querySelectorAll('.canvas-tab');
    const viewPanes = document.querySelectorAll('.studio-view-pane');

    canvasTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            canvasTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const viewId = tab.dataset.view;
            viewPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === viewId) {
                    pane.classList.add('active');
                    // Force WebGL renderer resize correction
                    if (viewId === 'view-3d' && renderer) {
                        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
                    }
                }
            });
        });
    });


    // ==========================================================================
    // INTERACTIVE BEFORE/AFTER SLIDER
    // ==========================================================================
    const sliderHandle = document.getElementById('studio-slider-handle');
    const afterImgWrapper = document.getElementById('studio-slider-img-after');
    const sliderContainer = document.getElementById('studio-slider-container');
    let isDragging = false;

    const setSliderPos = (clientX) => {
        if (!sliderContainer) return;
        const rect = sliderContainer.getBoundingClientRect();
        let percentage = ((clientX - rect.left) / rect.width) * 100;
        
        // Clamp percentage
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        
        if (sliderHandle) sliderHandle.style.left = `${percentage}%`;
        if (afterImgWrapper) afterImgWrapper.style.width = `${percentage}%`;
    };

    if (sliderHandle && sliderContainer) {
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            setSliderPos(e.clientX);
        });

        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches.length > 0) setSliderPos(e.touches[0].clientX);
        });

        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('touchend', () => { isDragging = false; });
    }


    // ==========================================================================
    // STUDIO ACCORDION INTERACTION
    // ==========================================================================
    const accordionHeaders = document.querySelectorAll('.studio-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.studio-accordion-item').forEach(i => i.classList.remove('active'));
            
            // Open clicked
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });


    // ==========================================================================
    // DESIGN PARAMETERS SELECTORS & TRIGGERS
    // ==========================================================================
    
    // Day vs Night Mode Toggle
    const dayModeBtn = document.getElementById('studio-day-mode');
    const nightModeBtn = document.getElementById('studio-night-mode');
    const nightFilter = document.getElementById('night-filter-overlay');

    const updateLightMode = (mode) => {
        const brightness = parseInt(document.getElementById('studio-brightness').value);
        const temp = parseInt(document.getElementById('studio-temp').value);
        
        update3DIllumination(mode, brightness, temp);

        if (mode === 'night') {
            nightModeBtn.classList.add('active');
            dayModeBtn.classList.remove('active');
            if (nightFilter) nightFilter.classList.add('active');
        } else {
            dayModeBtn.classList.add('active');
            nightModeBtn.classList.remove('active');
            if (nightFilter) nightFilter.classList.remove('active');
        }
    };

    if (dayModeBtn) dayModeBtn.addEventListener('click', () => updateLightMode('day'));
    if (nightModeBtn) nightModeBtn.addEventListener('click', () => updateLightMode('night'));

    // Light Control Sliders
    const brightnessSlider = document.getElementById('studio-brightness');
    const tempSlider = document.getElementById('studio-temp');

    const triggerIlluminationUpdate = () => {
        const activeMode = dayModeBtn && dayModeBtn.classList.contains('active') ? 'day' : 'night';
        updateLightMode(activeMode);
    };

    if (brightnessSlider) brightnessSlider.addEventListener('input', triggerIlluminationUpdate);
    if (tempSlider) tempSlider.addEventListener('input', triggerIlluminationUpdate);

    // Wall Colors Click Selection
    document.querySelectorAll('.swatch-btn[data-group="studio-wall"]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.swatch-btn[data-group="studio-wall"]').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            const colorId = btn.dataset.value;
            const hex = colorHexes[colorId] || '#f8fafc';
            update3DWallColor(hex);
            recalculateStudioCost();
        });
    });

    // Custom Color Picker input
    const customPicker = document.getElementById('studio-custom-color');
    if (customPicker) {
        customPicker.addEventListener('input', (e) => {
            deselectSwatches('studio-wall');
            update3DWallColor(e.target.value);
        });
    }

    const deselectSwatches = (groupName) => {
        document.querySelectorAll(`.swatch-btn[data-group="${groupName}"]`).forEach(b => b.classList.remove('selected'));
    };

    // Wall Materials Click
    document.querySelectorAll('.texture-card[data-group="studio-wall-mat"]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.texture-card[data-group="studio-wall-mat"]').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            update3DWallMaterial(card.dataset.value);
            recalculateStudioCost();
        });
    });

    // Ceiling Types & Colors
    document.querySelectorAll('.select-card[data-group="studio-ceil"]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.select-card[data-group="studio-ceil"]').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            recalculateStudioCost();
        });
    });

    document.querySelectorAll('.swatch-btn[data-group="studio-ceil-color"]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.swatch-btn[data-group="studio-ceil-color"]').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            
            const colorId = btn.dataset.value;
            const hex = colorHexes[colorId] || '#ffffff';
            update3DCeiling(hex);
            recalculateStudioCost();
        });
    });

    // Flooring Materials & Patterns
    document.querySelectorAll('.texture-card[data-group="studio-floor"]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.texture-card[data-group="studio-floor"]').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            
            update3DFlooring(card.dataset.value);
            recalculateStudioCost();
        });
    });

    document.querySelectorAll('.select-card[data-group="studio-floor-pat"]').forEach(card => {
        card.addEventListener('click', () => {
            document.querySelectorAll('.select-card[data-group="studio-floor-pat"]').forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            recalculateStudioCost();
        });
    });


    // ==========================================================================
    // STAMP DRAG-AND-DROP PLACEMENT OVER CANVAS
    // ==========================================================================
    const stampsList = document.querySelectorAll('.studio-drag-item');
    const overlayTarget = document.getElementById('studio-canvas-interactive-overlay');

    stampsList.forEach(item => {
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

    if (overlayTarget) {
        overlayTarget.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        });

        overlayTarget.addEventListener('drop', (e) => {
            e.preventDefault();
            
            const rawData = e.dataTransfer.getData('text/plain');
            if (!rawData) return;
            
            const data = JSON.parse(rawData);
            const rect = overlayTarget.getBoundingClientRect();
            
            // Calculate drop coordinate %
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            createCanvasStamp(data, x, y);
        });

        overlayTarget.addEventListener('mousedown', (e) => {
            if (e.target === overlayTarget) {
                document.querySelectorAll('.draggable-element').forEach(el => el.classList.remove('selected'));
            }
        });
    }

    const createCanvasStamp = (data, pctX, pctY) => {
        // Deselect all
        document.querySelectorAll('.draggable-element').forEach(el => el.classList.remove('selected'));

        const wrapper = document.createElement('div');
        wrapper.classList.add('draggable-element', 'selected');
        wrapper.style.left = `${pctX - 8}%`;
        wrapper.style.top = `${pctY - 8}%`;
        wrapper.style.width = '100px';
        wrapper.style.height = '100px';
        wrapper.style.zIndex = '18';
        wrapper.dataset.price = data.price;
        wrapper.dataset.title = data.title;
        wrapper.dataset.type = data.type;

        const img = document.createElement('img');
        img.src = data.img;
        img.alt = data.title;
        wrapper.appendChild(img);

        // Control buttons
        const controls = document.createElement('div');
        controls.classList.add('element-controls');

        // Delete button
        const del = document.createElement('div');
        del.classList.add('element-btn');
        del.innerHTML = '<i class="fas fa-times"></i>';
        del.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            wrapper.remove();
            recalculateStudioCost();
        });
        controls.appendChild(del);

        // Rotate button (rotate 45deg on click)
        let currentRotation = 0;
        const rotate = document.createElement('div');
        rotate.classList.add('element-btn');
        rotate.innerHTML = '<i class="fas fa-redo"></i>';
        rotate.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            currentRotation = (currentRotation + 45) % 360;
            img.style.transform = `rotate(${currentRotation}deg)`;
        });
        controls.appendChild(rotate);

        wrapper.appendChild(controls);

        // Resizer Handle
        const resizer = document.createElement('div');
        resizer.classList.add('element-resizer');
        wrapper.appendChild(resizer);

        overlayTarget.appendChild(wrapper);

        // Drag events
        setupStampDrags(wrapper);
        setupStampResizes(wrapper, resizer);

        // Click focus
        wrapper.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.draggable-element').forEach(el => el.classList.remove('selected'));
            wrapper.classList.add('selected');
        });

        recalculateStudioCost();
    };

    const setupStampDrags = (el) => {
        let dragging = false;
        let startX, startY, origX, origY;

        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('element-btn') || e.target.classList.contains('element-resizer')) return;
            dragging = true;
            startX = e.clientX;
            startY = e.clientY;
            origX = el.offsetLeft;
            origY = el.offsetTop;
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!dragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const w = overlayTarget.clientWidth;
            const h = overlayTarget.clientHeight;

            let leftPct = ((origX + dx) / w) * 100;
            let topPct = ((origY + dy) / h) * 100;

            if (leftPct < 0) leftPct = 0;
            if (leftPct > 90) leftPct = 90;
            if (topPct < 0) topPct = 0;
            if (topPct > 90) topPct = 90;

            el.style.left = `${leftPct}%`;
            el.style.top = `${topPct}%`;
        });

        window.addEventListener('mouseup', () => { dragging = false; });
    };

    const setupStampResizes = (el, handle) => {
        let resizing = false;
        let startX, startW, startH;

        handle.addEventListener('mousedown', (e) => {
            resizing = true;
            startX = e.clientX;
            startW = el.clientWidth;
            startH = el.clientHeight;
            e.stopPropagation();
            e.preventDefault();
        });

        window.addEventListener('mousemove', (e) => {
            if (!resizing) return;
            const dx = e.clientX - startX;
            const newW = Math.max(40, startW + dx);
            const newH = Math.max(40, startH + dx);

            el.style.width = `${newW}px`;
            el.style.height = `${newH}px`;
        });

        window.addEventListener('mouseup', () => { resizing = false; });
    };


    // ==========================================================================
    // SMART COST CALCULATOR & INVOICING ENGINE
    // ==========================================================================
    const recalculateStudioCost = () => {
        // 1. Dimensions setup (Using fixed defaults or sliders)
        const length = 18;
        const width = 14;
        const height = 10;
        
        const area = length * width; // 252 sqft
        const perimeter = 2 * (length + width); // 64 ft
        const wallArea = perimeter * height; // 640 sqft

        // 2. Selectors cost modifiers
        const selectedFloorMat = document.querySelector('.texture-card[data-group="studio-floor"].selected')?.dataset.value || 'wood';
        const selectedWallMat = document.querySelector('.texture-card[data-group="studio-wall-mat"].selected')?.dataset.value || 'plaster';
        const selectedCeil = document.querySelector('.select-card[data-group="studio-ceil"].selected')?.dataset.value || 'flat';
        const selectedStyle = document.querySelector('.select-card[data-group="studio-style"].selected')?.dataset.value || 'modern';

        // Rates
        const floorRates = { wood: 18, marble: 45, tiles: 14, epoxy: 12, granite: 30 };
        const wallRates = { plaster: 6, wood: 24, brick: 15, wallpaper: 18 };
        const ceilRates = { flat: 5, coffered: 22, beams: 16, molding: 12 };

        const floorRate = floorRates[selectedFloorMat] || 15;
        const wallRate = wallRates[selectedWallMat] || 8;
        const ceilRate = ceilRates[selectedCeil] || 6;

        // Base elements costs
        const floorCost = area * floorRate;
        const wallCost = wallArea * wallRate;
        const ceilCost = area * ceilRate;

        // 3. Dynamic lights & furniture stamp accumulation
        let lightingCost = 0;
        let furnitureCost = 0;
        let decorationCost = 0;

        document.querySelectorAll('.draggable-element').forEach(stamp => {
            const price = parseInt(stamp.dataset.price.replace('$', '').replace(',', ''));
            const type = stamp.dataset.type;

            if (type === 'Lighting') lightingCost += price;
            else if (type === 'Furniture') furnitureCost += price;
            else if (type === 'Decoration') decorationCost += price;
        });

        // Add base lighting fixture if none dropped
        if (lightingCost === 0) lightingCost = 1800; // default luxury chandelier

        // 4. Labor Cost (base + complexity multiplier based on style)
        const styleComplexity = {
            modern: 0.25,
            minimalist: 0.20,
            scandinavian: 0.22,
            zen: 0.28,
            palace: 0.40,
            hotel: 0.35,
            industrial: 0.24,
            bohemian: 0.22,
            traditional: 0.30,
            mediterranean: 0.28
        };
        const complexity = styleComplexity[selectedStyle] || 0.25;
        const materialSubtotal = floorCost + wallCost + ceilCost + lightingCost + furnitureCost + decorationCost;
        const laborCost = materialSubtotal * complexity;

        // 5. Fees & Total invoice calculations
        const subtotal = materialSubtotal + laborCost;
        const designFee = subtotal * 0.15; // 15% VIP concierge fee
        const tax = subtotal * 0.08; // 8% delivery + tax
        const grandTotal = subtotal + designFee + tax;

        // 6. Update UI labels
        document.getElementById('bill-floor').textContent = `$${Math.round(floorCost).toLocaleString()}`;
        document.getElementById('bill-wall').textContent = `$${Math.round(wallCost).toLocaleString()}`;
        document.getElementById('bill-ceil').textContent = `$${Math.round(ceilCost).toLocaleString()}`;
        document.getElementById('bill-light').textContent = `$${Math.round(lightingCost).toLocaleString()}`;
        document.getElementById('bill-furn').textContent = `$${Math.round(furnitureCost).toLocaleString()}`;
        document.getElementById('bill-decor').textContent = `$${Math.round(decorationCost).toLocaleString()}`;
        document.getElementById('bill-labor').textContent = `$${Math.round(laborCost).toLocaleString()}`;
        
        document.getElementById('bill-tax').textContent = `$${Math.round(tax).toLocaleString()}`;
        document.getElementById('bill-fee').textContent = `$${Math.round(designFee).toLocaleString()}`;
        document.getElementById('bill-total').textContent = `$${Math.round(grandTotal).toLocaleString()}`;

        // 7. Update budget allocation bar filling heights
        updateBudgetFillBars(floorCost, wallCost, ceilCost, lightingCost, furnitureCost, decorationCost, laborCost, grandTotal);
    };

    const updateBudgetFillBars = (floor, wall, ceil, light, furn, decor, labor, total) => {
        const floorPct = (floor / total) * 100;
        const wallPct = (wall / total) * 100;
        const lightPct = ((light + furn + decor) / total) * 100;
        const laborPct = (labor / total) * 100;

        document.getElementById('meter-floor-fill').style.width = `${floorPct}%`;
        document.getElementById('meter-wall-fill').style.width = `${wallPct}%`;
        document.getElementById('meter-fit-fill').style.width = `${lightPct}%`;
        document.getElementById('meter-labor-fill').style.width = `${laborPct}%`;
        
        document.getElementById('meter-floor-val').textContent = `${Math.round(floorPct)}%`;
        document.getElementById('meter-wall-val').textContent = `${Math.round(wallPct)}%`;
        document.getElementById('meter-fit-val').textContent = `${Math.round(lightPct)}%`;
        document.getElementById('meter-labor-val').textContent = `${Math.round(laborPct)}%`;
    };

    // Trigger initial calculation
    recalculateStudioCost();


    // ==========================================================================
    // ONE-CLICK DESIGN STYLE GENERATOR
    // ==========================================================================
    const stylePresetCards = document.querySelectorAll('.select-card[data-group="studio-style"]');
    
    // Style presets databases
    const stylePresets = {
        modern: {
            wallColor: 'white_pearl',
            wallMat: 'marble',
            ceilColor: 'ceil_white',
            ceilLayout: 'flat',
            floorMat: 'marble',
            lightType: 'chandelier'
        },
        minimalist: {
            wallColor: 'white_pearl',
            wallMat: 'plaster',
            ceilColor: 'ceil_white',
            ceilLayout: 'flat',
            floorMat: 'concrete',
            lightType: 'recessed'
        },
        scandinavian: {
            wallColor: 'ivory_cream',
            wallMat: 'plaster',
            ceilColor: 'ceil_white',
            ceilLayout: 'flat',
            floorMat: 'wood',
            lightType: 'sconces'
        },
        zen: {
            wallColor: 'beige_luxury',
            wallMat: 'wood',
            ceilColor: 'ceil_wood',
            ceilLayout: 'beams',
            floorMat: 'wood',
            lightType: 'recessed'
        },
        palace: {
            wallColor: 'champagne_gold',
            wallMat: 'wallpaper',
            ceilColor: 'ceil_gold',
            ceilLayout: 'coffered',
            floorMat: 'marble',
            lightType: 'chandelier'
        },
        hotel: {
            wallColor: 'charcoal_black',
            wallMat: 'wood',
            ceilColor: 'ceil_black',
            ceilLayout: 'molding',
            floorMat: 'marble',
            lightType: 'chandelier'
        }
    };

    stylePresetCards.forEach(card => {
        card.addEventListener('click', () => {
            stylePresetCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            const styleId = card.dataset.value;
            const preset = stylePresets[styleId];
            if (!preset) return;

            // Apply preset properties to control swatches/cards
            applyPresetSettings(preset);
        });
    });

    const applyPresetSettings = (preset) => {
        // 1. Wall Color Swatch
        const wallSwatch = document.querySelector(`.swatch-btn[data-group="studio-wall"][data-value="${preset.wallColor}"]`);
        if (wallSwatch) wallSwatch.click();

        // 2. Wall Material Card
        const wallCard = document.querySelector(`.texture-card[data-group="studio-wall-mat"][data-value="${preset.wallMat}"]`);
        if (wallCard) wallCard.click();

        // 3. Ceiling Type Card
        const ceilCard = document.querySelector(`.select-card[data-group="studio-ceil"][data-value="${preset.ceilLayout}"]`);
        if (ceilCard) ceilCard.click();

        // 4. Ceiling Color Swatch
        const ceilSwatch = document.querySelector(`.swatch-btn[data-group="studio-ceil-color"][data-value="${preset.ceilColor}"]`);
        if (ceilSwatch) ceilSwatch.click();

        // 5. Flooring Material Card
        const floorCard = document.querySelector(`.texture-card[data-group="studio-floor"][data-value="${preset.floorMat}"]`);
        if (floorCard) floorCard.click();

        recalculateStudioCost();
    };


    // ==========================================================================
    // AI RECOMMENDATIONS & DYNAMIC REPORT GENERATOR
    // ==========================================================================
    const recEngineBtn = document.getElementById('studio-rec-btn');

    // Recommendation report details mapped to style choice
    const recommendationReports = {
        modern: {
            color: "White Pearl (#F8FAFC)",
            floor: "Italian White Marble Slab",
            ceil: "Minimal Flat with LED Cove",
            light: "Gold Ring Halo Chandelier",
            furn: "Low-profile Velvet Sofa",
            est: "$18,500 - $24,000"
        },
        minimalist: {
            color: "Pearl White (#F8F8F8)",
            floor: "Polished Pearl Epoxy Flooring",
            ceil: "Minimalist flat plaster",
            light: "Integrated recessed spot lights",
            furn: "Beige Boucle sofa stamp",
            est: "$12,000 - $16,500"
        },
        scandinavian: {
            color: "Ivory Cream (#FFF8E7)",
            floor: "European Oak Herringbone Wood",
            ceil: "Flat with wooden perimeter trims",
            light: "Warm-brass sconces layered",
            furn: "Mid-century lounge armchairs",
            est: "$14,000 - $19,000"
        },
        zen: {
            color: "Royal Beige (#E8DCC4)",
            floor: "Natural Walnut wood planks",
            ceil: "Wooden accent cross-beams",
            light: "Soft ambient dimmer LEDs",
            furn: "Low-profile tea tables & tatami",
            est: "$15,500 - $21,000"
        },
        palace: {
            color: "Champagne Gold (#F7E7CE)",
            floor: "Italian White Carrara Marble",
            ceil: "Deep-coffered ceiling grid",
            light: "12-Light Crystal Chandelier",
            furn: "Grand velvet tufted headboards",
            est: "$35,000 - $48,000"
        },
        hotel: {
            color: "Charcoal Black (#36454F)",
            floor: "Black Galaxy polished marble",
            ceil: "Matte Black molding setup",
            light: "Warm perimeter LED coves + pendant",
            furn: "Satin executive armchairs",
            est: "$28,000 - $36,000"
        }
    };

    if (recEngineBtn) {
        recEngineBtn.addEventListener('click', () => {
            const selectedStyle = document.querySelector('.select-card[data-group="studio-style"].selected')?.dataset.value || 'modern';
            const report = recommendationReports[selectedStyle] || recommendationReports.modern;

            // Trigger loading visual before updating report details
            const reportContainer = document.querySelector('.report-card');
            if (reportContainer) {
                reportContainer.style.opacity = '0.3';
                setTimeout(() => {
                    reportContainer.style.opacity = '1';
                    
                    document.getElementById('report-wall').textContent = report.color;
                    document.getElementById('report-floor').textContent = report.floor;
                    document.getElementById('report-ceil').textContent = report.ceil;
                    document.getElementById('report-light').textContent = report.light;
                    document.getElementById('report-furn').textContent = report.furn;
                    document.getElementById('report-cost').textContent = report.est;
                    
                    alert('AI Design Recommendation Report generated! Values applied to preview ledger.');
                }, 600);
            }
        });
    }

    // Save project local trigger
    const saveBtn = document.getElementById('studio-save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const activeStyle = document.querySelector('.select-card[data-group="studio-style"].selected')?.dataset.value || 'modern';
            const activeCost = document.getElementById('bill-total').textContent;
            
            localStorage.setItem('value001_saved_design', JSON.stringify({
                style: activeStyle,
                cost: activeCost,
                timestamp: new Date().toLocaleDateString()
            }));
            
            alert('Luxury Room configuration saved to local user profile!');
        });
    }
});
