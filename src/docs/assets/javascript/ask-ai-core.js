/**
 * Ask AI Core - Shared logic for AI assistant functionality
 * Used by both the modal and standalone page implementations
 * Exposes functions globally via window.AskAICore
 */

(function() {
  'use strict';

/**
 * Configure marked.js for markdown rendering
 */
function configureMarked() {
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: false,
      mangle: false,
      sanitize: false
    });
    return true;
  }
  return false;
}

/**
 * Format text as markdown using marked.js or fallback to basic formatting
 * @param {string} text - The text to format
 * @returns {string} HTML string
 */
function formatMarkdown(text) {
  // Check if marked is available
  if (typeof marked !== 'undefined') {
    return marked.parse(text);
  }
  
  // Fallback to basic formatting if marked isn't loaded
  console.warn('marked.js not available, using basic formatting');
  return text
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
}

/**
 * Get the API endpoint URL based on environment
 * @param {Object} auth - Optional auth object with token and isProduction flag
 * @returns {string} The API endpoint URL
 */
function getApiEndpoint(auth = null) {
  // Force UAT environment when running on localhost
  const isUat = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.hostname === 'support.uat.movedata.io';
  const isProduction = isUat ? false : (auth && auth.isProduction !== false);

  const rootHost = !isProduction ? 'api.uat.movedata.io' : 'api.movedata.io';
  const rootUrl = (auth) ? `https://${rootHost}/admin/app` : `https://${rootHost}/admin`;

  return `${rootUrl}/support/agentcore`;
}

/**
 * Stream a response from the AI API and render it progressively
 * @param {string} question - The user's question
 * @param {HTMLElement} contentDiv - The div to render content into
 * @param {HTMLElement} messagesContainer - The messages container for scrolling
 * @param {Object} options - Optional configuration
 * @param {Object} options.auth - Auth object with token and isProduction flag
 * @param {Function} options.onFirstChunk - Callback when first chunk is received
 * @param {Function} options.onComplete - Callback when streaming completes
 * @param {Function} options.onError - Callback on error
 * @returns {Promise<Object>} The complete response data
 */
async function streamResponse(question, contentDiv, messagesContainer, options = {}) {
  const { auth = null, onFirstChunk = null, onComplete = null, onError = null } = options;
  
  const endpoint = getApiEndpoint(auth);
  const headers = { 'Content-Type': 'application/json' };
  if (auth && auth.token) {
    headers['Authorization'] = `Bearer ${auth.token}`;
  }
  
  // Get existing session key if available
  if (!window.getSessionKey) console.warn('Ask AI: Auth functions not available, cannot get session key');
  const existingSessionKey = window.getSessionKey ? window.getSessionKey() : null;
  if (existingSessionKey) {
    headers['X-Amzn-Bedrock-Agentcore-Runtime-Session-Id'] = existingSessionKey;
    console.log('Ask AI: Using existing session ID');
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({ question: question })
  });
  
  if (!response.ok) {
    const error = new Error(`HTTP error! status: ${response.status}`);
    if (onError) onError(error);
    throw error;
  }
  
  // Log the session ID from response headers
  if (!window.setSessionKey) console.warn('Ask AI: Auth functions not available, cannot set session key');
  console.log('Ask AI: Response headers', Array.from(response.headers.entries()));
  const sessionId = response.headers.get('X-Amzn-Bedrock-Agentcore-Runtime-Session-Id');
  console.log(`Ask AI: Bedrock session ID (${sessionId ? 'received' : 'not received'}): ${sessionId}`);

  if (sessionId) {    
    // Persist session ID using auth.js
    if (window.setSessionKey) {
      window.setSessionKey(sessionId);
      console.log('Ask AI: Session ID persisted');
    }
  }
  
  // Stream the response
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let displayBuffer = '';
  let updatesPending = false;
  let chunkCount = 0;
  
  // Throttle updates to avoid overwhelming the browser
  function scheduleUpdate(content) {
    if (!updatesPending) {
      updatesPending = true;
      requestAnimationFrame(() => {
        contentDiv.innerHTML = formatMarkdown(content);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        updatesPending = false;
      });
    }
  }
  
  while (true) {
    const { done, value } = await reader.read();
    
    if (done) {
      console.log(`Ask AI: Stream complete. Total chunks: ${chunkCount}`);
      break;
    }

    chunkCount++;
    
    // Call onFirstChunk callback on first chunk
    if (chunkCount === 1 && onFirstChunk) {
      onFirstChunk();
    }
    
    const chunk = decoder.decode(value, { stream: true });
    buffer += chunk;
    
    // Try to extract the answer field incrementally, even if JSON is incomplete
    try {
      // Remove markdown code blocks if present
      let cleanBuffer = buffer.trim();
      if (cleanBuffer.startsWith('```json')) {
        cleanBuffer = cleanBuffer.replace(/^```json\s*/, '');
      } else if (cleanBuffer.startsWith('```')) {
        cleanBuffer = cleanBuffer.replace(/^```\s*/, '');
      }
      
      // Try to parse complete JSON first
      const data = JSON.parse(cleanBuffer);
      if (data.answer && data.answer !== displayBuffer) {
        displayBuffer = data.answer;
        scheduleUpdate(displayBuffer);
      }
    } catch (e) {
      // JSON not complete yet - try to extract partial answer using regex
      // Match everything after "answer": " without requiring closing quote
      const answerMatch = buffer.match(/"answer"\s*:\s*"((?:[^"\\]|\\.)*)/);
      if (answerMatch && answerMatch[1]) {
        // Unescape the JSON string
        let partialAnswer = answerMatch[1]
          .replace(/\\n/g, '\n')
          .replace(/\\"/g, '"')
          .replace(/\\\\/g, '\\')
          .replace(/\\t/g, '\t');
        
        if (partialAnswer !== displayBuffer) {
          displayBuffer = partialAnswer;
          scheduleUpdate(displayBuffer);
        }
      }
    }
  }
  
  // Final parse to get sources
  try {
    let cleanBuffer = buffer.trim();
    if (cleanBuffer.startsWith('```json')) {
      cleanBuffer = cleanBuffer.replace(/^```json\s*/, '').replace(/```\s*$/, '');
    } else if (cleanBuffer.startsWith('```')) {
      cleanBuffer = cleanBuffer.replace(/^```\s*/, '').replace(/```\s*$/, '');
    }
    
    const data = JSON.parse(cleanBuffer);
    console.log('Ask AI: Response received', data);
    
    // Get the answer and unescape newlines if they're escaped
    let answer = data.answer || data.response || JSON.stringify(data);
    
    // If the answer contains escaped newlines (\\n), convert them to actual newlines
    if (typeof answer === 'string' && answer.includes('\\n')) {
      answer = answer.replace(/\\n/g, '\n');
    }
    
    // Build the complete response with sources if available
    if (data.sources && Array.isArray(data.sources) && data.sources.length > 0) {
      answer += '\n\n---\n\n**Sources:**\n';
      data.sources.forEach((source, index) => {
        answer += `${index + 1}. [${source.title}](${source.url})\n`;
      });
    }
    
    // Update with final content including sources
    contentDiv.innerHTML = formatMarkdown(answer);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    if (onComplete) {
      onComplete({ answer, sources: data.sources });
    }
    
    return { answer, sources: data.sources };
    
  } catch (error) {
    console.error('Error parsing final response:', error);
    // If parsing fails, at least show what we got
    contentDiv.innerHTML = formatMarkdown(displayBuffer || buffer);
    
    if (onError) onError(error);
    throw error;
  }
}

  // Expose functions globally
  window.AskAICore = {
    configureMarked,
    formatMarkdown,
    getApiEndpoint,
    streamResponse
  };

})();
