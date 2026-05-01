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
});
