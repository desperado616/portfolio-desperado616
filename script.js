'use strict';

const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

const PAPER = {
    light: '#f6f5f1',
    dark: '#2c2622',
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

function currentTheme() {
    return html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
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

function applyTheme(theme, { persist = false } = {}) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
    } else {
        html.removeAttribute('data-theme');
        theme = 'light';
    }

    if (themeColorMeta) {
        themeColorMeta.content = PAPER[theme];
    }

    if (themeToggle) {
        const next = theme === 'dark' ? 'light' : 'dark';
        const label = next === 'dark' ? 'Dark' : 'Light';
        themeToggle.textContent = label;
        themeToggle.setAttribute('aria-label', `Switch to ${next} appearance`);
    }

    if (persist) {
        try {
            localStorage.setItem('theme', theme);
        } catch {
            /* private mode */
        }
    }
}

applyTheme(storedTheme() || systemTheme());

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        suppressThemeTransitions();
        applyTheme(currentTheme() === 'dark' ? 'light' : 'dark', { persist: true });
    });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
    if (storedTheme()) return;
    suppressThemeTransitions();
    applyTheme(event.matches ? 'dark' : 'light');
});
