/**
 * common.js - Shared logic for Canadian FHS Educational Tools
 */
(() => {
    'use strict';

    const STORAGE_KEY_THEME = 'theme';

    // Shared state for navigation history
    const fhsState = {
        history: []
    };

    // Expose state globally only if other scripts need it
    window.fhsState = fhsState;

    /**
     * Safe localStorage helpers
     */
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

    /**
     * Safari / iPhone focus fix
     * Removes sticky visual focus from button-like controls after touch/pointer interaction.
     * Avoids blurring normal links for better accessibility and more stable Safari behavior.
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

    /**
     * Helper: Get standard page divs only
     */
    function getPageDivs() {
        return Array.from(document.querySelectorAll('.container > div')).filter((div) => {
            return !div.classList.contains('home-hero') && !div.classList.contains('home-grid');
        });
    }

    /**
     * Helper: Get current visible page
     */
    function getCurrentPage() {
        return document.querySelector('.container > div:not(.hidden):not(.home-hero):not(.home-grid)');
    }

    /**
     * Helper: Hide all standard pages
     */
    function hideAllPages() {
        getPageDivs().forEach((div) => {
            div.classList.add('hidden');
            div.setAttribute('aria-hidden', 'true');
        });
    }

    /**
     * Helper: Show a page safely
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
     * UI Helper: Handles Selection States using CSS Classes
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
     * Navigation: Transition between "pages" (divs)
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
     * Navigation: Return to previous page
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

    /**
     * Theme helpers
     */
    function getPreferredTheme() {
        const savedTheme = safeGetStorage(STORAGE_KEY_THEME);

        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
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
        const body = document.body;
        const toggleBtn = document.getElementById('darkModeToggle');
        const isDark = theme === 'dark';

        body.classList.toggle('dark-mode', isDark);
        updateThemeToggleLabel(toggleBtn, isDark);
    }

    /**
     * Theme Management
     */
    function initTheme() {
        const body = document.body;
        const toggleBtn = document.getElementById('darkModeToggle');

        applyTheme(getPreferredTheme());

        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            body.classList.add('theme-transition');

            const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme);
            safeSetStorage(STORAGE_KEY_THEME, nextTheme);

            window.setTimeout(() => {
                body.classList.remove('theme-transition');
            }, 300);
        });
    }

    /**
     * Expose shared functions globally for inline onclick handlers if needed
     */
    window.setSelected = setSelected;
    window.goTo = goTo;
    window.goBack = goBack;
    window.initTheme = initTheme;

    /**
     * Initialize on DOM ready
     */
    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
    });
})();
