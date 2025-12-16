# Data Model: Urdu Translation Feature

## Entities

### 1. Source Content
- **Name**: SourceContent
- **Description**: Original English markdown content files
- **Fields**:
  - id: Unique identifier based on file path
  - filePath: Original location in `book_source/docs/`
  - content: Markdown text content
  - frontmatter: YAML metadata (title, description, sidebar_label, etc.)
  - codeBlocks: Preserved English code segments
  - internalLinks: Relative links to other documentation pages
- **Validation**: Must be valid markdown with proper frontmatter structure

### 2. Translated Content
- **Name**: TranslatedContent
- **Description**: Urdu translation of source content files
- **Fields**:
  - id: Matches source content identifier
  - sourceId: Reference to original content
  - filePath: Location in `book_source/i18n/ur/docusaurus-plugin-content-docs/current/`
  - content: Urdu markdown content with preserved formatting
  - frontmatter: Translated metadata (title, description, sidebar_label in Urdu)
  - codeBlocks: Preserved English code segments (unchanged from source)
  - internalLinks: Updated to point to Urdu versions of linked content
  - rtlFormatting: Right-to-left text direction indicators
- **Validation**: Must maintain document structure and link integrity

### 3. Locale Configuration
- **Name**: LocaleConfiguration
- **Description**: Internationalization settings for the Docusaurus site
- **Fields**:
  - localeCode: Locale identifier (e.g., "en", "ur")
  - languageName: Display name for the language
  - isRTL: Boolean indicating right-to-left text direction
  - direction: Text direction ("ltr" or "rtl")
  - path: URL path prefix for the locale
  - label: Display label for language switcher
- **Validation**: Must include all required locale settings for Docusaurus i18n

### 4. UI Translation Elements
- **Name**: UITranslation
- **Description**: Translated user interface elements for different languages
- **Fields**:
  - id: Unique identifier for the UI element
  - key: Reference key used by Docusaurus theme (e.g., "theme.navbar.home", "theme.docs.sidebar.category.tutorials")
  - sourceText: Original English text
  - translatedText: Urdu translation of the text
  - context: Description of where this text appears in the UI
  - locale: Target locale code ("ur")
- **Validation**: Must be valid JSON format compatible with Docusaurus theme translation system

### 5. Translation Mapping
- **Name**: TranslationMapping
- **Description**: Relationship between source and translated content
- **Fields**:
  - sourcePath: Path to original English file
  - translatedPath: Path to Urdu translation file
  - locale: Target locale ("ur")
  - status: Translation status (pending, in-progress, completed, reviewed)
  - lastUpdated: Timestamp of last translation update
  - translator: Tool or method used for translation
- **Validation**: Both paths must exist and be accessible

## Relationships

1. **SourceContent** → **TranslatedContent** (1:1)
   - Each source content item has exactly one corresponding translated content item in Urdu

2. **LocaleConfiguration** → **TranslatedContent** (1:many)
   - One locale configuration applies to many translated content items

3. **UITranslation** → **LocaleConfiguration** (many:1)
   - Many UI translation elements belong to one locale configuration

4. **TranslationMapping** → **SourceContent** & **TranslatedContent** (1:2)
   - One mapping record connects one source and one translated content item

## State Transitions

### Translation Process States
- **pending**: Translation has not yet started
- **in-progress**: Translation is being processed by the urdu-translator skill
- **completed**: Translation is finished but not yet reviewed
- **reviewed**: Translation has been reviewed and approved for publication

## Validation Rules

1. **Content Structure Validation**:
   - Source and translated content must maintain the same document structure
   - Code blocks in translated content must remain identical to source
   - Internal links in translated content must point to translated versions of target documents

2. **Locale Configuration Validation**:
   - Each locale must have a unique code
   - RTL locales must have proper direction settings
   - Default locale must be specified

3. **UI Translation Validation**:
   - All required UI elements must have translations for each locale
   - Translated text must not exceed display limitations of UI components