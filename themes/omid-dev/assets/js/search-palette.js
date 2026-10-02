import { escapeHtml, prepareDisplayText } from './text-utils.js';

const RESULT_LIMIT = 8;
const DEBOUNCE_MS = 160;

const dialog = document.getElementById('search-palette');
if (!dialog) {
    // Progressive enhancement: header still links to /search/
} else {
    boot();
}

function boot() {
    const configEl = document.getElementById('search-palette-config');
    const config = parseConfig(configEl);
    const labels = config.labels || {};
    const pagefindBundle = config.pagefindBundle || '/pagefind/';
    const searchPageUrl = config.searchPageUrl || '/search/';
    const notesSection = config.notesSection || 'notes';

    const input = document.getElementById('search-palette-input');
    const resultsEl = document.getElementById('search-palette-results');
    const statusEl = document.getElementById('search-palette-status');
    const openTriggers = document.querySelectorAll('[data-search-open]');

    let pagefindApi = null;
    let pagefindReady = false;
    let pagefindLoading = null;
    let pagefindFailed = false;
    let debounceTimer = null;
    let searchGeneration = 0;
    let activeIndex = -1;
    let currentResults = [];

    function parseConfig(el) {
        if (!el) {
            return {};
        }
        try {
            let parsed = JSON.parse(el.textContent.trim());
            if (typeof parsed === 'string') parsed = JSON.parse(parsed);
            return parsed || {};
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    function setStatus(message, { busy = false } = {}) {
        if (!statusEl) return;
        statusEl.textContent = message || '';
        statusEl.hidden = !message;
        statusEl.setAttribute('aria-busy', busy ? 'true' : 'false');
    }

    function clearResults() {
        currentResults = [];
        activeIndex = -1;
        if (resultsEl) {
            resultsEl.innerHTML = '';
            resultsEl.hidden = true;
        }
    }

    async function loadPagefind() {
        if (pagefindReady) return pagefindApi;
        if (pagefindFailed) throw new Error('Pagefind unavailable');
        if (pagefindLoading) return pagefindLoading;

        pagefindLoading = (async () => {
            setStatus(labels.loading || 'Loading search index…', { busy: true });
            const bundle = pagefindBundle.endsWith('/') ? pagefindBundle : `${pagefindBundle}/`;
            const api = await import(`${bundle}pagefind.js`);
            await api.options({
                bundlePath: bundle,
                ranking: {
                    pageLength: 0.35,
                    termFrequency: 0.9,
                    metaWeights: {
                        title: 6.5,
                        tags: 4.0,
                        description: 2.5,
                        categories: 2.0,
                    },
                },
            });
            await api.init();
            pagefindApi = api;
            pagefindReady = true;
            setStatus('');
            return api;
        })().catch((error) => {
            pagefindFailed = true;
            pagefindLoading = null;
            setStatus(labels.unavailable || 'Search is unavailable.');
            throw error;
        });

        return pagefindLoading;
    }

    function resultKind(meta) {
        if (meta.kind) return meta.kind;
        if (meta.section === notesSection) return 'notes';
        if (meta.section === 'posts') return 'posts';
        return 'pages';
    }

    function kindLabel(kind) {
        if (kind === 'notes') return labels.notes || 'Notes';
        if (kind === 'pages') return labels.pages || 'Pages';
        return labels.posts || 'Posts';
    }

    function mapResult(data) {
        const meta = data.meta || {};
        const kind = resultKind(meta);
        const summary = data.excerpt || data.plain_excerpt || meta.description || '';
        return {
            title: meta.title || '',
            permalink: data.url || '#',
            summary,
            kind,
            excerptHtml: Boolean(data.excerpt),
        };
    }

    function renderResults(results, term) {
        currentResults = results;
        activeIndex = results.length ? 0 : -1;

        if (!resultsEl) return;

        if (!results.length) {
            resultsEl.hidden = false;
            resultsEl.innerHTML = `<p class="search-palette__empty">${escapeHtml(labels.empty || 'No results found.')}</p>`;
            setStatus('');
            return;
        }

        const items = results.map((result, index) => {
            const title = escapeHtml(prepareDisplayText(result.title) || result.permalink);
            const summary = result.excerptHtml
                ? result.summary
                : escapeHtml(prepareDisplayText(result.summary));
            const kind = escapeHtml(kindLabel(result.kind));
            return `
                <a class="search-palette__item${index === 0 ? ' is-active' : ''}"
                   role="option"
                   id="search-palette-option-${index}"
                   href="${escapeHtml(result.permalink)}"
                   data-index="${index}">
                    <span class="search-palette__item-kind">${kind}</span>
                    <span class="search-palette__item-title">${title}</span>
                    ${summary ? `<span class="search-palette__item-summary">${summary}</span>` : ''}
                </a>
            `;
        }).join('');

        const moreHref = `${searchPageUrl}${searchPageUrl.includes('?') ? '&' : '?'}q=${encodeURIComponent(term)}`;
        const moreLabel = (labels.moreResults || 'All results').replace('%s', term);

        resultsEl.hidden = false;
        resultsEl.innerHTML = `
            <div class="search-palette__list" role="listbox" aria-label="${escapeHtml(labels.results || 'Search results')}">
                ${items}
            </div>
            <a class="search-palette__more" href="${escapeHtml(moreHref)}">${escapeHtml(moreLabel)}</a>
        `;
        setStatus('');
        syncActiveOption();
    }

    function syncActiveOption() {
        if (!resultsEl) return;
        const items = resultsEl.querySelectorAll('.search-palette__item');
        items.forEach((item, index) => {
            const active = index === activeIndex;
            item.classList.toggle('is-active', active);
            if (active) {
                item.scrollIntoView({ block: 'nearest' });
                if (input) input.setAttribute('aria-activedescendant', item.id);
            }
        });
        if (activeIndex < 0 && input) input.removeAttribute('aria-activedescendant');
    }

    async function runSearch(term) {
        const generation = ++searchGeneration;
        const query = term.trim();

        if (!query) {
            clearResults();
            setStatus(labels.hint || '');
            return;
        }

        try {
            const api = await loadPagefind();
            if (generation !== searchGeneration) return;

            setStatus(labels.searching || labels.loading || 'Searching…', { busy: true });
            api.preload(query);
            const search = await api.debouncedSearch(query);
            if (generation !== searchGeneration) return;
            if (search === null) return;

            const page = await Promise.all(
                search.results.slice(0, RESULT_LIMIT).map((result) => result.data())
            );
            if (generation !== searchGeneration) return;
            renderResults(page.map(mapResult), query);
        } catch (error) {
            if (generation !== searchGeneration) return;
            console.error(error);
            clearResults();
            setStatus(labels.unavailable || 'Search is unavailable.');
        }
    }

    function scheduleSearch(term) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => runSearch(term), DEBOUNCE_MS);
    }

    function closeMobileMenuIfOpen() {
        if (!document.body.classList.contains('menu-open')) return;
        if (typeof window.toggleMenu === 'function') window.toggleMenu();
    }

    function openPalette({ seed = '' } = {}) {
        closeMobileMenuIfOpen();
        if (!dialog.open) dialog.showModal();
        if (input) {
            if (seed && !input.value) input.value = seed;
            input.focus();
            input.select();
            if (input.value.trim()) scheduleSearch(input.value);
            else {
                clearResults();
                setStatus(labels.hint || '');
            }
        }
    }

    function closePalette() {
        if (dialog.open) dialog.close();
    }

    function isTypingTarget(el) {
        if (!el || el === document.body) return false;
        const tag = el.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
        if (el.isContentEditable) return true;
        return Boolean(el.closest && el.closest('[contenteditable="true"]'));
    }

    openTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (event) => {
            event.preventDefault();
            openPalette();
        });
    });

    if (input) {
        input.addEventListener('input', () => scheduleSearch(input.value));
        input.addEventListener('keydown', (event) => {
            const items = resultsEl ? resultsEl.querySelectorAll('.search-palette__item') : [];

            if (event.key === 'ArrowDown') {
                if (!items.length) return;
                event.preventDefault();
                activeIndex = (activeIndex + 1) % items.length;
                syncActiveOption();
                return;
            }

            if (event.key === 'ArrowUp') {
                if (!items.length) return;
                event.preventDefault();
                activeIndex = (activeIndex - 1 + items.length) % items.length;
                syncActiveOption();
                return;
            }

            if (event.key === 'Enter') {
                if (activeIndex >= 0 && items[activeIndex]) {
                    event.preventDefault();
                    items[activeIndex].click();
                    return;
                }
                const term = input.value.trim();
                if (term) {
                    event.preventDefault();
                    const sep = searchPageUrl.includes('?') ? '&' : '?';
                    window.location.href = `${searchPageUrl}${sep}q=${encodeURIComponent(term)}`;
                }
                return;
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                closePalette();
            }
        });
    }

    if (resultsEl) {
        resultsEl.addEventListener('mousemove', (event) => {
            const item = event.target.closest('.search-palette__item');
            if (!item) return;
            const index = Number(item.dataset.index);
            if (Number.isNaN(index) || index === activeIndex) return;
            activeIndex = index;
            syncActiveOption();
        });
    }

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) closePalette();
    });

    dialog.addEventListener('close', () => {
        clearTimeout(debounceTimer);
        if (input) input.removeAttribute('aria-activedescendant');
    });

    document.addEventListener('keydown', (event) => {
        const metaK = (event.key === 'k' || event.key === 'K') && (event.metaKey || event.ctrlKey);
        const slash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey;

        if (metaK) {
            event.preventDefault();
            if (dialog.open) closePalette();
            else openPalette();
            return;
        }

        if (!slash) return;
        if (dialog.open) return;
        if (isTypingTarget(document.activeElement)) return;

        // Full search page already has a focused field — keep that UX.
        const pageSearch = document.getElementById('searchInput');
        if (pageSearch && document.body.contains(pageSearch)) {
            event.preventDefault();
            pageSearch.focus();
            return;
        }

        event.preventDefault();
        openPalette();
    });

    window.openSearchPalette = openPalette;
}
