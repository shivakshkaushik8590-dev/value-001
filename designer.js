// ==========================================================================
// VALURE STUDIO - 3D Design Studio & Real-time Customizer
// Manages WebGL Three.js room rendering, orbit camera controls, lighting updates,
// design comparisons, screenshot downloads, URL shares, and dynamic INR estimator logic.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. SELECTORS & DOM ELEMENTS
    const canvasContainer = document.getElementById('threejs-canvas-container');
    const canvas = document.getElementById('threejs-canvas');
    const loaderOverlay = document.getElementById('render-loading-overlay');
    const workspaceView = document.getElementById('workspace-view');
    const dashboardView = document.getElementById('dashboard-view');

    // Cost summary nodes
    const estMaterial = document.getElementById('est-material-cost');
    const estLabor = document.getElementById('est-labor-cost');
    const estInstallation = document.getElementById('est-installation-cost');
    const estGrandTotal = document.getElementById('est-grand-total');
    const estTime = document.getElementById('est-completion-time');
    const ledgerRows = document.getElementById('estimator-ledger-rows');

    // Action buttons
    const btnCameraReset = document.getElementById('btn-camera-reset');
    const btnCompareToggle = document.getElementById('btn-compare-toggle');
    const btnSaveDesign = document.getElementById('btn-save-design');
    const btnShareDesign = document.getElementById('btn-share-design');
    const btnDownloadPreview = document.getElementById('btn-download-preview');
    const btnInstantQuote = document.getElementById('btn-instant-quote');
    const btnBookConsult = document.getElementById('btn-book-consultation');
    const btnRequestVisit = document.getElementById('btn-request-site-visit');
    const btnWhatsAppShare = document.getElementById('btn-whatsapp-share');

    // Inputs
    const roomCards = document.querySelectorAll('.select-card[data-group="room-type"]');
    const styleCards = document.querySelectorAll('.select-card[data-group="style"]');
    const swatchBtns = document.querySelectorAll('.swatch-btn[data-group="wall-color"]');
    const textureCards = document.querySelectorAll('.texture-card[data-group="wall-tex"]');
    const ceilingCards = document.querySelectorAll('.select-card[data-group="ceiling"]');
    const ledToggle = document.querySelector('.toggle-switch input[type="checkbox"]');
    const floorCards = document.querySelectorAll('.select-card[data-group="floor"]');
    const lightingCards = document.querySelectorAll('.select-card[data-group="lighting"]');
    const intensitySlider = document.getElementById('light-intensity');
    const tempSlider = document.getElementById('light-temp');
    const furnitureCards = document.querySelectorAll('.select-card[data-group="furniture"]');
    const fabColorBtns = document.querySelectorAll('.swatch-btn[data-group="fab-color"]');

    const decorPlants = document.getElementById('decor-plants');
    const decorArt = document.getElementById('decor-art');
    const decorRugs = document.getElementById('decor-rugs');
    const decorDoors = document.getElementById('decor-doors');

    // ==========================================================================
    // 2. DESIGN DATA & ESTIMATOR PRICES (INR)
    // ==========================================================================
    const pricingINR = {
        // Room Base Areas (Living: 225sqft, Bed: 180sqft, Kitchen: 140sqft, Office: 120sqft, Bath: 80sqft)
        roomArea: { living: 225, bedroom: 180, kitchen: 140, office: 120, bathroom: 80 },
        wallArea: { living: 480, bedroom: 400, kitchen: 320, office: 280, bathroom: 240 },
        
        // Flooring prices (INR per sqft)
        floor: { wood: 450, marble: 650, concrete: 220, tiles: 180, epoxy: 320 },
        
        // Wall finishes (INR per sqft)
        wall: { plaster: 85, 'wood-panels': 350, brick: 240 },
        wallColors: { '#f5f5f4': 0, '#e2e8f0': 0, '#0f172a': 15, '#1e293b': 15, '#f1ebd9': 25, '#e5e5e5': 10 },
        
        // Ceilings (INR per sqft)
        ceiling: { flat: 90, coffered: 320, beams: 260, molding: 180 },
        ledCove: 120, // per running ft
        
        // Lighting fixtures base price (INR per unit)
        lighting: { chandelier: 45000, recessed: 12000, sconces: 8500 },
        
        // Furniture package base cost (INR)
        furniture: { 'italian-modern': 180000, midcentury: 135000 },
        
        // Decor elements (INR)
        plants: 12000,
        art: 18000,
        rugs: 25000,
        doors: 45000
    };

    const completionTime = {
        living: "14 - 18 Days",
        bedroom: "10 - 12 Days",
        kitchen: "15 - 20 Days",
        office: "10 - 14 Days",
        bathroom: "12 - 15 Days"
    };

    // ==========================================================================
    // 3. THREE.JS 3D ENGINE INITIALIZATION
    // ==========================================================================
    let scene, camera, renderer, controls;
    let roomGroup, furnitureGroup, lightingGroup, decorGroup;
    let roomBeforeState = false; // Before/After Comparison state toggle

    // Current State Selection Cache
    let currentSettings = {
        roomType: 'living',
        style: 'minimalist',
        wallColor: '#f5f5f4',
        wallTex: 'plaster',
        ceilingStyle: 'flat',
        ledCove: true,
        floorMat: 'wood',
        lightSource: 'chandelier',
        lightIntensity: 75,
        lightTemp: 3000,
        furnitureStyle: 'italian-modern',
        fabColor: '#d2c5b3',
        decor: { plants: true, art: true, rugs: true, doors: true }
    };

    const init3DEngine = () => {
        if (!canvas) return;

        // Scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0e1629);

        // Camera
        camera = new THREE.PerspectiveCamera(45, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
        camera.position.set(12, 10, 15);

        // Renderer (with preserveDrawingBuffer to support screenshots)
        renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, preserveDrawingBuffer: true });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below floor
        controls.minDistance = 5;
        controls.maxDistance = 25;

        // Setup Groups
        roomGroup = new THREE.Group();
        furnitureGroup = new THREE.Group();
        lightingGroup = new THREE.Group();
        decorGroup = new THREE.Group();
        scene.add(roomGroup);
        scene.add(furnitureGroup);
        scene.add(lightingGroup);
        scene.add(decorGroup);

        // Basic Ambient Light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
        scene.add(ambientLight);

        // Build default room
        build3DRoom();

        // Start animation loop
        animate();

        // Trigger loader overlay fade out
        if (loaderOverlay) {
            setTimeout(() => {
                loaderOverlay.classList.remove('active');
            }, 1500);
        }
    };

    const animate = () => {
        requestAnimationFrame(animate);
        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
    };

    // Resize Handler
    window.addEventListener('resize', () => {
        if (!camera || !renderer || !canvasContainer) return;
        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
    });

    // ==========================================================================
    // 4. ROOM MESH BUILDERS
    // ==========================================================================
    const build3DRoom = () => {
        // Clear old meshes
        while(roomGroup.children.length > 0) roomGroup.remove(roomGroup.children[0]);
        while(lightingGroup.children.length > 0) lightingGroup.remove(lightingGroup.children[0]);

        // Room dimensions mapping
        const w = 10, h = 6, d = 10; // 3D units scale roughly (1 unit = 1.5 meters)

        // Materials setup
        const wallMatColor = roomBeforeState ? '#cccccc' : currentSettings.wallColor;
        const wallColorHex = parseInt(wallMatColor.replace('#', '0x'));
        
        const wallMaterial = new THREE.MeshStandardMaterial({
            color: wallColorHex,
            roughness: currentSettings.wallTex === 'brick' ? 0.8 : 0.5,
            metalness: 0.1
        });

        // FLOOR MESH
        let floorColor = 0xe2e8f0; // default concrete
        let floorRough = 0.5;
        let floorMetal = 0.1;

        if (!roomBeforeState) {
            if (currentSettings.floorMat === 'wood') {
                floorColor = 0x8b5a2b; // Oak Brown
                floorRough = 0.6;
            } else if (currentSettings.floorMat === 'marble') {
                floorColor = 0xf5f5f5; // White marble shiny
                floorRough = 0.08;
                floorMetal = 0.3;
            } else if (currentSettings.floorMat === 'tiles') {
                floorColor = 0xdcdcdc; // Light grey tile
                floorRough = 0.3;
            } else if (currentSettings.floorMat === 'epoxy') {
                floorColor = 0x0f172a; // Deep space navy gloss
                floorRough = 0.02;
                floorMetal = 0.6;
            }
        }

        const floorGeo = new THREE.PlaneGeometry(w, d);
        const floorMat = new THREE.MeshStandardMaterial({ color: floorColor, roughness: floorRough, metalness: floorMetal });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        roomGroup.add(floor);

        // BACK WALL MESH
        const wallBackGeo = new THREE.PlaneGeometry(w, h);
        const wallBack = new THREE.Mesh(wallBackGeo, wallMaterial);
        wallBack.position.set(0, h/2, -d/2);
        wallBack.receiveShadow = true;
        wallBack.castShadow = true;
        roomGroup.add(wallBack);

        // LEFT WALL MESH
        const wallLeftGeo = new THREE.PlaneGeometry(d, h);
        const wallLeft = new THREE.Mesh(wallLeftGeo, wallMaterial);
        wallLeft.rotation.y = Math.PI / 2;
        wallLeft.position.set(-w/2, h/2, 0);
        wallLeft.receiveShadow = true;
        roomGroup.add(wallLeft);

        // RIGHT WALL MESH (with Window Frame shape representation)
        const wallRightGeo = new THREE.PlaneGeometry(d, h);
        const wallRight = new THREE.Mesh(wallRightGeo, wallMaterial);
        wallRight.rotation.y = -Math.PI / 2;
        wallRight.position.set(w/2, h/2, 0);
        wallRight.receiveShadow = true;
        roomGroup.add(wallRight);

        // CEILING MESH
        const ceilGeo = new THREE.PlaneGeometry(w, d);
        const ceilMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
        const ceiling = new THREE.Mesh(ceilGeo, ceilMat);
        ceiling.rotation.x = Math.PI / 2;
        ceiling.position.set(0, h, 0);
        roomGroup.add(ceiling);

        // 3D Ceiling Structure custom elements
        if (!roomBeforeState) {
            if (currentSettings.ceilingStyle === 'beams') {
                // Parallel wood beams
                for (let i = -w/2 + 1.5; i < w/2; i += 2.5) {
                    const beamGeo = new THREE.BoxGeometry(0.3, 0.4, d);
                    const beamMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.7 });
                    const beam = new THREE.Mesh(beamGeo, beamMat);
                    beam.position.set(i, h - 0.2, 0);
                    roomGroup.add(beam);
                }
            } else if (currentSettings.ceilingStyle === 'coffered') {
                // Grid pattern of moldings
                for (let i = -w/2 + 2; i < w/2; i += 2) {
                    const beamGeoX = new THREE.BoxGeometry(0.15, 0.2, d);
                    const beamMatX = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
                    const beamX = new THREE.Mesh(beamGeoX, beamMatX);
                    beamX.position.set(i, h - 0.1, 0);
                    roomGroup.add(beamX);

                    const beamGeoZ = new THREE.BoxGeometry(w, 0.2, 0.15);
                    const beamZ = new THREE.Mesh(beamGeoZ, beamMatX);
                    beamZ.position.set(0, h - 0.1, i);
                    roomGroup.add(beamZ);
                }
            }
        }

        // Window Glass mockup representation
        const winGeo = new THREE.BoxGeometry(0.05, 2.5, 4);
        const winMat = new THREE.MeshStandardMaterial({ color: 0xbfdbfe, roughness: 0.05, metalness: 0.9, transparent: true, opacity: 0.6 });
        const windowPane = new THREE.Mesh(winGeo, winMat);
        windowPane.position.set(w/2 - 0.03, h/2, 0);
        roomGroup.add(windowPane);

        // Window Frame
        const frameGeo = new THREE.BoxGeometry(0.1, 2.6, 0.1);
        const frameMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
        const frameL = new THREE.Mesh(frameGeo, frameMat);
        frameL.position.set(w/2 - 0.02, h/2, -2);
        const frameR = frameL.clone();
        frameR.position.set(w/2 - 0.02, h/2, 2);
        roomGroup.add(frameL);
        roomGroup.add(frameR);

        // LIGHTING SOURCES
        buildRoomLights(w, h, d);

        // FURNITURE & DECOR
        buildRoomFurniture();
    };

    const buildRoomLights = (w, h, d) => {
        // Lights state
        const intensity = roomBeforeState ? 0.35 : currentSettings.lightIntensity / 100;
        
        // Color temperature approximation to Kelvin RGB hex
        let lightColor = 0xfff3e0; // warm white (3000K)
        if (currentSettings.lightTemp > 5000) {
            lightColor = 0xe0f7fa; // cool daylight (6000K)
        } else if (currentSettings.lightTemp < 2500) {
            lightColor = 0xffd180; // candle orange (2000K)
        }

        // Create Physical hanging fixture representation
        const fixtureGroup = new THREE.Group();
        
        if (!roomBeforeState && currentSettings.lightSource === 'chandelier') {
            // Hanging central rod
            const rodGeo = new THREE.CylinderGeometry(0.03, 0.03, 1.5);
            const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.8 });
            const rod = new THREE.Mesh(rodGeo, brassMat);
            rod.position.set(0, h - 0.75, 0);
            fixtureGroup.add(rod);

            // Ring/Sphere fixture
            const ringGeo = new THREE.TorusGeometry(1, 0.05, 8, 32);
            const ring = new THREE.Mesh(ringGeo, brassMat);
            ring.rotation.x = Math.PI / 2;
            ring.position.set(0, h - 1.5, 0);
            fixtureGroup.add(ring);

            // Main point light
            const light = new THREE.PointLight(lightColor, intensity * 2, 18);
            light.position.set(0, h - 1.5, 0);
            light.castShadow = true;
            light.shadow.bias = -0.005;
            lightingGroup.add(light);
            
            // Visual glowing spheres
            for(let a=0; a<Math.PI*2; a+=Math.PI/3) {
                const bulbGeo = new THREE.SphereGeometry(0.12, 16, 16);
                const bulbMat = new THREE.MeshBasicMaterial({ color: lightColor });
                const bulb = new THREE.Mesh(bulbGeo, bulbMat);
                bulb.position.set(Math.cos(a), h - 1.5, Math.sin(a));
                fixtureGroup.add(bulb);
            }
        } else {
            // Recessed ceiling spots or basic ambient light representation
            const light = new THREE.PointLight(lightColor, intensity * 1.5, 20);
            light.position.set(0, h - 1, 0);
            light.castShadow = true;
            lightingGroup.add(light);

            const spotGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.05);
            const spotMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
            const spot = new THREE.Mesh(spotGeo, spotMat);
            spot.position.set(0, h - 0.02, 0);
            fixtureGroup.add(spot);
        }

        // Cove LED ambient glowing strip simulation
        if (!roomBeforeState && currentSettings.ledCove) {
            const coveLight = new THREE.DirectionalLight(0xd4af37, 0.4);
            coveLight.position.set(0, h - 0.1, 0);
            lightingGroup.add(coveLight);
        }

        lightingGroup.add(fixtureGroup);
    };

    const buildRoomFurniture = () => {
        // Clear old furniture
        while(furnitureGroup.children.length > 0) furnitureGroup.remove(furnitureGroup.children[0]);
        while(decorGroup.children.length > 0) decorGroup.remove(decorGroup.children[0]);

        if (roomBeforeState) return; // Before comparison mode (empty room)

        // Upholstery/Fabric color
        const fabHex = parseInt(currentSettings.fabColor.replace('#', '0x'));
        const fabMat = new THREE.MeshStandardMaterial({ color: fabHex, roughness: 0.8 });

        const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.6 }); // legs/table wood

        // LIVING ROOM FURNITURE
        if (currentSettings.roomType === 'living') {
            // Sofa main seat block
            const sofaBaseGeo = new THREE.BoxGeometry(4.5, 0.4, 1.8);
            const base = new THREE.Mesh(sofaBaseGeo, fabMat);
            base.position.set(0, 0.4, -2.5);
            base.castShadow = true;
            base.receiveShadow = true;
            furnitureGroup.add(base);

            // Backrest cushions
            const sofaBackGeo = new THREE.BoxGeometry(4.5, 0.8, 0.4);
            const back = new THREE.Mesh(sofaBackGeo, fabMat);
            back.position.set(0, 1.0, -3.2);
            back.castShadow = true;
            furnitureGroup.add(back);

            // Coffee table slab
            const tableGeo = new THREE.BoxGeometry(2.5, 0.1, 1.4);
            const marbleTopMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6, roughness: 0.1, metalness: 0.2 });
            const table = new THREE.Mesh(tableGeo, marbleTopMat);
            table.position.set(0, 0.35, 0.2);
            table.castShadow = true;
            furnitureGroup.add(table);

            // Table legs (4 cylinders)
            const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.35);
            const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.2, metalness: 0.9 });
            const offsets = [[1.1, 0.6], [1.1, -0.6], [-1.1, 0.6], [-1.1, -0.6]];
            offsets.forEach(off => {
                const leg = new THREE.Mesh(legGeo, brassMat);
                leg.position.set(off[0], 0.175, 0.2 + off[1]);
                furnitureGroup.add(leg);
            });
        } 
        // BEDROOM FURNITURE
        else if (currentSettings.roomType === 'bedroom') {
            // Bed frame
            const bedBaseGeo = new THREE.BoxGeometry(3.6, 0.4, 4.4);
            const frameMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.6 });
            const bedBase = new THREE.Mesh(bedBaseGeo, frameMat);
            bedBase.position.set(0, 0.2, -2.2);
            bedBase.castShadow = true;
            furnitureGroup.add(bedBase);

            // Mattress
            const mattressGeo = new THREE.BoxGeometry(3.4, 0.5, 4.2);
            const sheetMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
            const mattress = new THREE.Mesh(mattressGeo, sheetMat);
            mattress.position.set(0, 0.65, -2.1);
            furnitureGroup.add(mattress);

            // Headboard
            const headboardGeo = new THREE.BoxGeometry(3.8, 1.6, 0.2);
            const headboard = new THREE.Mesh(headboardGeo, fabMat);
            headboard.position.set(0, 1.0, -4.3);
            headboard.castShadow = true;
            furnitureGroup.add(headboard);
        }
        // KITCHEN FURNITURE
        else if (currentSettings.roomType === 'kitchen') {
            // Kitchen Countertop cabinet base
            const counterGeo = new THREE.BoxGeometry(5.0, 0.8, 0.8);
            const cabMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
            const counter = new THREE.Mesh(counterGeo, cabMat);
            counter.position.set(0, 0.4, -4.6);
            counter.castShadow = true;
            furnitureGroup.add(counter);

            // Marble Top
            const topGeo = new THREE.BoxGeometry(5.1, 0.06, 0.85);
            const topMat = new THREE.MeshStandardMaterial({ color: 0xf9fafb, roughness: 0.05 });
            const top = new THREE.Mesh(topGeo, topMat);
            top.position.set(0, 0.83, -4.58);
            furnitureGroup.add(top);

            // High Island Counter
            const islandGeo = new THREE.BoxGeometry(3.0, 0.9, 1.0);
            const island = new THREE.Mesh(islandGeo, cabMat);
            island.position.set(0, 0.45, 0.5);
            island.castShadow = true;
            furnitureGroup.add(island);

            // Island Marble waterfall slab
            const waterfallGeo = new THREE.BoxGeometry(3.1, 0.96, 1.05);
            const waterfall = new THREE.Mesh(waterfallGeo, topMat);
            waterfall.position.set(0, 0.48, 0.5);
            furnitureGroup.add(waterfall);
        }
        // OFFICE FURNITURE
        else if (currentSettings.roomType === 'office') {
            // Executive Desk
            const deskGeo = new THREE.BoxGeometry(3.2, 0.8, 1.5);
            const deskMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, roughness: 0.4 });
            const desk = new THREE.Mesh(deskGeo, deskMat);
            desk.position.set(0, 0.4, -2.5);
            desk.castShadow = true;
            furnitureGroup.add(desk);

            // Office Chair
            const seatGeo = new THREE.BoxGeometry(0.8, 0.1, 0.8);
            const seat = new THREE.Mesh(seatGeo, fabMat);
            seat.position.set(0, 0.5, -1.0);
            seat.castShadow = true;
            furnitureGroup.add(seat);

            const seatLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), new THREE.MeshStandardMaterial({ color: 0x18181b }));
            seatLeg.position.set(0, 0.25, -1.0);
            furnitureGroup.add(seatLeg);
        }
        // BATHROOM FURNITURE
        else if (currentSettings.roomType === 'bathroom') {
            // Vanity Cabinet
            const vanGeo = new THREE.BoxGeometry(3.0, 0.7, 0.8);
            const vanMat = new THREE.MeshStandardMaterial({ color: 0x52525b, roughness: 0.6 });
            const van = new THREE.Mesh(vanGeo, vanMat);
            van.position.set(0, 0.35, -4.6);
            van.castShadow = true;
            furnitureGroup.add(van);

            // Vanity marble top
            const vanTop = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.05, 0.85), new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.05 }));
            vanTop.position.set(0, 0.725, -4.575);
            furnitureGroup.add(vanTop);

            // Standalone luxury bathtub
            const tubBase = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.7, 32), new THREE.MeshStandardMaterial({ color: 0xfcfcfc, roughness: 0.08 }));
            tubBase.position.set(0, 0.35, 1.0);
            tubBase.castShadow = true;
            furnitureGroup.add(tubBase);
        }

        // DECORATIVE OPTIONAL MESHES
        // Plants: Green sphere on pot
        if (currentSettings.decor.plants) {
            const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.18, 0.6, 16), woodMat);
            pot.position.set(4.0, 0.3, -4.0);
            pot.castShadow = true;
            decorGroup.add(pot);

            const foliage = new THREE.Mesh(new THREE.SphereGeometry(0.45, 16, 16), new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.9 }));
            foliage.position.set(4.0, 0.8, -4.0);
            foliage.castShadow = true;
            decorGroup.add(foliage);
        }

        // Rug: Flat canvas plane on floor
        if (currentSettings.decor.rugs) {
            const rugGeo = new THREE.PlaneGeometry(5.0, 4.0);
            const rugMat = new THREE.MeshStandardMaterial({ color: 0xe4e4e7, roughness: 0.9 });
            const rug = new THREE.Mesh(rugGeo, rugMat);
            rug.rotation.x = -Math.PI / 2;
            rug.position.set(0, 0.005, -0.5); // slightly above floor to prevent z-fighting
            rug.receiveShadow = true;
            decorGroup.add(rug);
        }

        // Framed Art on Back Wall
        if (currentSettings.decor.art) {
            const frameGeo = new THREE.BoxGeometry(1.6, 2.0, 0.04);
            const frameMat = new THREE.MeshStandardMaterial({ color: 0x18181b });
            const frame = new THREE.Mesh(frameGeo, frameMat);
            frame.position.set(-2.0, 3.5, -4.95);
            decorGroup.add(frame);

            // Canvas print face
            const canvasGeo = new THREE.PlaneGeometry(1.5, 1.9);
            const canvasMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.9 }); // gold print color
            const canvasFace = new THREE.Mesh(canvasGeo, canvasMat);
            canvasFace.position.set(-2.0, 3.5, -4.92);
            decorGroup.add(canvasFace);
        }
    };

    // ==========================================================================
    // 5. SMART COST ESTIMATOR ENGINE (INR BASED)
    // ==========================================================================
    const recalculateEstimates = () => {
        const type = currentSettings.roomType;
        
        // Quantities derived from selected room
        const floorArea = pricingINR.roomArea[type];
        const wallArea = pricingINR.wallArea[type];
        const runningFt = Math.sqrt(floorArea) * 4; // Perimeter approximate

        // 1. Flooring Calculations
        const floorRate = pricingINR.floor[currentSettings.floorMat];
        const floorCost = floorArea * floorRate;

        // 2. Wall Paint & Materials
        const wallRate = pricingINR.wall[currentSettings.wallTex];
        const colorSurcharge = pricingINR.wallColors[currentSettings.wallColor] || 0;
        const wallCost = wallArea * (wallRate + colorSurcharge);

        // 3. Ceiling Cost
        const ceilRate = pricingINR.ceiling[currentSettings.ceilingStyle];
        const ledSurcharge = currentSettings.ledCove ? runningFt * pricingINR.ledCove : 0;
        const ceilingCost = (floorArea * ceilRate) + ledSurcharge;

        // 4. Lighting Cost
        const lightRate = pricingINR.lighting[currentSettings.lightSource];
        const lightingCost = lightRate; // standard room package cost

        // 5. Furniture Package
        const furnitureCost = currentSettings.roomType === 'bathroom' ? 120000 : pricingINR.furniture[currentSettings.furnitureStyle];

        // 6. Accessories & Decor Surcharges
        let decorCost = 0;
        if (currentSettings.decor.plants) decorCost += pricingINR.plants;
        if (currentSettings.decor.art) decorCost += pricingINR.art;
        if (currentSettings.decor.rugs) decorCost += pricingINR.rugs;
        if (currentSettings.decor.doors) decorCost += pricingINR.doors;

        // Math totals
        const materialsSubtotal = floorCost + wallCost + ceilingCost + lightingCost + furnitureCost + decorCost;
        const laborCost = materialsSubtotal * 0.20; // 20% local labor fee
        const installCost = materialsSubtotal * 0.10; // 10% installation fee
        const grandTotal = materialsSubtotal + laborCost + installCost;

        // Update ledger fields in DOM
        if (estMaterial) estMaterial.textContent = `₹${Math.round(materialsSubtotal).toLocaleString('en-IN')}`;
        if (estLabor) estLabor.textContent = `₹${Math.round(laborCost).toLocaleString('en-IN')}`;
        if (estInstallation) estInstallation.textContent = `₹${Math.round(installCost).toLocaleString('en-IN')}`;
        if (estGrandTotal) estGrandTotal.textContent = `₹${Math.round(grandTotal).toLocaleString('en-IN')}`;
        if (estTime) estTime.textContent = completionTime[type] || "12 - 15 Days";

        // Update individual item breakdown rows
        if (ledgerRows) {
            ledgerRows.innerHTML = `
                <tr>
                    <td><strong>Flooring Finish</strong></td>
                    <td>${currentSettings.floorMat.toUpperCase()} (${currentSettings.floorMat === 'wood' ? 'European Oak' : 'Premium Finish'})</td>
                    <td>${floorArea} Sq. Ft.</td>
                    <td class="item-cost">₹${Math.round(floorCost).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                    <td><strong>Wall Finish & Paint</strong></td>
                    <td>${currentSettings.wallTex.toUpperCase()} backdrop in Alabaster/Mist</td>
                    <td>${wallArea} Sq. Ft.</td>
                    <td class="item-cost">₹${Math.round(wallCost).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                    <td><strong>Ceiling & LED Cove</strong></td>
                    <td>${currentSettings.ceilingStyle.toUpperCase()} design ${currentSettings.ledCove ? '+ LED Strip' : ''}</td>
                    <td>${floorArea} Sq. Ft.</td>
                    <td class="item-cost">₹${Math.round(ceilingCost).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                    <td><strong>Lighting Fixtures</strong></td>
                    <td>Central ${currentSettings.lightSource.toUpperCase()} lighting layout</td>
                    <td>1 Room Set</td>
                    <td class="item-cost">₹${Math.round(lightingCost).toLocaleString('en-IN')}</td>
                </tr>
                <tr>
                    <td><strong>Designer Furniture package</strong></td>
                    <td>Premium luxury upholstered modular layout</td>
                    <td>Complete Set</td>
                    <td class="item-cost">₹${Math.round(furnitureCost).toLocaleString('en-IN')}</td>
                </tr>
                ${decorCost > 0 ? `
                <tr>
                    <td><strong>Bespoke Decoration & Rugs</strong></td>
                    <td>Curated plants, abstract wall art frames, and plush mats</td>
                    <td>Assorted Package</td>
                    <td class="item-cost">₹${Math.round(decorCost).toLocaleString('en-IN')}</td>
                </tr>
                ` : ''}
            `;
        }

        // WhatsApp Share link update
        if (btnWhatsAppShare) {
            const message = `Hi Valure Studio, I customized my ${type} on the 3D Design Studio. Selected ${currentSettings.floorMat} floor, ${currentSettings.wallTex} wall, and ${currentSettings.ceilingStyle} ceiling. Estimated project quote: ₹${Math.round(grandTotal).toLocaleString('en-IN')}. Please contact me.`;
            btnWhatsAppShare.href = `https://wa.me/917454853045?text=${encodeURIComponent(message)}`;
        }
    };

    // ==========================================================================
    // 6. UI WORKFLOW CONTROLS & BINDINGS
    // ==========================================================================
    const registerUIEvents = () => {
        // Room type select cards
        roomCards.forEach(card => {
            card.addEventListener('click', () => {
                roomCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSettings.roomType = card.dataset.value;
                
                triggerVisualUpdate();
            });
        });

        // Archetype styles cards
        styleCards.forEach(card => {
            card.addEventListener('click', () => {
                styleCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSettings.style = card.dataset.value;
                // Update textures or colors accordingly if needed
            });
        });

        // Paint color swatches
        swatchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                swatchBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                currentSettings.wallColor = btn.title.toLowerCase().includes('blue') ? '#1e293b' : btn.title.toLowerCase().includes('gold') ? '#f1ebd9' : btn.title.toLowerCase().includes('concrete') ? '#e5e5e5' : '#f5f5f4';
                
                build3DRoom();
                recalculateEstimates();
            });
        });

        // Wall panel texture cards
        textureCards.forEach(card => {
            card.addEventListener('click', () => {
                textureCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSettings.wallTex = card.dataset.value;

                build3DRoom();
                recalculateEstimates();
            });
        });

        // Ceiling styles
        ceilingCards.forEach(card => {
            card.addEventListener('click', () => {
                ceilingCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSettings.ceilingStyle = card.dataset.value;

                build3DRoom();
                recalculateEstimates();
            });
        });

        // LED toggle
        if (ledToggle) {
            ledToggle.addEventListener('change', (e) => {
                currentSettings.ledCove = e.target.checked;
                build3DRoom();
                recalculateEstimates();
            });
        }

        // Floor material cards
        floorCards.forEach(card => {
            card.addEventListener('click', () => {
                floorCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSettings.floorMat = card.dataset.value;

                build3DRoom();
                recalculateEstimates();
            });
        });

        // Lighting types
        lightingCards.forEach(card => {
            card.addEventListener('click', () => {
                lightingCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSettings.lightSource = card.dataset.value;

                build3DRoom();
                recalculateEstimates();
            });
        });

        // Intensity and Temp sliders
        if (intensitySlider) {
            intensitySlider.addEventListener('input', (e) => {
                currentSettings.lightIntensity = parseInt(e.target.value);
                build3DRoom();
            });
        }
        if (tempSlider) {
            tempSlider.addEventListener('input', (e) => {
                currentSettings.lightTemp = parseInt(e.target.value);
                build3DRoom();
            });
        }

        // Furniture Styles
        furnitureCards.forEach(card => {
            card.addEventListener('click', () => {
                furnitureCards.forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                currentSettings.furnitureStyle = card.dataset.value;

                build3DRoom();
                recalculateEstimates();
            });
        });

        // Fabric color swatches
        fabColorBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                fabColorBtns.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                currentSettings.fabColor = btn.title.toLowerCase().includes('beige') ? '#d2c5b3' : btn.title.toLowerCase().includes('forest') ? '#3b4e43' : btn.title.toLowerCase().includes('royal') ? '#2b394a' : '#ffffff';

                build3DRoom();
                recalculateEstimates();
            });
        });

        // Decoration checkboxes
        const bindDecor = (el, prop) => {
            if (el) {
                el.addEventListener('change', (e) => {
                    currentSettings.decor[prop] = e.target.checked;
                    build3DRoom();
                    recalculateEstimates();
                });
            }
        };
        bindDecor(decorPlants, 'plants');
        bindDecor(decorArt, 'art');
        bindDecor(decorRugs, 'rugs');
        bindDecor(decorDoors, 'doors');

        // Reset visual visualizer button
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                currentSettings = {
                    roomType: 'living',
                    style: 'minimalist',
                    wallColor: '#f5f5f4',
                    wallTex: 'plaster',
                    ceilingStyle: 'flat',
                    ledCove: true,
                    floorMat: 'wood',
                    lightSource: 'chandelier',
                    lightIntensity: 75,
                    lightTemp: 3000,
                    furnitureStyle: 'italian-modern',
                    fabColor: '#d2c5b3',
                    decor: { plants: true, art: true, rugs: true, doors: true }
                };
                // Sync elements
                syncFormInputsToState();
                triggerVisualUpdate();
                alert('3D Design Studio sandbox has been reset!');
            });
        }

        // Camera Reset
        if (btnCameraReset) {
            btnCameraReset.addEventListener('click', () => {
                if (camera && controls) {
                    camera.position.set(12, 10, 15);
                    controls.target.set(0, 0, 0);
                    controls.update();
                }
            });
        }

        // Before / After scene toggle
        if (btnCompareToggle) {
            btnCompareToggle.addEventListener('click', () => {
                roomBeforeState = !roomBeforeState;
                if (roomBeforeState) {
                    btnCompareToggle.classList.add('active');
                    btnCompareToggle.style.background = 'var(--accent-gold)';
                    btnCompareToggle.style.color = 'var(--primary-blue)';
                    alert('Showing Before state: plain concrete floor and empty walls.');
                } else {
                    btnCompareToggle.classList.remove('active');
                    btnCompareToggle.style.background = '';
                    btnCompareToggle.style.color = '';
                    alert('Restored After state: showing fully customized luxury layout.');
                }
                build3DRoom();
            });
        }

        // Download PNG screenshot
        if (btnDownloadPreview) {
            btnDownloadPreview.addEventListener('click', () => {
                if (renderer && scene && camera) {
                    // Force render to ensure preserveDrawingBuffer is updated
                    renderer.render(scene, camera);
                    const dataURL = renderer.domElement.toDataURL('image/png');
                    const link = document.createElement('a');
                    link.download = `valure_design_${currentSettings.roomType}.png`;
                    link.href = dataURL;
                    link.click();
                    alert('3D render screen saved to your local downloads folder!');
                }
            });
        }

        // Save Design local preset
        if (btnSaveDesign) {
            btnSaveDesign.addEventListener('click', () => {
                localStorage.setItem('valure_saved_studio_design', JSON.stringify(currentSettings));
                alert('Design settings saved to LocalStorage! You can restore them anytime.');
            });
        }

        // Share Design link copy
        if (btnShareDesign) {
            btnShareDesign.addEventListener('click', () => {
                const query = `?room=${currentSettings.roomType}&floor=${currentSettings.floorMat}&wall=${currentSettings.wallTex}&ceiling=${currentSettings.ceilingStyle}`;
                const shareURL = window.location.origin + window.location.pathname + query;
                
                navigator.clipboard.writeText(shareURL).then(() => {
                    alert('Shareable design studio configuration link copied to clipboard!');
                }).catch(() => {
                    alert('Copy failed. Share URL: ' + shareURL);
                });
            });
        }

        // Book Consultation / Visit triggers
        const triggerQuotePrompt = (actionName) => {
            const name = prompt("Enter your Name for the " + actionName + " request:");
            const phone = prompt("Enter your Contact Phone Number:");
            if (name && phone) {
                alert("Thank you " + name + "! We received your " + actionName + " request. Sourcing team will call you back within 2 hours at " + phone + ".");
            }
        };

        if (btnBookConsult) btnBookConsult.addEventListener('click', () => triggerQuotePrompt('Free Sourcing Consultation'));
        if (btnRequestVisit) btnRequestVisit.addEventListener('click', () => triggerQuotePrompt('Site Measurements Visit'));
        if (btnInstantQuote) btnInstantQuote.addEventListener('click', () => triggerQuotePrompt('Instant Estimate Invoice Sourcing'));

        // Dashboard overlay switcher
        const startProjectBtn = document.getElementById('start-project-btn');
        const startBannerBtn = document.getElementById('start-project-banner-btn');
        
        const showWorkspace = () => {
            if (dashboardView && workspaceView) {
                dashboardView.classList.add('hidden');
                workspaceView.classList.remove('hidden');
                setTimeout(() => {
                    // Force canvas container layout
                    if (camera && renderer) {
                        camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
                        camera.updateProjectionMatrix();
                        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
                    }
                }, 100);
            }
        };

        if (startProjectBtn) startProjectBtn.addEventListener('click', showWorkspace);
        if (startBannerBtn) startBannerBtn.addEventListener('click', showWorkspace);
    };

    const triggerVisualUpdate = () => {
        if (loaderOverlay) {
            loaderOverlay.classList.add('active');
            setTimeout(() => {
                loaderOverlay.classList.remove('active');
                build3DRoom();
                recalculateEstimates();
            }, 800);
        } else {
            build3DRoom();
            recalculateEstimates();
        }
    };

    const syncFormInputsToState = () => {
        // Sync selects back
        const syncSelect = (group, val) => {
            const cards = document.querySelectorAll(`.select-card[data-group="${group}"]`);
            cards.forEach(c => c.classList.toggle('selected', c.dataset.value === val));
        };
        syncSelect('room-type', currentSettings.roomType);
        syncSelect('floor', currentSettings.floorMat);
        syncSelect('ceiling', currentSettings.ceilingStyle);
        syncSelect('lighting', currentSettings.lightSource);
        syncSelect('furniture', currentSettings.furnitureStyle);

        if (ledToggle) ledToggle.checked = currentSettings.ledCove;
        if (decorPlants) decorPlants.checked = currentSettings.decor.plants;
        if (decorArt) decorArt.checked = currentSettings.decor.art;
        if (decorRugs) decorRugs.checked = currentSettings.decor.rugs;
        if (decorDoors) decorDoors.checked = currentSettings.decor.doors;
    };

    // Load presets from URL parameters if present
    const loadUrlPresets = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const roomPreset = urlParams.get('room');
        const floorPreset = urlParams.get('floor');
        const wallPreset = urlParams.get('wall');
        const ceilingPreset = urlParams.get('ceiling');

        if (roomPreset) currentSettings.roomType = roomPreset;
        if (floorPreset) currentSettings.floorMat = floorPreset;
        if (wallPreset) currentSettings.wallTex = wallPreset;
        if (ceilingPreset) currentSettings.ceilingStyle = ceilingPreset;

        syncFormInputsToState();
    };

    // InitializeVisuals
    loadUrlPresets();
    init3DEngine();
    registerUIEvents();
    recalculateEstimates();

    // Auto-enter workspace directly if presets are loaded
    if (window.location.search.includes('room') && dashboardView && workspaceView) {
        dashboardView.classList.add('hidden');
        workspaceView.classList.remove('hidden');
    }
});
