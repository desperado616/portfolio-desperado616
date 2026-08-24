# Pavel Khaliullin - Professional Portfolio

**Modern, accessible, performant portfolio for Full-Stack / AI Developer**

## ✨ Features

### Core Functionality
- 🌐 **Bilingual Interface** (EN/RU) - Full content translation
- 🌓 **Dark/Light Mode** - Respects system preference with manual override
- 📱 **Fully Responsive** - Mobile-first design, works on all devices
- ♿ **WCAG 2.1 AA Compliant** - Accessible to all users

### Technical Highlights
- ⚡ **Performance Optimized** - Fast loading, smooth scrolling
- 🎯 **Semantic HTML5** - Proper document structure for SEO and accessibility
- 🎨 **Modern Design System** - Consistent color tokens, spacing scale, typography
- ⌨️ **Keyboard Navigation** - Full keyboard support with visible focus indicators
- 🔍 **SEO Optimized** - Open Graph, Twitter Cards, JSON-LD structured data

### Interactions
- 🖱️ **Smooth Animations** - Subtle, purposeful motion (respects `prefers-reduced-motion`)
- 📜 **Scroll Progress Bar** - Visual feedback on page position
- 🔝 **Back to Top** - Quick navigation button
- ⌨️ **Keyboard Shortcuts**:
  - `Ctrl+K` / `Cmd+K` - Toggle theme
  - `Ctrl+L` / `Cmd+L` - Switch language
  - `Esc` - Scroll to top

## 🚀 Quick Start

Simply open `index.html` in a modern browser. No build process required.

```bash
# Or serve with a local server
npx serve .
# or
python -m http.server 8000
```

## 📂 Project Structure

```
portfolio/
├── index.html      # Main HTML document (semantic, accessible)
├── style.css       # Modern CSS with design system tokens
├── script.js       # Vanilla JavaScript (no dependencies)
├── photo.jpg       # Profile photo
└── README.md       # This file
```

## 🎨 Design System

### Color Tokens
- Proper semantic naming (`--color-text-primary`, `--color-bg-surface`)
- Separate light/dark theme palettes
- WCAG AA contrast compliance

### Typography Scale
- Consistent sizing: 0.75rem → 3rem
- Proper line-height for readability
- Optimized letter-spacing

### Spacing Scale
- 4px base unit (0.25rem → 5rem)
- Consistent visual rhythm
- Predictable layout

## ♿ Accessibility Features

- ✅ Semantic landmarks (`<main>`, `<nav>`, `<section>`, `<article>`)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ ARIA labels on interactive controls
- ✅ Visible focus indicators (3px outline)
- ✅ Skip to main content link
- ✅ Keyboard navigation support
- ✅ `prefers-reduced-motion` respect
- ✅ Screen reader tested structure
- ✅ Alt text on images
- ✅ Sufficient color contrast (4.5:1 minimum)

## 🔧 Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

Graceful degradation for older browsers:
- IntersectionObserver fallback
- CSS custom properties with fallbacks
- localStorage error handling

## 📈 Performance

- Optimized font loading (`font-display: swap`)
- Image preloading for hero section
- Throttled scroll handlers
- Minimal JavaScript (< 5KB)
- No external dependencies
- CSS-only animations where possible

## 🔍 SEO Features

- Semantic HTML structure
- Open Graph meta tags
- Twitter Card meta tags
- JSON-LD structured data (Person schema)
- Canonical URLs
- Alternate language tags (hreflang)
- Descriptive meta tags
- Clean URL structure

## 📧 Contact

- **Email**: [pasha.174xaliyllin@gmail.com](mailto:pasha.174xaliyllin@gmail.com)
- **Telegram**: [@deathqwe](https://t.me/deathqwe)
- **GitHub**: [desperado616](https://github.com/desperado616)
- **Portfolio**: [portfolio-desperado616.vercel.app](https://portfolio-desperado616.vercel.app/)

## 📝 License

© 2026 Pavel Khaliullin. All rights reserved.

---

**Built with:** Vanilla HTML, CSS, JavaScript - No frameworks, no build tools, just clean code.
