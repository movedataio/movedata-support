---
hide:
  - navigation
  - toc
---

# Ask AI Assistant

<script src="https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js"></script>

<div id="chat-container">
    <div id="chat-messages"></div>
    <div id="chat-input-container">
        <textarea id="chat-input" placeholder="Ask a question about MoveData..." rows="2"></textarea>
        <button id="chat-send" onclick="sendMessage()">Send</button>
    </div>
</div>

<style>
#chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 400px);
    min-height: 500px;
    border: 1px solid var(--md-default-fg-color--lightest);
    border-radius: 8px;
    overflow: hidden;
    background: var(--md-code-bg-color);
}

#chat-messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.message {
    display: flex;
    flex-direction: column;
    max-width: 80%;
    animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.message.user {
    align-self: flex-end;
}

.message.assistant {
    align-self: flex-start;
}

.message-content {
    padding: 0.5rem 1rem;
    border-radius: 8px;
    word-wrap: break-word;
    font-size: 0.9rem;
    line-height: 1.5;
}

.message.user .message-content {
    background: var(--md-primary-fg-color);
    color: var(--md-primary-bg-color);
}

.message.assistant .message-content {
    background: var(--md-default-bg-color);
    border: 1px solid var(--md-default-fg-color--lightest);
    color: var(--md-default-fg-color);
}

/* Markdown formatting in assistant messages */
.message.assistant .message-content h1,
.message.assistant .message-content h2,
.message.assistant .message-content h3 {
    margin: 0.875rem 0 0.5rem 0;
    line-height: 1.25;
}

.message.assistant .message-content h1 {
    font-size: 1.3rem;
}

.message.assistant .message-content h2 {
    font-size: 1.15rem;
}

.message.assistant .message-content h3 {
    font-size: 1.05rem;
}

.message.assistant .message-content p {
    margin: 0.5rem 0;
    line-height: 1.55;
}

.message.assistant .message-content code {
    background: var(--md-code-bg-color);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: var(--md-code-font-family);
    font-size: 0.85em;
}

.message.assistant .message-content pre {
    background: var(--md-code-bg-color);
    padding: 0.875rem;
    border-radius: 4px;
    overflow-x: auto;
    margin: 0.75rem 0;
    font-size: 0.85rem;
}

.message.assistant .message-content pre code {
    background: none;
    padding: 0;
}

.message.assistant .message-content ul,
.message.assistant .message-content ol {
    margin: 0.5rem 0;
    padding-left: 1.5rem;
}

.message.assistant .message-content ul ul,
.message.assistant .message-content ol ul,
.message.assistant .message-content ul ol,
.message.assistant .message-content ol ol {
    margin: 0.25rem 0;
}

.message.assistant .message-content li {
    margin: 0.3rem 0;
    line-height: 1.55;
}

.message.assistant .message-content a {
    color: var(--md-primary-fg-color);
    text-decoration: underline;
}

.message.assistant .message-content a:hover {
    opacity: 0.8;
}

.message.assistant .message-content strong {
    font-weight: 600;
}

.message.assistant .message-content em {
    font-style: italic;
}

.message-label {
    font-size: 0.7rem;
    color: var(--md-default-fg-color--light);
    margin-bottom: 0.25rem;
    padding: 0 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
}

.message.user .message-label {
    text-align: right;
}

#chat-input-container {
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    background: var(--md-default-bg-color);
    border-top: 1px solid var(--md-default-fg-color--lightest);
}

#chat-input {
    flex: 1;
    padding: 0.75rem;
    border: 1px solid var(--md-default-fg-color--lightest);
    border-radius: 4px;
    background: var(--md-code-bg-color);
    color: var(--md-default-fg-color);
    font-family: inherit;
    font-size: 0.9rem;
    resize: vertical;
    min-height: 50px;
    max-height: 150px;
    line-height: 1.5;
}

#chat-input:focus {
    outline: none;
    border-color: var(--md-primary-fg-color);
}

#chat-send {
    padding: 0.75rem 1.75rem;
    background: var(--md-primary-fg-color);
    color: var(--md-primary-bg-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    font-size: 0.9rem;
    transition: opacity 0.2s;
    align-self: flex-end;
}

#chat-send:hover {
    opacity: 0.9;
}

#chat-send:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.loading {
    display: flex;
    gap: 0.3rem;
    padding: 0.75rem 1rem;
}

.loading-dot {
    width: 8px;
    height: 8px;
    background: var(--md-default-fg-color--light);
    border-radius: 50%;
    animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dot:nth-child(1) {
    animation-delay: -0.32s;
}

.loading-dot:nth-child(2) {
    animation-delay: -0.16s;
}

@keyframes bounce {
    0%, 80%, 100% {
        transform: scale(0);
    }
    40% {
        transform: scale(1);
    }
}

.error-message {
    background: #fee;
    border: 1px solid #fcc;
    color: #c33;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    margin: 0.5rem 0;
    font-size: 0.9rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
    #chat-container {
        height: calc(100vh - 150px);
        margin: 0.5rem;
        border-radius: 0;
    }
    
    .message {
        max-width: 90%;
    }
    
    #chat-input-container {
        padding: 0.75rem;
    }
}
</style>

<script>
// Configure marked for security and proper rendering
marked.setOptions({
    breaks: true,        // Convert \n to <br>
    gfm: true,          // GitHub Flavored Markdown
    headerIds: false,    // Don't add IDs to headers
    mangle: false,       // Don't escape email addresses
    sanitize: false,     // We'll use DOMPurify if needed, but marked escapes by default
});

let conversationHistory = [];

function addMessage(role, content) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    
    const label = document.createElement('div');
    label.className = 'message-label';
    label.textContent = role === 'user' ? 'You' : 'AI Assistant';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // For assistant messages, render markdown. For user messages, keep as plain text
    if (role === 'assistant') {
        contentDiv.innerHTML = marked.parse(content);
    } else {
        contentDiv.textContent = content;
    }
    
    messageDiv.appendChild(label);
    messageDiv.appendChild(contentDiv);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return messageDiv;
}

function showLoading() {
    const messagesContainer = document.getElementById('chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message assistant';
    loadingDiv.id = 'loading-indicator';
    
    const label = document.createElement('div');
    label.className = 'message-label';
    label.textContent = 'AI Assistant';
    
    const loadingContent = document.createElement('div');
    loadingContent.className = 'message-content';
    
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-dot"></div><div class="loading-dot"></div><div class="loading-dot"></div>';
    
    loadingContent.appendChild(loading);
    loadingDiv.appendChild(label);
    loadingDiv.appendChild(loadingContent);
    messagesContainer.appendChild(loadingDiv);
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeLoading() {
    const loading = document.getElementById('loading-indicator');
    if (loading) {
        loading.remove();
    }
}

function showError(message) {
    const messagesContainer = document.getElementById('chat-messages');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = `Error: ${message}`;
    messagesContainer.appendChild(errorDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const sendButton = document.getElementById('chat-send');
    const question = input.value.trim();
    
    if (!question) return;
    
    // Disable input while processing
    input.disabled = true;
    sendButton.disabled = true;
    
    // Add user message to chat
    addMessage('user', question);
    conversationHistory.push({ role: 'user', content: question });
    
    // Clear input
    input.value = '';
    
    // Show loading indicator
    showLoading();
    
    try {
        const response = await fetch('https://api.uat.movedata.io/admin/support/agent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ question: question })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove loading indicator
        removeLoading();
        
        // Add assistant response
        const answer = data.answer || data.response || JSON.stringify(data);
        
        // Build the complete response with sources if available
        let fullResponse = answer;
        if (data.sources && Array.isArray(data.sources) && data.sources.length > 0) {
            fullResponse += '\n\n---\n\n**Sources:**\n';
            data.sources.forEach((source, index) => {
                fullResponse += `${index + 1}. [${source.title}](${source.url})\n`;
            });
        }
        
        addMessage('assistant', fullResponse);
        conversationHistory.push({ role: 'assistant', content: fullResponse });
        
    } catch (error) {
        removeLoading();
        showError(error.message || 'Failed to get response from AI assistant');
        console.error('Error:', error);
    } finally {
        // Re-enable input
        input.disabled = false;
        sendButton.disabled = false;
        input.focus();
    }
}

// Allow Enter to send (Shift+Enter for new line)
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('chat-input');
    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Focus input on load
    input.focus();
});
</script>
