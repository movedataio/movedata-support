#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { algoliasearch } from 'algoliasearch';

/**
 * Algolia Search Indexer
 * =======================
 * 
 * node ./bin/sync-to-algolia.js .tmp/developer --app-id EAEIU7PW2Y --api-key 41f9c2c2d2b7a325acc287bb63a2711c --index-name prod_support_index
 * 
 * Sends markdown files from a directory to Algolia search index.
 * Breaks down documents into sections using H2 headers for better search granularity.
 * Uses metadata from .metadata.json sidecar files for enriched search context.
 * 
 * FEATURES:
 * - Splits documents by H2 headings for granular search
 * - Extracts metadata from .metadata.json sidecar files
 * - Generates unique objectIDs for each section
 * - Batch uploads with progress tracking
 * - Supports dry-run mode for testing
 * - Clears index before uploading (optional)
 * 
 * USAGE:
 * ------
 * node sync-to-algolia.js <contentPath> [options]
 * 
 * ARGUMENTS:
 * contentPath                Path to directory containing markdown files
 * 
 * OPTIONS:
 * --app-id <id>             Algolia Application ID (or ALGOLIA_APP_ID env)
 * --api-key <key>           Algolia Admin API Key (or ALGOLIA_ADMIN_KEY env)
 * --index-name <name>       Index name (or ALGOLIA_INDEX_NAME env, default: movedata_support)
 * --clear-index             Clear the index before uploading
 * --batch-size <number>     Number of records per batch (default: 100)
 * --dry-run                 Show what would be uploaded without sending
 * --debug                   Enable detailed debug logging
 * 
 * EXAMPLES:
 * ---------
 * # Sync with environment variables
 * export ALGOLIA_APP_ID=ABC123
 * export ALGOLIA_ADMIN_KEY=secret_key
 * node sync-to-algolia.js .tmp/developer
 * 
 * # Sync with command line options
 * node sync-to-algolia.js .tmp/developer \
 *   --app-id ABC123 \
 *   --api-key secret_key \
 *   --index-name movedata_support_dev
 * 
 * # Dry run to preview
 * node sync-to-algolia.js .tmp/developer --dry-run --debug
 * 
 * # Clear and rebuild index
 * node sync-to-algolia.js .tmp/developer --clear-index
 */

/**
 * Extract H2 sections from markdown content
 * Returns array of section objects with heading, content, and anchor
 */
function extractSections(markdownContent, filePath) {
  const sections = [];
  
  // Split by H2 headers (## Heading)
  const h2Pattern = /^##\s+(.+)$/gm;
  const matches = [...markdownContent.matchAll(h2Pattern)];
  
  if (matches.length === 0) {
    // No H2 headers found, treat entire document as one section
    // Try to find H1 for title
    const h1Match = markdownContent.match(/^#\s+(.+)$/m);
    const title = h1Match ? h1Match[1].trim() : path.basename(filePath, '.md');
    
    return [{
      heading: title,
      content: markdownContent.trim(),
      anchor: '',
      isFullDocument: true
    }];
  }
  
  // Process each H2 section
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const heading = match[1].trim();
    const startIndex = match.index + match[0].length;
    const endIndex = i < matches.length - 1 ? matches[i + 1].index : markdownContent.length;
    
    const sectionContent = markdownContent.substring(startIndex, endIndex).trim();
    const anchor = heading.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special chars
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-'); // Collapse multiple hyphens
    
    sections.push({
      heading: heading,
      content: sectionContent,
      anchor: anchor,
      isFullDocument: false
    });
  }
  
  return sections;
}

/**
 * Clean markdown content for search indexing
 * Removes code blocks, links, images, and other markdown syntax
 */
function cleanMarkdownForSearch(content) {
  let cleaned = content;
  
  // Remove code blocks (```...```)
  cleaned = cleaned.replace(/```[\s\S]*?```/g, '');
  
  // Remove inline code (`...`)
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');
  
  // Remove images (![alt](url))
  cleaned = cleaned.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  
  // Remove links but keep text ([text](url) -> text)
  cleaned = cleaned.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  
  // Remove admonitions (!!!...)
  cleaned = cleaned.replace(/^!!!.*$/gm, '');
  
  // Remove HTML tags
  cleaned = cleaned.replace(/<[^>]+>/g, '');
  
  // Remove bold/italic markers
  cleaned = cleaned.replace(/[*_]{1,3}/g, '');
  
  // Remove horizontal rules
  cleaned = cleaned.replace(/^[-*_]{3,}$/gm, '');
  
  // Collapse multiple newlines
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
  
  // Remove leading/trailing whitespace
  cleaned = cleaned.trim();
  
  return cleaned;
}

/**
 * Load metadata from .metadata.json sidecar file
 */
function loadMetadata(markdownFilePath, debug = false) {
  const metadataPath = `${markdownFilePath}.metadata.json`;
  
  if (!fs.existsSync(metadataPath)) {
    if (debug) {
      console.error(`  DEBUG: No metadata file found: ${metadataPath}`);
    }
    return null;
  }
  
  try {
    const metadataContent = fs.readFileSync(metadataPath, 'utf8');
    const metadata = JSON.parse(metadataContent);
    
    // Extract metadataAttributes if present (AWS Bedrock format)
    if (metadata.metadataAttributes) {
      return metadata.metadataAttributes;
    }
    
    return metadata;
  } catch (error) {
    if (debug) {
      console.error(`  DEBUG: Failed to parse metadata: ${error.message}`);
    }
    return null;
  }
}

/**
 * Generate unique objectID for Algolia
 * Format: {url}#{anchor} or {url} for full documents
 */
function generateObjectID(metadata, section) {
  const baseUrl = metadata?.url || 'unknown';
  
  if (section.isFullDocument || !section.anchor) {
    return baseUrl.replace(/^\//, ''); // Remove leading slash
  }
  
  return `${baseUrl.replace(/^\//, '')}#${section.anchor}`;
}

/**
 * Extract excerpt from content (first N characters)
 */
function extractExcerpt(content, maxLength = 200) {
  const cleaned = content.replace(/\n+/g, ' ').trim();
  
  if (cleaned.length <= maxLength) {
    return cleaned;
  }
  
  // Try to break at a sentence
  const truncated = cleaned.substring(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastPeriod > maxLength * 0.7) {
    return truncated.substring(0, lastPeriod + 1);
  }
  
  if (lastSpace > maxLength * 0.8) {
    return truncated.substring(0, lastSpace) + '...';
  }
  
  return truncated + '...';
}

/**
 * Process a single markdown file into Algolia records
 */
function processMarkdownFile(filePath, debug = false) {
  try {
    // Read markdown content
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Load metadata
    const metadata = loadMetadata(filePath, debug);
    
    if (!metadata) {
      if (debug) {
        console.error(`  DEBUG: Skipping ${filePath} - no metadata`);
      }
      return [];
    }
    
    // Extract sections
    const sections = extractSections(content, filePath);
    
    if (debug) {
      console.error(`  DEBUG: Extracted ${sections.length} sections from ${filePath}`);
    }
    
    // Create Algolia records for each section
    const records = sections.map((section, index) => {
      const cleanContent = cleanMarkdownForSearch(section.content);
      const objectID = generateObjectID(metadata, section);
      
      // Truncate content if too large for Algolia (10KB limit)
      // Keep buffer for other fields - Algolia counts the entire JSON object
      const maxContentLength = 8000; // Conservative limit leaving ~2KB for other fields
      const truncatedContent = cleanContent.length > maxContentLength 
        ? cleanContent.substring(0, maxContentLength) + '\n\n[Content truncated due to size...]'
        : cleanContent;
      
      if (cleanContent.length > maxContentLength && debug) {
        console.error(`  DEBUG: Truncated content for ${objectID} from ${cleanContent.length} to ${truncatedContent.length} chars`);
      }
      
      const record = {
        objectID: objectID,
        title: metadata.title || section.heading,
        heading: section.heading,
        content: truncatedContent,
        excerpt: extractExcerpt(cleanContent, 200),
        url: metadata.url || '',
        fullUrl: section.anchor ? `${metadata.url}#${section.anchor}` : metadata.url,
        anchor: section.anchor,
        
        // Metadata for filtering and faceting
        collection: metadata.collection || null,
        section: metadata.section || null,
        category: metadata.category || null,
        breadcrumb: metadata.breadcrumb || null,
        extension: metadata.extension || null,
        tags: metadata.tags || [],
        
        // Additional metadata
        lastModifiedDate: metadata.lastModifiedDate || metadata.modified_date || null,
        description: metadata.description || null,
        
        // Search ranking signals
        isFullDocument: section.isFullDocument || false,
        sectionIndex: index,
        contentLength: truncatedContent.length,
        
        // Timestamp
        indexedAt: new Date().toISOString()
      };
      
      // Convert tags to array if it's a string
      if (typeof record.tags === 'string') {
        record.tags = record.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
      
      return record;
    });
    
    return records;
    
  } catch (error) {
    console.error(`✗ Error processing ${filePath}: ${error.message}`);
    return [];
  }
}

/**
 * Get all markdown files from directory
 */
function getAllMarkdownFiles(dirPath) {
  const files = [];
  
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Skip special files
        if (entry.name === 'SUMMARY.md' || entry.name.startsWith('index_')) {
          continue;
        }
        
        files.push(fullPath);
      }
    }
  }
  
  traverse(dirPath);
  return files;
}

/**
 * Upload records to Algolia in batches
 */
async function uploadToAlgolia(records, config) {
  const { appId, apiKey, indexName, batchSize, dryRun, debug } = config;
  
  if (dryRun) {
    console.error('\n' + '='.repeat(60));
    console.error('DRY RUN - Sample Records (first 3):');
    console.error('='.repeat(60));
    console.log(JSON.stringify(records.slice(0, 3), null, 2));
    console.error('='.repeat(60));
    return { success: true, dryRun: true };
  }
  
  // Initialize Algolia client (v5 API)
  const client = algoliasearch(appId, apiKey);
  
  console.error(`\nUploading ${records.length} records to Algolia index: ${indexName}`);
  
  // Upload in batches
  let uploaded = 0;
  const totalBatches = Math.ceil(records.length / batchSize);
  
  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;
    
    try {
      await client.saveObjects({ indexName, objects: batch });
      uploaded += batch.length;
      
      console.error(`  ✓ Batch ${batchNum}/${totalBatches}: Uploaded ${batch.length} records (${uploaded}/${records.length})`);
      
    } catch (error) {
      console.error(`  ✗ Batch ${batchNum}/${totalBatches}: Failed - ${error.message}`);
      throw error;
    }
  }
  
  return { success: true, uploaded: uploaded };
}

/**
 * Clear all records from Algolia index
 */
async function clearIndex(config) {
  const { appId, apiKey, indexName, dryRun } = config;
  
  if (dryRun) {
    console.error('DRY RUN - Would clear index (skipped)');
    return;
  }
  
  const client = algoliasearch(appId, apiKey);
  
  console.error(`Clearing index: ${indexName}...`);
  
  try {
    await client.clearObjects({ indexName });
    console.error('✓ Index cleared successfully');
  } catch (error) {
    console.error(`✗ Failed to clear index: ${error.message}`);
    throw error;
  }
}

/**
 * Configure Algolia index settings
 */
async function configureIndexSettings(config) {
  const { appId, apiKey, indexName, dryRun } = config;
  
  if (dryRun) {
    console.error('DRY RUN - Would configure index settings (skipped)');
    return;
  }
  
  const client = algoliasearch(appId, apiKey);
  
  const settings = {
    // Searchable attributes (order defines priority)
    searchableAttributes: [
      'title',
      'heading',
      'content',
      'breadcrumb',
      'tags',
      'category',
      'section',
      'collection'
    ],
    
    // Attributes for custom ranking
    customRanking: [
      'desc(isFullDocument)', // Full documents rank higher
      'asc(sectionIndex)', // Earlier sections rank higher
      'desc(contentLength)' // Longer content ranks higher (within reason)
    ],
    
    // Attributes for faceting/filtering
    attributesForFaceting: [
      'searchable(collection)',
      'searchable(category)',
      'searchable(section)',
      'searchable(extension)',
      'searchable(tags)'
    ],
    
    // Attributes to retrieve (all by default)
    attributesToRetrieve: ['*'],
    
    // Highlighting
    attributesToHighlight: [
      'title',
      'heading',
      'content',
      'excerpt'
    ],
    
    // Snippeting
    attributesToSnippet: [
      'content:50',
      'excerpt:30'
    ],
    
    // Ranking formula
    ranking: [
      'typo',
      'geo',
      'words',
      'filters',
      'proximity',
      'attribute',
      'exact',
      'custom'
    ],
    
    // Typo tolerance
    typoTolerance: true,
    minWordSizefor1Typo: 4,
    minWordSizefor2Typos: 8,
    
    // Highlighting tags
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
    
    // Pagination
    hitsPerPage: 20,
    paginationLimitedTo: 1000
  };
  
  console.error('Configuring index settings...');
  
  try {
    await client.setSettings({ indexName, indexSettings: settings });
    console.error('✓ Index settings configured successfully');
  } catch (error) {
    console.error(`✗ Failed to configure settings: ${error.message}`);
    throw error;
  }
}

/**
 * Main processing function
 */
async function syncToAlgolia(contentPath, options = {}) {
  const {
    appId = process.env.ALGOLIA_APP_ID,
    apiKey = process.env.ALGOLIA_ADMIN_KEY,
    indexName = process.env.ALGOLIA_INDEX_NAME || 'movedata_support',
    clearIndexFirst = false,
    batchSize = 100,
    dryRun = false,
    debug = false
  } = options;
  
  console.error('='.repeat(60));
  console.error('Algolia Search Indexer');
  console.error('='.repeat(60));
  console.error(`Content Path: ${contentPath}`);
  console.error(`Index Name: ${indexName}`);
  console.error(`Batch Size: ${batchSize}`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No data will be sent to Algolia');
  }
  
  if (debug) {
    console.error('DEBUG MODE - Detailed logging enabled');
  }
  
  console.error('='.repeat(60));
  
  // Validate inputs
  if (!appId && !dryRun) {
    throw new Error('Algolia App ID is required (use --app-id or ALGOLIA_APP_ID env)');
  }
  
  if (!apiKey && !dryRun) {
    throw new Error('Algolia API Key is required (use --api-key or ALGOLIA_ADMIN_KEY env)');
  }
  
  if (!fs.existsSync(contentPath)) {
    throw new Error(`Content path does not exist: ${contentPath}`);
  }
  
  if (!fs.statSync(contentPath).isDirectory()) {
    throw new Error(`Content path is not a directory: ${contentPath}`);
  }
  
  const config = { appId, apiKey, indexName, batchSize, dryRun, debug };
  
  // Clear index if requested
  if (clearIndexFirst) {
    await clearIndex(config);
  }
  
  // Configure index settings
  if (!dryRun) {
    await configureIndexSettings(config);
  }
  
  // Get all markdown files
  console.error('\nScanning for markdown files...');
  const markdownFiles = getAllMarkdownFiles(contentPath);
  console.error(`Found ${markdownFiles.length} markdown files`);
  
  if (markdownFiles.length === 0) {
    console.error('No markdown files found');
    return { success: true, filesProcessed: 0, recordsCreated: 0 };
  }
  
  // Process files into records
  console.error('\nProcessing files...');
  const allRecords = [];
  let filesProcessed = 0;
  let filesSkipped = 0;
  
  for (const file of markdownFiles) {
    if (debug) {
      console.error(`\nProcessing: ${file}`);
    }
    
    const records = processMarkdownFile(file, debug);
    
    if (records.length > 0) {
      allRecords.push(...records);
      filesProcessed++;
      
      if (!debug) {
        // Show progress
        if (filesProcessed % 10 === 0) {
          console.error(`  Processed ${filesProcessed}/${markdownFiles.length} files...`);
        }
      }
    } else {
      filesSkipped++;
    }
  }
  
  console.error(`\n✓ Processed ${filesProcessed} files, skipped ${filesSkipped} files`);
  console.error(`✓ Created ${allRecords.length} search records`);
  
  // Upload to Algolia
  const uploadResult = await uploadToAlgolia(allRecords, config);
  
  // Summary
  console.error('\n' + '='.repeat(60));
  console.error('Summary:');
  console.error(`  Files processed: ${filesProcessed}`);
  console.error(`  Files skipped: ${filesSkipped}`);
  console.error(`  Records created: ${allRecords.length}`);
  
  if (!dryRun) {
    console.error(`  Records uploaded: ${uploadResult.uploaded}`);
  }
  
  console.error('='.repeat(60));
  
  return {
    success: true,
    filesProcessed: filesProcessed,
    filesSkipped: filesSkipped,
    recordsCreated: allRecords.length,
    recordsUploaded: uploadResult.uploaded || 0
  };
}

// Export for use as a module
export { 
  syncToAlgolia,
  extractSections,
  cleanMarkdownForSearch,
  loadMetadata,
  processMarkdownFile,
  getAllMarkdownFiles
};

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('sync-to-algolia.js') || 
   process.argv[1].endsWith('/sync-to-algolia.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  // Parse arguments
  const positionalArgs = args.filter(arg => !arg.startsWith('--'));
  const options = {
    dryRun: args.includes('--dry-run'),
    debug: args.includes('--debug'),
    clearIndexFirst: args.includes('--clear-index')
  };
  
  // Parse option flags
  const appIdIndex = args.indexOf('--app-id');
  if (appIdIndex !== -1) options.appId = args[appIdIndex + 1];
  
  const apiKeyIndex = args.indexOf('--api-key');
  if (apiKeyIndex !== -1) options.apiKey = args[apiKeyIndex + 1];
  
  const indexNameIndex = args.indexOf('--index-name');
  if (indexNameIndex !== -1) options.indexName = args[indexNameIndex + 1];
  
  const batchSizeIndex = args.indexOf('--batch-size');
  if (batchSizeIndex !== -1) options.batchSize = parseInt(args[batchSizeIndex + 1], 10);
  
  // Show help
  if (positionalArgs.length === 0 || args.includes('--help')) {
    console.error('Usage: node sync-to-algolia.js <contentPath> [options]');
    console.error('');
    console.error('Arguments:');
    console.error('  contentPath                Path to directory containing markdown files');
    console.error('');
    console.error('Options:');
    console.error('  --app-id <id>             Algolia Application ID (or ALGOLIA_APP_ID env)');
    console.error('  --api-key <key>           Algolia Admin API Key (or ALGOLIA_ADMIN_KEY env)');
    console.error('  --index-name <name>       Index name (default: movedata_support)');
    console.error('  --clear-index             Clear the index before uploading');
    console.error('  --batch-size <number>     Records per batch (default: 100)');
    console.error('  --dry-run                 Show what would be uploaded without sending');
    console.error('  --debug                   Enable detailed debug logging');
    console.error('  --help                    Show this help message');
    console.error('');
    console.error('Examples:');
    console.error('  node sync-to-algolia.js .tmp/developer');
    console.error('  node sync-to-algolia.js .tmp/developer --app-id ABC123 --api-key secret');
    console.error('  node sync-to-algolia.js .tmp/developer --clear-index');
    console.error('  node sync-to-algolia.js .tmp/developer --dry-run --debug');
    process.exit(args.includes('--help') ? 0 : 1);
  }
  
  const contentPath = positionalArgs[0];
  
  try {
    const result = await syncToAlgolia(contentPath, options);
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('\n✗ Error:', error.message);
    if (options.debug) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}
