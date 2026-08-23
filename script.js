// Language Toggle Functionality
let currentLang = 'en';

const langToggle = document.getElementById('langToggle');

// Translation data
const translations = {
    en: {
        langButton: 'RU'
    },
    ru: {
        langButton: 'EN'
    }
};

// Function to switch language
function switchLanguage() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    
    // Update all elements with data attributes
    const elements = document.querySelectorAll('[data-en][data-ru]');
    elements.forEach(element => {
        const content = element.getAttribute(`data-${currentLang}`);
        if (content) {
            element.textContent = content;
        }
    });

    // Update language toggle button
    const langText = document.querySelector('.lang-text');
    langText.textContent = translations[currentLang].langButton;

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', currentLang);

    // Add animation effect
    document.body.style.opacity = '0.95';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 150);
}

// Event listener for language toggle
if (langToggle) {
    langToggle.addEventListener('click', switchLanguage);
}

// Load saved language preference
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        switchLanguage();
    }
});

// Smooth scroll for anchor links
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

// Add scroll reveal animations
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

// Observe sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
});

// Add parallax effect to hero section (subtle)
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
});

// Add hover effect to project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});

// Easter egg: Konami code to change theme
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});

// Performance: Preload important images
window.addEventListener('load', () => {
    const img = new Image();
    img.src = 'photo.jpg';
});