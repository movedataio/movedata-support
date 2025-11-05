#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts Material for MkDocs note blocks containing metadata to YAML frontmatter
 * 
 * Usage: node convert-metadata.js <contentPath> [--dry-run] [--debug]
 * Example: node convert-metadata.js ./docs
 */

function parseMetadataFromNote(noteContent) {
  const metadata = {};
  const lines = noteContent.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    // Match lines like: * key=value or * key = value
    const match = trimmed.match(/^\*\s*([^=]+?)\s*=\s*(.+)$/);
    if (match) {
      const key = match[1].trim();
      const rawValue = match[2].trim();
      
      // Check if value is comma-separated (convert to array)
      if (rawValue.includes(',')) {
        const arrayValue = rawValue.split(',').map(item => item.trim()).filter(item => item.length > 0);
        metadata[key] = arrayValue;
      } else {
        // Try to parse as number or boolean, otherwise keep as string
        let value = rawValue;
        if (value.toLowerCase() === 'true') {
          value = true;
        } else if (value.toLowerCase() === 'false') {
          value = false;
        } else if (/^\d+$/.test(value)) {
          value = parseInt(value, 10);
        } else if (/^\d*\.\d+$/.test(value)) {
          value = parseFloat(value);
        }
        metadata[key] = value;
      }
    }
  }
  
  return metadata;
}



function metadataToYamlFrontmatter(metadata) {
  const lines = ['---'];
  
  // Add all metadata fields dynamically
  for (const [key, value] of Object.entries(metadata)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach(item => {
        if (typeof item === 'string') {
          lines.push(`  - ${item}`);
        } else {
          lines.push(`  - ${item}`);
        }
      });
    } else if (typeof value === 'string') {
      lines.push(`${key}: ${value}`);
    } else {
      // Numbers, booleans, etc.
      lines.push(`${key}: ${value}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

function parseExistingFrontmatter(content) {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterPattern);
  
  if (!match) {
    return { frontmatter: null, contentWithoutFrontmatter: content };
  }
  
  const frontmatterText = match[1];
  const contentWithoutFrontmatter = content.slice(match[0].length);
  
  // Parse YAML-like frontmatter
  const parsed = {};
  const lines = frontmatterText.split('\n');
  let currentKey = null;
  let currentArray = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Check for array items
    if (trimmed.startsWith('- ')) {
      if (currentArray) {
        const arrayItem = trimmed.substring(2).trim();
        // Parse array item value types
        let parsedItem = arrayItem;
        if (arrayItem.toLowerCase() === 'true') {
          parsedItem = true;
        } else if (arrayItem.toLowerCase() === 'false') {
          parsedItem = false;
        } else if (/^\d+$/.test(arrayItem)) {
          parsedItem = parseInt(arrayItem, 10);
        } else if (/^\d*\.\d+$/.test(arrayItem)) {
          parsedItem = parseFloat(arrayItem);
        }
        currentArray.push(parsedItem);
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
        // Parse simple value types
        let parsedValue = value;
        if (value.toLowerCase() === 'true') {
          parsedValue = true;
        } else if (value.toLowerCase() === 'false') {
          parsedValue = false;
        } else if (/^\d+$/.test(value)) {
          parsedValue = parseInt(value, 10);
        } else if (/^\d*\.\d+$/.test(value)) {
          parsedValue = parseFloat(value);
        }
        parsed[key] = parsedValue;
        currentArray = null;
      } else {
        // Prepare for array
        currentArray = [];
        parsed[key] = currentArray;
      }
    }
  }
  
  return { frontmatter: parsed, contentWithoutFrontmatter };
}

function mergeFrontmatter(existing, newMetadata) {
  const merged = { ...existing };
  
  // Add new metadata fields (don't overwrite existing)
  for (const [key, value] of Object.entries(newMetadata)) {
    if (!merged.hasOwnProperty(key)) {
      merged[key] = value;
    } else {
      // If key exists, handle array merging for certain types
      if (Array.isArray(value) && Array.isArray(merged[key])) {
        // Merge arrays and deduplicate
        const combined = [...merged[key], ...value];
        merged[key] = [...new Set(combined)];
      }
      // For non-arrays, keep existing value (don't overwrite)
    }
  }
  
  return merged;
}

function frontmatterToYaml(frontmatter) {
  const lines = ['---'];
  
  for (const [key, value] of Object.entries(frontmatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      value.forEach(item => {
        if (typeof item === 'string') {
          lines.push(`  - ${item}`);
        } else {
          lines.push(`  - ${item}`);
        }
      });
    } else if (typeof value === 'string') {
      lines.push(`${key}: ${value}`);
    } else {
      // Numbers, booleans, etc.
      lines.push(`${key}: ${value}`);
    }
  }
  
  lines.push('---');
  return lines.join('\n');
}

function convertNoteToFrontmatter(content, debug = false) {
  // Pattern to match the note block:
  // !!! note
  //     Metadata
  //     
  //     * key=value
  //     * key=value
  //     ...
  
  const notePattern = /^!!! note\s*\n(?:\s{4}Metadata\s*\n)?(?:\s{4}\n)?((?:\s{4}\*[^\n]+\n?)+)/m;
  const match = content.match(notePattern);
  
  if (!match) {
    if (debug) {
      console.error('  DEBUG: No note block found');
    }
    return { content, changed: false };
  }
  
  if (debug) {
    console.error('  DEBUG: Found note block:');
    console.error(`    ${match[0].substring(0, 100)}...`);
  }
  
  // Extract the metadata lines
  const metadataBlock = match[1];
  const metadata = parseMetadataFromNote(metadataBlock);
  
  if (debug) {
    console.error('  DEBUG: Parsed metadata:', metadata);
  }
  
  if (Object.keys(metadata).length === 0) {
    if (debug) {
      console.error('  DEBUG: No metadata found in note block');
    }
    return { content, changed: false };
  }
  
  // Parse existing frontmatter if present
  const { frontmatter: existingFrontmatter, contentWithoutFrontmatter } = parseExistingFrontmatter(content);
  
  // Remove the note block from content
  const contentWithoutNote = contentWithoutFrontmatter.replace(notePattern, '').trim();
  
  let finalFrontmatter;
  
  if (existingFrontmatter) {
    if (debug) {
      console.error('  DEBUG: Existing frontmatter found, merging');
      console.error('  DEBUG: Existing:', existingFrontmatter);
    }
    
    // Merge existing frontmatter with new metadata
    const merged = mergeFrontmatter(existingFrontmatter, metadata);
    finalFrontmatter = frontmatterToYaml(merged);
    
    if (debug) {
      console.error('  DEBUG: Merged frontmatter:', merged);
    }
  } else {
    // No existing frontmatter, create new
    finalFrontmatter = metadataToYamlFrontmatter(metadata);
    
    if (debug) {
      console.error('  DEBUG: No existing frontmatter, creating new');
      console.error('  DEBUG: Generated frontmatter:');
      console.error(finalFrontmatter);
    }
  }
  
  // Combine frontmatter with remaining content
  const newContent = `${finalFrontmatter}\n\n${contentWithoutNote}`;
  
  return { content: newContent, changed: true };
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
    const { content: converted, changed } = convertNoteToFrontmatter(content, debug);
    
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

function processDirectory(contentPath, dryRun = false, debug = false) {
  console.error('='.repeat(60));
  console.error('Note Metadata to Frontmatter Converter');
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
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Converted metadata to frontmatter: ${file}`);
      } else {
        results.unchanged++;
        if (debug) {
          console.error(`  No conversion needed: ${file}`);
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
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { 
  convertNoteToFrontmatter, 
  parseMetadataFromNote, 
  metadataToYamlFrontmatter, 
  parseExistingFrontmatter,
  mergeFrontmatter,
  frontmatterToYaml,
  processMarkdownFile, 
  processDirectory, 
  getAllMarkdownFiles 
};

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-metadata.js') || 
   process.argv[1].endsWith('/convert-metadata.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node convert-metadata.js <contentPath> [--dry-run] [--debug]');
    console.error('Example: node convert-metadata.js ./docs');
    console.error('         node convert-metadata.js ./docs --dry-run');
    console.error('         node convert-metadata.js ./docs --dry-run --debug');
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
