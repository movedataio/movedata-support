#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts bold text lines with line breaks to markdown lists
 * 
 * Usage: node convert-lists.js <contentPath> [--dry-run]
 * Example: node convert-lists.js ./lib/docs/documentation
 */

function convertBoldLinesToList(content, debug = false) {
  // Pattern to match:
  // - Blank line
  // - One or more lines starting with **Text:** followed by content and ending with \ (optional)
  // - Blank line
  
  // Split content into blocks separated by blank lines
  const blocks = content.split(/\n\n+/);
  let updated = 0;
  
  if (debug) {
    console.error(`\nDEBUG: Found ${blocks.length} blocks\n`);
  }
  
  const processedBlocks = blocks.map((block, index) => {
    const lines = block.split('\n').filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      return block;
    }
    
    if (debug && index < 5) {
      console.error(`DEBUG: Block ${index} has ${lines.length} lines:`);
      lines.forEach((line, i) => {
        const trimmed = line.trim();
        const matches = /^\*\*[^*]+\*\*:/.test(trimmed);
        console.error(`  Line ${i}: matches=${matches} | "${trimmed.substring(0, 80)}"`);
        if (i < 2) {
          // Show first few characters as char codes for first 2 lines
          const codes = trimmed.substring(0, 20).split('').map(c => c.charCodeAt(0)).join(',');
          console.error(`    Char codes: ${codes}`);
        }
      });
    }
    
    // Check if all lines in this block match the pattern: **Label:** text (with optional trailing \)
    const allLinesMatch = lines.every(line => {
      // Pattern matches: **Label:** (colon can be inside or outside the bold)
      return /^\*\*[^*]+:?\*\*:?/.test(line.trim());
    });
    
    if (!allLinesMatch) {
      return block;
    }
    
    if (debug) {
      console.error(`DEBUG: Block ${index} MATCHED! Converting to list.`);
    }
    
    // Convert each line to a list item
    const listItems = lines.map(line => {
      // Remove trailing backslash and any whitespace if present
      const cleaned = line.trim().replace(/\\?\s*$/, '');
      return `- ${cleaned}`;
    });
    
    updated++;
    return listItems.join('\n');
  });
  
  return {
    content: processedBlocks.join('\n\n'),
    updated
  };
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

function processMarkdownFile(filePath, dryRun = false, debug = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { content: converted, updated } = convertBoldLinesToList(content, debug);
    
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

function processDirectory(contentPath, dryRun = false, debug = false) {
  console.error('='.repeat(60));
  console.error('Bold Lines to Markdown Lists Converter');
  console.error('='.repeat(60));
  console.error(`Content Path: ${contentPath}`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be modified');
  }
  
  if (debug) {
    console.error('DEBUG MODE - Detailed logging enabled');
  }
  
  console.error('='.repeat(60));
  console.error(`\nScanning directory: ${contentPath}\n`);
  
  const markdownFiles = getAllMarkdownFiles(contentPath);
  console.error(`Found ${markdownFiles.length} markdown files\n`);
  
  const results = {
    total: 0,
    changed: 0,
    unchanged: 0,
    totalBlocks: 0,
    errors: 0,
    files: []
  };
  
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, dryRun, debug);
    results.files.push(result);
    
    if (result.success) {
      if (result.changed) {
        results.changed++;
        results.totalBlocks += result.updated;
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Converted ${result.updated} block(s) in: ${file}`);
      } else {
        if (!debug) {
          console.error(`  No blocks to convert: ${file}`);
        }
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
  console.error(`  Total blocks converted: ${results.totalBlocks}`);
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { convertBoldLinesToList, processMarkdownFile, processDirectory, getAllMarkdownFiles };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-lists.js') || 
   process.argv[1].endsWith('/convert-lists.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node convert-lists.js <contentPath> [--dry-run] [--debug]');
    console.error('Example: node convert-lists.js ./lib/docs/documentation');
    console.error('         node convert-lists.js ./lib/docs/documentation --dry-run');
    console.error('         node convert-lists.js ./lib/docs/documentation --dry-run --debug');
    process.exit(1);
  }

  const contentPath = args[0];
  const dryRun = args.includes('--dry-run');
  const debug = args.includes('--debug');

  if (!fs.existsSync(contentPath)) {
    console.error(`Error: Path does not exist: ${contentPath}`);
    process.exit(1);
  }

  if (!fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: Path is not a directory: ${contentPath}`);
    process.exit(1);
  }

  try {
    const results = processDirectory(contentPath, dryRun, debug);
    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}