# Quickstart Guide: Urdu Translation Feature

## Prerequisites
- Node.js and npm installed
- Docusaurus project set up in `book_source/` directory
- Urdu translator skill available

## Setup Steps

### 1. Configure Docusaurus i18n
```bash
# Update docusaurus.config.ts with Urdu locale configuration
# Enable RTL support for Urdu
# Add language switcher to navbar
```

### 2. Generate Translation Infrastructure
```bash
# Run Docusaurus translation scaffolding
cd book_source
npm run write-translations -- --locale ur
```

### 3. Translate Content
```bash
# Use urdu-translator skill to translate all markdown files
# Process files from book_source/docs/ to book_source/i18n/ur/docusaurus-plugin-content-docs/current/
```

### 4. Translate UI Elements
```bash
# Translate navbar, footer, and theme JSON files in i18n/ur/ directory
# Ensure proper UTF-8 encoding for Urdu text
```

### 5. Test the Implementation
```bash
# Start development server with Urdu locale
npm run start -- --locale ur

# Or build and serve both locales
npm run build
npm run serve
```

## Key Configuration Files
- `book_source/docusaurus.config.ts` - Main configuration with locale settings
- `book_source/i18n/ur/` - Urdu translation files
- `book_source/sidebars.ts` - Sidebar navigation (may need translation)

## Directory Structure
```
book_source/
├── docs/                          # English source content
├── i18n/
│   └── ur/                        # Urdu translations
│       ├── docusaurus-plugin-content-docs/
│       │   └── current/          # Translated markdown files
│       └── docusaurus-theme-classic/
│           ├── navbar.json       # Navbar translations
│           └── footer.json       # Footer translations
└── src/
    └── css/
        └── custom.css            # RTL styling if needed
```

## Testing Checklist
- [ ] Language switcher works in navbar
- [ ] Urdu content displays with RTL layout
- [ ] Code blocks remain in English and are readable
- [ ] Internal links work in Urdu version
- [ ] Sidebar navigation is translated
- [ ] Search works with Urdu content
- [ ] Mobile responsiveness works for both languages
- [ ] Build process succeeds with both locales