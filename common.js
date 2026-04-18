/**
 * common.js - Shared logic for Canadian FHS Educational Tools
 */

// Shared state for navigation history
window.fhsState = {
    history: []
};

/**
 * Global Fix: Prevents "Sticky Focus" on Safari/iPhone
 */
document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .btn, a');
    if (target && typeof target.blur === 'function') {
        setTimeout(() => target.blur(), 50);
    }
});

/**
 * UI Helper: Handles Selection States using CSS Classes
 */
function setSelected(ids, activeId) {
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
    // FIX: Grab the main container divs, safely checking for an ID
    const currentDiv = document.querySelector('.container > div:not(.hidden):not(.home-hero):not(.home-grid)');
    
    if (currentDiv && currentDiv.id && currentDiv.id !== id) {
        window.fhsState.history.push(currentDiv.id);
    }

    document.querySelectorAll('.container > div').forEach(div => {
        if (!div.classList.contains('home-hero') && !div.classList.contains('home-grid')) {
            div.classList.add('hidden');
        }
    });

    const target = document.getElementById(id);
    if (target) {
        target.classList.remove('hidden');
        window.scrollTo(0, 0);

        // FIX: Hook to run validation logic inside your tools
        if (typeof handlePageLogic === 'function') {
            handlePageLogic(id);
        }
    }
}

function goBack() {
    if (window.fhsState.history.length > 0) {
        const lastPageId = window.fhsState.history.pop();
        
        document.querySelectorAll('.container > div').forEach(div => {
            if (!div.classList.contains('home-hero') && !div.classList.contains('home-grid')) {
                div.classList.add('hidden');
            }
        });
        
        const target = document.getElementById(lastPageId);
        if (target) {
            target.classList.remove('hidden');
            window.scrollTo(0, 0);

            // FIX: Hook to run validation logic when going backwards
            if (typeof handlePageLogic === 'function') {
                handlePageLogic(lastPageId);
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
        localStorage.setItem('theme', currentlyDark ? 'dark' : 'light');
        toggleBtn.innerText = currentlyDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode";

        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 300);
    });
}

document.addEventListener('DOMContentLoaded', initTheme);
