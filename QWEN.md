# Cadre Project Context

## Project Overview
Cadre is a static company website built with vanilla HTML, CSS, and JavaScript. It serves as a professional web presence showcasing services, company information, and contact capabilities.

## Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **No build system** - direct static files
- **Assets**: Images, logos, documents stored in `/assets`
- **Pages**: Modular HTML pages in `/pages`

## Project Structure
```
cadre/
├── index.html          # Homepage
├── script.js           # Main JavaScript logic
├── style.css           # Global styles
├── assets/
│   ├── images/         # General images
│   ├── logos/          # Brand assets (cadre-logo.png)
│   └── documents/      # Downloadable documents
└── pages/
    ├── about.html      # Company info & three-pillar highlights
    ├── contact.html    # Contact form with email submission
    └── services.html   # Service offerings
```

## Key Features
1. **Subcontractor Onboarding Modal** - Interactive modal with contract review and application form
2. **Contact Form** - Email submission endpoint integration
3. **About Section** - Company messaging with three-pillar highlights
4. **Brand Identity** - Cadre logo and consistent branding

## Recent Development History
- **998a7aa**: Added interactive Subcontractor Onboarding Modal with contract review and application form
- **20fce6b**: Integrated email submission endpoint for contact form
- **8a40412**: Removed address from contact info
- **6d32538**: Updated About section with new company messaging and three-pillar highlights
- **621f3ce**: Added Cadre logo and branding

## Conventions
- **Naming**: kebab-case for files, camelCase for JS functions/variables
- **CSS**: BEM-inspired class naming, mobile-first responsive design
- **JS**: Modular functions, event delegation for dynamic elements
- **Git**: Conventional commits (feat, fix, chore, etc.)

## Development Notes
- No package.json or build tools - direct file editing
- Test by opening index.html in browser
- All paths relative to project root
- Assets referenced from `/assets/` directory