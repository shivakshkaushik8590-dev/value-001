// ==========================================================================
// VALURE STUDIO - Global Interactions & Animations Controller
// Manages safe Navbar effects, custom luxury cursor, GSAP scroll reveals,
// and the Three.js 3D Hero Section marble visualizer.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // 1. SAFE CORE INTERFACE ACTIONS
    // ==========================================================================
    
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeMenu && mobileMenu) {
        closeMenu.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (mobileLinks.length > 0 && mobileMenu) {
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefVal = this.getAttribute('href');
            if (hrefVal === '#') return;
            e.preventDefault();
            const target = document.querySelector(hrefVal);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if (scrollHeight > 0) {
            const scrollPct = (window.scrollY / scrollHeight) * 100;
            progressBar.style.width = `${scrollPct}%`;
        }
    });

    // Back to Top Button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mobile Sticky Call Button
    const mobileCallBtn = document.createElement('a');
    mobileCallBtn.className = 'sticky-call-btn';
    mobileCallBtn.href = 'tel:+917454853045';
    mobileCallBtn.setAttribute('aria-label', 'Call us');
    mobileCallBtn.innerHTML = '<i class="fas fa-phone-alt"></i>';
    document.body.appendChild(mobileCallBtn);

    // Authentication Modal
    const authModal = document.getElementById('auth-modal');
    const loginTrigger = document.getElementById('login-trigger');
    const closeModal = document.getElementById('close-modal');
    const authTabs = document.querySelectorAll('.auth-tab-btn');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const adminLink = document.getElementById('admin-link');

    if (loginTrigger && authModal) {
        loginTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closeModal && authModal) {
        closeModal.addEventListener('click', () => {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    if (authTabs.length > 0 && loginForm && signupForm) {
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                const tabName = tab.dataset.tab;
                if (tabName === 'login') {
                    loginForm.style.display = 'block';
                    signupForm.style.display = 'none';
                } else {
                    loginForm.style.display = 'none';
                    signupForm.style.display = 'block';
                }
            });
        });
    }

    if (loginForm && authModal) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const btn = loginForm.querySelector('button');

            btn.textContent = 'Authenticating...';
            btn.disabled = true;

            setTimeout(() => {
                const isAdmin = email.toLowerCase().includes('admin');
                if (isAdmin && adminLink) {
                    adminLink.style.display = 'inline-flex';
                }
                if (loginTrigger) {
                    loginTrigger.textContent = isAdmin ? 'Logged In (Admin)' : 'Logged In';
                }

                authModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                btn.textContent = 'Login to Portal';
                btn.disabled = false;
                
                if (isAdmin) {
                    sessionStorage.setItem('valure_user', 'admin');
                    alert('Admin authentication successful! Access CRM from the top portal button.');
                    window.location.href = 'admin.html';
                } else {
                    sessionStorage.setItem('valure_user', 'partner');
                    alert('Partner authentication successful!');
                }
            }, 1000);
        });
    }

    if (authModal) {
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(q => {
            q.addEventListener('click', () => {
                const item = q.parentElement;
                const isActive = item.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // Cookie Consent Banner
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    if (cookieBanner) {
        const choice = localStorage.getItem('valure_cookies_consent');
        if (!choice) {
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 2500);
        }

        if (acceptCookiesBtn) {
            acceptCookiesBtn.addEventListener('click', () => {
                localStorage.setItem('valure_cookies_consent', 'accepted');
                cookieBanner.classList.remove('active');
            });
        }
        if (declineCookiesBtn) {
            declineCookiesBtn.addEventListener('click', () => {
                localStorage.setItem('valure_cookies_consent', 'declined');
                cookieBanner.classList.remove('active');
            });
        }
    }

    // ==========================================================================
    // 2. CUSTOM LUXURY CURSOR WITH INTERTIAL DAMPING
    // ==========================================================================
    const isDesktop = window.matchMedia('(pointer: fine)').matches;
    if (isDesktop) {
        const cursor = document.createElement('div');
        cursor.className = 'luxury-cursor';
        const cursorOutline = document.createElement('div');
        cursorOutline.className = 'luxury-cursor-outline';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorOutline);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Fast damping for internal dot, slow damping for outer circle
        const tick = () => {
            const dotDamp = 0.25;
            const outlineDamp = 0.12;

            cursorX += (mouseX - cursorX) * dotDamp;
            cursorY += (mouseY - cursorY) * dotDamp;
            outlineX += (mouseX - outlineX) * outlineDamp;
            outlineY += (mouseY - outlineY) * outlineDamp;

            cursor.style.left = `${cursorX}px`;
            cursor.style.top = `${cursorY}px`;
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;

            requestAnimationFrame(tick);
        };
        tick();

        // Mouse hover expansions
        const hoverables = 'a, button, select, input, textarea, .product-card, .marble-cat-card, .drag-item, .slot-chip, .swatch-btn, .texture-card, .close-modal, [role="button"]';
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest(hoverables)) {
                cursor.classList.add('hover');
                cursorOutline.classList.add('hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.closest(hoverables)) {
                cursor.classList.remove('hover');
                cursorOutline.classList.remove('hover');
            }
        });
    }

    // ==========================================================================
    // 3. THREE.JS HERO 3D MARBLE EXPERIENCE
    // ==========================================================================
    const canvasContainer = document.getElementById('hero-3d-canvas');
    if (canvasContainer && typeof THREE !== 'undefined') {
        
        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, canvasContainer.clientWidth / canvasContainer.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 8);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        canvasContainer.appendChild(renderer.domElement);

        // Ambient and Directional Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
        scene.add(ambientLight);

        const sunLight = new THREE.DirectionalLight(0xfff8ee, 1.4);
        sunLight.position.set(5, 8, 4);
        sunLight.castShadow = true;
        sunLight.shadow.mapSize.width = 1024;
        sunLight.shadow.mapSize.height = 1024;
        scene.add(sunLight);

        const fillLight = new THREE.DirectionalLight(0xdbeeff, 0.5);
        fillLight.position.set(-5, -3, 2);
        scene.add(fillLight);

        // Core 3D Luxury Marble Block / Slab
        const slabWidth = 3.6;
        const slabHeight = 2.4;
        const slabThickness = 0.18;
        const slabGeo = new THREE.BoxGeometry(slabWidth, slabHeight, slabThickness);
        
        // Shiny, luxury reflective material base
        const slabMaterial = new THREE.MeshStandardMaterial({
            roughness: 0.08,
            metalness: 0.15,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05
        });

        // Procedural High-End Calacatta Marble Fallback Texture Generator
        const createProceduralMarble = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 1024;
            canvas.height = 1024;
            const ctx = canvas.getContext('2d');

            // Off-white luxury slab background
            ctx.fillStyle = '#faf9f6';
            ctx.fillRect(0, 0, 1024, 1024);

            // Grey veins
            ctx.strokeStyle = 'rgba(120, 130, 150, 0.15)';
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            for (let i = 0; i < 8; i++) {
                ctx.beginPath();
                ctx.lineWidth = Math.random() * 8 + 3;
                let x = Math.random() * 1024;
                let y = Math.random() * 1024;
                ctx.moveTo(x, y);
                for (let j = 0; j < 6; j++) {
                    x += (Math.random() - 0.5) * 200;
                    y += (Math.random() - 0.2) * 200;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            // Elegant Thin Gold Lines
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.lineWidth = Math.random() * 3 + 1.5;
                let x = Math.random() * 1024;
                let y = Math.random() * 1024;
                ctx.moveTo(x, y);
                for (let j = 0; j < 5; j++) {
                    x += (Math.random() - 0.5) * 180;
                    y += (Math.random() - 0.25) * 180;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }

            return new THREE.CanvasTexture(canvas);
        };

        // Try load actual Calacatta png asset, fallback to procedural under local file:// restrictions
        const textureLoader = new THREE.TextureLoader();
        try {
            textureLoader.load(
                'assets/images/calacatta_gold.png',
                (texture) => {
                    slabMaterial.map = texture;
                    slabMaterial.needsUpdate = true;
                },
                undefined,
                () => {
                    slabMaterial.map = createProceduralMarble();
                    slabMaterial.needsUpdate = true;
                }
            );
        } catch (e) {
            slabMaterial.map = createProceduralMarble();
            slabMaterial.needsUpdate = true;
        }

        const marbleSlab = new THREE.Mesh(slabGeo, slabMaterial);
        marbleSlab.castShadow = true;
        marbleSlab.receiveShadow = true;
        scene.add(marbleSlab);

        // Thin Gold Frame Outline around the Marble Block
        const borderGeo = new THREE.BoxGeometry(slabWidth + 0.05, slabHeight + 0.05, slabThickness + 0.01);
        const borderMat = new THREE.MeshStandardMaterial({
            color: 0xd4af37,
            metalness: 0.95,
            roughness: 0.12
        });
        const borderMesh = new THREE.Mesh(borderGeo, borderMat);
        borderMesh.position.z = -0.01;
        marbleSlab.add(borderMesh);

        // Floating Luxury Gold Dust Particles
        const particleCount = 180;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const velocities = [];

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
            velocities.push({
                x: (Math.random() - 0.5) * 0.003,
                y: Math.random() * 0.002 + 0.001,
                z: (Math.random() - 0.5) * 0.002
            });
        }

        particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xd4af37,
            size: 0.045,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particleGeo, particleMat);
        scene.add(particleSystem);

        // Mouse Parallax Targets
        let targetX = 0, targetY = 0;
        let currentMouseX = 0, currentMouseY = 0;

        window.addEventListener('mousemove', (e) => {
            currentMouseX = (e.clientX / window.innerWidth) * 2 - 1;
            currentMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        // 3D Render Loop
        const clock = new THREE.Clock();
        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Auto-rotate the marble slab
            marbleSlab.rotation.y = Math.sin(elapsedTime * 0.25) * 0.35;
            marbleSlab.rotation.x = Math.cos(elapsedTime * 0.15) * 0.15;

            // Apply smooth mouse parallax (inertial interpolation)
            targetX += (currentMouseX - targetX) * 0.05;
            targetY += (currentMouseY - targetY) * 0.05;

            marbleSlab.rotation.y += targetX * 0.25;
            marbleSlab.rotation.x -= targetY * 0.15;

            // Animate Gold Dust Particles
            const posArr = particleGeo.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                posArr[i * 3] += velocities[i].x;
                posArr[i * 3 + 1] += velocities[i].y;
                posArr[i * 3 + 2] += velocities[i].z;

                // Reset position if drifting off screen
                if (posArr[i * 3 + 1] > 4) {
                    posArr[i * 3 + 1] = -4;
                    posArr[i * 3] = (Math.random() - 0.5) * 10;
                }
            }
            particleGeo.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };
        animate();

        // Responsive resize correction
        window.addEventListener('resize', () => {
            camera.aspect = canvasContainer.clientWidth / canvasContainer.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(canvasContainer.clientWidth, canvasContainer.clientHeight);
        });
    }

    // ==========================================================================
    // 4. GSAP CINEMATIC SCROLL REVEALS
    // ==========================================================================
    if (typeof gsap !== 'undefined') {
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        // Letter-by-letter header reveal for main hero title
        const heroTitle = document.querySelector('.hero h1');
        if (heroTitle) {
            const textContent = heroTitle.textContent;
            heroTitle.innerHTML = textContent.split('').map(char => {
                if (char === ' ') return '&nbsp;';
                return `<span class="letter" style="display:inline-block; opacity:0; transform:translateY(30px);">${char}</span>`;
            }).join('');

            gsap.to('.hero h1 .letter', {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.03,
                ease: "power3.out",
                delay: 0.4
            });
        }

        // Sequential fade-in of Hero Badge, subtitle paragraph, and CTA buttons
        gsap.from('.hero .badge', { opacity: 0, y: -20, duration: 0.8, ease: "power2.out" });
        gsap.from('.hero p', { opacity: 0, y: 20, duration: 1.0, ease: "power2.out", delay: 0.8 });
        gsap.from('.hero-btns a', { opacity: 0, scale: 0.9, duration: 0.8, ease: "back.out(1.7)", stagger: 0.15, delay: 1.2 });

        // Scroll reveals for section titles
        const sectionHeaders = document.querySelectorAll('.section-header');
        sectionHeaders.forEach(header => {
            gsap.from(header, {
                scrollTrigger: {
                    trigger: header,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1.0,
                ease: "power3.out"
            });
        });

        // Stagger grid reveal for Achievement elements
        const achievementGrid = document.querySelector('.achievements-grid');
        if (achievementGrid) {
            gsap.from('.achievement-item', {
                scrollTrigger: {
                    trigger: achievementGrid,
                    start: "top 80%"
                },
                opacity: 0,
                scale: 0.9,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }

        // Stagger grid reveal for Product Cards
        const featuredGrid = document.getElementById('featured-products');
        if (featuredGrid) {
            ScrollTrigger.create({
                trigger: featuredGrid,
                start: "top 80%",
                onEnter: () => {
                    gsap.from('.product-card', {
                        opacity: 0,
                        y: 40,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out"
                    });
                }
            });
        }

        // Parallax scroll reveals for Why Us cards
        const whyGrid = document.querySelector('.why-us-grid');
        if (whyGrid) {
            gsap.from('.why-card', {
                scrollTrigger: {
                    trigger: whyGrid,
                    start: "top 80%"
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.12,
                ease: "power2.out"
            });
        }
    }
});
