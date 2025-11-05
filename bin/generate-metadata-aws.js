#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Generates AWS Bedrock metadata sidecar files by extracting YAML frontmatter
 * from markdown files and creating corresponding .metadata.json files
 * 
 * Usage: node generate-metadata-aws.js <contentPath> [--dry-run] [--debug]
 * Example: node generate-metadata-aws.js ./docs
 */

function parseYamlFrontmatter(content) {
  const frontmatterPattern = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterPattern);
  
  if (!match) {
    return { frontmatter: null, contentWithoutFrontmatter: content };
  }
  
  const frontmatterText = match[1];
  const contentWithoutFrontmatter = match[2];
  
  // Parse YAML-like frontmatter into object
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
        // Remove quotes if present
        const cleanItem = arrayItem.replace(/^["']|["']$/g, '');
        currentArray.push(cleanItem);
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
        // Parse simple value types and remove quotes
        let parsedValue = value.replace(/^["']|["']$/g, '');
        if (parsedValue.toLowerCase() === 'true') {
          parsedValue = true;
        } else if (parsedValue.toLowerCase() === 'false') {
          parsedValue = false;
        } else if (/^\d+$/.test(parsedValue)) {
          parsedValue = parseInt(parsedValue, 10);
        } else if (/^\d*\.\d+$/.test(parsedValue)) {
          parsedValue = parseFloat(parsedValue);
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

function extractPathMetadata(filePath, rootPath) {
  const relativePath = path.relative(rootPath, filePath);
  const pathParts = relativePath.split(path.sep);
  const fileName = path.basename(filePath, '.md');
  
  const pathMetadata = {
    filename: fileName,
    file_path: relativePath.replace(/\\/g, '/'), // Ensure forward slashes
    relative_path: relativePath.replace(/\\/g, '/')
  };
  
  // Determine section/category from path
  if (pathParts.includes('knowledgebase')) {
    pathMetadata.section = 'knowledgebase';
    const kbIndex = pathParts.indexOf('knowledgebase');
    if (kbIndex < pathParts.length - 2) {
      pathMetadata.category = pathParts[kbIndex + 1];
    }
  } else if (pathParts.includes('developer')) {
    pathMetadata.section = 'developer';
    const devIndex = pathParts.indexOf('developer');
    if (devIndex < pathParts.length - 2) {
      pathMetadata.category = pathParts[devIndex + 1];
    }
  } else if (pathParts.includes('documentation')) {
    pathMetadata.section = 'documentation';
    pathMetadata.category = 'general';
  } else if (pathParts.includes('extension')) {
    pathMetadata.section = 'extension';
    const extIndex = pathParts.indexOf('extension');
    if (extIndex < pathParts.length - 1) {
      const extName = pathParts[extIndex + 1];
      pathMetadata.extension_type = extName;
      pathMetadata.category = 'extension';
    }
  } else if (pathParts.includes('schema')) {
    pathMetadata.section = 'schema';
    const schemaIndex = pathParts.indexOf('schema');
    if (schemaIndex < pathParts.length - 1) {
      const schemaName = pathParts[schemaIndex + 1];
      pathMetadata.schema_type = schemaName;
      pathMetadata.category = 'schema';
    }
  }
  
  return pathMetadata;
}

function createMetadataJson(frontmatter, pathMetadata) {
  // Combine frontmatter with path-based metadata
  const combinedMetadata = {
    ...pathMetadata,
    ...frontmatter
  };
  
  // Add processing metadata
  combinedMetadata.processed_date = new Date().toISOString().split('T')[0];
  combinedMetadata.content_type = 'documentation';
  combinedMetadata.source_system = 'movedata-support';
  
  // Structure for AWS Bedrock Knowledge Base
  const bedrockMetadata = {
    metadataAttributes: combinedMetadata
  };
  
  return JSON.stringify(bedrockMetadata, null, 2);
}

function processMarkdownFile(filePath, rootPath, dryRun = false, debug = false) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const { frontmatter, contentWithoutFrontmatter } = parseYamlFrontmatter(content);
    
    if (!frontmatter || Object.keys(frontmatter).length === 0) {
      if (debug) {
        console.error(`  DEBUG: No frontmatter found in: ${filePath}`);
      }
      return { success: true, changed: false, path: filePath, reason: 'no_frontmatter' };
    }
    
    if (debug) {
      console.error(`  DEBUG: Found frontmatter in: ${filePath}`);
      console.error(`  DEBUG: Frontmatter:`, frontmatter);
    }
    
    // Extract path-based metadata
    const pathMetadata = extractPathMetadata(filePath, rootPath);
    
    if (debug) {
      console.error(`  DEBUG: Path metadata:`, pathMetadata);
    }
    
    // Create metadata JSON content
    const metadataJsonContent = createMetadataJson(frontmatter, pathMetadata);
    
    if (!dryRun) {
      // Write the metadata JSON file
      const metadataFilePath = `${filePath}.metadata.json`;
      fs.writeFileSync(metadataFilePath, metadataJsonContent, 'utf8');
      
      // Write the markdown file without frontmatter
      const cleanContent = contentWithoutFrontmatter.trim() + '\n';
      fs.writeFileSync(filePath, cleanContent, 'utf8');
    }
    
    return { 
      success: true, 
      changed: true, 
      path: filePath, 
      metadataPath: `${filePath}.metadata.json`,
      frontmatterKeys: Object.keys(frontmatter)
    };
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

function processDirectory(contentPath, dryRun = false, debug = false) {
  console.error('='.repeat(60));
  console.error('AWS Bedrock Metadata Sidecar File Generator');
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
    processed: 0,
    unchanged: 0,
    errors: 0,
    files: []
  };
  
  for (const file of markdownFiles) {
    results.total++;
    const result = processMarkdownFile(file, contentPath, dryRun, debug);
    results.files.push(result);
    
    if (result.success) {
      if (result.changed) {
        results.processed++;
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Generated metadata for: ${file}`);
        if (debug && result.frontmatterKeys) {
          console.error(`    Extracted keys: ${result.frontmatterKeys.join(', ')}`);
        }
      } else {
        results.unchanged++;
        if (debug) {
          console.error(`  No frontmatter to extract: ${file} (${result.reason})`);
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
  console.error(`  Files processed: ${results.processed}`);
  console.error(`  Files unchanged: ${results.unchanged}`);
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { 
  parseYamlFrontmatter,
  extractPathMetadata,
  createMetadataJson,
  processMarkdownFile, 
  processDirectory, 
  getAllMarkdownFiles 
};

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('generate-metadata-aws.js') || 
   process.argv[1].endsWith('/generate-metadata-aws.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node generate-metadata-aws.js <contentPath> [--dry-run] [--debug]');
    console.error('Example: node generate-metadata-aws.js ./docs');
    console.error('         node generate-metadata-aws.js ./docs --dry-run');
    console.error('         node generate-metadata-aws.js ./docs --dry-run --debug');
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