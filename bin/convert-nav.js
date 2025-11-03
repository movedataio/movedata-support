#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts a Markdown table of contents to MkDocs YAML navigation format
 * 
 * Usage: node convert-nav.js <input.md> <sectionName> <contentPath> [indent]
 * Example: node convert-nav.js SUMMARY.md "User Guide" documentation 1
 */

const MOVEDATA_DOMAINS = ['support.movedata.io', 'docs.movedata.io'];

function hasSubstantialContent(filePath, contentPath) {
  try {
    // Skip URLs (external links)
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return true; // Always include external links
    }
    
    // Construct the full file path
    const fullFilePath = path.join(contentPath, filePath);
    
    // Check if file exists
    if (!fs.existsSync(fullFilePath)) {
      console.error(`Warning: File not found: ${fullFilePath}`);
      return false; // Omit missing files
    }
    
    // Read the file content
    const content = fs.readFileSync(fullFilePath, 'utf8');
    
    // Split into lines and filter out empty lines
    const lines = content.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // If file is empty or only has whitespace
    if (lines.length === 0) {
      return false;
    }
    
    // If file only has a single heading (# Title)
    if (lines.length === 1 && lines[0].match(/^#+\s/)) {
      return false;
    }
    
    // Check if file only contains headings and no other content
    const nonHeadingLines = lines.filter(line => !line.match(/^#+\s/));
    if (nonHeadingLines.length === 0) {
      return false; // Only headings, no content
    }
    
    return true; // File has substantial content
  } catch (error) {
    console.error(`Warning: Error reading file ${filePath}: ${error.message}`);
    return false; // Omit files that can't be read
  }
}

function parseMdToYaml(mdContent, sectionName, contentPath, basePath = '.') {
  const lines = mdContent.split('\n');
  const result = [];
  const stack = []; // Stack to track nesting levels
  let currentSection = null;
  
  // Check if there are any section headers in the content
  const hasSections = lines.some(line => line.match(/^##\s+/));
  
  // Track root level items before first section
  let rootItems = [];
  let inRootSection = true;
  
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Skip the main title (# Table of contents)
    if (line.match(/^#\s+/)) continue;
    
    // Check if this is a section header (## Getting Started)
    const sectionMatch = line.match(/^##\s+(.+)/);
    if (sectionMatch) {
      // If we have root items and we're encountering the first section, add them to result
      if (inRootSection && rootItems.length > 0) {
        result.push(...rootItems);
        rootItems = [];
      }
      inRootSection = false;
      
      const sectionTitle = sectionMatch[1].trim();
      currentSection = { title: sectionTitle, children: [], level: 0 };
      result.push(currentSection);
      stack.length = 0; // Clear the stack for new section
      stack.push(currentSection);
      continue;
    }
    
    // Match markdown list items: * [Title](path.md)
    const match = line.match(/^(\s*)\*\s*\[([^\]]+)\]\(([^)]+)\)/);
    if (!match) continue;
    
    const indent = match[1].length;
    const title = match[2].trim();
    const filePath = match[3].trim();
    
    // Calculate nesting level (every 2 spaces = 1 level)
    const level = Math.floor(indent / 2);
    
    // Handle URLs differently from file paths
    let fullPath;
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      // Handle external URLs
      if (MOVEDATA_DOMAINS.some(domain => filePath.includes(domain))) {
        // Convert MoveData domain URLs to absolute paths
        const url = new URL(filePath);
        fullPath = url.pathname + (url.search || '') + (url.hash || '');
      } else {
        // Keep other external URLs as-is
        fullPath = filePath;
      }
    } else {
      // Regular file path - add the contentPath prefix
      fullPath = path.join(contentPath, filePath).replace(/\\/g, '/');
    }
    
    // Determine if this should be a parent (has children) or a leaf node
    // We'll initially create it as a leaf and convert to parent if needed
    let item;
    
    // Check if the file has substantial content (skip if it's just a heading)
    // Skip content check for URLs since we can't validate them
    const hasContent = filePath.startsWith('http://') || filePath.startsWith('https://') || hasSubstantialContent(filePath, basePath);
    
    if (hasContent) {
      item = { title, path: fullPath, level };
    } else {
      // Create a placeholder item for potential parent without content
      item = { title, level, hasMinimalContent: true };
      console.error(`File has minimal content but may have children: ${filePath}`);
    }
    
    // Adjust the stack to the current level
    while (stack.length > level + 1) {
      stack.pop();
    }
    
    // Find the parent container
    if (hasSections) {
      if (inRootSection && level === 0) {
        // This is a root-level item before any sections
        rootItems.push(item);
      } else {
        // Use existing logic for content with sections
        let parent;
        if (currentSection && level === 0) {
          parent = currentSection;
        } else if (stack.length > level) {
          parent = stack[level];
        } else {
          parent = currentSection || { children: result };
        }
        
        // If parent doesn't have children array, create it
        if (parent && !parent.children) {
          parent.children = [];
        }
        
        // Add item to parent (even if it has minimal content, in case it has children)
        if (parent && parent.children) {
          parent.children.push(item);
        } else {
          result.push(item);
        }
      }
    } else {
      // For flat lists without sections, add directly to result
      result.push(item);
    }
    
    // Add current item to stack for potential children (only if we have sections)
    if (hasSections) {
      if (stack.length <= level + 1) {
        stack.push(item);
      } else {
        stack[level + 1] = item;
      }
    }
  }
  
  // If we finished parsing and still have root items that weren't added, add them now
  if (rootItems.length > 0) {
    result.unshift(...rootItems); // Add at the beginning
  }
  
  return result;
}

function escapeYamlString(str) {
  // Check if the string contains special YAML characters that require quoting
  const specialChars = /[:\[\]{}#&*!|>'"%@`]/;
  const startsWithSpecial = /^[-?]/;
  const hasLeadingOrTrailingSpace = /^\s|\s$/;
  
  // Check if quoting is needed
  if (specialChars.test(str) || startsWithSpecial.test(str) || hasLeadingOrTrailingSpace.test(str)) {
    // Escape any double quotes in the string
    const escaped = str.replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
  
  return str;
}

function formatYaml(items, indent = 0) {
  const spaces = '  '.repeat(indent);
  let output = '';
  
  for (const item of items) {
    // Skip items with minimal content that have no valid children
    if (item.hasMinimalContent) {
      const validChildren = item.children ? item.children.filter(child => 
        !child.hasMinimalContent || (child.children && child.children.length > 0)
      ) : [];
      
      if (validChildren.length === 0) {
        continue; // Skip this item entirely
      }
      
      // If it has valid children, treat it as a section header only
      const escapedTitle = escapeYamlString(item.title);
      output += `${spaces}- ${escapedTitle}:\n`;
      output += formatYaml(validChildren, indent + 1);
      continue;
    }
    
    if (item.children && item.children.length > 0) {
      // Filter out children with minimal content that have no grandchildren
      const validChildren = item.children.filter(child => 
        !child.hasMinimalContent || (child.children && child.children.length > 0)
      );
      
      if (validChildren.length === 0 && item.hasMinimalContent) {
        continue; // Skip entirely if no valid children and minimal content
      }
      
      // This is a parent with children
      const escapedTitle = escapeYamlString(item.title);
      if (item.path && !item.hasMinimalContent) {
        // Parent that also has its own page - need to create section with Overview
        output += `${spaces}- ${escapedTitle}:\n`;
        // Add the parent page as "Overview"
        output += `${spaces}  - Overview: ${item.path}\n`;
        // Add children with same indentation as Overview
        output += formatYaml(validChildren, indent + 1);
      } else {
        // Parent that's just a section header or has minimal content
        output += `${spaces}- ${escapedTitle}:\n`;
        output += formatYaml(validChildren, indent + 1);
      }
    } else if (!item.hasMinimalContent) {
      // This is a leaf page with valid content
      const escapedTitle = escapeYamlString(item.title);
      output += `${spaces}- ${escapedTitle}: ${item.path}\n`;
    }
    // Skip leaf items with minimal content (no children, minimal content)
  }
  
  return output;
}

function convertMdToYaml(mdContent, sectionName, contentPath, baseIndent = 1, basePath = '.') {
  const parsed = parseMdToYaml(mdContent, sectionName, contentPath, basePath);
  
  // Check if this is a flat list (no sections, just items)
  const isFlatList = parsed.length > 0 && parsed.every(item => !item.children || item.children.length === 0);
  
  const spaces = '  '.repeat(baseIndent);
  const escapedSectionName = escapeYamlString(sectionName);
  
  if (isFlatList) {
    // For flat lists, put items directly under the section name
    let yaml = `${spaces}- ${escapedSectionName}:\n`;
    yaml += formatYaml(parsed, baseIndent + 1);
    return yaml;
  } else {
    // For hierarchical content, use the existing logic
    let yaml = `${spaces}- ${escapedSectionName}:\n`;
    yaml += formatYaml(parsed, baseIndent + 1);
    return yaml;
  }
}

// Export for use as a module
export { convertMdToYaml, parseMdToYaml, formatYaml };

// CLI handling - check if this file is being run directly
const runningAsScript = process.argv[1] && 
  (process.argv[1].endsWith('convert-nav.js') || 
   process.argv[1].endsWith('/convert-nav.js'));

if (runningAsScript) {
  if (process.argv.length < 5) {
    console.error('Usage: node convert-nav.js <input.md> <sectionName> <contentPath> [indent]');
    console.error('Example: node convert-nav.js SUMMARY.md "User Guide" documentation');
    console.error('         node convert-nav.js SUMMARY.md "User Guide" documentation 2');
    console.error('\nParameters:');
    console.error('  indent: Base indentation level (default: 1)');
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const sectionName = process.argv[3];
  const contentPath = process.argv[4];
  const baseIndent = process.argv[5] ? parseInt(process.argv[5], 10) : 1;

  if (isNaN(baseIndent) || baseIndent < 0) {
    console.error('Error: indent must be a non-negative number');
    process.exit(1);
  }

  try {
    const mdContent = fs.readFileSync(inputFile, 'utf8');
    
    console.error(`Reading: ${inputFile}`);
    console.error(`Section: ${sectionName}`);
    console.error(`Content Path: ${contentPath}`);
    console.error(`Base Indent: ${baseIndent}`);
    console.error(`File size: ${mdContent.length} bytes\n`);
    
    // Get the directory containing the input file to use as base path for content validation
    const inputDir = path.dirname(inputFile);
    const yamlOutput = convertMdToYaml(mdContent, sectionName, contentPath, baseIndent, inputDir);
    
    if (!yamlOutput || yamlOutput.trim().length === 0) {
      console.error('Warning: No output generated. Check your markdown format.');
      process.exit(1);
    }
    
    console.log(yamlOutput);
    
    // Optionally write to file
    const outputFile = inputFile.replace('.md', '-nav.yaml');
    fs.writeFileSync(outputFile, yamlOutput);
    console.error(`\n✓ Output written to ${outputFile}`);
    
  } catch (error) {
    console.error('Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}