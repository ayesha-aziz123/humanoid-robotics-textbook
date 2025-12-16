# Implementation Plan: Urdu Translation Feature

## Technical Context

- **Frontend Framework**: Docusaurus 3.x
- **Content Format**: Markdown files with frontmatter
- **Translation Tool**: Custom `urdu-translator` skill
- **Internationalization**: Docusaurus i18n with English (en) and Urdu (ur) locales
- **Layout Requirements**: Left-to-right (LTR) for English, Right-to-left (RTL) for Urdu
- **File Structure**:
  - Source: `book_source/docs/`
  - Translated: `book_source/i18n/ur/docusaurus-plugin-content-docs/current/`
- **UI Elements**: Navbar, footer, sidebar, search, code blocks, tables

## Constitution Check

Based on `.specify/memory/constitution.md` principles:

- **Performance**: Translation process should not significantly impact site load times
- **Accessibility**: Both languages must be fully accessible with proper RTL support
- **Maintainability**: Translation process should be easily repeatable for future content updates
- **Security**: No user data involved in translation process
- **Quality**: Translation accuracy should maintain educational value of content

## Phase 0: Research & Discovery

### Task 0.1: Docusaurus i18n Configuration Research
- **Decision**: Use Docusaurus built-in i18n plugin with Urdu locale
- **Rationale**: Docusaurus provides robust internationalization support with proper RTL handling
- **Alternatives considered**: Custom translation solution, external services

### Task 0.2: RTL Layout Requirements
- **Decision**: Configure proper RTL CSS for Urdu content
- **Rationale**: Urdu requires right-to-left text direction and layout adjustments
- **Alternatives considered**: LTR-only with translated text

### Task 0.3: Translation Tool Integration
- **Decision**: Use existing `urdu-translator` skill for content translation
- **Rationale**: Pre-built skill available, cost-effective, maintains technical terminology
- **Alternatives considered**: External translation APIs, manual translation

## Phase 1: Architecture & Design

### Data Model: Translation Structure
- **Source Content**: Markdown files with frontmatter in English
- **Translated Content**: Corresponding Urdu files with same structure
- **UI Strings**: JSON files for navbar, footer, and theme elements
- **Locale Configuration**: Docusaurus config with i18n settings

### API Contracts: None required (static site)

### Quickstart Guide
1. Configure Docusaurus for i18n with Urdu locale
2. Generate translation scaffolding
3. Translate content using urdu-translator skill
4. Translate UI elements
5. Test RTL layout and functionality
6. Build and deploy multilingual site

## Phase 2: Implementation Plan

### Task 2.1: Configure Docusaurus i18n
- Update `book_source/docusaurus.config.ts` with Urdu locale
- Enable RTL support for Urdu locale
- Configure language switcher component

### Task 2.2: Generate Translation Infrastructure
- Run Docusaurus translation scaffolding
- Create directory structure for Urdu content
- Generate initial translation files

### Task 2.3: Content Translation
- Translate all markdown files using urdu-translator skill
- Preserve code blocks, frontmatter, and formatting
- Handle technical terminology appropriately

### Task 2.4: UI Translation
- Translate navbar, footer, and theme elements
- Ensure proper UTF-8 encoding

### Task 2.5: Testing & Validation
- Test language switching functionality
- Verify RTL layout display
- Validate build process with both locales

## Re-evaluation: Post-Design Constitution Check

All design decisions align with project constitution:
- Performance: Static site generation maintains performance
- Accessibility: Proper RTL implementation ensures accessibility
- Maintainability: Standard Docusaurus i18n patterns ensure maintainability
- Security: No security concerns with static content translation
- Quality: Careful handling of technical terminology maintains quality