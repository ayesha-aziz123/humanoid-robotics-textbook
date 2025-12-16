---
# Prompt History Record: Create Urdu Translation Feature Specification

**ID**: 1-urdu-translation-spec
**Title**: Create Urdu Translation Feature Specification
**Stage**: spec
**Date**: 2025-12-16
**Surface**: agent
**Model**: Claude Sonnet 4.5
**Feature**: urdu-translation
**Branch**: 001-urdu-translation
**User**: Claude Code User

**Command**: sp.specify
**Labels**: ["specification", "urdu", "translation", "docusaurus", "i18n"]

**Links**:
- SPEC: specs/001-urdu-translation/spec.md
- TICKET: null
- ADR: null
- PR: null

**Files**:
- specs/001-urdu-translation/spec.md
- specs/001-urdu-translation/checklists/requirements.md

**Tests**: []

---

## Prompt Text

# Project: Urdu Translation Feature for Physical AI & Humanoid Robotics Textbook

## Overview
Add a complete Urdu translation feature to the existing Docusaurus-based Physical AI & Humanoid Robotics textbook. This will enable users to view all book content in Urdu by clicking a translation button at the start of each chapter.

## Current Project State
- **Location**: `book_source/` directory contains the Docusaurus project
- **Content**: English markdown files in `book_source/docs/` organized by chapters
- **Structure**:
  - `book_source/docs/overview.md`
  - `book_source/docs/chapter-01-foundations/`
  - `book_source/docs/chapter-02-perception/`
  - Multiple lesson files within each chapter directory
- **Framework**: Docusaurus 3.x
- **Existing Features**: RAG chatbot already implemented
- **Skills Available**: `urdu-translator` skill in `.claude/skills/urdu-translator/SKILL.md`

## Requirements

### 1. Docusaurus i18n Configuration
- Configure `book_source/docusaurus.config.ts` to support bilingual content (English and Urdu)
- Set up proper locale configuration:
  - Default locale: English (`en`)
  - Additional locale: Urdu (`ur`)
  - Enable RTL (Right-to-Left) layout for Urdu
- Configure language switcher in the navbar

### 2. Translation Infrastructure Setup
- Run Docusaurus translation scaffolding: `npm run write-translations -- --locale ur`
- Create directory structure: `book_source/i18n/ur/docusaurus-plugin-content-docs/current/`
- Set up theme translation files:
  - `book_source/i18n/ur/code.json`
  - `book_source/i18n/ur/docusaurus-theme-classic/navbar.json`
  - `book_source/i18n/ur/docusaurus-theme-classic/footer.json`

### 3. Content Translation Using urdu-translator Skill
**Use the existing `urdu-translator` skill** from `.claude/skills/urdu-translator/SKILL.md` to:
- Translate ALL markdown files from `book_source/docs/` to Urdu
- Maintain directory structure in `book_source/i18n/ur/docusaurus-plugin-content-docs/current/`
- Preserve:
  - Markdown formatting
  - Code blocks (untranslated)
  - YAML frontmatter structure
  - Technical terminology with Urdu explanations
  - Internal links and references
- Translate:
  - Headings, paragraphs, and body text
  - Frontmatter values (title, description, sidebar_label)
  - Link text
  - Callouts and admonitions content
  - Table content

### 4. UI/UX Features
- Add a **language switcher** in the navbar (English/اردو toggle)
- Implement **"Translate to Urdu" button** at the start of each chapter page
- Button functionality:
  - When clicked, switch to Urdu version of the current page
  - Maintain user's position in the document
  - Update URL to reflect locale change (e.g., `/ur/docs/chapter-01-foundations/`)
- Ensure responsive design works for both LTR (English) and RTL (Urdu) layouts

### 5. Theme and Plugin String Translation
Translate all UI elements:
- Navbar items (Home, Docs, Blog, GitHub, etc.)
- Footer text and links
- Sidebar labels and category names
- Search placeholder text
- Pagination buttons (Previous/Next)
- Edit page link text
- "Back to top" button
- Any custom component labels

### 6. Technical Content Handling
- Keep English technical terms with Urdu explanations in parentheses
  - Example: "Embodied Intelligence (مجسم ذہانت)"
- Preserve acronyms with Urdu expansions
  - Example: "AI (مصنوعی ذہانت - Artificial Intelligence)"
- Never translate:
  - Code syntax, variable names, function names
  - API endpoints and method names
  - File paths and URLs
  - Mathematical notation

### 7. Build and Deployment Configuration
- Update build scripts to include Urdu locale
- Ensure `npm run build` generates both English and Urdu versions
- Configure GitHub Pages deployment to serve multilingual site
- Test deployment with both locales accessible

### 8. Quality Assurance Requirements
- Verify all markdown files have corresponding Urdu translations
- Check for broken internal links in Urdu version
- Ensure code blocks render correctly in RTL layout
- Test search functionality with Urdu content
- Validate UTF-8 encoding throughout
- Generate translation coverage report

### 9. Testing Checklist
Must verify:
- [ ] Docusaurus builds successfully with Urdu locale
- [ ] Language switcher works on all pages
- [ ] "Translate to Urdu" button functions correctly
- [ ] Urdu content displays with proper RTL layout
- [ ] Sidebar navigation is fully translated
- [ ] Code blocks and syntax highlighting work
- [ ] Internal links navigate correctly in Urdu version
- [ ] Search indexes Urdu content
- [ ] Mobile responsive design works for both languages
- [ ] GitHub Pages deployment serves both locales

### 10. Deliverables
1. **Configuration Files**:
   - Updated `book_source/docusaurus.config.ts` with i18n settings
   - Modified `book_source/sidebars.ts` if needed

2. **Translated Content**:
   - Complete Urdu translation files in `book_source/i18n/ur/docusaurus-plugin-content-docs/current/`
   - All theme/plugin JSON translation files

3. **UI Components** (if custom needed):
   - Translation button component
   - Enhanced language switcher (if default is insufficient)

4. **Documentation**:
   - README update with translation feature instructions
   - Translation maintenance guide
   - Technical terms glossary (English-Urdu)

5. **Build Artifacts**:
   - Working multilingual build
   - Deployed site with both English and Urdu accessible

## Success Criteria
- ✅ All book content (100%) is translated to Urdu
- ✅ Users can seamlessly switch between English and Urdu
- ✅ Translation button at chapter start works flawlessly
- ✅ RTL layout displays correctly for Urdu
- ✅ No broken links or formatting issues in Urdu version
- ✅ Site builds and deploys successfully with both locales
- ✅ Mobile experience is excellent for both languages
- ✅ Translation quality is high with proper technical terminology

## Constraints and Considerations
- **Use the urdu-translator skill** - This is mandatory for all translation work
- **Free tools only** - No paid translation APIs
- **Maintain existing features** - RAG chatbot and other features must continue working
- **Performance** - Multilingual site should not significantly impact load times
- **SEO** - Both language versions should be properly indexed
- **Accessibility** - Ensure WCAG compliance for both languages

## Technical Stack
- **Framework**: Docusaurus 3.x
- **Translation Tool**: Custom `urdu-translator` skill (Claude-powered)
- **Build Tool**: npm/Node.js
- **Deployment**: GitHub Pages
- **Styling**: CSS with RTL support

## Priority
**HIGH** - This is a core hackathon requirement worth 50 bonus points

## Dependencies
- Existing Docusaurus setup in `book_source/`
- Node.js and npm installed
- `urdu-translator` skill available in `.claude/skills/urdu-translator/`
- UTF-8 encoding support

## Notes
- This spec should be used with `/sp.plan` to generate detailed implementation tasks
- The urdu-translator skill contains all translation logic and best practices
- Manual review of translated content is recommended for quality assurance
- Consider translating in batches (chapter by chapter) for easier testing

## Response Text

Created comprehensive specification for the Urdu translation feature. The specification includes:

1. Detailed user scenarios with priorities (P1-P3)
2. Comprehensive functional requirements (FR-001 through FR-012)
3. Key entities definition
4. Measurable success criteria (SC-001 through SC-008)
5. Edge cases consideration

The specification addresses all requirements from the user including:
- Bilingual content support with English as default and Urdu as additional locale
- Right-to-left (RTL) layout for Urdu content
- Language switcher in the navbar
- "Translate to Urdu" button at chapter start
- Proper handling of technical terminology with English-Urdu explanations
- Preservation of code blocks in English
- Mobile responsiveness for both languages
- Proper URL handling for locale changes

The specification is written in a technology-agnostic way focusing on user value and business needs rather than implementation details. All mandatory sections are completed and acceptance criteria are clearly defined for each user scenario.

## Outcome

Successfully created a comprehensive specification for the Urdu translation feature that meets all the requirements and is ready for the planning phase.

## Evaluation

The specification is complete, testable, and ready for implementation planning. All user requirements have been translated into clear functional requirements with measurable success criteria.
