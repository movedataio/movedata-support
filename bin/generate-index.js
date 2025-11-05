#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Markdown Index Generator
 * ========================
 * 
 * This script recursively scans a directory for markdown files and generates
 * an index page with links to all found files. It can group files by metadata
 * fields or list them alphabetically.
 * 
 * FEATURES:
 * - Recursively scans directories for .md files
 * - Extracts YAML frontmatter from markdown files
 * - Groups files by metadata fields (optional)
 * - Generates clean markdown index with proper links
 * - Ignores files prefixed with 'index_*.md'
 * - Converts metadata group names to proper case
 * 
 * USAGE:
 * ------
 * node generate-index.js [options]
 * 
 * OPTIONS:
 * --websiteRootFolder <path>    Root folder to scan (default: ./lib/docs)
 * --includeFolderFilter <path>  Specific subfolder to include (e.g., knowledgebase)
 * --title <string>             Title for the generated index
 * --outputName <path>          Output file path for the index
 * --metadataGroup <field>      Group by metadata field (optional)
 * --dry-run                    Show what would be generated without writing
 * 
 * EXAMPLES:
 * ---------
 * # Generate alphabetical index
 * node generate-index.js --includeFolderFilter knowledgebase --title "All Knowledge Base Articles" --outputName ./lib/docs/knowledgebase/index_alphabetical.md
 * 
 * # Generate index grouped by category
 * node generate-index.js --includeFolderFilter knowledgebase --title "All Knowledge Base Articles by Category" --outputName ./lib/docs/knowledgebase/index_category.md --metadataGroup category
 * 
 * # Generate index for specific schema folder
 * node generate-index.js --includeFolderFilter reference/schema/commerce --title "Commerce Schema Reference" --outputName ./lib/docs/reference/schema/commerce/index_all.md
 */

function parseYamlFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {};
  }
  
  const frontmatterText = match[1];
  const metadata = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentArray = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Check for array items
    if (trimmed.startsWith('- ')) {
      if (currentArray) {
        currentArray.push(trimmed.substring(2).trim());
      }
      continue;
    }
    
    // Check for key-value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      currentKey = key;
      
      if (value) {
        // Simple value
        metadata[key] = value;
        currentArray = null;
      } else {
        // Prepare for array
        currentArray = [];
        metadata[key] = currentArray;
      }
    }
  }
  
  return metadata;
}

function extractTitle(content) {
  // Try to get title from frontmatter first
  const metadata = parseYamlFrontmatter(content);
  if (metadata.title) {
    return metadata.title;
  }
  
  // Fallback to first H1 heading
  const h1Match = content.match(/^# (.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  
  return null;
}

function escapeMarkdownTitle(title) {
  if (!title) return title;
  
  // Escape square brackets for use in markdown links
  // Replace any existing escaped brackets first, then escape all brackets
  return title
    .replace(/\\\[/g, '[')  // Remove existing escapes
    .replace(/\\\]/g, ']')  // Remove existing escapes
    .replace(/\[/g, '\\[')  // Escape opening brackets
    .replace(/\]/g, '\\]'); // Escape closing brackets
}

function toProperCase(str) {
  if (!str) return str;
  return str.replace(/\w\S*/g, (txt) => 
    txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

function getAllMarkdownFiles(dirPath, includeFolderFilter = null) {
  const files = [];
  
  // Determine the actual search path
  let searchPath = dirPath;
  if (includeFolderFilter) {
    searchPath = path.join(dirPath, includeFolderFilter);
  }
  
  if (!fs.existsSync(searchPath)) {
    console.error(`Error: Search path does not exist: ${searchPath}`);
    return files;
  }
  
  function traverse(currentPath, relativePath = '') {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativeFilePath = path.join(relativePath, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath, relativeFilePath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Skip index files
        if (entry.name.startsWith('index_')) {
          continue;
        }
        
        files.push({
          fullPath,
          relativePath: relativeFilePath,
          fileName: entry.name,
          baseName: entry.name.replace('.md', '')
        });
      }
    }
  }
  
  traverse(searchPath);
  return files;
}

function processMarkdownFiles(files) {
  const processedFiles = [];
  
  for (const file of files) {
    try {
      const content = fs.readFileSync(file.fullPath, 'utf8');
      const metadata = parseYamlFrontmatter(content);
      const title = extractTitle(content) || file.baseName;
      
      processedFiles.push({
        ...file,
        metadata,
        title,
        content
      });
    } catch (error) {
      console.error(`Warning: Could not process file ${file.fullPath}: ${error.message}`);
    }
  }
  
  return processedFiles;
}

function generateIndexContent(files, title, metadataGroup = null) {
  let content = `---
hide:
  - navigation
---

# ${title}\n\n`;
  
  if (metadataGroup) {
    // Group by metadata field
    const groups = {};
    
    for (const file of files) {
      const groupValue = file.metadata[metadataGroup] || 'Uncategorised';
      const groupKey = toProperCase(groupValue.toString());
      
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(file);
    }
    
    // Sort group keys alphabetically
    const sortedGroupKeys = Object.keys(groups).sort();
    
    for (const groupKey of sortedGroupKeys) {
      content += `## ${groupKey}\n\n`;
      
      // Sort files within group alphabetically by title
      const sortedFiles = groups[groupKey].sort((a, b) => 
        a.title.localeCompare(b.title)
      );
      
      for (const file of sortedFiles) {
        const escapedTitle = escapeMarkdownTitle(file.title);
        content += ` - [${escapedTitle}](${file.relativePath})\n`;
      }
      content += '\n';
    }
  } else {
    // Alphabetical listing
    content += `## All Articles\n\n`;
    
    // Sort files alphabetically by title
    const sortedFiles = files.sort((a, b) => 
      a.title.localeCompare(b.title)
    );
    
    for (const file of sortedFiles) {
      const escapedTitle = escapeMarkdownTitle(file.title);
      content += ` - [${escapedTitle}](${file.relativePath})\n`;
    }
    content += '\n';
  }
  
  return content;
}

function generateIndex(options) {
  const {
    websiteRootFolder = './lib/docs',
    includeFolderFilter,
    title,
    outputName,
    metadataGroup,
    dryRun = false
  } = options;
  
  console.error('='.repeat(60));
  console.error('Markdown Index Generator');
  console.error('='.repeat(60));
  console.error(`Website Root: ${websiteRootFolder}`);
  console.error(`Include Filter: ${includeFolderFilter || 'None (all files)'}`);
  console.error(`Title: ${title}`);
  console.error(`Output: ${outputName}`);
  console.error(`Metadata Group: ${metadataGroup || 'None (alphabetical)'}`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be written');
  }
  
  console.error('='.repeat(60));
  
  // Validate inputs
  if (!title) {
    console.error('Error: Title is required');
    return { success: false, error: 'Title is required' };
  }
  
  if (!outputName) {
    console.error('Error: Output name is required');
    return { success: false, error: 'Output name is required' };
  }
  
  if (!fs.existsSync(websiteRootFolder)) {
    console.error(`Error: Website root folder does not exist: ${websiteRootFolder}`);
    return { success: false, error: 'Website root folder does not exist' };
  }
  
  // Get all markdown files
  console.error(`\nScanning for markdown files...`);
  const files = getAllMarkdownFiles(websiteRootFolder, includeFolderFilter);
  console.error(`Found ${files.length} markdown files`);
  
  if (files.length === 0) {
    console.error('Warning: No markdown files found');
    return { success: true, filesProcessed: 0 };
  }
  
  // Process files and extract metadata
  console.error('Processing files and extracting metadata...');
  const processedFiles = processMarkdownFiles(files);
  console.error(`Successfully processed ${processedFiles.length} files`);
  
  // Generate index content
  console.error('Generating index content...');
  const indexContent = generateIndexContent(processedFiles, title, metadataGroup);
  
  if (dryRun) {
    console.error('\n' + '='.repeat(60));
    console.error('DRY RUN - Generated Content:');
    console.error('='.repeat(60));
    console.log(indexContent);
    console.error('='.repeat(60));
    return { success: true, filesProcessed: processedFiles.length, dryRun: true };
  }
  
  // Write the index file
  try {
    // Ensure output directory exists
    const outputDir = path.dirname(outputName);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(outputName, indexContent, 'utf8');
    console.error(`\n✓ Index file generated: ${outputName}`);
    
    console.error('\n' + '='.repeat(60));
    console.error('Summary:');
    console.error(`  Files processed: ${processedFiles.length}`);
    console.error(`  Output file: ${outputName}`);
    console.error(`  Grouping: ${metadataGroup ? `By ${metadataGroup}` : 'Alphabetical'}`);
    console.error('='.repeat(60));
    
    return { success: true, filesProcessed: processedFiles.length };
  } catch (error) {
    console.error(`Error writing index file: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Export for use as a module
export { generateIndex, getAllMarkdownFiles, processMarkdownFiles, generateIndexContent };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('generate-index.js') || 
   process.argv[1].endsWith('/generate-index.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  // Parse command line arguments
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg.startsWith('--')) {
      const key = arg.substring(2);
      const value = args[i + 1];
      
      if (value && !value.startsWith('--')) {
        options[key] = value;
        i++; // Skip next argument since we used it as a value
      } else {
        console.error(`Error: Missing value for ${arg}`);
        process.exit(1);
      }
    }
  }
  
  // Show help if no arguments provided
  if (Object.keys(options).length === 0) {
    console.error('Usage: node generate-index.js [options]');
    console.error('');
    console.error('Options:');
    console.error('  --websiteRootFolder <path>    Root folder to scan (default: ./lib/docs)');
    console.error('  --includeFolderFilter <path>  Specific subfolder to include');
    console.error('  --title <string>             Title for the generated index');
    console.error('  --outputName <path>          Output file path for the index');
    console.error('  --metadataGroup <field>      Group by metadata field (optional)');
    console.error('  --dry-run                    Show what would be generated without writing');
    console.error('');
    console.error('Examples:');
    console.error('  node generate-index.js --includeFolderFilter knowledgebase --title "All Knowledge Base Articles" --outputName ./lib/docs/knowledgebase/index_alphabetical.md');
    console.error('  node generate-index.js --includeFolderFilter knowledgebase --title "All Knowledge Base Articles by Category" --outputName ./lib/docs/knowledgebase/index_category.md --metadataGroup category');
    process.exit(1);
  }
  
  try {
    const result = generateIndex(options);
    process.exit(result.success ? 0 : 1);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}