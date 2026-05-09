# Purple Smile - AI Coding Guidelines

## Project Overview
This is a single-page marketing website for Purple Smile, a teeth whitening product. Built with vanilla HTML, CSS, and JavaScript. No frameworks or build tools - serves static files directly.

## Architecture
- **Single-page application**: All content in `index.html` with smooth-scroll navigation
- **Component structure**: Sections (hero, products, how-it-works, reviews, FAQ) with BEM-style CSS classes
- **Payment flow**: QPay modal system with 15-minute QR timer and success confirmation

## Key Patterns

### CSS Conventions
- **BEM naming**: Use double underscores for elements (`.nav__logo`), double dashes for modifiers (`.btn--primary`)
- **CSS variables**: Define colors, fonts, shadows in `:root` (e.g., `--deep-purple`, `--font-display`)
- **Responsive design**: Mobile-first with `.container` max-width 1160px, 24px padding

### JavaScript Patterns
- **Event delegation**: Attach listeners to document or parent elements where possible
- **Data attributes**: Use `data-*` for product info (e.g., `data-product`, `data-price`) to drive dynamic content
- **Modal system**: Overlay pattern with body overflow hidden, escape key handling
- **Animations**: IntersectionObserver for scroll-triggered opacity/translate effects

### HTML Structure
- **Semantic sections**: Use `<section>` with IDs for navigation anchors
- **Accessibility**: ARIA labels, proper button roles, keyboard navigation
- **Inline SVGs**: Custom icons and logos embedded directly

## Development Workflow
- **No build process**: Edit files directly, refresh browser to test
- **Local testing**: Open `index.html` in browser (Chrome recommended for smooth scrolling)
- **Mobile testing**: Resize window or use dev tools device mode

## Common Tasks
- **Add product**: Create `.pcard` article in products grid, add `data-product`/`data-price` to buy button
- **Update pricing**: Change `data-price` attributes and display text in HTML
- **Modify colors**: Update CSS variables in `:root` for theme changes
- **Add section**: Insert new `<section>` with `.container` > content structure

## File Organization
- `index.html`: Main markup with all sections
- `style.css`: All styles, variables, responsive rules
- `script.js`: Interactions, modals, animations
- `brand_assets/`: Reserved for future assets (currently empty)

## Dependencies
- **Fonts**: Google Fonts (Fraunces, Inter) loaded via CDN
- **No JS libraries**: Pure vanilla JavaScript
- **No package manager**: No `package.json` or dependencies

## Performance Notes
- **Lazy animations**: Elements animate in on scroll using IntersectionObserver
- **Minimal JS**: ~160 lines total, focused on UX enhancements
- **Optimized images**: Use inline SVGs for icons, plan for WebP in brand_assets</content>
<parameter name="filePath">/Users/enkhmendbatsaikhan/purple smile/.github/copilot-instructions.md