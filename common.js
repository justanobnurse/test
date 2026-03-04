/**
 * common.js - Shared logic for Canadian FHS Educational Tools
 * Handles Navigation, Theme Management, and UI Consistency
 */

// Shared state for navigation history
window.fhsState = {
    history: []
};

/**
 * Navigation: Transition between "pages" (divs) within a tool
 */
function goTo(id) {
    const container = document.querySelector('.container');
    const currentDiv = container.querySelector('div:not(.hidden):not(.home-hero):not(.home-grid)');
    
    if (currentDiv && currentDiv.id !== id) {
        window.fhsState.history.push(currentDiv.id);
    }

    document.querySelectorAll('.container > div').forEach(div => {
        // Don't hide the main home elements if they exist
        if (!div.classList.contains('home-hero') && !div.classList.contains('home-grid')) {
            div.classList.add('hidden');
        }
    });

    const target = document.getElementById(id);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

/**
 * Navigation: Go back to the previous "page"
 */
function goBack() {
    if (window.fhsState.history.length > 0) {
        const lastPageId = window.fhsState.history.pop();
        
        document.querySelectorAll('.container > div').forEach(div => {
            if (!div.classList.contains('home-hero') && !div.classList.contains('home-grid')) {
                div.classList.add('hidden');
            }
        });

        document.getElementById(lastPageId).classList.remove('hidden');
        window.scrollTo(0, 0);
    }
}

/**
 * Theme Management: Apply and Toggle Dark Mode
 */
function initTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById('darkModeToggle');
   const isDark = body.classList.contains('dark-mode');

    if (toggleBtn) {
        toggleBtn.innerText = isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";

        toggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const currentlyDark = body.classList.contains('dark-mode');
            localStorage.setItem('theme', currentlyDark ? 'dark' : 'light');
            toggleBtn.innerText = currentlyDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";
        });
    }
}

// Initialize theme when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initTheme);
