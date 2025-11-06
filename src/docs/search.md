---
title: Knowledge Base Search
hide:
  - navigation
  - toc
---

# Knowledge Base Search

<style>
    .search-container {
        max-width: 100%;
        margin: 20px 0;
    }

    .search-box {
        display: flex;
        gap: 10px;
        margin-bottom: 90px;
    }

    .search-input {
        flex: 1;
        padding: 12px 16px;
        font-size: 16px;
        border: 2px solid var(--md-default-fg-color--lighter, #ddd);
        border-radius: 4px;
        transition: border-color 0.3s;
        background-color: var(--md-default-bg-color, white);
        color: var(--md-default-fg-color, #333);
    }

    .search-input:focus {
        outline: none;
        border-color: var(--md-primary-fg-color, #4CAF50);
    }

    .search-btn {
        padding: 12px 24px;
        font-size: 16px;
        background-color: var(--md-primary-fg-color, #4CAF50);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        font-weight: 500;
    }

    .search-btn:hover {
        opacity: 0.9;
    }

    .search-btn:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .loading {
        text-align: center;
        padding: 40px;
        color: var(--md-default-fg-color--light, #666);
    }

    .spinner {
        border: 4px solid #f3f3f3;
        border-top: 4px solid var(--md-primary-fg-color, #4CAF50);
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .error-msg {
        background-color: #ffebee;
        color: #c62828;
        padding: 16px;
        border-radius: 4px;
        margin-bottom: 20px;
        border-left: 4px solid #c62828;
    }

    .results-summary {
        margin-bottom: 20px;
        padding: 16px;
        background-color: #e8f5e9;
        border-radius: 4px;
        color: #2e7d32;
        font-weight: 500;
    }

    .result-item {
        border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
        border-radius: 6px;
        padding: 20px;
        margin-bottom: 16px;
        transition: box-shadow 0.3s, transform 0.2s;
        background-color: var(--md-default-bg-color, white);
    }

    .result-item:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
    }

    .result-rank {
        display: inline-block;
        background-color: var(--md-primary-fg-color, #4CAF50);
        color: white;
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 10px;
    }

    .result-title {
        font-size: 1.4em;
        color: var(--md-typeset-a-color, #1976d2);
        margin-bottom: 10px;
        text-decoration: none;
        display: block;
        font-weight: 600;
    }

    .result-title:hover {
        text-decoration: underline;
    }

    .result-summary {
        color: var(--md-default-fg-color--light, #555);
        margin-bottom: 12px;
        line-height: 1.6;
    }

    .result-source {
        color: var(--md-default-fg-color--lighter, #757575);
        font-size: 0.9em;
        margin-bottom: 10px;
        font-style: italic;
    }

    .result-excerpt {
        background-color: var(--md-code-bg-color, #f9f9f9);
        padding: 12px;
        border-left: 3px solid var(--md-primary-fg-color, #4CAF50);
        margin-top: 12px;
        font-size: 0.95em;
        color: var(--md-default-fg-color--light, #666);
        border-radius: 4px;
    }

    .key-points {
        margin-top: 12px;
    }

    .key-points-title {
        font-weight: 600;
        color: var(--md-default-fg-color, #333);
        margin-bottom: 8px;
        font-size: 0.95em;
    }

    .key-points ul {
        list-style-type: none;
        padding-left: 0;
    }

    .key-points li {
        padding: 6px 0 6px 20px;
        position: relative;
        color: var(--md-default-fg-color--light, #555);
        font-size: 0.95em;
    }

    .key-points li:before {
        content: "▸";
        position: absolute;
        left: 0;
        color: var(--md-primary-fg-color, #4CAF50);
        font-weight: bold;
    }

    .relevance-badge {
        display: inline-block;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 0.85em;
        font-weight: 600;
        margin-left: 10px;
    }

    .relevance-high {
        background-color: #c8e6c9;
        color: #2e7d32;
    }

    .relevance-medium {
        background-color: #fff9c4;
        color: #f57f17;
    }

    .relevance-low {
        background-color: #ffccbc;
        color: #d84315;
    }

    .no-results {
        text-align: center;
        padding: 40px;
        color: var(--md-default-fg-color--light, #666);
    }

    .panels-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }

    .panels-container.hidden {
        display: none;
    }

    .panel {
        padding: 24px;
        background-color: var(--md-default-bg-color, white);
        border: 1px solid var(--md-default-fg-color--lightest, #e0e0e0);
        border-radius: 8px;
        height: fit-content;
    }

    .panel-title {
        font-size: 1.3em !important;
        font-weight: 600 !important;
        color: var(--md-default-fg-color, #333);
        margin: 0 0 16px !important;
        border-bottom: 2px solid var(--md-primary-fg-color, #4CAF50);
        padding-bottom: 8px;
    }

    .panel-items {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .panel-item {
        padding: 0;
        background-color: transparent;
        border-radius: 0;
        border-left: none;
        transition: none;
    }

    .panel-item:hover {
        transform: none;
        box-shadow: none;
    }

    .panel-item-title {
        font-weight: 400;
        color: var(--md-typeset-a-color, #1976d2);
        text-decoration: none;
        font-size: 0.95em;
        display: block;
        line-height: 1.4;
        padding: 6px 0;
    }

    .panel-item-title:hover {
        text-decoration: underline;
    }

    .close-button {
        float: right;
        background: none;
        border: none;
        font-size: 18px;
        cursor: pointer;
        color: var(--md-default-fg-color--light, #666);
        padding: 4px 8px;
        border-radius: 4px;
        transition: background-color 0.2s;
    }

    .close-button:hover {
        background-color: var(--md-default-fg-color--lightest, #e0e0e0);
        color: var(--md-default-fg-color, #333);
    }

    .results-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>

<div class="search-container">
    <div class="search-box">
        <input 
            type="text" 
            id="searchInput" 
            class="search-input"
            placeholder="Enter your search query (e.g., NPSP Extension)..."
            autocomplete="off"
        />
        <button id="searchButton" class="search-btn">Search</button>
    </div>

    <div id="panels" class="panels-container">
        <!-- Panels will be loaded here -->
    </div>

    <div id="results"></div>
</div>

<script>
    (function() {
        const SEARCH_ENDPOINT = 'https://api.uat.movedata.io/admin/support/search';

        const searchInput = document.getElementById('searchInput');
        const searchButton = document.getElementById('searchButton');
        const resultsDiv = document.getElementById('results');
        const panelsDiv = document.getElementById('panels');

        // Load panels on page load
        loadPanels();

        // Handle Enter key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Handle button click
        searchButton.addEventListener('click', performSearch);

        async function loadPanels() {
            try {
                const response = await fetch('/kb.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const kbData = await response.json();
                displayPanels(kbData);
            } catch (error) {
                console.error('Error loading knowledge base data:', error);
                panelsDiv.innerHTML = `
                    <div class="error-msg">
                        <strong>Error loading content:</strong> ${escapeHtml(error.message)}
                    </div>
                `;
            }
        }

        function displayPanels(kbData) {
            let html = '';
            
            Object.keys(kbData).forEach(sectionKey => {
                const section = kbData[sectionKey];
                html += `
                    <div class="panel">
                        <h2 class="panel-title">${escapeHtml(section.title)}</h2>
                        <div class="panel-items">
                            ${section.items.map(item => `
                                <div class="panel-item">
                                    <a href="${escapeHtml(item.url)}" class="panel-item-title">${escapeHtml(item.title)}</a>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            });
            
            panelsDiv.innerHTML = html;
        }

        function hidePanels() {
            panelsDiv.classList.add('hidden');
        }

        // Make showPanels globally accessible for the close button
        window.showPanels = function() {
            panelsDiv.classList.remove('hidden');
            resultsDiv.innerHTML = '';
            searchInput.value = '';
        };

        async function performSearch() {
            const question = searchInput.value.trim();
            
            if (!question) {
                showPanels();
                resultsDiv.innerHTML = '<div class="error-msg">Please enter a search query.</div>';
                return;
            }

            // Hide panels and show loading state
            hidePanels();
            searchButton.disabled = true;
            resultsDiv.innerHTML = `
                <div class="loading">
                    <div class="spinner"></div>
                    <div>Searching...</div>
                </div>
            `;

            try {
                const response = await fetch(SEARCH_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ question })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                displayResults(data);
            } catch (error) {
                resultsDiv.innerHTML = `
                    <div class="error-msg">
                        <strong>Error:</strong> ${escapeHtml(error.message)}<br>
                        Please check your connection and try again.
                    </div>
                `;
            } finally {
                searchButton.disabled = false;
            }
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        function stripMarkdownLinks(text) {
            // Remove markdown links [text](url) and return just the text
            return text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        }

        function displayResults(data) {
            // Parse the answer JSON if it's a string
            let parsedAnswer;
            try {
                parsedAnswer = typeof data.answer === 'string' ? JSON.parse(data.answer) : data.answer;
            } catch (e) {
                parsedAnswer = null;
            }

            const sources = data.sources || [];
            const resultsFound = parsedAnswer?.results_found || sources.length;
            const results = parsedAnswer?.results || [];

            if (resultsFound === 0) {
                resultsDiv.innerHTML = `
                    <div class="results-summary">
                        <div class="results-header">
                            <span>No results found for "${escapeHtml(searchInput.value)}". Try a different search term.</span>
                            <button class="close-button" onclick="showPanels()" title="Close search results">✕</button>
                        </div>
                    </div>
                `;
                return;
            }

            // Build results HTML
            let html = `
                <div class="results-summary">
                    <div class="results-header">
                        <span>Found ${resultsFound} result${resultsFound !== 1 ? 's' : ''} for "${escapeHtml(searchInput.value)}"</span>
                        <button class="close-button" onclick="showPanels()" title="Close search results">✕</button>
                    </div>
                </div>
            `;

            // Display structured results if available
            if (results.length > 0) {
                // Sort results by rank
                const sortedResults = [...results].sort((a, b) => a.rank - b.rank);
                
                sortedResults.forEach(result => {
                    // Use index to get the corresponding source (index is 1-based, so subtract 1 for 0-based array)
                    const source = sources[result.index - 1];
                    const url = source ? source.url : '#';
                    const excerpt = source ? source.excerpt : '';
                    
                    // Strip markdown links from title and source
                    const cleanTitle = stripMarkdownLinks(result.title);
                    const cleanSource = stripMarkdownLinks(result.source);

                    html += `
                        <div class="result-item">
                            <div>
                                <span class="result-rank">Rank ${result.rank}</span>
                                ${result.relevance_score ? `
                                    <span class="relevance-badge relevance-${escapeHtml(result.relevance_score)}">
                                        ${escapeHtml(result.relevance_score)} relevance
                                    </span>
                                ` : ''}
                            </div>
                            <a href="${escapeHtml(url)}" class="result-title">${escapeHtml(cleanTitle)}</a>
                            <div class="result-source">Source: ${escapeHtml(cleanSource)}</div>
                            <div class="result-summary">${escapeHtml(result.summary)}</div>
                            ${result.key_points && result.key_points.length > 0 ? `
                                <div class="key-points">
                                    <div class="key-points-title">Key Points:</div>
                                    <ul>
                                        ${result.key_points.map(point => `<li>${escapeHtml(point)}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            ${excerpt ? `<div class="result-excerpt">${escapeHtml(excerpt)}</div>` : ''}
                        </div>
                    `;
                });
            } else {
                // Fallback to sources only
                sources.forEach((source, index) => {
                    html += `
                        <div class="result-item">
                            <div>
                                <span class="result-rank">Result ${index + 1}</span>
                            </div>
                            <a href="${escapeHtml(source.url)}" class="result-title">${escapeHtml(source.title)}</a>
                            <div class="result-summary">Relevance Score: ${(source.score * 100).toFixed(1)}%</div>
                            ${source.excerpt ? `<div class="result-excerpt">${escapeHtml(source.excerpt)}</div>` : ''}
                        </div>
                    `;
                });
            }

            resultsDiv.innerHTML = html;
        }
    })();
</script>
