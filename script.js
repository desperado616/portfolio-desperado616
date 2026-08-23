// Language Toggle Functionality
let currentLang = 'en';
let currentTheme = 'light';

const langToggle = document.getElementById('langToggle');
const themeToggle = document.getElementById('themeToggle');
const scrollProgress = document.getElementById('scrollProgress');
const backToTop = document.getElementById('backToTop');

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
    if (langText) {
        langText.textContent = translations[currentLang].langButton;
    }

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Save preference to localStorage
    localStorage.setItem('preferredLanguage', currentLang);

    // Add animation effect
    document.body.style.opacity = '0.97';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}

// Function to switch theme
function switchTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('preferredTheme', currentTheme);
    
    // Add smooth transition
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
}

// Event listeners
if (langToggle) {
    langToggle.addEventListener('click', switchLanguage);
}

if (themeToggle) {
    themeToggle.addEventListener('click', switchTheme);
}

// Load saved preferences
window.addEventListener('DOMContentLoaded', () => {
    // Load language preference
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && savedLang !== currentLang) {
        switchLanguage();
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('preferredTheme');
    if (savedTheme) {
        currentTheme = savedTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
    } else {
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            currentTheme = 'dark';
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('preferredTheme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
        }
    });
}

// Scroll Progress Bar
function updateScrollProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
    }
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// Back to Top Button
window.addEventListener('scroll', () => {
    if (backToTop) {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
}, { passive: true });

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

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

// Add scroll reveal animations with stagger
const observerOptions = {
    threshold: 0.08,
    rootMargin: '0px 0px -60px 0px'
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
    sections.forEach((section, index) => {
        // Keep hero section static
        if (section.classList.contains('hero')) {
            section.classList.add('static');
            return;
        }
        
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = `opacity 0.5s ease-out ${index * 0.05}s, transform 0.5s ease-out ${index * 0.05}s`;
        observer.observe(section);
    });

    // Animate cards within sections - faster
    const cards = document.querySelectorAll('.project-card, .skill-category, .strength-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.4s ease-out ${index * 0.03}s, transform 0.4s ease-out ${index * 0.03}s`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cardObserver.observe(card);
    });
});

// Removed parallax effect from hero to keep it static

/* Enhanced hover effect for project cards */
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });

        // Subtle 3D tilt effect - optimized
        let timeout;
        card.addEventListener('mousemove', (e) => {
            if (timeout) return;
            timeout = setTimeout(() => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                
                card.style.transform = `translateY(-10px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                timeout = null;
            }, 16); // 60fps
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

// Magnetic effect for buttons - optimized
document.addEventListener('DOMContentLoaded', () => {
    const buttons = [langToggle, themeToggle].filter(btn => btn);
    
    buttons.forEach(button => {
        let magnetTimeout;
        button.addEventListener('mousemove', (e) => {
            if (magnetTimeout) return;
            magnetTimeout = setTimeout(() => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                button.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
                magnetTimeout = null;
            }, 16);
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = '';
        });
    });
});

// Performance: Preload important images and cleanup
window.addEventListener('load', () => {
    const img = new Image();
    img.src = 'photo.jpg';
    
    // Remove animation delays and optimize after first render
    requestAnimationFrame(() => {
        setTimeout(() => {
            const elements = document.querySelectorAll('section, .project-card, .skill-category, .strength-item');
            elements.forEach(el => {
                el.style.transition = el.style.transition.replace(/\d+\.?\d*s/g, '0.3s');
            });
        }, 2000);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        switchTheme();
    }
    
    // Ctrl/Cmd + L to toggle language
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        switchLanguage();
    }

    // Press Escape to scroll to top
    if (e.key === 'Escape') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Add smooth fade-in for images - optimized
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.6s ease-in';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            }, { once: true });
        }
    });
});

// Optimize scroll performance
let lastScrollTop = 0;
const scrollThreshold = 5;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(scrollTop - lastScrollTop) > scrollThreshold) {
        lastScrollTop = scrollTop;
    }
}, { passive: true });

// Easter egg: Add confetti on double-click on name
document.addEventListener('DOMContentLoaded', () => {
    const name = document.querySelector('.name');
    if (name) {
        let clickCount = 0;
        let clickTimer = null;

        name.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 1) {
                clickTimer = setTimeout(() => {
                    clickCount = 0;
                }, 300);
            } else if (clickCount === 2) {
                clearTimeout(clickTimer);
                clickCount = 0;
                createConfetti();
            }
        });
    }
});

// Confetti effect
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        confetti.style.transition = 'all 3s ease-out';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = window.innerHeight + 'px';
            confetti.style.transform = `translateX(${(Math.random() - 0.5) * 500}px) rotate(${Math.random() * 360}deg)`;
            confetti.style.opacity = '0';
        }, 10);
        
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Console easter egg
console.log('%c👋 Hey there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%c🚀 Looking for a developer? Let\'s talk!', 'font-size: 16px; color: #764ba2;');
console.log('%c💼 Email: pasha.174xaliyllin@gmail.com', 'font-size: 14px; color: #667eea;');
console.log('%c⚡ Shortcuts: Ctrl+K (theme) | Ctrl+L (language) | ESC (scroll to top)', 'font-size: 12px; color: #94a3b8;');
console.log('%c✨ Easter egg: Double-click my name! 🎉', 'font-size: 12px; color: #f093fb; font-style: italic;');

// Add typing effect to console
setTimeout(() => {
    console.log('%c💡 Tip: Hover over project cards for a 3D effect!', 'font-size: 12px; color: #4facfe;');
}, 2000);