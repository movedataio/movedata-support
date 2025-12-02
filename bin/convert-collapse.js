#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts HTML <details> tags to MkDocs admonition format
 * 
 * Usage: node convert-collapse.js <contentPath> [--dry-run]
 * Example: node convert-collapse.js ./lib/docs/documentation
 */

function convertCollapse(content) {
  let updated = 0;
  
  // Pattern to match <details> blocks with <summary>
  // This handles multiline content between tags
  const detailsPattern = /<details>\s*<summary>([^<]+)<\/summary>([\s\S]*?)<\/details>/g;
  
  const updatedContent = content.replace(detailsPattern, (match, summary, body) => {
    updated++;
    
    // Clean up the summary text
    const summaryText = summary.trim();
    
    // Process the body content
    // Split by lines, trim each line, and indent with 4 spaces
    const bodyLines = body
      .trim()
      .split('\n')
      .map(line => {
        const trimmedLine = line.trim();
        // Skip empty lines at the start/end, but preserve them in the middle
        if (trimmedLine === '') {
          return '';
        }
        return `    ${trimmedLine}`;
      })
      .filter((line, index, arr) => {
        // Remove leading/trailing empty lines
        if (line === '') {
          // Keep empty lines only if they're in the middle
          const nonEmptyBefore = arr.slice(0, index).some(l => l !== '');
          const nonEmptyAfter = arr.slice(index + 1).some(l => l !== '');
          return nonEmptyBefore && nonEmptyAfter;
        }
        return true;
      })
      .join('\n');
    
    // Create the admonition format
    return `??? note "${summaryText}"\n${bodyLines}`;
  });
  
  return { content: updatedContent, updated };
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  
  function traverse(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dirPath);
  return files;
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, updated } = convertCollapse(content);
    
    if (updated > 0) {
      if (!dryRun) {
        fs.writeFileSync(filePath, converted, 'utf8');
      }
      return { success: true, changed: true, updated, path: filePath };
    } else {
      return { success: true, changed: false, updated: 0, path: filePath };
    }
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function processDirectory(contentPath, dryRun = false) {
  console.error('='.repeat(60));
  console.error('HTML Details/Summary to MkDocs Admonition Converter');
  console.error('='.repeat(60));
  console.error(`Content Path: ${contentPath}`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be modified');
  }
  
  console.error('='.repeat(60));
  console.error(`\nScanning directory: ${contentPath}\n`);
  
  const markdownFiles = getAllMarkdownFiles(contentPath);
  console.error(`Found ${markdownFiles.length} markdown files\n`);
  
  const results = {
    total: 0,
    changed: 0,
    unchanged: 0,
    totalCollapses: 0,
    errors: 0,
    files: []
  };
  
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun);
    results.files.push(result);
    
    if (result.success) {
      if (result.changed) {
        results.changed++;
        results.totalCollapses += result.updated;
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Converted ${result.updated} collapse(s) in: ${file}`);
      } else {
        results.unchanged++;
        console.error(`  No collapses found: ${file}`);
      }
    } else {
      results.errors++;
      console.error(`✗ Error: ${file} - ${result.error}`);
    }
  }
  
  console.error('\n' + '='.repeat(60));
  console.error(`Summary:`);
  console.error(`  Total files: ${results.total}`);
  console.error(`  Files modified: ${results.changed}`);
  console.error(`  Files unchanged: ${results.unchanged}`);
  console.error(`  Total collapses converted: ${results.totalCollapses}`);
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { convertCollapse, processMarkdownFile, processDirectory, getAllMarkdownFiles };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-collapse.js') || 
   process.argv[1].endsWith('/convert-collapse.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node convert-collapse.js <contentPath> [--dry-run]');
    console.error('Example: node convert-collapse.js ./lib/docs/documentation');
    console.error('         node convert-collapse.js ./lib/docs/documentation --dry-run');
    process.exit(1);
  }

  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');

  if (!fs.existsSync(contentPath)) {
    console.error(`Error: Path does not exist: ${contentPath}`);
    process.exit(1);
  }

  if (!fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: Path is not a directory: ${contentPath}`);
    process.exit(1);
  }

  try {
    const results = processDirectory(contentPath, dryRun);
    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}
