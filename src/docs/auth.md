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
        console.log('Listen Event', event);

        if (!salesforceOrigins.includes(event.origin)) {
            console.warn('Rejected message from:', event.origin);
            return;
        }
        
        if (event.data.type === 'AUTH_TOKEN') {
            var token = event.data.token; 
            // Use the token
            console.log('Received token', token);
        }
    });
    
    // Tell parent we're ready
    if (window.parent !== window) {
        console.log('Posting IFrame Ready');
        window.parent.postMessage({ type: 'IFRAME_READY' }, '*');
    }
})();
</script>
