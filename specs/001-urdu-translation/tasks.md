# Implementation Tasks: Urdu Translation Feature

## Feature Overview

**Feature Name**: Urdu Translation for Physical AI & Humanoid Robotics Textbook
**Priority User Stories**: US1 (P1) → US2 (P2) → US3 (P3)
**MVP Scope**: US1 only (Language switching functionality)
**Total Tasks**: 45
**Estimated Completion Time**: 8-10 hours

## Implementation Strategy

This implementation follows a phased approach where each user story builds on the previous work but remains independently testable. The strategy prioritizes core functionality first (US1), then adds granular translation features (US2), and finally ensures proper formatting and technical term handling (US3).

**MVP Focus**: Complete US1 first to deliver core value - language switching between English and Urdu with proper RTL support.

## Dependencies

- **US1 (P1)**: Core language switching functionality - Foundation for all other stories
- **US2 (P2)**: Depends on US1 infrastructure, adds chapter-level translation
- **US3 (P3)**: Depends on US1/US2 infrastructure, ensures proper content formatting

## Parallel Execution Opportunities

- Within each user story, content translation tasks can run in parallel (different files)
- UI translation tasks can run in parallel with content translation
- Testing and validation can happen in parallel with implementation

---

## Phase 1: Setup & Configuration

### Goal
Initialize the Docusaurus i18n infrastructure and create the basic project structure for Urdu translation support.

- [X] T001 Set up Docusaurus i18n configuration in book_source/docusaurus.config.ts with Urdu locale
- [X] T002 [P] Create directory structure: book_source/i18n/ur/docusaurus-plugin-content-docs/current/
- [X] T003 [P] Create theme translation directories: book_source/i18n/ur/docusaurus-theme-classic/
- [X] T004 Install required dependencies for RTL support if not already present
- [X] T005 Generate initial translation scaffolding using Docusaurus CLI

---

## Phase 2: Foundational Infrastructure

### Goal
Implement core infrastructure that supports all user stories: locale configuration, RTL styling, and basic translation framework.

- [X] T006 Configure Urdu locale with RTL support in docusaurus.config.ts
- [X] T007 [P] Create navbar.json for Urdu UI translations in book_source/i18n/ur/docusaurus-theme-classic/
- [X] T008 [P] Create footer.json for Urdu UI translations in book_source/i18n/ur/docusaurus-theme-classic/
- [X] T009 Add language switcher to navbar in docusaurus.config.ts
- [X] T010 Create custom CSS for RTL support in book_source/src/css/custom.css
- [X] T011 [P] Create code.json for code block and UI element translations
- [X] T012 Test basic locale switching functionality locally

---

## Phase 3: User Story 1 - Switch Between English and Urdu Content (P1)

### Story Goal
Enable users to switch between English and Urdu languages with proper RTL layout for Urdu content.

### Independent Test Criteria
Can be fully tested by selecting Urdu from the language switcher and verifying that all UI elements and content display in Urdu, then switching back to English and verifying content returns to English.

- [X] T013 [US1] Update docusaurus.config.ts to properly configure Urdu locale with RTL direction
- [X] T014 [US1] Implement language switcher component in navbar with English/اردو toggle
- [X] T015 [US1] Add RTL CSS rules for proper Urdu text direction in custom.css
- [X] T016 [US1] Test language switcher functionality locally with --locale ur flag
- [X] T017 [US1] [P] Verify all UI elements display properly in Urdu with RTL layout
- [X] T018 [US1] [P] Verify content displays with proper RTL formatting
- [X] T019 [US1] Test navigation between languages maintains proper layout
- [X] T020 [US1] Validate that URLs update correctly with locale changes
- [X] T021 [US1] Confirm mobile responsiveness works for both language layouts

---

## Phase 4: User Story 2 - Access Urdu Translated Content by Chapter (P2)

### Story Goal
Allow users to translate individual chapters to Urdu by clicking a button at the start of each chapter, maintaining their position in the document.

### Independent Test Criteria
Can be fully tested by clicking the "Translate to Urdu" button on any chapter page and verifying that the content switches to Urdu while maintaining scroll position, then verifying navigation still works correctly.

- [X] T022 [US2] Implement "Translate to Urdu" button component at chapter start
- [X] T023 [US2] [P] Translate overview.md to Urdu and place in i18n/ur/docusaurus-plugin-content-docs/current/
- [X] T024 [US2] [P] Translate all chapter files from book_source/docs/ to i18n/ur/docusaurus-plugin-content-docs/current/
- [X] T025 [US2] [P] Ensure all frontmatter (title, description, sidebar_label) is translated for each chapter
- [X] T026 [US2] [P] Verify internal links in translated content point to Urdu versions
- [X] T027 [US2] Preserve code blocks in English within translated content
- [X] T028 [US2] Maintain scroll position when switching languages mid-document
- [X] T029 [US2] Test chapter navigation works correctly in both languages
- [X] T030 [US2] Verify translation button functionality on all chapter pages

---

## Phase 5: User Story 3 - View Properly Formatted Urdu Content (P3)

### Story Goal
Ensure Urdu content is properly formatted with technical terminology explained in Urdu context, maintaining educational value.

### Independent Test Criteria
Can be fully tested by viewing various content types (text, code blocks, tables, technical explanations) in Urdu and verifying proper formatting and layout.

- [X] T031 [US3] [P] Review and update technical terminology handling in translated content
- [X] T032 [US3] [P] Ensure code blocks remain in English but are properly formatted in RTL context
- [X] T033 [US3] [P] Translate technical terms with English explanations in parentheses (e.g., "Embodied Intelligence (مجسم ذہانت)")
- [X] T034 [US3] [P] Preserve mathematical formulas and equations in translated content
- [X] T035 [US3] [P] Ensure tables and diagrams display properly in RTL layout
- [X] T036 [US3] [P] Verify callouts and admonitions render correctly in Urdu
- [X] T037 [US3] [P] Test complex content elements (lists, nested structures) in RTL
- [X] T038 [US3] Validate UTF-8 encoding throughout all Urdu content
- [X] T039 [US3] Test search functionality works with Urdu content
- [X] T040 [US3] Confirm accessibility standards are maintained for Urdu content

---

## Phase 6: Testing & Validation

### Goal
Comprehensive testing and validation of all functionality across both languages.

- [X] T041 Test complete site build with both English and Urdu locales
- [X] T042 [P] Verify all translated content builds without errors
- [X] T043 Test language switching functionality across all pages
- [X] T044 Validate RTL layout on all page types (docs, index, etc.)
- [X] T045 Check for broken links in Urdu version
- [X] T046 Verify mobile responsiveness for both languages
- [X] T047 Test search functionality with Urdu content
- [X] T048 Generate translation coverage report
- [X] T049 Perform accessibility audit for Urdu content

---

## Phase 7: Polish & Cross-Cutting Concerns

### Goal
Final refinements and deployment preparation.

- [X] T050 Update README with multilingual instructions
- [X] T051 Create technical terms glossary (English-Urdu)
- [X] T052 Document translation maintenance process
- [X] T053 Optimize build process for multi-language site
- [X] T054 Test deployment with both locales
- [X] T055 Final end-to-end testing of all features
- [X] T056 Create deployment checklist for multilingual site

