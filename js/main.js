// ============================================================================
// PROMO BANNER - Close button handler + dynamic top offset adjustment
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    const promoBanner = document.getElementById('promoBanner');
    const promoClose = promoBanner ? promoBanner.querySelector('.close-banner') : null;
    
    if (promoClose) {
        promoClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Hide banner
            if (promoBanner) {
                promoBanner.style.display = 'none';
            }
            
            // Adjust navbar top position
            const navElement = document.querySelector('.navbar') || document.querySelector('.nav');
            if (navElement) {
                navElement.style.top = '0 !important';
            }
            
            // Adjust hero/hero-section top padding
            const heroElement = document.querySelector('.hero') || document.querySelector('.hero-section');
            if (heroElement) {
                const computedPadding = window.getComputedStyle(heroElement).paddingTop;
                const match = computedPadding.match(/(\d+)px/);
                if (match) {
                    const currentPadding = parseInt(match[1], 10);
                    const newPadding = Math.max(0, currentPadding - 44);
                    heroElement.style.paddingTop = newPadding + 'px !important';
                }
            }
        });
    }
});

// ============================================================================
// NAVBAR SCROLL EFFECT - Add 'scrolled' class for visual feedback
// ============================================================================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar') || document.querySelector('.nav');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================================================
// MOBILE MENU TOGGLE - Hamburger button + accessibility
// ============================================================================

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
    menuToggle.setAttribute('aria-expanded', 'false');
    
    // Toggle menu on button click
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = navLinks.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        try {
            if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        } catch (err) {
            // Defensive: ignore errors if elements are removed
        }
    });
}

// ============================================================================
// PRICING TABS - Switch between Video/Image pricing sections
// ============================================================================

const tabBtns = document.querySelectorAll('.tab-btn');
const pricingContents = document.querySelectorAll('.pricing-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        pricingContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const targetContent = document.querySelector(`[data-content="${targetTab}"]`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// ============================================================================
// FAQ ACCORDION - Toggle FAQ items (one open at a time)
// ============================================================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================================================
// SMOOTH SCROLL - Anchor links with offset for fixed nav
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const offsetTop = target.offsetTop - 100; // Offset for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================================================
// INTERSECTION OBSERVER - Fade-in animations on scroll
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation (supports both main site and language pages)
const elementsToObserve = document.querySelectorAll(
    '.service-card, .feature-card, .pricing-card, .faq-item, .contact-card, ' +
    '.hero-logo, .pricing-header, .process-steps, .important, .section-title'
);

elementsToObserve.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
