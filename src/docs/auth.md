---
hide:
  - navigation
  - toc
---

# Authorising MoveData

<script>
(function() {
    var salesforceOrigins = ['.force.com', '.salesforce.com', '.visualforce.com'];
    
    // Listen for token
    window.addEventListener('message', function(event) {
        // console.log('[Aura] Received message', event.origin, event.data);

        if (!salesforceOrigins.includes(event.origin)) {
            console.warn('[Aura] Rejected message from:', event.origin);
            return;
        }
        
        if (event.data.type === 'AUTH_TOKEN') {
            console.log('[Aura] Received AUTH_TOKEN message');
            var token = event.data.token;
            window.setSalesforceToken(token);

            console.log('[Support] Posting AUTH_READY message');
            window.parent.postMessage({ type: 'AUTH_READY' }, '*');
        }
    });
    console.log('[Support] postMessage API listener registered');
    
    // Tell parent we're ready
    if (window.parent !== window) {
        console.log('[Support] Posting IFRAME_READY message');
        window.parent.postMessage({ type: 'IFRAME_READY' }, '*');
    }
})();
</script>
