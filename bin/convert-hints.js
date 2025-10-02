#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts GitBook hints to MkDocs Material admonitions
 * 
 * Usage: node convert-hints.js <contentPath> [--dry-run]
 * Example: node convert-hints.js ./lib/docs/documentation
 */

// Map GitBook hint styles to MkDocs admonition types
const HINT_TYPE_MAP = {
  'info': 'note',
  'warning': 'warning',
  'danger': 'danger',
  'success': 'success',
  'tip': 'tip'
};

function extractTitle(content) {
  // Check if first line is bold (title)
  const titleMatch = content.trim().match(/^\*\*([^*]+)\*\*:?\s*/);
  if (titleMatch) {
    const title = titleMatch[1].trim();
    const remainingContent = content.substring(titleMatch[0].length).trim();
    return { title, content: remainingContent };
  }
  return { title: null, content: content.trim() };
}

function indentContent(content, spaces = 4) {
  const indent = ' '.repeat(spaces);
  return content
    .split('\n')
    .map(line => line.trim() ? `${indent}${line}` : '')
    .join('\n');
}

function convertHint(match, style, content) {
  // Get the MkDocs admonition type
  const admonitionType = HINT_TYPE_MAP[style] || 'note';
  
  // Extract title if present
  const { title, content: bodyContent } = extractTitle(content);
  
  // Build the admonition
  let admonition = '';
  
  if (title) {
    admonition = `!!! ${admonitionType} "${title}"\n`;
  } else {
    admonition = `!!! ${admonitionType}\n`;
  }
  
  // Indent the content (4 spaces)
  const indentedContent = indentContent(bodyContent, 4);
  admonition += indentedContent;
  
  return admonition;
}

function convertHints(content) {
  // Pattern to match GitBook hints
  // {% hint style="info" %}...{% endhint %}
  const hintPattern = /\{%\s*hint\s+style="([^"]+)"\s*%\}\s*([\s\S]*?)\s*\{%\s*endhint\s*%\}/g;
  
  let updated = 0;
  const updatedContent = content.replace(hintPattern, (match, style, hintContent) => {
    updated++;
    return convertHint(match, style, hintContent);
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
    const { content: converted, updated } = convertHints(content);
    
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
  console.error('GitBook Hints to MkDocs Admonitions Converter');
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
    totalHints: 0,
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
        results.totalHints += result.updated;
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Converted ${result.updated} hint(s) in: ${file}`);
      } else {
        results.unchanged++;
        console.error(`  No hints found: ${file}`);
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
  console.error(`  Total hints converted: ${results.totalHints}`);
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { convertHints, processMarkdownFile, processDirectory, getAllMarkdownFiles };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-hints.js') || 
   process.argv[1].endsWith('/convert-hints.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node convert-hints.js <contentPath> [--dry-run]');
    console.error('Example: node convert-hints.js ./lib/docs/documentation');
    console.error('         node convert-hints.js ./lib/docs/documentation --dry-run');
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