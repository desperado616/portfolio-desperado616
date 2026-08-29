'use strict';

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const descriptionMeta = document.querySelector('meta[name="description"]');
const ogTitle = document.querySelector('meta[property="og:title"]');
const ogDescription = document.querySelector('meta[property="og:description"]');
const ogLocale = document.querySelector('meta[property="og:locale"]');
const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
const twitterTitle = document.querySelector('meta[name="twitter:title"]');
const twitterDescription = document.querySelector('meta[name="twitter:description"]');
const twitterImageAlt = document.querySelector('meta[name="twitter:image:alt"]');
const localeButtons = document.querySelectorAll('.locale-btn');
const navLinks = document.querySelectorAll('.top-nav a[href^="#"]');

const META = {
    en: {
        title: 'Pavel Khaliullin — Full-stack / AI developer',
        description: 'Pavel Khaliullin — Middle+ full-stack / AI developer. React, Next.js, Python, Telegram, Web3 / TON. Available for remote work.',
        ogDescription: 'Middle+ full-stack / AI developer. React, Next.js, Python, Telegram, Web3 / TON.',
        ogLocale: 'en_US',
        imageAlt: 'Pavel Khaliullin',
        themeToDark: 'Dark',
        themeToLight: 'Light',
        themeAriaDark: 'Switch to dark appearance',
        themeAriaLight: 'Switch to light appearance',
    },
    ru: {
        title: 'Павел Халиуллин — фуллстек / AI-разработчик',
        description: 'Павел Халиуллин — Middle+ фуллстек / AI-разработчик. React, Next.js, Python, Telegram, Web3 / TON. Открыт к удалённой работе.',
        ogDescription: 'Middle+ фуллстек / AI-разработчик. React, Next.js, Python, Telegram, Web3 / TON.',
        ogLocale: 'ru_RU',
        imageAlt: 'Павел Халиуллин',
        themeToDark: 'Тёмная',
        themeToLight: 'Светлая',
        themeAriaDark: 'Переключить на тёмное оформление',
        themeAriaLight: 'Переключить на светлое оформление',
    },
};

function systemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storedTheme() {
    try {
        return localStorage.getItem('theme');
    } catch {
        return null;
    }
}

function storedLang() {
    try {
        const value = localStorage.getItem('lang');
        if (value === 'ru' || value === 'en') return value;
    } catch {
        /* private mode */
    }
    return html.lang === 'ru' ? 'ru' : 'en';
}

function currentTheme() {
    return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function currentLang() {
    return html.lang === 'ru' ? 'ru' : 'en';
}

function persist(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        /* private mode */
    }
}

function suppressThemeTransitions() {
    const style = document.createElement('style');
    style.textContent = '*,*::before,*::after{transition:none!important}';
    document.head.appendChild(style);
    void html.offsetHeight;
    requestAnimationFrame(() => {
        style.remove();
    });
}

function toRgb(color) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    if (!ctx || !color) return color;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);
    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
}

function syncThemeColor() {
    if (!themeColorMeta) return;
    const bg = getComputedStyle(document.body).backgroundColor;
    if (bg) themeColorMeta.content = toRgb(bg);
}

function syncThemeToggle() {
    if (!themeToggle) return;
    const copy = META[currentLang()];
    const isDark = currentTheme() === 'dark';
    const next = isDark ? 'light' : 'dark';
    themeToggle.textContent = next === 'dark' ? copy.themeToDark : copy.themeToLight;
    themeToggle.setAttribute('aria-label', next === 'dark' ? copy.themeAriaDark : copy.themeAriaLight);
    themeToggle.setAttribute('aria-pressed', String(isDark));
}

function applyTheme(theme, { persistChoice = false } = {}) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        html.style.colorScheme = 'dark';
    } else {
        html.removeAttribute('data-theme');
        html.style.colorScheme = 'light';
        theme = 'light';
    }

    syncThemeToggle();
    syncThemeColor();

    if (persistChoice) persist('theme', theme);
}

function applyDocumentMeta(lang) {
    const copy = META[lang];
    document.title = copy.title;
    if (descriptionMeta) descriptionMeta.content = copy.description;
    if (ogTitle) ogTitle.content = copy.title;
    if (ogDescription) ogDescription.content = copy.ogDescription;
    if (ogLocale) ogLocale.content = copy.ogLocale;
    if (ogImageAlt) ogImageAlt.content = copy.imageAlt;
    if (twitterTitle) twitterTitle.content = copy.title;
    if (twitterDescription) twitterDescription.content = copy.ogDescription;
    if (twitterImageAlt) twitterImageAlt.content = copy.imageAlt;
}

function applyLanguage(lang, { persistChoice = false } = {}) {
    if (lang !== 'ru') lang = 'en';
    html.lang = lang;

    document.querySelectorAll('[data-en][data-ru]').forEach((el) => {
        const text = el.getAttribute(`data-${lang}`);
        if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-en-aria][data-ru-aria]').forEach((el) => {
        const label = el.getAttribute(`data-${lang}-aria`);
        if (label) el.setAttribute('aria-label', label);
    });

    document.querySelectorAll('[data-en-alt][data-ru-alt]').forEach((el) => {
        const alt = el.getAttribute(`data-${lang}-alt`);
        if (alt) el.setAttribute('alt', alt);
    });

    localeButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });

    applyDocumentMeta(lang);
    syncThemeToggle();

    if (persistChoice) persist('lang', lang);
}

function setupPortraitFallback() {
    const portrait = document.querySelector('.portrait');
    const img = portrait && portrait.querySelector('img');
    if (!portrait || !img) return;

    const fail = () => portrait.classList.add('is-fallback');

    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
}

function setupNavCurrent() {
    const sections = document.querySelectorAll('main section[id]');
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                const id = entry.target.id;
                navLinks.forEach((link) => {
                    const match = link.getAttribute('href') === `#${id}`;
                    if (match) link.setAttribute('aria-current', 'true');
                    else link.removeAttribute('aria-current');
                });
            });
        },
        { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
}

applyLanguage(storedLang());
applyTheme(storedTheme() || systemTheme());
setupPortraitFallback();
setupNavCurrent();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        suppressThemeTransitions();
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', { persistChoice: true });
    });
}

localeButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang === 'ru' ? 'ru' : 'en';
        if (lang === currentLang()) return;
        applyLanguage(lang, { persistChoice: true });
    });
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (storedTheme()) return;
    suppressThemeTransitions();
    applyTheme(event.matches ? 'dark' : 'light');
});
