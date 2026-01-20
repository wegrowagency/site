/**
 * WEGROW - Main JavaScript
 * Handles mobile menu, scroll animations, and form submission
 */

document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // 1. Mobile Menu Toggle
    // =========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true' || false;
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
            // Toggle body overflow to prevent scrolling when menu is open
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';

            // Set focus to the first link in the opened menu for accessibility
            if (navLinks.classList.contains('active')) {
                navLinks.querySelector('a')?.focus();
            } else {
                mobileMenuBtn.focus(); // Return focus to the button when menu closes
            }
        });

        // Close mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = ''; // Restore body scroll
            });
        });

        // Close mobile menu if window is resized above mobile breakpoint
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Assuming 992px is the breakpoint where mobile menu disappears
                if (window.innerWidth > 992 && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }, 200); // Debounce resize event for better performance
        });

        // Close menu with Escape key for accessibility
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                mobileMenuBtn.focus(); // Return focus to the menu button
            }
        });
    }

    // =========================================
    // 2. Scroll-triggered Fade-in-Up Animation
    // =========================================
    const faders = document.querySelectorAll('.fade-in-up');

    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(
        entries,
        appearOnScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // =========================================
    // 3. Smooth scroll for navigation links
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =========================================
    // 4. Modal Logic (from CODE_X)
    // =========================================
    const modal = document.getElementById('auditModal');
    const openBtns = document.querySelectorAll('.open-modal-btn');
    const closeBtn = document.querySelector('.close-modal');

    if (modal && openBtns.length > 0) {
        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                // Trap focus in modal for accessibility
                closeBtn.focus();
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }

        // Close modal when clicking outside the card
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Close modal with Escape key for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
            }
        });
    }

    // =========================================
    // 5. Navbar background on scroll
    // =========================================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(229, 228, 226, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(74, 74, 74, 0.15)';
            } else {
                navbar.style.backgroundColor = '#E5E4E2';
                navbar.style.boxShadow = '0 3px 10px -5px rgba(74, 74, 74, 0.3)';
            }
        });
    }
});