#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts a Markdown table of contents to MkDocs YAML navigation format
 * 
 * Usage: node convert-nav.js <input.md> <sectionName> <contentPath>
 * Example: node convert-nav.js SUMMARY.md "User Guide" documentation
 */

function parseMdToYaml(mdContent, sectionName, contentPath) {
  const lines = mdContent.split('\n');
  const result = [];
  const stack = [{ level: -1, children: result }];
  let currentSection = null;
  
  for (const line of lines) {
    // Skip empty lines
    if (!line.trim()) continue;
    
    // Skip the main title (# Table of contents)
    if (line.match(/^#\s+/)) continue;
    
    // Check if this is a section header (## Getting Started)
    const sectionMatch = line.match(/^##\s+(.+)/);
    if (sectionMatch) {
      const sectionTitle = sectionMatch[1].trim();
      currentSection = { title: sectionTitle, children: [], level: 0 };
      result.push(currentSection);
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
    
    // Add the item with the contentPath prefix
    const fullPath = path.join(contentPath, filePath).replace(/\\/g, '/');
    const item = { title, path: fullPath, level };
    
    // If we're under a section, add to section's children
    // Otherwise add to root
    if (currentSection && level === 0) {
      currentSection.children.push(item);
    } else {
      result.push(item);
    }
  }
  
  return result;
}

function formatYaml(items, indent = 0) {
  const spaces = '  '.repeat(indent);
  let output = '';
  
  for (const item of items) {
    if (item.children) {
      // This is a section
      output += `${spaces}- ${item.title}:\n`;
      output += formatYaml(item.children, indent + 1);
    } else {
      // This is a page
      output += `${spaces}- ${item.title}: ${item.path}\n`;
    }
  }
  
  return output;
}

function convertMdToYaml(mdContent, sectionName, contentPath) {
  const parsed = parseMdToYaml(mdContent, sectionName, contentPath);
  
  // Wrap in the section name
  let yaml = `  - ${sectionName}:\n`;
  yaml += formatYaml(parsed, 2);
  
  return yaml;
}

// Export for use as a module
export { convertMdToYaml, parseMdToYaml, formatYaml };

// Check if running as CLI
const isMainModule = process.argv[1] === new URL(import.meta.url).pathname;

if (isMainModule) {
  if (process.argv.length < 5) {
    console.error('Usage: node convert-nav.js <input.md> <sectionName> <contentPath>');
    console.error('Example: node convert-nav.js SUMMARY.md "User Guide" documentation');
    process.exit(1);
  }

  const inputFile = process.argv[2];
  const sectionName = process.argv[3];
  const contentPath = process.argv[4];

  try {
    const mdContent = fs.readFileSync(inputFile, 'utf8');
    
    console.error(`Reading: ${inputFile}`);
    console.error(`Section: ${sectionName}`);
    console.error(`Content Path: ${contentPath}`);
    console.error(`File size: ${mdContent.length} bytes\n`);
    
    const yamlOutput = convertMdToYaml(mdContent, sectionName, contentPath);
    
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