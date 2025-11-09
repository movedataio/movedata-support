# MoveData Support - Utility Scripts

This directory contains Node.js utility scripts for processing and migrating markdown documentation, particularly for converting GitBook content to MkDocs Material format.

## Table of Contents

- [convert-embeds.js](#convert-embedsjs) - Convert GitBook embed tags to HTML iframes
- [convert-file-embed.js](#convert-file-embedjs) - Convert GitBook file embeds to MkDocs download components
- [convert-frontmatter.js](#convert-frontmatterjs) - Extract YAML frontmatter descriptions into markdown body
- [convert-hints.js](#convert-hintsjs) - Convert GitBook hints to MkDocs admonitions
- [convert-lists.js](#convert-listsjs) - Convert bold text lines to markdown lists
- [convert-metadata.js](#convert-metadatajs) - Convert note metadata blocks to YAML frontmatter
- [convert-nav.js](#convert-navjs) - Convert markdown TOC to MkDocs YAML navigation
- [generate-index.js](#generate-indexjs) - Generate markdown index pages from directory contents
- [generate-metadata-aws.js](#generate-metadata-awsjs) - Generate AWS Bedrock metadata sidecar files
- [migrate-images.js](#migrate-imagesjs) - Migrate GitBook images to MkDocs structure
- [update-fullwidth.js](#update-fullwidthjs) - Update frontmatter to hide navigation

---

## convert-embeds.js

**Purpose**: Converts GitBook-style embed tags to HTML iframe elements, with special handling for YouTube videos.

**Usage**:
```bash
node convert-embeds.js <contentPath> [--dry-run]
```

**Examples**:
```bash
node convert-embeds.js ./docs
node convert-embeds.js ./lib/docs/documentation --dry-run
```

**What it does**:
- Scans all `.md` files recursively
- Finds `{% embed url="..." %}` tags
- Extracts YouTube video IDs from various URL formats
- Converts to responsive HTML iframes
- For non-YouTube URLs, creates generic iframes

**Input**:
```markdown
{% embed url="https://www.youtube.com/watch?v=ABC123" %}
```

**Output**:
```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/ABC123" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
```

---

## convert-file-embed.js

**Purpose**: Converts GitBook file embed tags to MkDocs Material download card components, migrating files from GitBook assets to the MkDocs structure.

**Usage**:
```bash
node convert-file-embed.js <key> <contentPath> [--dry-run]
```

**Examples**:
```bash
node convert-file-embed.js user_guide ./lib/docs/user_guide
node convert-file-embed.js documentation ./lib/docs/documentation --dry-run
```

**What it does**:
1. Creates target directory: `lib/docs/assets/files/<key>/`
2. Copies files (CSV, Excel, PDF, JSON, XML, ZIP, etc.) from `.gitbook/assets`
3. Updates markdown references to use new paths
4. Creates styled download card components
5. Cleans up original GitBook assets
6. Ensures CSS stylesheet exists for download cards

**Input**:
```markdown
{% file src="../.gitbook/assets/sample.csv" %}
```

**Output**:
```html
<div class="file-download-card">
  <div class="file-download-icon">📊</div>
  <div class="file-download-content">
    <div class="file-download-title">sample.csv</div>
    <div class="file-download-meta">CSV File • 1.2 MB</div>
  </div>
  <a href="/assets/files/user_guide/sample.csv" download class="file-download-button">
    <span class="file-download-button-icon">⬇</span>
    Download
  </a>
</div>
```

---

## convert-frontmatter.js

**Purpose**: Extracts YAML frontmatter descriptions and places them in the markdown body after the first H1 heading, while retaining the frontmatter.

**Usage**:
```bash
node convert-frontmatter.js <contentPath> [--dry-run]
```

**Examples**:
```bash
node convert-frontmatter.js ./docs
node convert-frontmatter.js ./lib/docs/documentation --dry-run
```

**What it does**:
- Parses YAML frontmatter between `---` delimiters
- Extracts multi-line description fields (using `>-` syntax)
- Retains frontmatter at the top of the file
- Inserts description after the first H1 heading
- If no H1 exists, prepends description after frontmatter

**Input**:
```markdown
---
title: My Page
description: >-
  This is a detailed description
  of what this page contains.
author: John Doe
---

# Welcome to My Page

This is the main content.
```

**Output**:
```markdown
---
title: My Page
description: >-
  This is a detailed description
  of what this page contains.
author: John Doe
---

# Welcome to My Page

This is a detailed description
of what this page contains.

This is the main content.
```

---

## convert-hints.js

**Purpose**: Converts GitBook hint/callout blocks to MkDocs Material admonition format.

**Usage**:
```bash
node convert-hints.js <contentPath> [--dry-run]
```

**Examples**:
```bash
node convert-hints.js ./docs
node convert-hints.js ./lib/docs/documentation --dry-run
```

**Supported hint types**:
- `info` → `note`
- `warning` → `warning`
- `danger` → `danger`
- `success` → `success`
- `tip` → `tip`

**Input**:
```markdown
{% hint style="info" %}
**Important**: This is a helpful tip about the feature.

Make sure to read this carefully.
{% endhint %}
```

**Output**:
```markdown
!!! note "Important"
    This is a helpful tip about the feature.
    
    Make sure to read this carefully.
```

---

## convert-lists.js

**Purpose**: Converts blocks of bold text lines with line breaks into proper markdown list format.

**Usage**:
```bash
node convert-lists.js <contentPath> [--dry-run] [--debug]
```

**Examples**:
```bash
node convert-lists.js ./docs
node convert-lists.js ./lib/docs/documentation --dry-run --debug
```

**What it does**:
- Identifies blocks where all lines start with `**Label:**`
- Converts each line to a markdown list item
- Removes trailing backslashes used for line breaks
- Preserves the bold formatting

**Input**:
```markdown
**Field Name:** The name of the field\
**Data Type:** String or Number\
**Required:** Yes or No\
```

**Output**:
```markdown
- **Field Name:** The name of the field
- **Data Type:** String or Number
- **Required:** Yes or No
```

---

## convert-metadata.js

**Purpose**: Converts MkDocs Material note blocks containing metadata into YAML frontmatter format.

**Usage**:
```bash
node convert-metadata.js <contentPath> [--dry-run] [--debug]
```

**Examples**:
```bash
node convert-metadata.js ./docs
node convert-metadata.js ./docs --dry-run --debug
```

**What it does**:
- Finds note blocks with metadata (key=value pairs)
- Parses metadata into structured format
- Merges with existing frontmatter if present
- Removes the note block from content
- Handles arrays, numbers, booleans, and strings

**Input**:
```markdown
# My Page

!!! note
    Metadata
    
    * category=documentation
    * tags=getting-started, tutorial
    * version=2.0

This is the page content.
```

**Output**:
```markdown
---
category: documentation
tags:
  - getting-started
  - tutorial
version: 2.0
---

# My Page

This is the page content.
```

---

## convert-nav.js

**Purpose**: Converts a markdown table of contents (SUMMARY.md style) into MkDocs YAML navigation format.

**Usage**:
```bash
node convert-nav.js <input.md> <sectionName> <contentPath> [indent]
```

**Examples**:
```bash
node convert-nav.js SUMMARY.md "User Guide" documentation
node convert-nav.js SUMMARY.md "Developer Docs" developer 2
```

**What it does**:
- Parses markdown list structure with nested items
- Detects sections (H2 headings)
- Validates that linked files have substantial content
- Converts to proper YAML navigation format
- Handles both flat lists and hierarchical structures
- Converts MoveData domain URLs to absolute paths
- Escapes special YAML characters

**Input (SUMMARY.md)**:
```markdown
# Table of contents

* [Introduction](README.md)

## Getting Started

* [Quick Start](getting-started/quickstart.md)
  * [Installation](getting-started/installation.md)
  * [Configuration](getting-started/configuration.md)
```

**Output**:
```yaml
  - User Guide:
    - Introduction: documentation/README.md
    - Getting Started:
      - Quick Start: documentation/getting-started/quickstart.md
      - Installation: documentation/getting-started/installation.md
      - Configuration: documentation/getting-started/configuration.md
```

---

## generate-index.js

**Purpose**: Recursively scans a directory for markdown files and generates an index page with organized links.

**Usage**:
```bash
node generate-index.js [options]
```

**Options**:
- `--websiteRootFolder <path>` - Root folder to scan (default: ./lib/docs)
- `--includeFolderFilter <path>` - Specific subfolder to include
- `--title <string>` - Title for the generated index
- `--outputName <path>` - Output file path for the index
- `--metadataGroup <field>` - Group by metadata field (optional)
- `--dry-run` - Show what would be generated without writing

**Examples**:
```bash
# Alphabetical index
node generate-index.js \
  --includeFolderFilter knowledgebase \
  --title "All Knowledge Base Articles" \
  --outputName ./lib/docs/knowledgebase/index_alphabetical.md

# Grouped by category
node generate-index.js \
  --includeFolderFilter knowledgebase \
  --title "Articles by Category" \
  --outputName ./lib/docs/knowledgebase/index_category.md \
  --metadataGroup category
```

**Features**:
- Extracts titles from frontmatter or H1 headings
- Groups files by metadata fields
- Sorts alphabetically within groups
- Ignores `index_*.md` files
- Converts group names to proper case
- Hides navigation in generated index

---

## generate-metadata-aws.js

**Purpose**: Generates AWS Bedrock Knowledge Base metadata sidecar files by extracting YAML frontmatter and creating `.metadata.json` files.

**Usage**:
```bash
node generate-metadata-aws.js <contentPath> [--dry-run] [--debug]
```

**Examples**:
```bash
node generate-metadata-aws.js ./docs
node generate-metadata-aws.js ./docs --dry-run --debug
```

**What it does**:
1. Extracts YAML frontmatter from markdown files
2. Filters out GitBook layout metadata (non-searchable content)
3. Adds path-based metadata (section, category, file path)
4. Creates structured metadata for AWS Bedrock
5. Generates `.metadata.json` sidecar files
6. Removes frontmatter from original markdown files
7. Validates and cleans metadata for AWS requirements

**Path-based metadata extracted**:
- `section` - Determined from directory structure (knowledgebase, developer, documentation, etc.)
- `category` - Subdirectory within section
- `file_path` - Relative path from root
- `extension_type` or `schema_type` - For specialized content

**Output structure** (`.metadata.json`):
```json
{
  "metadataAttributes": {
    "filename": "example",
    "file_path": "docs/example.md",
    "section": "documentation",
    "category": "getting-started",
    "tags": ["tutorial", "quickstart"],
    "processed_date": "2025-11-07",
    "content_type": "documentation",
    "source_system": "movedata-support"
  }
}
```

---

## migrate-images.js

**Purpose**: Migrates images from GitBook `.gitbook/assets` directory to MkDocs Material structure and updates all references.

**Usage**:
```bash
node migrate-images.js <key> <contentPath> [--dry-run]
```

**Examples**:
```bash
node migrate-images.js documentation ./lib/docs/documentation
node migrate-images.js user_guide ./lib/docs/user_guide --dry-run
```

**What it does**:
1. Creates target directory: `lib/docs/assets/images/<key>/`
2. Copies image files (PNG, JPG, GIF, SVG, WebP, ICO)
3. Updates markdown image references:
   - HTML `<img>` tags
   - Markdown `![alt](path)` syntax
   - Markdown with angle brackets `![alt](<path>)`
4. Handles multiple levels of `../` in paths
5. Cleans up original GitBook assets directory

**Path transformations**:
```
Before: ../.gitbook/assets/screenshot.png
After:  /assets/images/documentation/screenshot.png

Before: ../../.gitbook/assets/diagram.svg
After:  /assets/images/documentation/diagram.svg
```

---

## update-fullwidth.js

**Purpose**: Updates YAML frontmatter in markdown files to hide navigation, enabling full-width page layout.

**Usage**:
```bash
node update-fullwidth.js <folderPath> [--dry-run]
```

**Examples**:
```bash
node update-fullwidth.js ./lib/docs/knowledgebase
node update-fullwidth.js ./content --dry-run
```

**What it does**:
- Ensures all markdown files have `hide: [navigation]` in frontmatter
- Creates frontmatter if none exists
- Merges with existing frontmatter
- Avoids duplicates in hide arrays
- Preserves all existing frontmatter fields

**Transformations**:

**No frontmatter → Add frontmatter**:
```markdown
# My Page
Content here
```
Becomes:
```markdown
---
hide:
  - navigation
---

# My Page
Content here
```

**Existing frontmatter → Merge**:
```markdown
---
title: My Page
hide:
  - toc
---
```
Becomes:
```markdown
---
title: My Page
hide:
  - toc
  - navigation
---
```

---

## General Usage Patterns

### Dry Run Mode

All scripts support `--dry-run` mode to preview changes without modifying files:

```bash
node <script-name>.js <args> --dry-run
```

### Debug Mode

Some scripts support `--debug` mode for detailed logging:

```bash
node <script-name>.js <args> --debug
```

### Typical Migration Workflow

When migrating from GitBook to MkDocs Material:

1. **Convert navigation structure**:
   ```bash
   node convert-nav.js SUMMARY.md "Documentation" ./docs
   ```

2. **Migrate images**:
   ```bash
   node migrate-images.js documentation ./docs
   ```

3. **Migrate file downloads**:
   ```bash
   node convert-file-embed.js documentation ./docs
   ```

4. **Convert content formatting**:
   ```bash
   node convert-hints.js ./docs
   node convert-embeds.js ./docs
   node convert-lists.js ./docs
   ```

5. **Process metadata**:
   ```bash
   node convert-metadata.js ./docs
   node convert-frontmatter.js ./docs
   ```

6. **Generate indexes** (optional):
   ```bash
   node generate-index.js \
     --includeFolderFilter docs \
     --title "Documentation Index" \
     --outputName ./docs/index.md
   ```

7. **Update layouts** (optional):
   ```bash
   node update-fullwidth.js ./docs/knowledgebase
   ```

8. **Generate AWS metadata** (for search):
   ```bash
   node generate-metadata-aws.js ./docs
   ```

9. **Sync to Algolia search** (optional):
   ```bash
   node sync-to-algolia.js .tmp/developer
   ```

---

## sync-to-algolia.js

**Purpose**: Sends markdown files to Algolia search index. Breaks documents into sections using H2 headers for better search granularity and uses metadata from `.metadata.json` sidecar files.

**Usage**:
```bash
node sync-to-algolia.js <contentPath> [options]
```

**Arguments**:
- `contentPath` - Path to directory containing markdown files

**Options**:
- `--app-id <id>` - Algolia Application ID (or `ALGOLIA_APP_ID` env var)
- `--api-key <key>` - Algolia Admin API Key (or `ALGOLIA_ADMIN_KEY` env var)
- `--index-name <name>` - Index name (default: `movedata_support`)
- `--clear-index` - Clear the index before uploading
- `--batch-size <number>` - Records per batch (default: 100)
- `--dry-run` - Show what would be uploaded without sending
- `--debug` - Enable detailed debug logging

**Examples**:
```bash
# Sync using environment variables
export ALGOLIA_APP_ID=ABC123DEF456
export ALGOLIA_ADMIN_KEY=your_admin_api_key
node sync-to-algolia.js .tmp/developer

# Sync with CLI options
node sync-to-algolia.js .tmp/developer \
  --app-id ABC123DEF456 \
  --api-key your_admin_api_key \
  --index-name movedata_support_dev

# Clear and rebuild index
node sync-to-algolia.js .tmp/developer --clear-index

# Dry run to preview
node sync-to-algolia.js .tmp/developer --dry-run --debug
```

**Features**:
1. Splits documents by H2 headings for granular search results
2. Extracts metadata from `.metadata.json` sidecar files
3. Generates unique `objectID` for each section: `{url}#{anchor}`
4. Cleans markdown syntax (code blocks, links, images) for search
5. Configures Algolia index with optimal settings for documentation
6. Batch uploads with progress tracking
7. Supports faceting by collection, category, section, extension, and tags

**Index Settings**:
- **Searchable attributes**: title, heading, content, breadcrumb, tags, category, section, collection
- **Custom ranking**: Full documents rank higher, earlier sections rank higher
- **Faceting**: Available for collection, category, section, extension, tags
- **Highlighting**: Enabled for title, heading, content, excerpt
- **Typo tolerance**: Enabled (min 4 chars for 1 typo, 8 for 2 typos)

**Output structure** (Algolia record):
```json
{
  "objectID": "developer/pipelines/donation-pipeline#overview",
  "title": "Donation Pipeline",
  "heading": "Overview",
  "content": "The MoveData Donation Pipeline is a sophisticated...",
  "excerpt": "The MoveData Donation Pipeline is a sophisticated multi-stage processing engine...",
  "url": "/developer/pipelines/donation-pipeline",
  "fullUrl": "/developer/pipelines/donation-pipeline#overview",
  "anchor": "overview",
  "collection": "Developer",
  "section": "Pipelines",
  "category": null,
  "breadcrumb": "Developer > Pipelines > Donation Pipeline",
  "extension": null,
  "tags": [],
  "lastModifiedDate": "2025-11-03",
  "description": "A managed processing engine...",
  "isFullDocument": false,
  "sectionIndex": 0,
  "contentLength": 456,
  "indexedAt": "2025-11-09T12:00:00.000Z"
}
```

**Notes**:
- Requires `.metadata.json` files (run `generate-metadata-aws.js` first)
- Skips `SUMMARY.md` and `index_*.md` files
- Documents without metadata files are skipped
- Full documents (no H2 sections) are indexed as single records
- Use `--clear-index` to rebuild from scratch

---

## Requirements

- Node.js 18+ (ESM modules)
- File system access (scripts modify files in place)
- Proper directory structure for GitBook migrations
- Algolia account and API credentials (for `sync-to-algolia.js`)

## Notes

- Always test with `--dry-run` first
- Back up your content before running scripts
- Scripts are idempotent where possible (safe to run multiple times)
- Most scripts output progress to stderr, results to stdout
- Exit codes: 0 = success, 1 = errors occurred
