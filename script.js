'use strict';

let currentTheme = 'light';

const elements = {
    themeToggle: document.getElementById('themeToggle'),
    scrollProgress: document.getElementById('scrollProgress'),
    backToTop: document.getElementById('backToTop'),
    html: document.documentElement
};

function getStored(key) {
    try {
        return localStorage.getItem(key);
    } catch (e) {
        return null;
    }
}

function setStored(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {}
}

function disableTransitionsBriefly() {
    const style = document.createElement('style');
    style.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.appendChild(style);
    void document.documentElement.offsetHeight;
    requestAnimationFrame(() => {
        style.remove();
    });
}

function updateThemeLabel() {
    if (!elements.themeToggle) return;
    const isDark = currentTheme === 'dark';
    elements.themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    elements.themeToggle.setAttribute('aria-pressed', String(isDark));
}

function applyTheme(theme) {
    currentTheme = theme;
    disableTransitionsBriefly();
    if (theme === 'dark') {
        elements.html.setAttribute('data-theme', 'dark');
    } else {
        elements.html.removeAttribute('data-theme');
    }
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
        themeColor.setAttribute('content', theme === 'dark' ? '#0c1220' : '#2563eb');
    }
    updateThemeLabel();
}

function switchTheme() {
    applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    setStored('preferredTheme', currentTheme);
}

function updateScrollProgress() {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (elements.scrollProgress) {
        elements.scrollProgress.style.transform = `scaleX(${scrolled / 100})`;
        elements.scrollProgress.setAttribute('aria-valuenow', String(Math.round(scrolled)));
    }
}

function updateBackToTopVisibility() {
    if (!elements.backToTop) return;
    elements.backToTop.classList.toggle('visible', window.scrollY > 400);
}

let scrollTicking = false;

function handleScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(() => {
        updateScrollProgress();
        updateBackToTopVisibility();
        scrollTicking = false;
    });
}

function scrollToTop() {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
}

function setupPortraitFallback() {
    const wrapper = document.getElementById('portraitWrapper');
    const img = wrapper && wrapper.querySelector('img');
    if (!img || !wrapper) return;

    const fail = () => wrapper.classList.add('is-fallback');

    if (img.complete) {
        if (img.naturalWidth === 0) fail();
        return;
    }

    img.addEventListener('error', fail, { once: true });
}

function loadSavedPreferences() {
    try {
        localStorage.removeItem('preferredLanguage');
    } catch (e) {}

    elements.html.lang = 'en';

    const savedTheme = getStored('preferredTheme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        applyTheme(savedTheme);
    } else if (
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }
}

function setupSystemThemeListener() {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    query.addEventListener('change', (event) => {
        if (!getStored('preferredTheme')) {
            applyTheme(event.matches ? 'dark' : 'light');
        }
    });
}

function init() {
    loadSavedPreferences();
    setupPortraitFallback();
    setupSystemThemeListener();
    updateScrollProgress();
    updateBackToTopVisibility();

    if (elements.themeToggle) elements.themeToggle.addEventListener('click', switchTheme);
    if (elements.backToTop) elements.backToTop.addEventListener('click', scrollToTop);
    window.addEventListener('scroll', handleScroll, { passive: true });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
