#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * YAML Frontmatter Full-Width Update Script
 * ==========================================
 * 
 * This script processes markdown files and ensures they contain specific YAML 
 * frontmatter to hide navigation. It respects existing frontmatter and appends
 * or merges the required settings without deleting existing content.
 * 
 * WHAT IT DOES:
 * - Scans all .md files in a directory recursively
 * - Checks for existing YAML frontmatter (content between --- delimiters)
 * - Ensures the 'hide' field contains 'navigation' in its array
 * - Adds frontmatter if none exists
 * - Preserves all existing frontmatter fields
 * - Merges hide arrays intelligently to avoid duplicates
 * 
 * TARGET FRONTMATTER:
 * -------------------
 * ---
 * hide:
 *   - navigation
 * ---
 * 
 * EXAMPLE TRANSFORMATIONS:
 * 
 * INPUT FILE (No frontmatter):
 * -----------------------------
 * # Welcome to My Page
 * 
 * This is the content.
 * 
 * OUTPUT FILE:
 * ------------
 * ---
 * hide:
 *   - navigation
 * ---
 * 
 * # Welcome to My Page
 * 
 * This is the content.
 * 
 * INPUT FILE (Existing frontmatter):
 * -----------------------------------
 * ---
 * title: My Page
 * author: John Doe
 * ---
 * 
 * # Welcome to My Page
 * 
 * OUTPUT FILE:
 * ------------
 * ---
 * title: My Page
 * author: John Doe
 * hide:
 *   - navigation
 * ---
 * 
 * # Welcome to My Page
 * 
 * INPUT FILE (Existing hide field):
 * ----------------------------------
 * ---
 * title: My Page
 * hide:
 *   - toc
 * ---
 * 
 * # Welcome to My Page
 * 
 * OUTPUT FILE:
 * ------------
 * ---
 * title: My Page
 * hide:
 *   - toc
 *   - navigation
 * ---
 * 
 * # Welcome to My Page
 * 
 * USAGE:
 * ------
 * node update-fullwidth.js <folderPath> [--dry-run]
 * 
 * EXAMPLES:
 * - node update-fullwidth.js ./lib/docs/knowledgebase
 * - node update-fullwidth.js ./content --dry-run
 * - node update-fullwidth.js ./docs/reference
 * 
 * OPTIONS:
 * - --dry-run: Show what would be changed without modifying files
 * 
 * The script will:
 * 1. Recursively find all .md files in the specified directory
 * 2. Process each file to ensure proper frontmatter
 * 3. Add or update the hide.navigation setting as needed
 * 4. Provide a summary of changes made
 */

function extractFrontmatter(content) {
  // Match YAML frontmatter between --- delimiters
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {
      frontmatter: null,
      restOfContent: content,
      fullMatch: null
    };
  }
  
  const frontmatter = match[1];
  const restOfContent = content.substring(match[0].length);
  
  return { frontmatter, restOfContent, fullMatch: match[0] };
}

function parseYamlFrontmatter(frontmatterText) {
  if (!frontmatterText) {
    return {};
  }
  
  const metadata = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentArray = null;
  let indentLevel = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Calculate indentation level
    const leadingSpaces = line.match(/^ */)[0].length;
    
    // Check for array items
    if (trimmed.startsWith('- ')) {
      if (currentArray && leadingSpaces >= indentLevel) {
        const value = trimmed.substring(2).trim();
        if (value) {
          currentArray.push(value);
        }
      }
      continue;
    }
    
    // Check for key-value pairs
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();
      currentKey = key;
      indentLevel = leadingSpaces;
      
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

function generateYamlFrontmatter(metadata) {
  const lines = [];
  
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  
  return lines.join('\n');
}

function updateContentWithFrontmatter(content) {
  const extracted = extractFrontmatter(content);
  const metadata = parseYamlFrontmatter(extracted.frontmatter);
  
  // Check if navigation is already in hide array
  let needsUpdate = false;
  
  if (!metadata.hide) {
    // No hide field exists, create it
    metadata.hide = ['navigation'];
    needsUpdate = true;
  } else if (Array.isArray(metadata.hide)) {
    // hide field exists and is an array
    if (!metadata.hide.includes('navigation')) {
      metadata.hide.push('navigation');
      needsUpdate = true;
    }
  } else {
    // hide field exists but is not an array (convert to array)
    const existingValue = metadata.hide;
    metadata.hide = [existingValue, 'navigation'];
    needsUpdate = true;
  }
  
  if (!needsUpdate) {
    // Content already has the required frontmatter
    return { converted: content, changed: false };
  }
  
  // Generate new frontmatter
  const newFrontmatter = generateYamlFrontmatter(metadata);
  const newContent = `---\n${newFrontmatter}\n---\n\n${extracted.restOfContent}`;
  
  return { converted: newContent, changed: true };
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { converted, changed } = updateContentWithFrontmatter(content);
    
    if (changed) {
      if (!dryRun) {
        fs.writeFileSync(filePath, converted, 'utf8');
      }
      return { success: true, changed: true, path: filePath };
    } else {
      return { success: true, changed: false, path: filePath };
    }
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  
  function traverse(currentPath) {
    try {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        
        if (entry.isDirectory()) {
          traverse(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      console.error(`Warning: Could not read directory ${currentPath}: ${error.message}`);
    }
  }
  
  traverse(dirPath);
  return files;
}

function processDirectory(folderPath, dryRun = false) {
  console.error('='.repeat(60));
  console.error('YAML Frontmatter Full-Width Update Script');
  console.error('='.repeat(60));
  console.error(`Scanning directory: ${folderPath}`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be modified');
  }
  
  console.error('='.repeat(60));
  
  const markdownFiles = getAllMarkdownFiles(folderPath);
  console.error(`\nFound ${markdownFiles.length} markdown files`);
  
  if (markdownFiles.length === 0) {
    console.error('No markdown files found to process.');
    return { total: 0, changed: 0, unchanged: 0, errors: 0 };
  }
  
  const results = {
    total: 0,
    changed: 0,
    unchanged: 0,
    errors: 0,
    files: []
  };
  
  console.error('\nProcessing files:');
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun);
    results.files.push(result);
    
    if (result.success) {
      if (result.changed) {
        results.changed++;
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Updated: ${file}`);
      } else {
        results.unchanged++;
        console.error(`  Skipped (already has navigation hidden): ${file}`);
      }
    } else {
      results.errors++;
      console.error(`✗ Error: ${file} - ${result.error}`);
    }
  }
  
  console.error('\n' + '='.repeat(60));
  console.error(`Summary:`);
  console.error(`  Total files: ${results.total}`);
  console.error(`  Updated: ${results.changed}`);
  console.error(`  Unchanged: ${results.unchanged}`);
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { 
  updateContentWithFrontmatter, 
  processMarkdownFile, 
  processDirectory, 
  getAllMarkdownFiles,
  parseYamlFrontmatter,
  generateYamlFrontmatter
};

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('update-fullwidth.js') || 
   process.argv[1].endsWith('/update-fullwidth.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node update-fullwidth.js <folderPath> [--dry-run]');
    console.error('');
    console.error('Examples:');
    console.error('  node update-fullwidth.js ./lib/docs/knowledgebase');
    console.error('  node update-fullwidth.js ./content --dry-run');
    console.error('  node update-fullwidth.js ./docs/reference');
    console.error('');
    console.error('Options:');
    console.error('  --dry-run    Show what would be changed without modifying files');
    process.exit(1);
  }

  const folderPath = args[0];
  const dryRun = args.includes('--dry-run');

  // Validate folder path
  if (!fs.existsSync(folderPath)) {
    console.error(`Error: Path does not exist: ${folderPath}`);
    process.exit(1);
  }

  if (!fs.statSync(folderPath).isDirectory()) {
    console.error(`Error: Path is not a directory: ${folderPath}`);
    process.exit(1);
  }

  try {
    const results = processDirectory(folderPath, dryRun);
    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}