#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts GitBook file embeds to MkDocs Material download components
 * 
 * Usage: node convert-file-embed.js <key> <contentPath>
 * Example: node convert-file-embed.js user_guide ./lib/docs/user_guide
 */

function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function copyFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Warning: Source directory does not exist: ${sourceDir}`);
    return { copied: 0, files: [] };
  }

  const files = fs.readdirSync(sourceDir);
  const fileExtensions = ['.csv', '.xlsx', '.xls', '.pdf', '.json', '.xml', '.txt', '.zip', '.doc', '.docx'];
  const copiedFiles = [];
  let copied = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (fileExtensions.includes(ext)) {
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
  const fileExtensions = ['.csv', '.xlsx', '.xls', '.pdf', '.json', '.xml', '.txt', '.zip', '.doc', '.docx'];
  let deleted = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    
    if (fileExtensions.includes(ext)) {
      const filePath = path.join(gitbookAssetsDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile()) {
        fs.unlinkSync(filePath);
        deleted++;
        console.error(`  Deleted: ${file}`);
      }
    }
  }

  return deleted;
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function getFileType(ext) {
  const typeMap = {
    '.csv': 'CSV File',
    '.xlsx': 'Excel File',
    '.xls': 'Excel File',
    '.pdf': 'PDF Document',
    '.json': 'JSON File',
    '.xml': 'XML File',
    '.txt': 'Text File',
    '.zip': 'ZIP Archive',
    '.doc': 'Word Document',
    '.docx': 'Word Document'
  };
  return typeMap[ext.toLowerCase()] || 'File';
}

function createDownloadComponent(filename, key, gitbookAssetsDir) {
  const ext = path.extname(filename).toLowerCase();
  const fileType = getFileType(ext);
  const newPath = `/assets/files/${key}/${filename}`;
  
  // Try to get file size if the file exists
  let fileSizeText = '';
  try {
    const sourcePath = path.join(gitbookAssetsDir, filename);
    if (fs.existsSync(sourcePath)) {
      const stats = fs.statSync(sourcePath);
      fileSizeText = formatFileSize(stats.size);
    }
  } catch (error) {
    // Silently ignore if file doesn't exist
  }

  return `<div class="file-download-card">
  <div class="file-download-content">
    <div class="file-download-title">${filename}</div>
    <div class="file-download-meta">${fileType}${fileSizeText ? ' • ' + fileSizeText : ''}</div>
  </div>
  <a href="${newPath}" download class="file-download-button">
    Download
  </a>
</div>`;
}

function updateFileReferences(content, key, gitbookAssetsDir) {
  let updated = 0;
  let updatedContent = content;
  
  // Pattern: {% file src="../.gitbook/assets/filename.ext" %} or {% file src="../../.gitbook/assets/filename.ext" %}
  // Matches any number of ../ prefixes before .gitbook
  const filePattern = /\{%\s*file\s+src="(?:\.\.\/)+\.gitbook\/assets\/([^"]+)"\s*%\}/g;
  
  updatedContent = updatedContent.replace(filePattern, (match, filename) => {
    updated++;
    return createDownloadComponent(filename, key, gitbookAssetsDir);
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

function processMarkdownFiles(contentPath, key, gitbookAssetsDir, dryRun = false) {
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
      const { content: updatedContent, updated } = updateFileReferences(content, key, gitbookAssetsDir);
      
      if (updated > 0) {
        results.updated++;
        results.totalReferences += updated;
        
        if (!dryRun) {
          fs.writeFileSync(file, updatedContent, 'utf8');
        }
        
        console.error(`✓ ${dryRun ? '[DRY RUN] ' : ''}Updated ${updated} file embed(s) in: ${file}`);
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

function ensureStylesheetsExist() {
  const stylesheetsDir = path.join('lib', 'docs', 'assets', 'stylesheets');
  const fileDownloadCSS = path.join(stylesheetsDir, 'file-download.css');

  ensureDirectoryExists(stylesheetsDir);

  if (!fs.existsSync(fileDownloadCSS)) {
    const cssContent = `/* File Download Card Component */
.file-download-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  margin: 20px 0;
  border: 1px solid #d8e8f1;
  border-radius: 8px;
  background-color: #f3f7fc;
  transition: all 0.2s ease;
}

.file-download-card:hover {
  border-color: #009ED2;
  box-shadow: 0 2px 8px rgba(0, 158, 210, 0.1);
}

.file-download-content {
  flex: 1;
  min-width: 0;
}

.file-download-title {
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-download-meta {
  font-size: 12px;
  color: #5c727d;
}

.file-download-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #009ED2;
  color: white !important;
  text-decoration: none !important;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s ease;
  flex-shrink: 0;
  white-space: nowrap;
}

.file-download-button:hover {
  background-color: #007BB8;
}

/* Responsive design for mobile */
@media screen and (max-width: 768px) {
  .file-download-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .file-download-button {
    width: 100%;
    justify-content: center;
  }
}
`;
    fs.writeFileSync(fileDownloadCSS, cssContent, 'utf8');
    console.error(`\n✓ Created stylesheet: ${fileDownloadCSS}`);
    return true;
  }
  
  return false;
}

function convertFileEmbeds(key, contentPath, dryRun = false) {
  console.error('='.repeat(60));
  console.error('GitBook to MkDocs Material File Embed Conversion');
  console.error('='.repeat(60));
  console.error(`Key: ${key}`);
  console.error(`Content Path: ${contentPath}`);
  
  if (dryRun) {
    console.error('DRY RUN MODE - No files will be modified');
  }
  
  console.error('='.repeat(60));

  // Define paths
  const gitbookAssetsDir = path.join(contentPath, '.gitbook', 'assets');
  const targetDir = path.join('lib', 'docs', 'assets', 'files', key);

  // Step 0: Ensure stylesheets exist
  console.error('\n0. Checking stylesheets');
  const stylesheetCreated = ensureStylesheetsExist();
  if (!stylesheetCreated) {
    console.error('   ✓ Stylesheet already exists');
  }

  // Step 1: Create target directory
  console.error(`\n1. Creating target directory: ${targetDir}`);
  if (!dryRun) {
    ensureDirectoryExists(targetDir);
  }
  console.error('   ✓ Directory ready');

  // Step 2: Copy files
  console.error(`\n2. Copying files from ${gitbookAssetsDir} to ${targetDir}`);
  const copyResult = dryRun ? { copied: 0, files: [] } : copyFiles(gitbookAssetsDir, targetDir);
  console.error(`   ✓ Copied ${copyResult.copied} file(s)`);

  // Step 3: Update markdown references
  console.error('\n3. Updating markdown file embed references');
  const updateResult = processMarkdownFiles(contentPath, key, gitbookAssetsDir, dryRun);

  // Step 4: Delete GitBook assets (only the files we've copied)
  console.error(`\n4. Cleaning up GitBook assets directory`);
  const deletedCount = dryRun ? 0 : deleteGitbookAssets(gitbookAssetsDir);
  console.error(`   ✓ Deleted ${deletedCount} file(s)`);

  // Summary
  console.error('\n' + '='.repeat(60));
  console.error('Summary:');
  console.error(`  Files copied: ${copyResult.copied}`);
  console.error(`  Markdown files processed: ${updateResult.total}`);
  console.error(`  Files updated: ${updateResult.updated}`);
  console.error(`  Total file embed references updated: ${updateResult.totalReferences}`);
  console.error(`  Files unchanged: ${updateResult.unchanged}`);
  console.error(`  Errors: ${updateResult.errors}`);
  console.error(`  GitBook files deleted: ${deletedCount}`);
  console.error('='.repeat(60));

  return {
    filesCopied: copyResult.copied,
    filesProcessed: updateResult.total,
    filesUpdated: updateResult.updated,
    referencesUpdated: updateResult.totalReferences,
    errors: updateResult.errors,
    gitbookFilesDeleted: deletedCount
  };
}

// Export for use as a module
export { convertFileEmbeds, updateFileReferences, copyFiles, getAllMarkdownFiles, createDownloadComponent };

// CLI handling
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-file-embed.js') || 
   process.argv[1].endsWith('/convert-file-embed.js'));

if (runningAsScript) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.error('Usage: node convert-file-embed.js <key> <contentPath> [--dry-run]');
    console.error('Example: node convert-file-embed.js user_guide ./lib/docs/user_guide');
    console.error('         node convert-file-embed.js user_guide ./lib/docs/user_guide --dry-run');
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
    const results = convertFileEmbeds(key, contentPath, dryRun);
    process.exit(results.errors > 0 ? 1 : 0);
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}
