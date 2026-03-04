(function() {
    // 1. Check if user has a saved preference
    const saved = localStorage.getItem('theme');
    
    // 2. If 'dark' OR 'null' (new visitor), apply the class immediately
    if (saved === 'dark' || saved === null) {
        document.body.classList.add('dark-mode');
    }
})();
