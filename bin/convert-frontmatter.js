#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Converts YAML frontmatter to plain markdown description
 * 
 * Usage: node convert-frontmatter.js <contentPath>
 * Example: node convert-frontmatter.js ./docs/documentation
 */

function extractFrontmatter(content) {
  // Match YAML frontmatter between --- delimiters
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return null;
  }
  
  const frontmatter = match[1];
  const restOfContent = content.substring(match[0].length);
  
  return { frontmatter, restOfContent, fullMatch: match[0] };
}

function parseDescription(frontmatter) {
  // Match description field (can be multi-line with >-)
  const descRegex = /description:\s*>-\s*\n((?:[ ]{2}.*\n?)*)/;
  const match = frontmatter.match(descRegex);
  
  if (!match) {
    return null;
  }
  
  // Extract and clean up the description
  const rawDescription = match[1];
  
  // Remove the 2-space indent from each line and join
  const description = rawDescription
    .split('\n')
    .map(line => line.replace(/^  /, ''))
    .join('\n')
    .trim();
  
  return description;
}

function convertContent(content) {
  const extracted = extractFrontmatter(content);
  
  if (!extracted) {
    // No frontmatter, return as-is
    return { converted: content, changed: false };
  }
  
  const description = parseDescription(extracted.frontmatter);
  
  if (!description) {
    // No description in frontmatter, just remove frontmatter
    return { converted: extracted.restOfContent, changed: true };
  }
  
  // Find the first H1 heading
  const h1Match = extracted.restOfContent.match(/^(# .+)$/m);
  
  if (!h1Match) {
    // No H1 found, just prepend description
    const converted = `${description}\n\n${extracted.restOfContent}`;
    return { converted, changed: true };
  }
  
  // Insert description after H1
  const h1Index = extracted.restOfContent.indexOf(h1Match[0]);
  const h1EndIndex = h1Index + h1Match[0].length;
  
  const beforeH1 = extracted.restOfContent.substring(0, h1EndIndex);
  const afterH1 = extracted.restOfContent.substring(h1EndIndex);
  
  const converted = `${beforeH1}\n\n${description}${afterH1}`;
  
  return { converted, changed: true };
}

function processMarkdownFile(filePath, dryRun = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { converted, changed } = convertContent(content);
    
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

function processDirectory(contentPath, dryRun = false) {
  console.error(`Scanning directory: ${contentPath}\n`);
  
  const markdownFiles = getAllMarkdownFiles(contentPath);
  console.error(`Found ${markdownFiles.length} markdown files\n`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be modified\n');
  }
  
  const results = {
    total: 0,
    changed: 0,
    unchanged: 0,
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
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Modified: ${file}`);
      } else {
        results.unchanged++;
        console.error(`  Skipped (no frontmatter): ${file}`);
      }
    } else {
      results.errors++;
      console.error(`✗ Error: ${file} - ${result.error}`);
    }
  }
  
  console.error('\n' + '='.repeat(60));
  console.error(`Summary:`);
  console.error(`  Total files: ${results.total}`);
  console.error(`  Modified: ${results.changed}`);
  console.error(`  Unchanged: ${results.unchanged}`);
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { convertContent, processMarkdownFile, processDirectory, getAllMarkdownFiles };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-frontmatter.js') || 
   process.argv[1].endsWith('/convert-frontmatter.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node convert-frontmatter.js <contentPath> [--dry-run]');
    console.error('Example: node convert-frontmatter.js ./docs/documentation');
    console.error('         node convert-frontmatter.js ./docs/documentation --dry-run');
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