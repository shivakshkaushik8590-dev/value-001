document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto'; // Enable scrolling
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    revealElements.forEach(el => revealObserver.observe(el));

    // Smooth Scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Parallax Effect (Simple)
    const heroImg = document.querySelector('.hero-background img');
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        if (heroImg) {
            heroImg.style.transform = `scale(${1 + scrollValue * 0.0005}) translateY(${scrollValue * 0.2}px)`;
        }
    });

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show basic success feedback
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Sending...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.textContent = 'Inquiry Sent Successfully!';
                btn.style.backgroundColor = '#10b981'; // Success green
                contactForm.reset();
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Chatbot Toggle Logic
    const chatTrigger = document.getElementById('chat-trigger');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const contactChatLink = document.getElementById('contact-chat-link');

    if (chatTrigger && chatWindow && closeChat) {
        const toggleChat = () => {
            chatWindow.classList.toggle('active');
            const pulse = chatTrigger.querySelector('.chat-pulse');
            if (pulse) pulse.style.display = 'none';
        };

        chatTrigger.addEventListener('click', toggleChat);

        if (contactChatLink) {
            contactChatLink.addEventListener('click', (e) => {
                e.preventDefault();
                chatWindow.classList.add('active');
            });
        }

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && chatWindow.classList.contains('active')) {
                chatWindow.classList.remove('active');
            }
        });
    }

    // ==========================================================================
    // AUTHENTICATION MODAL LOGIC
    // ==========================================================================
    const authModal = document.getElementById('auth-modal');
    const loginTrigger = document.getElementById('login-trigger');
    const closeModal = document.getElementById('close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const adminLink = document.getElementById('admin-link');

    if (loginTrigger && authModal && closeModal) {
        loginTrigger.addEventListener('click', () => {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        closeModal.addEventListener('click', () => {
            authModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        // Tab Switching
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                authTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                if (tab.dataset.tab === 'login') {
                    loginForm.style.display = 'block';
                    signupForm.style.display = 'none';
                } else {
                    loginForm.style.display = 'none';
                    signupForm.style.display = 'block';
                }
            });
        });

        // Login Simulation
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
                loginTrigger.textContent = isAdmin ? 'Logged In (Admin)' : 'Logged In';

                authModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                btn.textContent = 'Login';
                btn.disabled = false;

                alert('Authentication successful! ' + (isAdmin ? 'Admin privileges granted.' : ''));
            }, 1000);
        });

        // Close on outside click
        window.addEventListener('click', (e) => {
            if (e.target === authModal) {
                authModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ==========================================================================
    // FLOATING COOKIE CONSENT BANNER
    // ==========================================================================
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const declineCookiesBtn = document.getElementById('decline-cookies');

    if (cookieBanner) {
        const cookieChoice = localStorage.getItem('valure_cookies_consent');
        if (!cookieChoice) {
            setTimeout(() => {
                cookieBanner.classList.add('active');
            }, 2000);
        }

        if (acceptCookiesBtn) acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('valure_cookies_consent', 'accepted');
            cookieBanner.classList.remove('active');
        });

        if (declineCookiesBtn) declineCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('valure_cookies_consent', 'declined');
            cookieBanner.classList.remove('active');
        });
    }

    // ==========================================================================
    // PRIVACY, TERMS, & COOKIE MODALS LOGIC
    // ==========================================================================
    const modalTriggerBindings = [
        { triggerId: 'privacy-link', modalId: 'privacy-modal', closeBtnId: 'close-privacy-modal' },
        { triggerId: 'terms-link', modalId: 'terms-modal', closeBtnId: 'close-terms-modal' },
        { triggerId: 'cookie-policy-link', modalId: 'cookie-policy-modal', closeBtnId: 'close-cookie-policy-modal' },
        { triggerId: 'cookie-policy-banner-link', modalId: 'cookie-policy-modal', closeBtnId: 'close-cookie-policy-modal' }
    ];

    modalTriggerBindings.forEach(binding => {
        const trigger = document.getElementById(binding.triggerId);
        const modal = document.getElementById(binding.modalId);
        const closeIcon = document.getElementById(binding.closeBtnId);

        if (trigger && modal) {
            const openM = (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            };
            const closeM = () => {
                modal.classList.remove('active');
                if (!document.querySelector('.modal.active')) {
                    document.body.style.overflow = 'auto';
                }
            };

            trigger.addEventListener('click', openM);
            if (closeIcon) closeIcon.addEventListener('click', closeM);

            const closeBtn = modal.querySelector('.close-modal-btn');
            if (closeBtn) closeBtn.addEventListener('click', closeM);

            window.addEventListener('click', (e) => {
                if (e.target === modal) closeM();
            });
        }
    });

    // ==========================================================================
    // FAQ ACCORDION INTERACTION
    // ==========================================================================
    const faqQuestions = document.querySelectorAll('.faq-question');
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

    // ==========================================================================
    // STYLE ARCHETYPE QUIZ WORKFLOW
    // ==========================================================================
    const openQuizBtn = document.getElementById('open-quiz-btn');
    const quizModal = document.getElementById('quiz-modal');
    const closeQuizModal = document.getElementById('close-quiz-modal');
    const quizSteps = document.querySelectorAll('.quiz-step');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizNextBtn = document.getElementById('quiz-next-btn');
    const quizBackBtn = document.getElementById('quiz-back-btn');
    const quizStepIndicator = document.getElementById('quiz-step-indicator');
    const quizProgressFill = document.getElementById('quiz-progress');

    let currentQuizStep = 1;
    let quizResults = { color: '', floor: '', ceil: '' };

    if (openQuizBtn && quizModal && closeQuizModal) {
        openQuizBtn.addEventListener('click', () => {
            quizModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            resetQuiz();
        });

        closeQuizModal.addEventListener('click', () => {
            quizModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        quizOptions.forEach(opt => {
            opt.addEventListener('click', () => {
                const key = opt.dataset.key;
                const val = opt.dataset.value;

                const currentPane = opt.closest('.quiz-step');
                currentPane.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');

                quizResults[key] = val;
            });
        });

        quizNextBtn.addEventListener('click', () => {
            const currentPane = document.querySelector(`.quiz-step[data-step="${currentQuizStep}"]`);
            const hasSelection = currentPane.querySelector('.quiz-option.selected');

            if (!hasSelection) {
                alert('Please select an option before proceeding.');
                return;
            }

            if (currentQuizStep < 3) {
                currentQuizStep++;
                updateQuizUI();
            } else {
                localStorage.setItem('valure_quiz_selections', JSON.stringify(quizResults));
                quizModal.classList.remove('active');
                document.body.style.overflow = 'auto';

                alert('Style Match Calculated! Redirecting you to the Project Estimator with your preset loaded.');
                window.location.href = 'calculator.html?preset=quiz';
            }
        });

        quizBackBtn.addEventListener('click', () => {
            if (currentQuizStep > 1) {
                currentQuizStep--;
                updateQuizUI();
            }
        });

        const updateQuizUI = () => {
            quizSteps.forEach(s => s.classList.remove('active'));
            document.querySelector(`.quiz-step[data-step="${currentQuizStep}"]`).classList.add('active');

            quizBackBtn.style.visibility = currentQuizStep > 1 ? 'visible' : 'hidden';
            quizNextBtn.textContent = currentQuizStep === 3 ? 'Finish' : 'Next';
            quizStepIndicator.textContent = `Step ${currentQuizStep} of 3`;

            const pct = (currentQuizStep / 3) * 100;
            quizProgressFill.style.width = `${pct}%`;
        };

        const resetQuiz = () => {
            currentQuizStep = 1;
            quizResults = { color: '', floor: '', ceil: '' };
            quizOptions.forEach(o => o.classList.remove('selected'));
            updateQuizUI();
        };
    }
});

