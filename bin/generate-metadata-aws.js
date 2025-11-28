#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { url } from 'inspector';

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
  let currentMultilineValue = null;
  let multilineMode = null; // 'folded' (>-) or 'literal' (|-)
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Handle multi-line content continuation
    if (currentMultilineValue !== null) {
      // Check if this line is indented (continuation of multi-line value)
      const leadingSpaces = line.match(/^ */)[0].length;
      
      if (leadingSpaces >= 2 && trimmed) {
        // This is a continuation line
        const contentLine = line.substring(2); // Remove 2-space indent
        currentMultilineValue.push(contentLine);
        continue;
      } else if (!trimmed) {
        // Empty line in multi-line content
        continue;
      } else {
        // End of multi-line content, process it
        if (multilineMode === 'folded') {
          // Folded style (>-): join lines with spaces, remove line breaks
          parsed[currentKey] = currentMultilineValue.join(' ').trim();
        } else if (multilineMode === 'literal') {
          // Literal style (|-): join lines with spaces, remove line breaks
          parsed[currentKey] = currentMultilineValue.join(' ').trim();
        }
        currentMultilineValue = null;
        multilineMode = null;
        currentArray = null;
        // Don't continue - process this line normally
      }
    }
    
    if (!trimmed) continue;
    
    // Check for array items
    if (trimmed.startsWith('- ')) {
      if (currentArray) {
        const arrayItem = trimmed.substring(2).trim();
        // Remove quotes if present
        const cleanItem = arrayItem.replace(/^["']|["']$/g, '');
        if (cleanItem) { // Only add non-empty items
          currentArray.push(cleanItem);
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
      
      if (value === '>-' || value === '|-' || value === '>' || value === '|') {
        // Start of multi-line value
        multilineMode = value.startsWith('>') ? 'folded' : 'literal';
        currentMultilineValue = [];
        currentArray = null;
      } else if (value) {
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
        currentMultilineValue = null;
      } else {
        // Prepare for array
        currentArray = [];
        parsed[key] = currentArray;
        currentMultilineValue = null;
      }
    }
  }
  
  // Handle any remaining multi-line content at end of frontmatter
  if (currentMultilineValue !== null && currentKey) {
    if (multilineMode === 'folded') {
      parsed[currentKey] = currentMultilineValue.join(' ').trim();
    } else if (multilineMode === 'literal') {
      parsed[currentKey] = currentMultilineValue.join(' ').trim();
    }
  }
  
  // Clean up empty arrays and invalid values
  const cleanedParsed = {};
  for (const [key, value] of Object.entries(parsed)) {
    if (Array.isArray(value)) {
      // Only include arrays that have items
      if (value.length > 0) {
        cleanedParsed[key] = value;
      }
    } else if (value !== null && value !== undefined && value !== '') {
      // Only include non-empty values
      cleanedParsed[key] = value;
    }
  }
  
  return { frontmatter: Object.keys(cleanedParsed).length > 0 ? cleanedParsed : null, contentWithoutFrontmatter };
}

function getGitLastModifiedDate(filePath, rootPath, sourceRepoPath = null, debug = false) {
  try {
    // Determine which repository to query
    const repoPath = sourceRepoPath || rootPath;
    
    // Calculate relative path from the repo root
    const relativePath = path.relative(rootPath, filePath);
    
    if (debug) {
      console.error(`  DEBUG: Looking up git history for: ${relativePath} in repo: ${repoPath}`);
    }
    
    const timestamp = execSync(`git log -1 --pretty="format:%ct" "${relativePath}"`, { 
      encoding: 'utf8',
      cwd: repoPath, // Run git command in the source repository
      stdio: ['pipe', 'pipe', 'ignore'] // Suppress stderr
    }).trim();
    
    if (timestamp && /^\d+$/.test(timestamp)) {
      return new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
    }
  } catch (error) {
    // Git command failed or file not in git - continue without last modified date
    if (debug) {
      console.error(`  DEBUG: Could not get git timestamp for ${filePath}: ${error.message}`);
    }
  }
  
  return null;
}

function extractTitleFromMarkdown(content) {
  // Try to find the first H1 heading (# Title)
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return h1Match[1].trim();
  }
  
  // If no H1, try to find the first H2 heading (## Title)
  const h2Match = content.match(/^##\s+(.+)$/m);
  if (h2Match) {
    return h2Match[1].trim();
  }
  
  return null;
}

function extractPathMetadata(filePath, rootPath, webPathPrefix = null) {
  const relativePath = path.relative(rootPath, filePath).replace(/\\/g, '/'); // Ensure forward slashes
  const relativePathWithoutMd = relativePath.replace(/\.md$/, ''); // Remove .md extension
  const urlPath = webPathPrefix ? `/${path.join(webPathPrefix, relativePathWithoutMd)}` : `/${relativePathWithoutMd}`;
  
  let cleanedUrlPath = urlPath;
  if (urlPath.endsWith('README')) {
    cleanedUrlPath = urlPath.slice(0, -7); // Remove 'README'
  }
  
  const pathMetadata = { url: cleanedUrlPath };
  return pathMetadata;
}

function extractCollectionMetadata(webPathPrefix) {
  if (!webPathPrefix) return null;

  switch (webPathPrefix.toLowerCase()) {
    case 'user_guide': return 'User Guide';
    case 'knowledgebase': return 'Knowledge Base';
    default: {
      return webPathPrefix.split('/').map(part => part.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())).join(' > ');
    }
  }
}

function extractHeirarchyMetadata(metadata, hierarchyNode) {
  const result = {};
  const convertName = (name) => (name?.replace) ? name.replace(/\.md$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : null;

  const breadcrumbs = [];
  for (let i = 0; i < hierarchyNode.length; i++) {
    const node = hierarchyNode[i];
    const nodeName = convertName(node.name);
    
    if (i === 0) {
      if (node.name !== 'README.md') breadcrumbs.unshift(metadata?.title ?? nodeName);
    } else {
      breadcrumbs.unshift(nodeName);
    }
  }

  result.section = (hierarchyNode[hierarchyNode.length - 1].type === 'directory') ? convertName(hierarchyNode[hierarchyNode.length - 1].name) : null;

  if (metadata?.collection) breadcrumbs.unshift(metadata.collection);
  result.breadcrumb = breadcrumbs.join(' > ');

  return result;
}

function createMetadataJson(frontmatter, metadata) {
  // Define GitBook layout keys that don't provide useful search context
  const gitbookLayoutKeys = [
    'layout',
    'width', 
    'title',
    'tableOfContents',
    'outline',
    'pagination',
    'metadata',
    'visible'
  ];
  
  // Filter out GitBook layout metadata and empty objects
  const filteredFrontmatter = {};
  for (const [key, value] of Object.entries(frontmatter)) {
    // Skip GitBook layout keys
    if (gitbookLayoutKeys.includes(key)) {
      continue;
    }
    
    // Skip empty objects (common in GitBook frontmatter)
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const hasContent = Object.values(value).some(v => 
        v !== null && v !== undefined && v !== '' && 
        !(typeof v === 'boolean') // Skip boolean values like visible: true
      );
      if (!hasContent) {
        continue;
      }
    }
    
    filteredFrontmatter[key] = value;
  }
  
  // Combine filtered frontmatter with path-based metadata
  const combinedMetadata = {
    ...metadata,
    ...filteredFrontmatter
  };
  
  // Clean and validate metadata for AWS Bedrock
  const cleanedMetadata = {};
  for (const [key, value] of Object.entries(combinedMetadata)) {
    // Skip null, undefined, or empty string values
    if (value === null || value === undefined || value === '') {
      continue;
    }
    
    // Handle arrays - only include non-empty arrays
    if (Array.isArray(value)) {
      if (value.length > 0) {
        // Ensure all array items are strings and not too long
        const cleanArray = value
          .filter(item => item !== null && item !== undefined && item !== '')
          .map(item => String(item).substring(0, 1000)); // Limit individual items
        if (cleanArray.length > 0) {
          cleanedMetadata[key] = cleanArray;
        }
      }
      continue;
    }
    
    // Handle other types
    if (typeof value === 'string') {
      // Limit string length for AWS Bedrock
      const trimmedValue = value.trim();
      if (trimmedValue && trimmedValue.length <= 1000) {
        cleanedMetadata[key] = trimmedValue;
      }
    } else if (typeof value === 'number' || typeof value === 'boolean') {
      cleanedMetadata[key] = value;
    }

    // Stop after 10 attributes
    if (Object.keys(cleanedMetadata).length >= 10) {
      break;
    }
  }
  
  // Structure for AWS Bedrock Knowledge Base
  const bedrockMetadata = {
    metadataAttributes: cleanedMetadata
  };
  
  return JSON.stringify(bedrockMetadata, null, 2);
}

function processMarkdownFile(filePath, rootPath, dryRun = false, debug = false, webPathPrefix = null, sourceRepoPath = null, hierarchyNode = null) {
  const metadata = { url: null, title: null, modified_date: null };

  try {
    // Read file content
    const content = fs.readFileSync(filePath, 'utf8');   
    
    if (debug) {
      console.error(`  DEBUG: Processing file: ${filePath}`);
      const first100Chars = content.substring(0, 100).replace(/\n/g, '\\n');
      console.error(`  DEBUG: File starts with: ${first100Chars}`);
    }

    // Get last modified date from git
    metadata.modified_date = getGitLastModifiedDate(filePath, rootPath, sourceRepoPath, debug);
    if (!metadata.modified_date) {
      if (debug) {
        console.error(`  DEBUG: No valid last modified date.`);
      }
    } else if (debug) {
      console.error(`  DEBUG: Last modified date:`, metadata.modified_date);
    }
    
    // Extract title from markdown content
    const title = extractTitleFromMarkdown(content);
    if (title) {
      metadata.title = title;
      if (debug) {
        console.error(`  DEBUG: Extracted title: ${title}`);
      }
    } else if (debug) {
      console.error(`  DEBUG: No title found in markdown content`);
    }
    
    // Parse frontmatter
    const { frontmatter, contentWithoutFrontmatter } = parseYamlFrontmatter(content);
    
    if (!frontmatter || Object.keys(frontmatter).length === 0) {
      if (debug) {
        console.error(`  DEBUG: No valid frontmatter found in: ${filePath}`);
        console.error(`  DEBUG: Will generate metadata from path information only`);
      }
    } else if (debug) {
      console.error(`  DEBUG: Found frontmatter in: ${filePath}`);
      console.error(`  DEBUG: Frontmatter keys:`, Object.keys(frontmatter));
      console.error(`  DEBUG: Frontmatter:`, JSON.stringify(frontmatter, null, 2));
    }
    
    // Extract path-based metadata
    Object.assign(metadata, extractPathMetadata(filePath, rootPath, webPathPrefix));

    // Extract collection from webPathPrefix
    metadata.collection = extractCollectionMetadata(webPathPrefix);

    // Add hierarchy information if available
    if (debug) console.log(`  DEBUG: Hierarchy information: ${JSON.stringify(hierarchyNode)}`);
    Object.assign(metadata, extractHeirarchyMetadata(metadata, hierarchyNode));
    
    if (debug) {
      console.error(`  DEBUG: Path metadata:`, metadata);
    }
    
    // Create metadata JSON content (use empty object if no frontmatter)
    const metadataJsonContent = createMetadataJson(frontmatter || {}, metadata);

    if (debug) {
      console.error(`  DEBUG: Generated metadata:`, metadataJsonContent);
    }
    
    if (!dryRun) {
      // Write the metadata JSON file
      const metadataFilePath = `${filePath}.metadata.json`;
      fs.writeFileSync(metadataFilePath, metadataJsonContent, 'utf8');
      
      // Only update the markdown file if there was frontmatter to remove
      if (frontmatter && Object.keys(frontmatter).length > 0) {
        const cleanContent = contentWithoutFrontmatter.trim() + '\n';
        fs.writeFileSync(filePath, cleanContent, 'utf8');
      }
    }
    
    return { 
      success: true, 
      changed: true, 
      path: filePath, 
      metadataPath: `${filePath}.metadata.json`,
      metadata: metadataJsonContent,
      frontmatterKeys: frontmatter ? Object.keys(frontmatter) : [],
      pathOnly: !frontmatter || Object.keys(frontmatter).length === 0
    };
  } catch (error) {
    return { success: false, error: error.message, path: filePath };
  }
}

function getAllMarkdownFiles(dirPath) {
  const files = [];
  const hierarchy = {};
  
  function traverse(currentPath, parentPath = '') {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    const relativePath = path.relative(dirPath, currentPath);
    
    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativeFullPath = path.relative(dirPath, fullPath);
      
      if (entry.isDirectory()) {
        // Create directory node in hierarchy
        if (!hierarchy[relativeFullPath]) {
          hierarchy[relativeFullPath] = {
            type: 'directory',
            name: entry.name,
            path: relativeFullPath,
            parent: relativePath || null,
            children: []
          };
        }
        
        // Add to parent's children
        if (relativePath && hierarchy[relativePath]) {
          hierarchy[relativePath].children.push(relativeFullPath);
        }
        
        traverse(fullPath, relativeFullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Create file node in hierarchy
        hierarchy[relativeFullPath] = {
          type: 'file',
          name: entry.name,
          path: relativeFullPath,
          parent: relativePath || null,
          depth: relativePath ? relativePath.split(path.sep).length : 0
        };
        
        // Add to parent's children if parent exists
        if (relativePath) {
          if (!hierarchy[relativePath]) {
            hierarchy[relativePath] = {
              type: 'directory',
              name: path.basename(currentPath),
              path: relativePath,
              parent: path.dirname(relativePath) !== '.' ? path.dirname(relativePath) : null,
              children: []
            };
          }
          hierarchy[relativePath].children.push(relativeFullPath);
        }
        
        files.push(fullPath);
      }
    }
  }
  
  traverse(dirPath);
  return { files, hierarchy };
}

function processDirectory(contentPath, dryRun = false, debug = false, webPathPrefix = null, sourceRepoPath = null) {
  console.error('='.repeat(60));
  console.error('AWS Bedrock Metadata Sidecar File Generator');
  console.error('='.repeat(60));
  console.error(`Content Path: ${contentPath}`);
  
  if (sourceRepoPath) {
    console.error(`Source Repo: ${sourceRepoPath}`);
  }
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be modified');
  }
  
  if (debug) {
    console.error('DEBUG MODE - Detailed logging enabled');
  }
  
  console.error('='.repeat(60));
  console.error(`\nScanning directory: ${contentPath}\n`);
  
  const { files: markdownFiles, hierarchy } = getAllMarkdownFiles(contentPath);
  console.error(`Found ${markdownFiles.length} markdown files\n`);
  
  if (debug) {
    console.error(`  DEBUG: Built hierarchy with ${Object.keys(hierarchy).length} nodes\n`);
  }
  
  const results = {
    total: 0,
    processed: 0,
    unchanged: 0,
    errors: 0,
    files: []
  };
  
  for (const file of markdownFiles) {
    results.total++;
    
    // Get hierarchy node for this file
    const relativePath = path.relative(contentPath, file);
    // Build an array of hierarchy nodes from the file up to the root
    const hierarchyNode = [];
    let nodeKey = relativePath;
    while (nodeKey) {
      // Try both backslash and forward-slash variants for robustness
      const node = hierarchy[nodeKey] || hierarchy[nodeKey.replace(/\\/g, '/')] || null;
      if (!node) break;
      hierarchyNode.push(node);
      if (!node.parent) break;
      nodeKey = node.parent;
    }
    // If nothing found, set to null for backward compatibility
    if (hierarchyNode.length === 0) {
      hierarchyNode = null;
    }
    
    const result = processMarkdownFile(file, contentPath, dryRun, debug, webPathPrefix, sourceRepoPath, hierarchyNode);
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
  getGitLastModifiedDate,
  extractTitleFromMarkdown,
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
  
  // Filter out flag arguments to get positional arguments
  const positionalArgs = args.filter(arg => !arg.startsWith('--'));
  const dryRun = args.includes('--dry-run');
  const debug = args.includes('--debug');
  
  // Check for --source-repo flag
  const sourceRepoIndex = args.indexOf('--source-repo');
  const sourceRepoPath = sourceRepoIndex !== -1 && args[sourceRepoIndex + 1] 
    ? args[sourceRepoIndex + 1] 
    : null;
  
  if (positionalArgs.length < 1) {
    console.error('Usage: node generate-metadata-aws.js <contentPath> [webPathPrefix] [--source-repo <path>] [--dry-run] [--debug]');
    console.error('');
    console.error('Arguments:');
    console.error('  contentPath      Path to the directory containing markdown files');
    console.error('  webPathPrefix    Optional prefix for web paths (e.g., "documentation", "knowledgebase")');
    console.error('');
    console.error('Options:');
    console.error('  --source-repo    Path to source git repository for looking up file history');
    console.error('  --dry-run        Show what would be done without making changes');
    console.error('  --debug          Enable detailed debug logging');
    console.error('');
    console.error('Examples:');
    console.error('  node generate-metadata-aws.js ./docs');
    console.error('  node generate-metadata-aws.js ./docs documentation');
    console.error('  node generate-metadata-aws.js .tmp/docs documentation --source-repo ./movedata-support');
    console.error('  node generate-metadata-aws.js ./docs knowledgebase --dry-run');
    console.error('  node generate-metadata-aws.js ./docs developer --dry-run --debug');
    process.exit(1);
  }

  const contentPath = positionalArgs[0];
  const webPathPrefix = positionalArgs[1] || null;

  if (!fs.existsSync(contentPath)) {
    console.error(`Error: Path does not exist: ${contentPath}`);
    process.exit(1);
  }

  if (!fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: Path is not a directory: ${contentPath}`);
    process.exit(1);
  }

  try {
    const results = processDirectory(contentPath, dryRun, debug, webPathPrefix, sourceRepoPath);
    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}