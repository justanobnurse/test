/**
 * common.js - Shared logic for Canadian FHS Educational Tools
 */
(() => {
    'use strict';

    const STORAGE_KEYS = {
        theme: 'theme'
    };

    const SELECTORS = {
        pageDivs: '.container > div',
        activePage: '.container > div:not(.hidden):not(.home-hero):not(.home-grid)'
    };

    const state = {
        history: []
    };

    // Expose only the minimum needed globally
    window.fhsState = state;

    /**
     * Safe localStorage helpers
     */
    function safeStorageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch {
            return null;
        }
    }

    function safeStorageSet(key, value) {
        try {
            window.localStorage.setItem(key, value);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Returns navigable page sections only
     */
    function getPageDivs() {
        return Array.from(document.querySelectorAll(SELECTORS.pageDivs)).filter(
            div => !div.classList.contains('home-hero') && !div.classList.contains('home-grid')
        );
    }

    function getActivePage() {
        return document.querySelector(SELECTORS.activePage);
    }

    function hideAllPages() {
        getPageDivs().forEach(div => {
            div.classList.add('hidden');
            div.setAttribute('aria-hidden', 'true');
        });
    }

    function showPage(target) {
        if (!target) return false;

        target.classList.remove('hidden');
        target.setAttribute('aria-hidden', 'false');

        // Focus the new page for accessibility if possible
        if (!target.hasAttribute('tabindex')) {
            target.setAttribute('tabindex', '-1');
        }

        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

        try {
            target.focus({ preventScroll: true });
        } catch {
            target.focus();
        }

        if (typeof window.handlePageLogic === 'function') {
            window.handlePageLogic(target.id);
        }

        return true;
    }

    /**
     * Safari / iPhone focus fix:
     * blur only pointer-activated button-like controls,
     * not normal links, and not keyboard-triggered interaction.
     */
    document.addEventListener('pointerup', event => {
        if (!event.isTrusted) return;

        const target = event.target.closest('button, .btn, [role="button"]');
        if (!target || typeof target.blur !== 'function') return;

        // Avoid blurring form fields or disabled elements
        const tag = target.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.disabled) {
            return;
        }

        window.setTimeout(() => {
            target.blur();
        }, 0);
    }, { passive: true });

    /**
     * UI Helper: Handles Selection States using CSS Classes
     */
    function setSelected(ids, activeId) {
        if (!Array.isArray(ids)) return;

        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                const isActive = id === activeId;
                el.classList.toggle('is-selected', isActive);
                el.setAttribute('aria-pressed', String(isActive));
            }
        });
    }

    /**
     * Navigation: Transition between "pages" (divs)
     */
    function goTo(id) {
        if (typeof id !== 'string' || !id.trim()) return false;

        const target = document.getElementById(id);
        if (!target) return false;

        const currentPage = getActivePage();

        if (currentPage && currentPage.id && currentPage.id !== id) {
            const lastHistoryItem = state.history[state.history.length - 1];
            if (lastHistoryItem !== currentPage.id) {
                state.history.push(currentPage.id);
            }
        }

        hideAllPages();
        return showPage(target);
    }

    function goBack() {
        while (state.history.length > 0) {
            const lastPageId = state.history.pop();
            const target = document.getElementById(lastPageId);

            if (target) {
                hideAllPages();
                return showPage(target);
            }
        }

        return false;
    }

    /**
     * Theme Management
     */
    function getPreferredTheme() {
        const savedTheme = safeStorageGet(STORAGE_KEYS.theme);
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }

        const prefersDark =
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;

        return prefersDark ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        const body = document.body;
        const toggleBtn = document.getElementById('darkModeToggle');
        const isDark = theme === 'dark';

        body.classList.toggle('dark-mode', isDark);

        if (toggleBtn) {
            toggleBtn.textContent = isDark
                ? '☀️ Switch to Light Mode'
                : '🌙 Switch to Dark Mode';

            toggleBtn.setAttribute(
                'aria-label',
                isDark ? 'Switch to light mode' : 'Switch to dark mode'
            );

            toggleBtn.setAttribute('aria-pressed', String(isDark));
        }
    }

    function initTheme() {
        const body = document.body;
        const toggleBtn = document.getElementById('darkModeToggle');
        const initialTheme = getPreferredTheme();

        applyTheme(initialTheme);

        if (!toggleBtn) return;

        toggleBtn.addEventListener('click', () => {
            body.classList.add('theme-transition');

            const nextTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(nextTheme);
            safeStorageSet(STORAGE_KEYS.theme, nextTheme);

            window.setTimeout(() => {
                body.classList.remove('theme-transition');
            }, 300);
        });
    }

    /**
     * Expose shared functions globally for inline HTML handlers if needed
     */
    window.setSelected = setSelected;
    window.goTo = goTo;
    window.goBack = goBack;
    window.initTheme = initTheme;

    document.addEventListener('DOMContentLoaded', initTheme);
})();
