/**
 * Salesforce Authentication Helper
 * Handles token management and postMessage communication with Salesforce iframes
 */
(function() {
    var TOKEN_KEY = 'sf_auth_token';
    var TOKEN_EXPIRY_KEY = 'sf_auth_token_expiry';
    var SESSION_KEY = 'ai_session_key';
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
        
        // Clear any existing session key to maintain consistency
        clearSessionKey();

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
     * Save session key with expiration aligned to auth token or TOKEN_TTL
     * @param {string} sessionKey - The session key to store
     */
    function saveSessionKey(sessionKey) {
        var tokenExpiry = getCookie(TOKEN_EXPIRY_KEY);
        var expiry;
        var expiryDate;
        
        if (tokenExpiry) {
            // Align with existing token expiry
            expiry = parseInt(tokenExpiry, 10);
            expiryDate = new Date(expiry);
            console.log('[Auth] Session key saved, aligned with token expiry');
        } else {
            // Use default TTL
            expiry = Date.now() + TOKEN_TTL;
            expiryDate = new Date(expiry);
            console.log('[Auth] Session key saved with default TTL (60 minutes)');
        }
        
        document.cookie = SESSION_KEY + '=' + encodeURIComponent(sessionKey) + '; expires=' + expiryDate.toUTCString() + '; path=/; SameSite=None; Secure';
    }
    
    /**
     * Get session key if still valid
     * @returns {string|null} - The session key or null if expired/missing
     */
    function getSessionKey() {
        var sessionKey = getCookie(SESSION_KEY);
        var tokenExpiry = getCookie(TOKEN_EXPIRY_KEY);
        
        if (!sessionKey) {
            return null;
        }
        
        // If we have a token expiry, check against it
        if (tokenExpiry && Date.now() > parseInt(tokenExpiry, 10)) {
            console.log('[Auth] Session key expired with token, clearing');
            clearSessionKey();
            return null;
        }
        
        return decodeURIComponent(sessionKey);
    }
    
    /**
     * Clear stored session key
     */
    function clearSessionKey() {
        document.cookie = SESSION_KEY + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure';
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
    window.setSessionKey = saveSessionKey;
    window.getSessionKey = getSessionKey;
    window.clearSessionKey = clearSessionKey;

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
