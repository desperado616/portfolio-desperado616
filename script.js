/* ========================================
   PREMIUM PROFESSIONAL PORTFOLIO — JavaScript
   Sophisticated interactions & micro-animations
   Built with attention to detail
   ======================================== */

'use strict';

// ========================================
// STATE MANAGEMENT
// ========================================

let currentLang = 'en';
let currentTheme = 'light';

// ========================================
// DOM ELEMENT REFERENCES
// ========================================

const elements = {
    langToggle: document.getElementById('langToggle'),
    themeToggle: document.getElementById('themeToggle'),
    scrollProgress: document.getElementById('scrollProgress'),
    backToTop: document.getElementById('backToTop'),
    body: document.body,
    html: document.documentElement
};

// ========================================
// TRANSLATION DATA
// ========================================

const translations = {
    en: {
        langButton: 'RU',
        langAriaLabel: 'Switch language to Russian'
    },
    ru: {
        langButton: 'EN',
        langAriaLabel: 'Switch language to English'
    }
};

// ========================================
// LANGUAGE SWITCHING
// ========================================

function switchLanguage() {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    
    // Animate language icon
    const langIcon = elements.langToggle?.querySelector('.lang-icon');
    if (langIcon) {
        langIcon.style.transform = 'rotate(180deg) scale(0.9)';
        setTimeout(() => {
            langIcon.style.transform = '';
        }, 300);
    }
    
    // Update all elements with data attributes
    const translatableElements = document.querySelectorAll('[data-en][data-ru]');
    translatableElements.forEach(element => {
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

    // Update ARIA label
    if (elements.langToggle) {
        elements.langToggle.setAttribute('aria-label', translations[currentLang].langAriaLabel);
    }

    // Update HTML lang attribute
    elements.html.lang = currentLang;

    // Save preference to localStorage
    try {
        localStorage.setItem('preferredLanguage', currentLang);
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
}

// ========================================
// THEME SWITCHING - With smooth transition
// ========================================

function switchTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Smooth theme transition
    elements.html.style.transition = 'background-color 300ms cubic-bezier(0.23, 1, 0.32, 1), color 300ms cubic-bezier(0.23, 1, 0.32, 1)';
    elements.html.setAttribute('data-theme', currentTheme);
    
    // Icon rotation animation
    const icons = elements.themeToggle?.querySelectorAll('.theme-icon');
    if (icons) {
        icons.forEach(icon => {
            icon.style.transform = 'rotate(180deg) scale(0.9)';
            setTimeout(() => {
                icon.style.transform = '';
            }, 200);
        });
    }
    
    // Update ARIA label
    const ariaLabel = currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
    if (elements.themeToggle) {
        elements.themeToggle.setAttribute('aria-label', ariaLabel);
    }
    
    // Save preference to localStorage
    try {
        localStorage.setItem('preferredTheme', currentTheme);
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
    
    // Remove transition after animation completes
    setTimeout(() => {
        elements.html.style.transition = '';
    }, 300);
}

// ========================================
// SCROLL PROGRESS BAR
// ========================================

function updateScrollProgress() {
    const winScroll = elements.body.scrollTop || elements.html.scrollTop;
    const height = elements.html.scrollHeight - elements.html.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
    
    if (elements.scrollProgress) {
        elements.scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
        elements.scrollProgress.setAttribute('aria-valuenow', Math.round(scrolled));
    }
}

// Throttled scroll handler for performance
let scrollTicking = false;

function handleScroll() {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            updateScrollProgress();
            updateBackToTopVisibility();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================

function updateBackToTopVisibility() {
    if (elements.backToTop) {
        const scrollThreshold = 400;
        if (window.pageYOffset > scrollThreshold) {
            if (!elements.backToTop.classList.contains('visible')) {
                elements.backToTop.classList.add('visible');
            }
        } else {
            if (elements.backToTop.classList.contains('visible')) {
                elements.backToTop.classList.remove('visible');
            }
        }
    }
}

function scrollToTop() {
    // Smooth scroll with reduced motion support
    const supportsReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    window.scrollTo({
        top: 0,
        behavior: supportsReducedMotion ? 'auto' : 'smooth'
    });
    
    // Add haptic feedback effect to button
    if (elements.backToTop) {
        elements.backToTop.style.transform = 'scale(0.9)';
        setTimeout(() => {
            elements.backToTop.style.transform = '';
        }, 150);
    }
}

// ========================================
// ANIMATED METRICS COUNTER - UNIQUE FEATURE
// ========================================

function animateMetrics() {
    const metrics = document.querySelectorAll('.metric-value');
    
    if (!metrics.length) return;
    
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: just show final values
        metrics.forEach(metric => {
            const target = parseInt(metric.getAttribute('data-count'));
            metric.textContent = target;
        });
        return;
    }
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metric = entry.target;
                const target = parseInt(metric.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const percent = metric.querySelector('.metric-percent');
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(counter);
                    }
                    
                    const displayValue = Math.floor(current);
                    if (percent) {
                        metric.firstChild.textContent = displayValue;
                    } else {
                        metric.textContent = displayValue;
                    }
                }, 16);
                
                observer.unobserve(metric);
            }
        });
    }, observerOptions);
    
    metrics.forEach(metric => observer.observe(metric));
}

// ========================================
// PREMIUM MICRO-INTERACTIONS
// ========================================

const codeExamples = {
    react: {
        code: `// React component with hooks and API integration
import { useState, useEffect } from 'react';

export default function UserDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {data.name}</h1>
      <Stats data={data.stats} />
    </div>
  );
}`,
        tech: 'React • Hooks • REST API',
        lang: 'jsx'
    },
    python: {
        code: `# Flask REST API with error handling
from flask import Flask, jsonify, request
from functools import wraps

app = Flask(__name__)

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token or not verify_token(token):
            return jsonify({'error': 'Unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated

@app.route('/api/data', methods=['GET'])
@require_auth
def get_data():
    try:
        data = fetch_from_database()
        return jsonify(data), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500`,
        tech: 'Flask • REST API • Authentication',
        lang: 'python'
    },
    telegram: {
        code: `// Telegram Bot with commands and inline keyboards
const { Telegraf, Markup } = require('telegraf');
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', (ctx) => {
  ctx.reply(
    'Welcome! Choose an option:',
    Markup.inlineKeyboard([
      [Markup.button.callback('📊 View Stats', 'stats')],
      [Markup.button.callback('⚙️ Settings', 'settings')],
      [Markup.button.url('🌐 Website', 'https://example.com')]
    ])
  );
});

bot.action('stats', async (ctx) => {
  await ctx.answerCbQuery();
  const stats = await getUserStats(ctx.from.id);
  ctx.reply(\`Your stats: \${stats.points} points\`);
});

bot.launch();`,
        tech: 'Telegraf • Bot API • Inline Keyboards',
        lang: 'javascript'
    }
};

function setupCodeDemo() {
    const tabs = document.querySelectorAll('.code-tab');
    const codeBlock = document.getElementById('codeBlock');
    const codeTech = document.getElementById('codeTech');
    
    if (!tabs.length || !codeBlock) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            this.classList.add('active');
            
            // Get selected language
            const lang = this.getAttribute('data-lang');
            const example = codeExamples[lang];
            
            if (example) {
                // Animate out
                codeBlock.style.opacity = '0';
                codeBlock.style.transform = 'translateY(10px)';
                
                setTimeout(() => {
                    // Update content
                    const escapedCode = example.code
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    
                    codeBlock.innerHTML = `<code class="language-${example.lang}">${escapedCode}</code>`;
                    codeTech.textContent = example.tech;
                    
                    // Animate in
                    codeBlock.style.opacity = '1';
                    codeBlock.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    });
}

function setupPremiumInteractions() {
    // Optimize hover effects with will-change
    const contactLinks = document.querySelectorAll('.contact-link');
    contactLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.willChange = 'transform';
        });
        
        link.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.style.willChange = 'auto';
            }, 300);
        });
    });
    
    // Project cards subtle 3D parallax on hover (desktop only)
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            let rafId = null;
            
            card.addEventListener('mouseenter', function() {
                this.style.willChange = 'transform';
            });
            
            card.addEventListener('mousemove', function(e) {
                if (rafId) cancelAnimationFrame(rafId);
                
                rafId = requestAnimationFrame(() => {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const deltaX = (x - centerX) / centerX;
                    const deltaY = (y - centerY) / centerY;
                    
                    // Subtle 3D tilt effect
                    this.style.transform = `translateY(-8px) perspective(1000px) rotateX(${deltaY * 3}deg) rotateY(${deltaX * 3}deg) scale(1.01)`;
                });
            });
            
            card.addEventListener('mouseleave', function() {
                if (rafId) cancelAnimationFrame(rafId);
                this.style.transform = '';
                setTimeout(() => {
                    this.style.willChange = 'auto';
                }, 300);
            });
        });
    }
    
    // Skill tags micro-interactions
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Ripple effect on click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Smooth button press feedback
    const allButtons = document.querySelectorAll('button, .contact-link, .project-card');
    allButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transition = 'transform 100ms cubic-bezier(0.23, 1, 0.32, 1)';
            this.style.transform = 'scale(0.97)';
        });
        
        button.addEventListener('mouseup', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update focus for accessibility
                target.focus();
            }
        });
    });
}

// ========================================
// SCROLL ANIMATIONS (Intersection Observer) - Premium stagger
// ========================================

function setupScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: make everything visible immediately
        const allAnimatable = document.querySelectorAll('section:not(.hero), .project-card, .skill-category, .strength-item, .experience-item');
        allAnimatable.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
        return;
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe sections with stagger (except hero)
    const sections = document.querySelectorAll('section:not(.hero)');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = prefersReducedMotion ? 'none' : 'translateY(30px)';
        section.style.transition = prefersReducedMotion 
            ? 'opacity 200ms ease' 
            : `opacity 500ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 60}ms, transform 500ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 60}ms`;
        observer.observe(section);
    });
    
    // Observe cards with micro-stagger
    const cards = document.querySelectorAll('.project-card, .skill-category, .strength-item, .experience-item');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = prefersReducedMotion ? 'none' : 'translateY(20px)';
        card.style.transition = prefersReducedMotion
            ? 'opacity 200ms ease'
            : `opacity 400ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 40}ms, transform 400ms cubic-bezier(0.23, 1, 0.32, 1) ${index * 40}ms`;
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    });
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        
        cardObserver.observe(card);
    });
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

function handleKeyboardShortcuts(e) {
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
    if (e.key === 'Escape' && window.pageYOffset > 300) {
        scrollToTop();
    }
}

// ========================================
// LOAD SAVED PREFERENCES
// ========================================

function loadSavedPreferences() {
    try {
        // Load language preference
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && savedLang !== currentLang) {
            currentLang = savedLang === 'ru' ? 'en' : 'ru'; // Set opposite so switchLanguage works
            switchLanguage();
        }

        // Load theme preference
        const savedTheme = localStorage.getItem('preferredTheme');
        if (savedTheme) {
            currentTheme = savedTheme;
            elements.html.setAttribute('data-theme', currentTheme);
            
            // Update ARIA label
            const ariaLabel = currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
            if (elements.themeToggle) {
                elements.themeToggle.setAttribute('aria-label', ariaLabel);
            }
        } else {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                currentTheme = 'dark';
                elements.html.setAttribute('data-theme', 'dark');
                if (elements.themeToggle) {
                    elements.themeToggle.setAttribute('aria-label', 'Switch to light mode');
                }
            }
        }
    } catch (e) {
        console.warn('Could not load preferences from localStorage:', e);
    }
}

// ========================================
// LISTEN FOR SYSTEM THEME CHANGES
// ========================================

function setupSystemThemeListener() {
    if (window.matchMedia) {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        darkModeQuery.addEventListener('change', (e) => {
            // Only apply if user hasn't manually set a preference
            try {
                if (!localStorage.getItem('preferredTheme')) {
                    currentTheme = e.matches ? 'dark' : 'light';
                    elements.html.setAttribute('data-theme', currentTheme);
                }
            } catch (err) {
                // localStorage not available
            }
        });
    }
}

// ========================================
// IMAGE LOADING OPTIMIZATION
// ========================================

function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.4s ease-in';
            
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            }, { once: true });
            
            img.addEventListener('error', () => {
                console.warn('Failed to load image:', img.src);
                img.style.opacity = '1'; // Still show broken image icon
            }, { once: true });
        }
    });
}

// ========================================
// EVENT LISTENERS SETUP
// ========================================

function setupEventListeners() {
    // Language toggle
    if (elements.langToggle) {
        elements.langToggle.addEventListener('click', switchLanguage);
    }

    // Theme toggle
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', switchTheme);
    }

    // Scroll events (throttled)
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Back to top button
    if (elements.backToTop) {
        elements.backToTop.addEventListener('click', scrollToTop);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
}

// ========================================
// INITIALIZATION
// ========================================

function init() {
    // Load saved preferences first (before any rendering)
    loadSavedPreferences();
    
    // Setup all event listeners
    setupEventListeners();
    
    // Setup system theme listener
    setupSystemThemeListener();
    
    // Setup metrics animation
    animateMetrics();
    
    // Setup code demo
    setupCodeDemo();
    
    // Setup premium micro-interactions
    setupPremiumInteractions();
    
    // Setup smooth scroll for anchor links
    setupSmoothScroll();
    
    // Setup scroll animations
    setupScrollAnimations();
    
    // Setup image loading optimization
    setupImageLoading();
    
    // Initial scroll progress update
    updateScrollProgress();
    
    // Initial back-to-top visibility
    updateBackToTopVisibility();
}

// ========================================
// START THE APP
// ========================================

// Run init when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // DOMContentLoaded already fired
    init();
}

// ========================================
// PERFORMANCE OPTIMIZATION
// ========================================

// Optimize animations after initial load
window.addEventListener('load', () => {
    // Clean up after page is fully loaded
    requestAnimationFrame(() => {
        // Speed up transitions after initial animations complete
        setTimeout(() => {
            const animatedElements = document.querySelectorAll('section, .project-card, .skill-category, .strength-item, .experience-item');
            animatedElements.forEach(el => {
                if (el.style.transition) {
                    // Faster transitions after initial reveal
                    el.style.transition = el.style.transition.replace(/[\d.]+m?s/g, '200ms');
                }
            });
        }, 1500);
    });
    
    // Preload critical images
    const criticalImages = document.querySelectorAll('img[loading="eager"]');
    criticalImages.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                requestAnimationFrame(() => {
                    img.style.transition = 'opacity 300ms ease';
                    img.style.opacity = '1';
                });
            }, { once: true });
        }
    });
});

// ========================================
// ERROR HANDLING
// ========================================

window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.message);
}, true);

// ========================================
// EXPORT FOR TESTING (if needed)
// ========================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        switchLanguage,
        switchTheme,
        updateScrollProgress,
        scrollToTop
    };
}
