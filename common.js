/**
 * common.js - Shared logic for Canadian FHS Educational Tools
 */
(() => {
    'use strict';

    /* ==========================================================================
       1. CONSTANTS & SHARED STATE
       ========================================================================== */

    const STORAGE_KEY_THEME = 'theme';

    // Shared state for navigation history
    const fhsState = {
        history: []
    };

    // Expose state globally only if other scripts need it
    window.fhsState = fhsState;


    /* ==========================================================================
       2. SAFE STORAGE HELPERS
       ========================================================================== */

    function safeGetStorage(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function safeSetStorage(key, value) {
        try {
            window.localStorage.setItem(key, value);
            return true;
        } catch (error) {
            return false;
        }
    }


    /* ==========================================================================
       3. SAFARI / IPHONE FOCUS FIX
       ========================================================================== */

    /**
     * Removes sticky visual focus from button-like controls after touch/pointer interaction.
     * Helps avoid Safari/iPhone buttons staying visually "pressed" after tapping.
     */
    document.addEventListener('pointerup', (event) => {
        if (!event.isTrusted) return;

        const target = event.target.closest('button, .btn, [role="button"]');

        if (!target) return;
        if (typeof target.blur !== 'function') return;
        if (target.disabled) return;

        window.setTimeout(() => {
            target.blur();
        }, 0);
    }, { passive: true });


    /* ==========================================================================
       4. PAGE / NAVIGATION HELPERS
       ========================================================================== */

    /**
     * Gets standard tool page divs only.
     * Excludes index/home layout sections.
     */
    function getPageDivs() {
        return Array.from(document.querySelectorAll('.container > div')).filter((div) => {
            return !div.classList.contains('home-hero') && !div.classList.contains('home-grid');
        });
    }

    /**
     * Gets the currently visible tool page.
     */
    function getCurrentPage() {
        return document.querySelector('.container > div:not(.hidden):not(.home-hero):not(.home-grid)');
    }

    /**
     * Hides all standard tool pages.
     */
    function hideAllPages() {
        getPageDivs().forEach((div) => {
            div.classList.add('hidden');
            div.setAttribute('aria-hidden', 'true');
        });
    }

    /**
     * Shows a target page safely and runs page-specific logic if available.
     */
    function showPage(target) {
        if (!target) return false;

        target.classList.remove('hidden');
        target.setAttribute('aria-hidden', 'false');

        if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

        try {
            target.focus({ preventScroll: true });
        } catch (error) {
            target.focus();
        }

        if (typeof window.handlePageLogic === 'function') {
            window.handlePageLogic(target.id);
        }

        return true;
    }

    /**
     * Navigates to a tool page and saves the previous page in history.
     */
    function goTo(id) {
        if (typeof id !== 'string' || !id.trim()) return false;

        const target = document.getElementById(id);
        if (!target) return false;

        const currentPage = getCurrentPage();

        if (currentPage && currentPage.id && currentPage.id !== id) {
            const lastHistoryItem = fhsState.history[fhsState.history.length - 1];

            if (lastHistoryItem !== currentPage.id) {
                fhsState.history.push(currentPage.id);
            }
        }

        hideAllPages();
        return showPage(target);
    }

    /**
     * Returns to the previous tool page.
     */
    function goBack() {
        while (fhsState.history.length > 0) {
            const lastPageId = fhsState.history.pop();
            const target = document.getElementById(lastPageId);

            if (target) {
                hideAllPages();
                return showPage(target);
            }
        }

        return false;
    }


    /* ==========================================================================
       5. UI HELPERS
       ========================================================================== */

    /**
     * Handles button selection states using CSS classes.
     */
    function setSelected(ids, activeId) {
        if (!Array.isArray(ids)) return;

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;

            const isActive = id === activeId;

            el.classList.toggle('is-selected', isActive);
            el.setAttribute('aria-pressed', String(isActive));
        });
    }

    /**
     * Clears Firefox/browser-restored form state on page load.
     * This does not affect in-tool Back navigation because it only runs on page load/reload.
     */
    function clearPersistedFormState() {
        const fields = document.querySelectorAll('input, select, textarea');

        fields.forEach((field) => {
            if (field.type === 'checkbox' || field.type === 'radio') {
                field.checked = field.defaultChecked;
                return;
            }

            if (field.tagName === 'SELECT') {
                field.selectedIndex = 0;
                return;
            }

            field.value = field.defaultValue || '';
        });

        document.querySelectorAll('.is-selected').forEach((el) => {
            el.classList.remove('is-selected');
            el.setAttribute('aria-pressed', 'false');
        });
    }

    /**
     * Restarts the current tool from a clean page load.
     * Use this for "Classify Another", "Start Over", and "Reset" actions.
     */
    function resetTool() {
        try {
            window.location.replace(window.location.pathname);
        } catch (error) {
            window.location.href = window.location.pathname;
        }
    }


    /* ==========================================================================
       6. THEME HELPERS
       ========================================================================== */

    function getPreferredTheme() {
        const savedTheme = safeGetStorage(STORAGE_KEY_THEME);

        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        // Default to dark mode for new visitors.
        return 'dark';
    }

    function updateThemeToggleLabel(toggleBtn, isDark) {
        if (!toggleBtn) return;

        toggleBtn.textContent = isDark
            ? '☀️ Switch to Light Mode'
            : '🌙 Switch to Dark Mode';

        toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        toggleBtn.setAttribute('aria-pressed', String(isDark));
    }

    function applyTheme(theme) {
        const root = document.documentElement;
        const toggleBtn = document.getElementById('darkModeToggle');
        const isDark = theme === 'dark';

        root.classList.toggle('dark-mode', isDark);
        updateThemeToggleLabel(toggleBtn, isDark);
    }

    /**
     * Initializes theme state and the dark/light mode toggle button.
     */
    function initTheme() {
        const root = document.documentElement;
        const toggleBtn = document.getElementById('darkModeToggle');

        applyTheme(getPreferredTheme());

        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            root.classList.add('theme-transition');

            const nextTheme = root.classList.contains('dark-mode') ? 'light' : 'dark';

            applyTheme(nextTheme);
            safeSetStorage(STORAGE_KEY_THEME, nextTheme);

            window.setTimeout(() => {
                root.classList.remove('theme-transition');
            }, 300);
        });
    }


    /* ==========================================================================
       7. GLOBAL EXPORTS
       ========================================================================== */

    // Expose shared functions globally for inline onclick handlers.
    window.setSelected = setSelected;
    window.goTo = goTo;
    window.goBack = goBack;
    window.initTheme = initTheme;
    window.resetTool = resetTool;


    /* ==========================================================================
       8. INITIALIZATION
       ========================================================================== */

    document.addEventListener('DOMContentLoaded', () => {
        clearPersistedFormState();
        initTheme();
    });
})();
