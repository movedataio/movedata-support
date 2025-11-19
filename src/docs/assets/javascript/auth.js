/**
 * Salesforce Authentication Helper
 * Handles token management and postMessage communication with Salesforce iframes
 */
(function() {
    var TOKEN_KEY = 'sf_auth_token';
    var TOKEN_EXPIRY_KEY = 'sf_auth_token_expiry';
    var TOKEN_TTL = 60 * 60 * 1000; // 60 minutes in milliseconds
    var storageAccessGranted = false;
    
    /**
     * Request unpartitioned storage access for cross-iframe localStorage
     */
    function requestStorageAccess() {
        if (storageAccessGranted) return Promise.resolve();

        if (!document.requestStorageAccess) {
            console.log('[Auth] Storage Access API not supported');
            storageAccessGranted = true; // Assume access in unsupported browsers
            return Promise.resolve();
        }
        
        return document.requestStorageAccess()
            .then(function() {
                console.log('[Auth] Unpartitioned storage access granted');
                storageAccessGranted = true;
            })
            .catch(function(err) {
                console.warn('[Auth] Storage access denied:', err);
                storageAccessGranted = false;
            });
    }
    
    /**
     * Initialize storage access on load
     */
    if (window.parent !== window) {
        // We're in an iframe, request storage access
        requestStorageAccess();
    } else {
        storageAccessGranted = true;
    }
    
    /**
     * Save token with expiration timestamp
     * @param {string} token - The authentication token
     */
    function saveToken(token) {
        var expiry = Date.now() + TOKEN_TTL;
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());
        console.log('Token saved, expires in 60 minutes');
    }
    
    /**
     * Get token if still valid
     * @returns {string|null} - The token or null if expired/missing
     */
    function getToken() {
        var token = localStorage.getItem(TOKEN_KEY);
        var expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
        
        if (!token || !expiry) {
            return null;
        }
        
        if (Date.now() > parseInt(expiry, 10)) {
            console.log('Token expired, clearing');
            clearToken();
            return null;
        }
        
        return token;
    }
    
    /**
     * Clear stored token
     */
    function clearToken() {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(TOKEN_EXPIRY_KEY);
    }
    
    // Expose globally for API calls
    window.requestStorageAccess = requestStorageAccess;
    window.setSalesforceToken = saveToken;
    window.getSalesforceToken = getToken;
    window.clearSalesforceToken = clearToken;

})();
