// Wait for the page to fully load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function init() {
  console.log('Ask AI: Initializing...');
  
  // Configure marked.js if available
  if (typeof marked !== 'undefined') {
    marked.setOptions({
      breaks: true,
      gfm: true,
      headerIds: false,
      mangle: false,
      sanitize: false
    });
    console.log('Ask AI: marked.js configured');
  } else {
    console.warn('Ask AI: marked.js not found, will use basic formatting');
  }
  
  // Hide the default search
  const searchButton = document.querySelector('[data-md-component="search"]');
  if (searchButton) {
    searchButton.style.display = 'none';
    console.log('Ask AI: Hidden search button');
  }

  // Find where to insert the button - try multiple selectors
  let headerActions = document.querySelector('.md-header__option');
  
  if (!headerActions) {
    // Try alternative location
    headerActions = document.querySelector('.md-header__inner');
    console.log('Ask AI: Using alternative header location');
  }
  
  if (!headerActions) {
    console.error('Ask AI: Could not find header to insert button');
    return;
  }

  console.log('Ask AI: Found header location', headerActions);

  // Create Ask AI button in header
  const askAiButton = document.createElement('button');
  askAiButton.className = 'md-header__button ask-ai-header-button';
  askAiButton.title = 'Ask AI Assistant (Ctrl+K)';
  askAiButton.setAttribute('aria-label', 'Ask AI Assistant');
  askAiButton.setAttribute('data-md-component', 'ask-ai-button');
  askAiButton.type = 'button';

  askAiButton.innerHTML = `
    <svg class="ask-ai-header-button__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
      <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
    </svg>
    <span class="ask-ai-header-button__text">Ask</span>
  `;
  
  // Insert at the beginning of header actions
  if (headerActions.classList.contains('md-header__option')) {
    headerActions.insertBefore(askAiButton, headerActions.firstChild);
  } else {
    // If using md-header__inner, append to end
    headerActions.appendChild(askAiButton);
  }
  
  console.log('Ask AI: Button inserted');

  // Create the modal overlay
  createAskAiModal();

  // Add click handler to open modal
  askAiButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Ask AI: Button clicked');
    openAskAiModal();
  });

  // Add keyboard shortcut (Ctrl/Cmd + K)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      console.log('Ask AI: Keyboard shortcut triggered');
      openAskAiModal();
    }
  });
  
  console.log('Ask AI: Initialization complete');
}

function createAskAiModal() {
  console.log('Ask AI: Creating modal');
  
  const modal = document.createElement('div');
  modal.id = 'ask-ai-modal';
  modal.className = 'ask-ai-modal';
  modal.setAttribute('data-md-component', 'ask-ai-modal');
  modal.setAttribute('hidden', '');
  
  modal.innerHTML = `
    <div class="ask-ai-modal__backdrop"></div>
    <div class="ask-ai-modal__inner" role="dialog">
      <div class="ask-ai-modal__header">
        <h2 class="ask-ai-modal__title">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" />
          </svg>
          Ask AI Assistant
        </h2>
        <button class="ask-ai-modal__close" aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
          </svg>
        </button>
      </div>
      <div class="ask-ai-modal__content">
        <div id="ask-ai-messages" class="ask-ai-messages">
          <div class="ask-ai-welcome">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 3rem; height: 3rem; fill: var(--md-primary-fg-color); opacity: 0.5;">
              <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z" />
            </svg>
            <p style="color: var(--md-default-fg-color--light); margin: 1rem 0 0 0;">Ask me anything about MoveData!</p>
          </div>
        </div>
        <div class="ask-ai-input-container">
          <textarea 
            id="ask-ai-input" 
            class="ask-ai-input" 
            placeholder="Ask a question about MoveData..." 
            rows="2"
          ></textarea>
          <button id="ask-ai-send" class="ask-ai-send">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" />
            </svg>
            Send
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  console.log('Ask AI: Modal added to DOM');

  // Add event listeners
  const backdrop = modal.querySelector('.ask-ai-modal__backdrop');
  const closeButton = modal.querySelector('.ask-ai-modal__close');
  const sendButton = modal.querySelector('#ask-ai-send');
  const input = modal.querySelector('#ask-ai-input');

  backdrop.addEventListener('click', function() {
    console.log('Ask AI: Backdrop clicked');
    closeAskAiModal();
  });
  
  closeButton.addEventListener('click', function() {
    console.log('Ask AI: Close button clicked');
    closeAskAiModal();
  });
  
  sendButton.addEventListener('click', sendMessage);

  // Enter to send, Shift+Enter for new line
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ESC to close
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('ask-ai-modal');
      if (modal && !modal.hasAttribute('hidden')) {
        console.log('Ask AI: ESC pressed');
        closeAskAiModal();
      }
    }
  });
  
  console.log('Ask AI: Event listeners attached');
}

function openAskAiModal() {
  console.log('Ask AI: Opening modal');
  const modal = document.getElementById('ask-ai-modal');
  if (modal) {
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus input after animation
    setTimeout(() => {
      const input = document.getElementById('ask-ai-input');
      if (input) {
        input.focus();
        console.log('Ask AI: Input focused');
      }
    }, 100);
  } else {
    console.error('Ask AI: Modal not found!');
  }
}

function closeAskAiModal() {
  console.log('Ask AI: Closing modal');
  const modal = document.getElementById('ask-ai-modal');
  if (modal) {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }
}

let conversationHistory = [];

function addMessage(role, content) {
  const messagesContainer = document.getElementById('ask-ai-messages');
  
  // Remove welcome message on first message
  const welcome = messagesContainer.querySelector('.ask-ai-welcome');
  if (welcome) {
    welcome.remove();
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `ask-ai-message ask-ai-message--${role}`;
  
  const label = document.createElement('div');
  label.className = 'ask-ai-message__label';
  label.textContent = role === 'user' ? 'You' : 'AI Assistant';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'ask-ai-message__content';
  
  // Simple markdown rendering
  if (role === 'assistant') {
    contentDiv.innerHTML = formatMarkdown(content);
  } else {
    contentDiv.textContent = content;
  }
  
  messageDiv.appendChild(label);
  messageDiv.appendChild(contentDiv);
  messagesContainer.appendChild(messageDiv);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showLoading() {
  const messagesContainer = document.getElementById('ask-ai-messages');
  const loadingDiv = document.createElement('div');
  loadingDiv.id = 'ask-ai-loading';
  loadingDiv.className = 'ask-ai-message ask-ai-message--assistant';
  
  const label = document.createElement('div');
  label.className = 'ask-ai-message__label';
  label.textContent = 'AI Assistant';
  
  const loadingContent = document.createElement('div');
  loadingContent.className = 'ask-ai-message__content';
  loadingContent.innerHTML = '<div class="ask-ai-loading"><div class="ask-ai-loading__dot"></div><div class="ask-ai-loading__dot"></div><div class="ask-ai-loading__dot"></div></div>';
  
  loadingDiv.appendChild(label);
  loadingDiv.appendChild(loadingContent);
  messagesContainer.appendChild(loadingDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeLoading() {
  const loading = document.getElementById('ask-ai-loading');
  if (loading) loading.remove();
}

function showError(message) {
  const messagesContainer = document.getElementById('ask-ai-messages');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'ask-ai-error';
  errorDiv.textContent = `Error: ${message}`;
  messagesContainer.appendChild(errorDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById('ask-ai-input');
  const sendButton = document.getElementById('ask-ai-send');
  const question = input.value.trim();
  
  if (!question) return;
  
  input.disabled = true;
  sendButton.disabled = true;
  
  addMessage('user', question);
  conversationHistory.push({ role: 'user', content: question });
  
  input.value = '';
  showLoading();
  
  try {
    const response = await fetch('https://api.uat.movedata.io/admin/support/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question: question })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    removeLoading();
    
    const answer = data.answer || data.response || JSON.stringify(data);
    addMessage('assistant', answer);
    conversationHistory.push({ role: 'assistant', content: answer });
    
  } catch (error) {
    removeLoading();
    showError(error.message || 'Failed to get response');
    console.error('Error:', error);
  } finally {
    input.disabled = false;
    sendButton.disabled = false;
    input.focus();
  }
}

// Use marked.js for proper markdown rendering
function formatMarkdown(text) {
  // Check if marked is available
  if (typeof marked !== 'undefined') {
    // Configure marked for better rendering
    marked.setOptions({
      breaks: true,        // Convert \n to <br>
      gfm: true,          // GitHub Flavored Markdown
      headerIds: false,    // Don't add IDs to headers
      mangle: false        // Don't escape email addresses
    });
    
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