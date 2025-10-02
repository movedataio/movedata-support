#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts GitBook embed tags to HTML iframes
 * 
 * Usage: node convert-embeds.js <contentPath> [--dry-run]
 * Example: node convert-embeds.js ./lib/docs/documentation
 */

function extractYouTubeId(url) {
  // Handle various YouTube URL formats
  // https://www.youtube.com/watch?v=VIDEO_ID
  // https://youtu.be/VIDEO_ID
  // https://www.youtube.com/embed/VIDEO_ID
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/,
    /youtube\.com\/watch\?.*v=([^&\s]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

function createYouTubeEmbed(videoId) {
  return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

function convertEmbed(match, url) {
  // Check if it's a YouTube URL
  const youtubeId = extractYouTubeId(url);
  
  if (youtubeId) {
    return createYouTubeEmbed(youtubeId);
  }
  
  // For non-YouTube URLs, create a generic iframe or link
  // You can customize this behavior
  return `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
}

function convertEmbeds(content) {
  // Pattern to match GitBook embed tags
  // {% embed url="https://..." %}
  const embedPattern = /\{%\s*embed\s+url="([^"]+)"\s*%\}/g;
  
  let updated = 0;
  const updatedContent = content.replace(embedPattern, (match, url) => {
    updated++;
    return convertEmbed(match, url);
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
    const { content: converted, updated } = convertEmbeds(content);
    
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
  console.error('GitBook Embeds to HTML Iframe Converter');
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
    totalEmbeds: 0,
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
        results.totalEmbeds += result.updated;
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Converted ${result.updated} embed(s) in: ${file}`);
      } else {
        results.unchanged++;
        console.error(`  No embeds found: ${file}`);
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
  console.error(`  Total embeds converted: ${results.totalEmbeds}`);
  console.error(`  Errors: ${results.errors}`);
  console.error('='.repeat(60));
  
  return results;
}

// Export for use as a module
export { convertEmbeds, processMarkdownFile, processDirectory, getAllMarkdownFiles, extractYouTubeId };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-embeds.js') || 
   process.argv[1].endsWith('/convert-embeds.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.error('Usage: node convert-embeds.js <contentPath> [--dry-run]');
    console.error('Example: node convert-embeds.js ./lib/docs/documentation');
    console.error('         node convert-embeds.js ./lib/docs/documentation --dry-run');
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