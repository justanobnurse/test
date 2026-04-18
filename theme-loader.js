(function() {
    const saved = localStorage.getItem('theme');
    // Default to dark mode for new visitors or if 'dark' is saved
    if (saved === 'dark' || saved === null) {
        document.body.classList.add('dark-mode');
    }
})();
