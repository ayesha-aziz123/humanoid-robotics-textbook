# API Contracts: Urdu Translation Feature

## Overview
This project is a static site translation feature for Docusaurus, so it does not include traditional API endpoints. The translation functionality is implemented through static site generation and client-side language switching.

## Static Content Contracts

### Content Structure Contract
- **Request**: N/A (static content)
- **Response**:
  - Format: Markdown with YAML frontmatter
  - Fields: title, description, sidebar_label, content
  - Validation: Must be valid markdown with proper frontmatter

### Locale Configuration Contract
- **Request**: N/A (configured in docusaurus.config.ts)
- **Response**:
  - Format: JavaScript/TypeScript configuration object
  - Fields: localeCode, label, direction (ltr/rtl), path
  - Validation: Must conform to Docusaurus i18n plugin requirements

## Client-Side Translation Contract
- **Request**: Language switch event from user interface
- **Response**: Updated content display in selected language
- **Format**: Client-side content replacement
- **Validation**: Content must maintain structure and links integrity