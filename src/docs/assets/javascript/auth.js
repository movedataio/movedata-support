/**
 * Salesforce Authentication Helper
 * Handles token management and postMessage communication with Salesforce iframes
 */
(function() {
    var TOKEN_KEY = 'sf_auth_token';
    var TOKEN_EXPIRY_KEY = 'sf_auth_token_expiry';
    var TOKEN_TTL = 60 * 60 * 1000; // 60 minutes in milliseconds   
    
    /**
     * Save token with expiration timestamp
     * @param {string} token - The authentication token
     */
    function saveToken(token) {
        var expiry = Date.now() + TOKEN_TTL;
        var expiryDate = new Date(expiry);
        
        // Use cookies for cross-context access
        document.cookie = TOKEN_KEY + '=' + encodeURIComponent(JSON.stringify(token)) + '; expires=' + expiryDate.toUTCString() + '; path=/; SameSite=None; Secure';
        document.cookie = TOKEN_EXPIRY_KEY + '=' + expiry + '; expires=' + expiryDate.toUTCString() + '; path=/; SameSite=None; Secure';
        
        console.log('[Auth] Token saved as cookie, expires in 60 minutes');
    }
    
    /**
     * Get token if still valid
     * @returns {string|null} - The token or null if expired/missing
     */
    function getToken() {
        var token = getCookie(TOKEN_KEY);
        var expiry = getCookie(TOKEN_EXPIRY_KEY);
        
        if (!token || !expiry) {
            return null;
        }
        
        if (Date.now() > parseInt(expiry, 10)) {
            console.log('[Auth] Token expired, clearing');
            clearToken();
            return null;
        }
        
        return JSON.parse(decodeURIComponent(token));
    }
    
    /**
     * Clear stored token
     */
    function clearToken() {
        document.cookie = TOKEN_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure';
        document.cookie = TOKEN_EXPIRY_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure';
    }
    
    /**
     * Helper to get cookie value
     * @param {string} name - Cookie name
     * @returns {string|null} - Cookie value or null
     */
    function getCookie(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        return match ? match[2] : null;
    }

    
    
    // Expose globally for API calls
    window.setSalesforceToken = saveToken;
    window.getSalesforceToken = getToken;
    window.clearSalesforceToken = clearToken;

    // ---------------------------------------------------------------
    
    /**
     * Update header to show authentication status
     */
    function updateHeaderAuthStatus() {
        var token = getToken();
        var headerTopic = document.querySelector('.md-header__topic .md-ellipsis');
        
        if (headerTopic && token) {
            var lockEmoji = headerTopic.querySelector('.auth-lock');
            if (!lockEmoji) {
                var span = document.createElement('span');
                span.className = 'auth-lock';
                span.textContent = ' 🔒';
                span.title = 'Authenticated';
                span.style.cursor = 'help';
                headerTopic.appendChild(span);
                console.log('[Auth] Added lock emoji to header');
            }
        }
    }
    
    // Update header on load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateHeaderAuthStatus);
    } else {
        updateHeaderAuthStatus();
    }

})();
