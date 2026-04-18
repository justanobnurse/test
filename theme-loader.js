(function () {
    'use strict';

    const STORAGE_KEY = 'theme';
    const root = document.documentElement;

    function safeGetTheme() {
        try {
            return window.localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            return null;
        }
    }

    const savedTheme = safeGetTheme();

    // Default to dark mode for new visitors
    if (savedTheme === 'light') {
        root.classList.remove('dark-mode');
    } else {
        root.classList.add('dark-mode');
    }
})();
