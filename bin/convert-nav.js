#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Converts a Markdown table of contents to MkDocs YAML navigation format
 * 
 * Usage: node convert-nav.js <input.md> <sectionName> <contentPath> [indent]
 * Example: node convert-nav.js SUMMARY.md "User Guide" documentation 1
 */

function parseMdToYaml(mdContent, sectionName, contentPath) {
  const lines = mdContent.split('\n');
  const result = [];
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
    if (item.children) {
      // This is a section
      const escapedTitle = escapeYamlString(item.title);
      output += `${spaces}- ${escapedTitle}:\n`;
      output += formatYaml(item.children, indent + 1);
    } else {
      // This is a page
      const escapedTitle = escapeYamlString(item.title);
      output += `${spaces}- ${escapedTitle}: ${item.path}\n`;
    }
  }
  
  return output;
}

function convertMdToYaml(mdContent, sectionName, contentPath, baseIndent = 1) {
  const parsed = parseMdToYaml(mdContent, sectionName, contentPath);
  
  // Wrap in the section name with specified base indent
  const spaces = '  '.repeat(baseIndent);
  const escapedSectionName = escapeYamlString(sectionName);
  let yaml = `${spaces}- ${escapedSectionName}:\n`;
  yaml += formatYaml(parsed, baseIndent + 1);
  
  return yaml;
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
    
    const yamlOutput = convertMdToYaml(mdContent, sectionName, contentPath, baseIndent);
    
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