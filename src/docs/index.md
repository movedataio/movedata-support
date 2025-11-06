---
title: MoveData Support
hide:
  - navigation
  - toc
---

<style>
    .hero-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 35vh;
        max-width: 900px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    .hero-title {
        font-size: 3em;
        font-weight: 700;
        color: var(--md-default-fg-color, #333);
        margin-bottom: 40px;
        text-align: center;
        line-height: 1.2;
    }

    .ask-container {
        width: 100%;
        max-width: 800px;
    }

    .ask-box {
        display: flex;
        gap: 12px;
        width: 100%;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 8px;
        background-color: var(--md-default-bg-color, white);
        border: 2px solid var(--md-default-fg-color--lightest, #e0e0e0);
        transition: border-color 0.3s, box-shadow 0.3s;
    }

    .ask-box:focus-within {
        border-color: var(--md-primary-fg-color, #4CAF50);
        box-shadow: 0 6px 24px rgba(76, 175, 80, 0.2);
    }

    .ask-input {
        flex: 1;
        padding: 16px 20px;
        font-size: 18px;
        border: none;
        border-radius: 4px;
        background-color: transparent;
        color: var(--md-default-fg-color, #333);
        outline: none;
    }

    .ask-input::placeholder {
        color: var(--md-default-fg-color--light, #999);
    }

    .ask-btn {
        padding: 16px 36px;
        font-size: 18px;
        background-color: var(--md-primary-fg-color, #4CAF50);
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
        font-weight: 600;
        white-space: nowrap;
    }

    .ask-btn:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }

    .ask-btn:active {
        transform: translateY(0);
    }

    .ask-btn:disabled {
        background-color: #ccc;
        cursor: not-allowed;
        transform: none;
    }

    .helper-text {
        text-align: center;
        color: var(--md-default-fg-color--light, #666);
        margin-top: 20px;
        font-size: 1em;
    }

    .quick-links {
        margin-top: 60px;
        width: 100%;
        max-width: 100%;
    }

    .quick-links-title {
        font-size: 1.5em;
        color: var(--md-default-fg-color, #333);
        margin-bottom: 20px;
        text-align: center;
        font-weight: 600;
    }

    .quick-links-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
    }

    .quick-link-card {
        padding: 24px;
        background-color: var(--md-default-bg-color, white);
        border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
        border-radius: 8px;
        transition: transform 0.2s, box-shadow 0.2s;
        display: block;
    }

    .quick-link-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        border-color: var(--md-primary-fg-color, #4CAF50);
    }

    .quick-link-title {
        font-size: 1.3em;
        font-weight: 600;
        color: var(--md-default-fg-color, #333);
        margin-bottom: 16px;
        border-bottom: 2px solid var(--md-primary-fg-color, #4CAF50);
        padding-bottom: 8px;
    }

    .quick-link-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .quick-link-list li {
        margin-bottom: 10px;
    }

    .quick-link-list a {
        color: var(--md-typeset-a-color, #1976d2);
        text-decoration: none;
        font-size: 0.95em;
        display: block;
        padding: 6px 0;
        transition: padding-left 0.2s;
    }

    .quick-link-list a:hover {
        text-decoration: underline;
        padding-left: 8px;
    }

    @media (max-width: 768px) {
        .hero-title {
            font-size: 2em;
        }

        .ask-box {
            flex-direction: column;
        }

        .ask-btn {
            width: 100%;
        }

        .quick-links-grid {
            grid-template-columns: 1fr;
        }
    }

    @media (min-width: 769px) and (max-width: 1100px) {
        .quick-links-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>

<div class="hero-container">
    <h1 class="hero-title">How can we help you?</h1>
    
    <div class="ask-container">
        <div class="ask-box">
            <input 
                type="text" 
                id="askInput" 
                class="ask-input"
                placeholder="Ask a question about MoveData..."
                autocomplete="off"
            />
            <button id="askButton" class="ask-btn">Ask</button>
        </div>
        <p class="helper-text">Ask our AI assistant about integrations, setup, troubleshooting, and more</p>
    </div>
</div>

<div class="quick-links">
    <h2 class="quick-links-title">Popular Topics</h2>
    <div class="quick-links-grid">
        <div class="quick-link-card">
            <div class="quick-link-title">I'm new to MoveData</div>
            <ul class="quick-link-list">
                <li><a href="/getting-started/your-movedata-learning-path/">Read the user guide</a></li>
                <li><a href="/getting-started/quickstart/">Watch the quickstart video</a></li>
                <li><a href="/getting-started/the-movedata-lifecycle/">Understand how onboarding works</a></li>
                <li><a href="/integrations/enthuse/">Browse integrations</a></li>
            </ul>
        </div>
        <div class="quick-link-card">
            <div class="quick-link-title">I need to modify my integration</div>
            <ul class="quick-link-list">
                <li><a href="https://developer.movedata.io/" target="_blank" rel="noopener">Visit the developer center</a></li>
                <li><a href="https://www.youtube.com/@MoveDataHelp" target="_blank" rel="noopener">Browse the video library</a></li>
                <li><a href="https://www.youtube.com/watch?v=example" target="_blank" rel="noopener">Watch the Flow 101 video</a></li>
                <li><a href="/salesforce-application/settings/">Understand MoveData Settings</a></li>
            </ul>
        </div>
        <div class="quick-link-card">
            <div class="quick-link-title">I've got an Error</div>
            <ul class="quick-link-list">
                <li><a href="#" onclick="document.getElementById('askInput').focus(); return false;">Ask a question</a></li>
                <li><a href="https://app.movedata.io/" target="_blank" rel="noopener">Debug by Notification ID</a></li>
                <li><a href="/search/">Visit the Knowledge Base</a></li>
            </ul>
        </div>
    </div>
</div>

<script>
    (function() {
        const askInput = document.getElementById('askInput');
        const askButton = document.getElementById('askButton');

        // Handle Enter key press
        askInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                openAIAssistant();
            }
        });

        // Handle button click
        askButton.addEventListener('click', openAIAssistant);

        function openAIAssistant() {
            const question = askInput.value.trim();
            
            if (!question) {
                askInput.focus();
                return;
            }

            // Find and click the AI assistant button
            const aiButton = document.getElementById('ask-ai-header-button');

            if (aiButton) {
                // Click the button to open the modal
                aiButton.click();
                
                // Wait a bit for the modal to open, then inject the text and submit
                setTimeout(() => {
                    injectQuestionAndSubmit(question);
                }, 300);
            } else {
                console.error('AI Assistant button not found.');
                alert('AI Assistant not available. Please ensure the page has fully loaded.');
            }
        }

        function injectQuestionAndSubmit(question) {
            // Find the AI assistant input
            const chatInput = document.getElementById('ask-ai-input');

            if (chatInput) {
                // Set the value
                chatInput.value = question;
                
                // Trigger input events to ensure the UI updates
                chatInput.dispatchEvent(new Event('input', { bubbles: true }));
                chatInput.dispatchEvent(new Event('change', { bubbles: true }));
                
                // Focus the input
                chatInput.focus();
                
                // Find and click the send button
                setTimeout(() => {
                    const sendButton = document.getElementById('ask-ai-send');
                    
                    if (sendButton) {
                        sendButton.click();
                        // Clear the main input after successful submission
                        askInput.value = '';
                    } else {
                        console.warn('Send button not found. Question injected but not submitted.');
                    }
                }, 100);
            } else {
                console.error('AI Assistant input not found. Please ensure the modal is open.');
            }
        }

        // Alternative approach: Listen for modal opening
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        // Check if the AI input was just added
                        const aiInput = document.getElementById('ask-ai-input');
                        if (aiInput) {
                            const pendingQuestion = askInput.getAttribute('data-pending-question');
                            if (pendingQuestion) {
                                setTimeout(() => {
                                    injectQuestionAndSubmit(pendingQuestion);
                                    askInput.removeAttribute('data-pending-question');
                                }, 200);
                            }
                        }
                    }
                });
            });
        });

        // Start observing the document for modal additions
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    })();
</script>
