#!/usr/bin/env node

/**
 * Test script for the streaming AI agent endpoint
 * Usage: node test-streaming.js
 */

async function testStreaming() {
  const url = 'https://vb9rqj96vh.execute-api.ap-southeast-2.amazonaws.com/uat/admin/support/agentcore';
  const question = 'SOQL 101 Errors';

  console.log('Testing streaming endpoint...');
  console.log('URL:', url);
  console.log('Question:', question);
  console.log('\n--- Streaming Response ---\n');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let chunkCount = 0;

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        console.log('\n\n--- Stream Complete ---');
        console.log(`Total chunks received: ${chunkCount}`);
        break;
      }

      chunkCount++;
      
      // Decode the chunk
      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;
      
      // Print chunk info
      console.log(`\n[CHUNK ${chunkCount}] (${value.length} bytes, ${chunk.length} chars)`);
      console.log('---START---');
      console.log(chunk);
      console.log('---END---');
    }

    // Try to parse the complete response as JSON
    console.log('\n\n--- Parsing Complete Response ---');
    try {
      // Remove markdown code blocks if present
      let cleanBuffer = buffer.trim();
      if (cleanBuffer.startsWith('```json')) {
        cleanBuffer = cleanBuffer.replace(/^```json\s*/, '').replace(/```\s*$/, '');
      } else if (cleanBuffer.startsWith('```')) {
        cleanBuffer = cleanBuffer.replace(/^```\s*/, '').replace(/```\s*$/, '');
      }
      
      const data = JSON.parse(cleanBuffer);
      console.log('\nParsed JSON:');
      console.log('- Answer length:', data.answer?.length || 0);
      console.log('- Sources count:', data.sources?.length || 0);
      if (data.sources) {
        console.log('\nSources:');
        data.sources.forEach((source, i) => {
          console.log(`  ${i + 1}. ${source.title}`);
          console.log(`     ${source.url}`);
        });
      }
    } catch (e) {
      console.log('Could not parse as JSON:', e.message);
      console.log('Raw buffer length:', buffer.length);
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testStreaming();
