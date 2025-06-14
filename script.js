// Netflix Landing Page JavaScript

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const emailInput = document.getElementById('emailInput');
const getStartedBtn = document.getElementById('getStartedBtn');
const emailError = document.getElementById('emailError');
const languageSelect = document.getElementById('languageSelect');
const faqItems = document.querySelectorAll('.faq-item');
const featureCards = document.querySelectorAll('.feature-card');

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);
});

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showEmailError(message) {
    emailError.textContent = message;
    emailError.classList.add('show');
    emailInput.style.borderColor = 'var(--netflix-red)';
}

function hideEmailError() {
    emailError.classList.remove('show');
    emailInput.style.borderColor = 'var(--border-color)';
}

// Email Input Event Listeners
emailInput.addEventListener('input', () => {
    hideEmailError();
});

emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleEmailSubmit();
    }
});

// Get Started Button Handler
getStartedBtn.addEventListener('click', handleEmailSubmit);

function handleEmailSubmit() {
    const email = emailInput.value.trim();
    
    if (!email) {
        showEmailError('Email is required.');
        return;
    }
    
    if (!validateEmail(email)) {
        showEmailError('Please enter a valid email address.');
        return;
    }
    
    // Store email and redirect (in real app, would make API call)
    localStorage.setItem('userEmail', email);
    
    // Show success animation
    getStartedBtn.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Success!
    `;
    
    setTimeout(() => {
        // In real app, would redirect to signup page
        alert('Welcome to Netflix! In a real app, you would be redirected to the signup page.');
        
        // Reset button
        getStartedBtn.innerHTML = `
            Get Started
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
    }, 1500);
}

// FAQ Accordion Functionality
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe feature cards for animation
featureCards.forEach(card => {
    observer.observe(card);
});

// Smooth Scrolling for Scroll Indicator
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.querySelector('.features');
        featuresSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    });
}

// Language Selector Handler
languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    
    // In a real app, this would change the page language
    console.log('Language changed to:', selectedLang);
    
    // Update other language selectors on the page
    const footerLanguageSelect = document.querySelector('.footer-language select');
    if (footerLanguageSelect) {
        footerLanguageSelect.value = selectedLang;
    }
});

// Footer Language Selector
const footerLanguageSelect = document.querySelector('.footer-language select');
if (footerLanguageSelect) {
    footerLanguageSelect.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        languageSelect.value = selectedLang;
        console.log('Language changed to:', selectedLang);
    });
}

// Navbar Scroll Effect
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent)';
        navbar.style.backdropFilter = 'none';
    }
    
    lastScrollY = currentScrollY;
});

// Video Play/Pause on Scroll (Performance Optimization)
const videos = document.querySelectorAll('video');
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
            video.play().catch(e => console.log('Video play failed:', e));
        } else {
            video.pause();
        }
    });
}, {
    threshold: 0.5
});

videos.forEach(video => {
    videoObserver.observe(video);
});

// Sign In Button Handler
const signInBtn = document.querySelector('.btn-signin');
signInBtn.addEventListener('click', () => {
    // In real app, would redirect to sign in page
    alert('In a real app, you would be redirected to the sign in page.');
});

// Phone Number Link Handler
const phoneLink = document.querySelector('a[href^="tel:"]');
if (phoneLink) {
    phoneLink.addEventListener('click', (e) => {
        // Track phone call analytics in real app
        console.log('Phone number clicked');
    });
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroBackground && scrolled < window.innerHeight) {
        const speed = 0.5;
        heroBackground.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Preload Critical Images
function preloadImage(src) {
    const img = new Image();
    img.src = src;
}

// Preload key images for better performance
const criticalImages = [
    'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png',
    'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg',
    'https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png'
];

criticalImages.forEach(preloadImage);

// Error Handling for Videos
videos.forEach(video => {
    video.addEventListener('error', () => {
        console.log('Video failed to load:', video.src);
        // Hide video container or show fallback
        video.style.display = 'none';
    });
});

// Keyboard Navigation for Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open FAQ items
        faqItems.forEach(item => {
            item.classList.remove('active');
        });
    }
});

// Focus management for FAQ items
// Enhanced FAQ Animation JavaScript
class FAQAnimator {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.addHoverEffects();
        this.setupScrollAnimations();
    }

    setupEventListeners() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            question.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFAQClick(item, answer, icon);
            });
        });
    }

    handleFAQClick(item, answer, icon) {
        const isActive = item.classList.contains('active');
        
        if (isActive) {
            // Close the currently active FAQ
            this.closeFAQ(item, answer, icon);
        } else {
            // Close all other FAQ items first
            this.closeAllFAQs();
            // Then open the clicked FAQ
            this.openFAQ(item, answer, icon);
        }
    }

    openFAQ(item, answer, icon) {
        // Add active class
        item.classList.add('active');
        
        // Animate icon rotation with bounce effect
        this.animateIcon(icon, true);
        
        // Calculate and set max height for smooth animation
        const content = answer.querySelector('.faq-answer-content');
        const contentHeight = content.scrollHeight;
        
        // Animate answer opening
        answer.style.maxHeight = contentHeight + 'px';
        answer.style.padding = '28px 35px';
        
        // Add stagger animation to paragraphs
        this.animateAnswerContent(content, true);
        
        // Add ripple effect to button
        this.addRippleEffect(item.querySelector('.faq-question'));
        
        // Smooth scroll to item
        setTimeout(() => {
            item.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }

    closeFAQ(item, answer, icon) {
        const content = answer.querySelector('.faq-answer-content');
        
        // Remove active class
        item.classList.remove('active');
        
        // Animate icon rotation
        this.animateIcon(icon, false);
        
        // Animate answer closing
        answer.style.maxHeight = '0';
        answer.style.padding = '0 35px';
        
        // Animate content out
        this.animateAnswerContent(content, false);
    }

    closeAllFAQs() {
        const activeItems = document.querySelectorAll('.faq-item.active');
        
        activeItems.forEach(item => {
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            this.closeFAQ(item, answer, icon);
        });
    }

    animateIcon(icon, isOpening) {
        // Remove any existing animation classes
        icon.classList.remove('rotating-open', 'rotating-close');
        
        if (isOpening) {
            icon.classList.add('rotating-open');
            // Add bounce effect
            icon.style.animation = 'iconBounceOpen 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        } else {
            icon.classList.add('rotating-close');
            icon.style.animation = 'iconBounceClose 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
        
        // Clear animation after completion
        setTimeout(() => {
            icon.style.animation = '';
        }, isOpening ? 600 : 400);
    }

    animateAnswerContent(content, isOpening) {
        const paragraphs = content.querySelectorAll('p');
        
        paragraphs.forEach((p, index) => {
            if (isOpening) {
                p.style.animation = `fadeInUp 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1 + 0.2}s both`;
            } else {
                p.style.animation = `fadeOutDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s both`;
            }
        });
    }

    addHoverEffects() {
        const faqQuestions = document.querySelectorAll('.faq-question');
        
        faqQuestions.forEach(question => {
            const icon = question.querySelector('.faq-icon');
            
            question.addEventListener('mouseenter', () => {
                this.onHoverEnter(question, icon);
            });
            
            question.addEventListener('mouseleave', () => {
                this.onHoverLeave(question, icon);
            });
        });
    }

    onHoverEnter(question, icon) {
        // Add hover glow effect
        question.style.background = 'rgba(229, 9, 20, 0.1)';
        question.style.boxShadow = '0 8px 32px rgba(229, 9, 20, 0.2)';
        
        // Subtle icon animation on hover
        if (!question.closest('.faq-item').classList.contains('active')) {
            icon.style.transform = 'scale(1.1) rotate(15deg)';
            icon.style.color = 'var(--netflix-red)';
        }
        
        // Text glow effect
        const span = question.querySelector('span');
        span.style.textShadow = '0 0 20px rgba(229, 9, 20, 0.3)';
    }

    onHoverLeave(question, icon) {
        // Remove hover effects
        question.style.background = '';
        question.style.boxShadow = '';
        
        // Reset icon if not active
        if (!question.closest('.faq-item').classList.contains('active')) {
            icon.style.transform = '';
            icon.style.color = '';
        }
        
        // Remove text glow
        const span = question.querySelector('span');
        span.style.textShadow = '';
    }

    addRippleEffect(button) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.transform = 'translate(-50%, -50%) scale(0)';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        // Animate ripple
        setTimeout(() => {
            ripple.style.transform = 'translate(-50%, -50%) scale(2)';
            ripple.style.opacity = '0';
        }, 10);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 500);
    }

    setupScrollAnimations() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInFromLeft 0.8s cubic-bezier(0.4, 0, 0.2, 1) both';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        faqItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.1}s`;
            observer.observe(item);
        });
    }

    // Keyboard accessibility
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllFAQs();
            }
        });
        
        const faqQuestions = document.querySelectorAll('.faq-question');
        faqQuestions.forEach(question => {
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
        });
    }
}

// CSS animations to be added to your stylesheet
const additionalCSS = `
/* Enhanced Animation Keyframes */
@keyframes iconBounceOpen {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(22.5deg) scale(1.2); color: var(--netflix-red); }
    100% { transform: rotate(45deg) scale(1); color: var(--netflix-red); }
}

@keyframes iconBounceClose {
    0% { transform: rotate(45deg) scale(1); }
    100% { transform: rotate(0deg) scale(1); color: currentColor; }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOutDown {
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(-20px);
    }
}

@keyframes slideInFromLeft {
    from {
        opacity: 0;
        transform: translateX(-100px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes rippleAnimation {
    to {
        transform: translate(-50%, -50%) scale(2);
        opacity: 0;
    }
}

/* Ripple Effect Styling */
.ripple-effect {
    position: absolute;
    border-radius: 50%;
    background: rgba(229, 9, 20, 0.3);
    animation: rippleAnimation 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
}

/* Enhanced Hover States */
.faq-question {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-question span {
    transition: text-shadow 0.3s ease;
}

.faq-icon {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Enhanced Focus States for Accessibility */
.faq-question:focus {
    outline: 2px solid var(--netflix-red);
    outline-offset: 2px;
    background: rgba(229, 9, 20, 0.1);
}

/* Smooth scrolling for the entire page */
html {
    scroll-behavior: smooth;
}

/* Loading state animation */
.faq-item {
    opacity: 0;
    transform: translateX(-100px);
}

.faq-item.loaded {
    opacity: 1;
    transform: translateX(0);
}
`;

// Function to inject additional CSS
function injectCSS() {
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    injectCSS();
    new FAQAnimator();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FAQAnimator;
}

// Form Submission for Footer Email
const footerEmailForm = document.querySelector('.cta-section .email-signup');
if (footerEmailForm) {
    const footerEmailInput = footerEmailForm.querySelector('.email-input');
    const footerGetStartedBtn = footerEmailForm.querySelector('.btn-primary');
    
    footerGetStartedBtn.addEventListener('click', () => {
        const email = footerEmailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address.');
            footerEmailInput.focus();
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            footerEmailInput.focus();
            return;
        }
        
        // Store email (same as main form)
        localStorage.setItem('userEmail', email);
        alert('Welcome to Netflix! In a real app, you would be redirected to the signup page.');
    });
    
    footerEmailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            footerGetStartedBtn.click();
        }
    });
}

// Console Easter Egg
console.log(`
🎬 Netflix Landing Page
━━━━━━━━━━━━━━━━━━
Built with HTML, CSS & JavaScript
Ready to binge-watch? 🍿
`);

// Performance Monitoring (Basic)
window.addEventListener('load', () => {
    setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log('Page Load Time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
    }, 0);
});