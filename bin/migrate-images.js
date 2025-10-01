#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Migrates GitBook images to MkDocs Material structure
 * 
 * Usage: node migrate-images.js <key> <contentPath>
 * Example: node migrate-images.js documentation ./docs/documentation
 */

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyImages(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Warning: Source directory does not exist: ${sourceDir}`);
    return { copied: 0, files: [] };
  }

  const files = fs.readdirSync(sourceDir);
  const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];
  const copiedFiles = [];
  let copied = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (imageExtensions.includes(ext)) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      fs.copyFileSync(sourcePath, targetPath);
      copiedFiles.push(file);
      copied++;
      console.error(`  Copied: ${file}`);
    }
  }

  return { copied, files: copiedFiles };
}

function deleteGitbookAssets(gitbookAssetsDir) {
  if (!fs.existsSync(gitbookAssetsDir)) {
    console.error(`Warning: GitBook assets directory does not exist: ${gitbookAssetsDir}`);
    return 0;
  }

  const files = fs.readdirSync(gitbookAssetsDir);
  let deleted = 0;

  for (const file of files) {
    const filePath = path.join(gitbookAssetsDir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile()) {
      fs.unlinkSync(filePath);
      deleted++;
      console.error(`  Deleted: ${file}`);
    }
  }

  // Remove the directory if it's empty
  try {
    fs.rmdirSync(gitbookAssetsDir);
    console.error(`  Removed directory: ${gitbookAssetsDir}`);
  } catch (error) {
    console.error(`  Could not remove directory (may not be empty): ${gitbookAssetsDir}`);
  }

  return deleted;
}

function updateImageReferences(content, key) {
  // Match GitBook image references
  // Pattern: <figure><img src="../.gitbook/assets/filename.ext" ...></figure>
  const gitbookPattern = /<figure><img\s+src="\.\.\/\.gitbook\/assets\/([^"]+)"([^>]*)><figcaption>(.*?)<\/figcaption><\/figure>/g;
  
  let updated = 0;
  const updatedContent = content.replace(gitbookPattern, (match, filename, imgAttributes, caption) => {
    updated++;
    const newPath = `/assets/images/${key}/${filename}`;
    return `<figure><img src="${newPath}"${imgAttributes}><figcaption>${caption}</figcaption></figure>`;
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

function processMarkdownFiles(contentPath, key, dryRun = false) {
  console.error(`\nProcessing markdown files in: ${contentPath}`);
  
  const markdownFiles = getAllMarkdownFiles(contentPath);
  console.error(`Found ${markdownFiles.length} markdown files\n`);

  const results = {
    total: 0,
    updated: 0,
    unchanged: 0,
    totalReferences: 0,
    errors: 0
  };

  for (const file of markdownFiles) {
    results.total++;
    
    try {
      const content = fs.readFileSync(file, 'utf8');
      const { content: updatedContent, updated } = updateImageReferences(content, key);
      
      if (updated > 0) {
        results.updated++;
        results.totalReferences += updated;
        
        if (!dryRun) {
          fs.writeFileSync(file, updatedContent, 'utf8');
        }
        
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Updated ${updated} reference(s) in: ${file}`);
      } else {
        results.unchanged++;
        console.error(`  No changes needed: ${file}`);
      }
    } catch (error) {
      results.errors++;
      console.error(`✗ Error processing ${file}: ${error.message}`);
    }
  }

  return results;
}

function migrateImages(key, contentPath, dryRun = false) {
  console.error('='.repeat(60));
  console.error('GitBook to MkDocs Material Image Migration');
  console.error('='.repeat(60));
  console.error(`Key: ${key}`);
  console.error(`Content Path: ${contentPath}`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be modified');
  }
  
  console.error('='.repeat(60));

  // Define paths
  const gitbookAssetsDir = path.join(contentPath, '.gitbook', 'assets');
  const targetDir = path.join('docs', 'assets', 'images', key);

  // Step 1: Create target directory
  console.error(`\n1. Creating target directory: ${targetDir}`);
  if (!dryRun) {
    ensureDirectoryExists(targetDir);
  }
  console.error('   ✓ Directory ready');

  // Step 2: Copy images
  console.error(`\n2. Copying images from ${gitbookAssetsDir} to ${targetDir}`);
  const copyResult = dryRun ? { copied: 0, files: [] } : copyImages(gitbookAssetsDir, targetDir);
  console.error(`   ✓ Copied ${copyResult.copied} image(s)`);

  // Step 3: Update markdown references
  console.error('\n3. Updating markdown image references');
  const updateResult = processMarkdownFiles(contentPath, key, dryRun);

  // Step 4: Delete GitBook assets
  console.error(`\n4. Cleaning up GitBook assets directory`);
  const deletedCount = dryRun ? 0 : deleteGitbookAssets(gitbookAssetsDir);
  console.error(`   ✓ Deleted ${deletedCount} file(s)`);

  // Summary
  console.error('\n' + '='.repeat(60));
  console.error('Summary:');
  console.error(`  Images copied: ${copyResult.copied}`);
  console.error(`  Markdown files processed: ${updateResult.total}`);
  console.error(`  Files updated: ${updateResult.updated}`);
  console.error(`  Total image references updated: ${updateResult.totalReferences}`);
  console.error(`  Files unchanged: ${updateResult.unchanged}`);
  console.error(`  Errors: ${updateResult.errors}`);
  console.error(`  GitBook files deleted: ${deletedCount}`);
  console.error('='.repeat(60));

  return {
    imagesCopied: copyResult.copied,
    filesProcessed: updateResult.total,
    filesUpdated: updateResult.updated,
    referencesUpdated: updateResult.totalReferences,
    errors: updateResult.errors,
    gitbookFilesDeleted: deletedCount
  };
}

// Export for use as a module
export { migrateImages, updateImageReferences, copyImages, getAllMarkdownFiles };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('migrate-images.js') || 
   process.argv[1].endsWith('/migrate-images.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node migrate-images.js <key> <contentPath> [--dry-run]');
    console.error('Example: node migrate-images.js documentation ./docs/documentation');
    console.error('         node migrate-images.js documentation ./docs/documentation --dry-run');
    process.exit(1);
  }

  const key = args[0];
  const contentPath = args[1];
  const dryRun = args.includes('--dry-run');

  if (!fs.existsSync(contentPath)) {
    console.error(`Error: Content path does not exist: ${contentPath}`);
    process.exit(1);
  }

  if (!fs.statSync(contentPath).isDirectory()) {
    console.error(`Error: Content path is not a directory: ${contentPath}`);
    process.exit(1);
  }

  try {
    const results = migrateImages(key, contentPath, dryRun);
    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}