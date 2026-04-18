/**
 * common.js - Shared logic for Canadian FHS Educational Tools
 */

// Shared state for navigation history
window.fhsState = {
    history: []
};

/**
 * Global Fix: Prevents "Sticky Focus" on Safari/iPhone
 * Removes the visual highlight on buttons after tapping.
 */
document.addEventListener('pointerup', (event) => {
    // Only react to real user interactions
    if (!event.isTrusted) return;

    // Find the button that was clicked
    const target = event.target.closest('button, .btn, a');
    
    // If it's a valid, enabled button, remove focus after a tiny delay
    if (target && typeof target.blur === 'function' && !target.disabled) {
        window.setTimeout(() => {
            target.blur();
        }, 50);
    }
}, { passive: true });

/**
 * UI Helper: Handles Selection States using CSS Classes
 */
function setSelected(ids, activeId) {
    if (!Array.isArray(ids)) return;

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.toggle('is-selected', id === activeId);
        }
    });
}

/**
 * Navigation: Transition between "pages" (divs)
 */
function goTo(id) {
    // Grab the main container divs, safely checking for an ID
    const currentDiv = document.querySelector('.container > div:not(.hidden):not(.home-hero):not(.home-grid)');
    
    // Ensure we are saving a valid page to history
    if (currentDiv && currentDiv.id && currentDiv.id !== id) {
        window.fhsState.history.push(currentDiv.id);
    }

    // Hide all standard pages
    document.querySelectorAll('.container > div').forEach(div => {
        if (!div.classList.contains('home-hero') && !div.classList.contains('home-grid')) {
            div.classList.add('hidden');
        }
    });

    const target = document.getElementById(id);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo(0, 0);

        // Run local tool logic if it exists (e.g., validation checks)
        if (typeof window.handlePageLogic === 'function') {
            window.handlePageLogic(id);
        }
    }
}

function goBack() {
    if (window.fhsState.history.length > 0) {
        const lastPageId = window.fhsState.history.pop();
        
        // Hide all standard pages
        document.querySelectorAll('.container > div').forEach(div => {
            if (!div.classList.contains('home-hero') && !div.classList.contains('home-grid')) {
                div.classList.add('hidden');
            }
        });
        
        const target = document.getElementById(lastPageId);
        if (target) {
            target.classList.remove('hidden');
            window.scrollTo(0, 0);

            // Run local tool logic on return
            if (typeof window.handlePageLogic === 'function') {
                window.handlePageLogic(lastPageId);
            }
        }
    }
}

/**
 * Theme Management
 */
function initTheme() {
    const body = document.body;
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;

    const isDark = body.classList.contains('dark-mode');
    toggleBtn.innerText = isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";

    toggleBtn.addEventListener('click', () => {
        body.classList.add('theme-transition');
        body.classList.toggle('dark-mode');
        
        const currentlyDark = body.classList.contains('dark-mode');
        
        try {
            // Failsafe in case user is in strict private browsing mode
            window.localStorage.setItem('theme', currentlyDark ? 'dark' : 'light');
        } catch (e) {
            console.warn("Local storage is disabled; theme preference won't be saved.");
        }
        
        toggleBtn.innerText = currentlyDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";

        window.setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
    });
}

// Initialize theme on load
document.addEventListener('DOMContentLoaded', initTheme);
