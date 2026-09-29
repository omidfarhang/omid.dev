import { escapeHtml, prepareDisplayText } from './text-utils.js';

const VALID_SCOPES = ['all', 'posts', 'notes', 'pages'];
const GROUP_ORDER = ['posts', 'notes', 'pages'];
const GROUP_LIMIT = 8;
const LOADING_DELAY_MS = 220;

const configEl = document.getElementById('search-config');
const config = (() => {
    if (!configEl) {
        return { locale: 'en', labels: {}, pagefindBundle: '/pagefind/', notesSection: 'notes', defaultScope: 'posts' };
    }
    try {
        let parsed = JSON.parse(configEl.textContent.trim());
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        return parsed;
    } catch (error) {
        console.error(error);
        return { locale: 'en', labels: {}, pagefindBundle: '/pagefind/', notesSection: 'notes', defaultScope: 'posts' };
    }
})();

const labels = config.labels || {};
const locale = config.locale || document.documentElement.lang || 'en';
const notesSection = config.notesSection || 'notes';
const pagefindBundle = config.pagefindBundle || '/pagefind/';
const defaultScope = normalizeScope(config.defaultScope || 'posts');

let pagefindApi = null;
let pagefindReady = false;
let pagefindLoading = null;
let pagefindFailed = false;

const resList = document.getElementById('searchResults');
const idleEl = document.getElementById('searchIdle');
const sInput = document.getElementById('searchInput');
const sLoading = document.getElementById('searchLoading');
const sLoadingText = document.getElementById('searchLoadingText');
const scopeInputs = document.querySelectorAll('input[name="searchScope"]');
const scopeSelect = document.getElementById('searchScopeSelect');
const sortSelect = document.getElementById('searchSort');
const queryChip = document.getElementById('searchQueryChip');
const queryChipText = document.getElementById('searchQueryChipText');
const queryClear = document.getElementById('searchQueryClear');

let first, last, current_elem = null;
let resultsAvailable = false;
let searchTimeout = null;
let searchGeneration = 0;
let loadingTimer = null;
let allResults = [];
let groupedResults = null;
let currentPage = 1;
let currentScope = defaultScope;
let currentSort = 'relevance';
let activeQuery = '';
const resultsPerPage = 15;

const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

function normalizeScope(scope) {
    if (scope === 'site') return 'posts';
    if (VALID_SCOPES.includes(scope)) return scope;
    return 'posts';
}

function scopeLabel(scope) {
    if (scope === 'notes') return labels.notes || labels.groupNotes || 'Notes';
    if (scope === 'pages') return labels.pages || labels.groupPages || 'Pages';
    if (scope === 'all') return labels.all || 'All';
    return labels.posts || labels.groupPosts || 'Posts';
}

function hideResults() {
    if (!resList) return;
    resList.hidden = true;
    resList.innerHTML = '';
}

function showResults(html) {
    if (!resList) return;
    resList.hidden = false;
    resList.innerHTML = html;
    if (idleEl) idleEl.hidden = true;
}

function showIdle() {
    hideResults();
    if (idleEl) idleEl.hidden = false;
}

function hideIdle() {
    if (idleEl) idleEl.hidden = true;
}

function showLoading(message) {
    if (!sLoading) return;
    if (sLoadingText && message) sLoadingText.textContent = message;
    clearTimeout(loadingTimer);
    loadingTimer = setTimeout(() => {
        sLoading.hidden = false;
        sLoading.classList.remove('is-hidden');
    }, pagefindReady ? LOADING_DELAY_MS : 0);
}

function hideLoading() {
    if (!sLoading) return;
    clearTimeout(loadingTimer);
    loadingTimer = null;
    sLoading.hidden = true;
    sLoading.classList.add('is-hidden');
}

function updateQueryChip(term) {
    if (!queryChip || !queryChipText) return;
    if (!term) {
        queryChip.hidden = true;
        queryChipText.textContent = '';
        return;
    }
    queryChip.hidden = false;
    queryChipText.textContent = `${labels.showingFor || 'Showing results for'} “${term}”`;
}

function highlightMatches(text, query) {
    const plain = prepareDisplayText(text || '');
    const escaped = escapeHtml(plain);
    const terms = String(query || '')
        .trim()
        .split(/\s+/)
        .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .filter((part) => part.length > 1);
    if (!terms.length) return escaped;
    const pattern = new RegExp(`(${terms.join('|')})`, 'gi');
    return escaped.replace(pattern, '<mark>$1</mark>');
}

function resultKind(result) {
    if (result.kind) return result.kind;
    if (result.section === notesSection) return 'notes';
    if (result.section === 'posts') return 'posts';
    return 'pages';
}

async function loadPagefind() {
    if (pagefindReady) return pagefindApi;
    if (pagefindFailed) throw new Error('Pagefind unavailable');
    if (pagefindLoading) return pagefindLoading;

    pagefindLoading = (async () => {
        showLoading(labels.loading || 'Loading search index…');
        const bundle = pagefindBundle.endsWith('/') ? pagefindBundle : `${pagefindBundle}/`;
        const moduleUrl = `${bundle}pagefind.js`;
        const api = await import(moduleUrl);
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
        hideLoading();
        return api;
    })().catch((error) => {
        pagefindFailed = true;
        pagefindLoading = null;
        hideLoading();
        throw error;
    });

    return pagefindLoading;
}

function searchOptionsForScope(scope) {
    const options = {};
    if (scope && scope !== 'all') {
        options.filters = { scope };
    }
    if (currentSort === 'date') {
        options.sort = { date: 'desc' };
    }
    return options;
}

function setScope(scope, { updateUrl = true, rerun = true } = {}) {
    currentScope = normalizeScope(scope);

    scopeInputs.forEach((input) => {
        input.checked = input.value === currentScope;
    });
    if (scopeSelect) scopeSelect.value = currentScope;

    if (updateUrl) syncUrl(activeQuery || sInput.value.trim());
    if (rerun && sInput.value.trim()) executeSearch(sInput.value.trim());
    else if (rerun && !sInput.value.trim()) showIdle();
}

function setSort(sort, { updateUrl = true, rerun = true } = {}) {
    currentSort = sort === 'date' ? 'date' : 'relevance';
    if (sortSelect) sortSelect.value = currentSort;
    if (updateUrl) syncUrl(activeQuery || sInput.value.trim());
    if (rerun && sInput.value.trim()) executeSearch(sInput.value.trim());
}

function syncUrl(term) {
    const url = new URL(window.location);
    if (term) url.searchParams.set('q', term);
    else url.searchParams.delete('q');

    if (currentScope && currentScope !== defaultScope) url.searchParams.set('scope', currentScope);
    else url.searchParams.delete('scope');

    if (currentSort === 'date') url.searchParams.set('sort', 'date');
    else url.searchParams.delete('sort');

    window.history.replaceState({}, '', url);
    updateQueryChip(term);
}

function mapResult(data) {
    const meta = data.meta || {};
    const categories = meta.categories
        ? String(meta.categories).split(',').map((part) => part.trim()).filter(Boolean)
        : [];
    const section = meta.section || '';
    const kind = meta.kind || (section === notesSection ? 'notes' : section === 'posts' ? 'posts' : 'pages');
    const summary = data.excerpt || data.plain_excerpt || meta.description || '';

    return {
        title: meta.title || '',
        permalink: data.url || '#',
        summary,
        categories,
        date: meta.date || '',
        section,
        kind,
        excerptHtml: Boolean(data.excerpt),
    };
}

async function searchIndex(term) {
    const api = await loadPagefind();
    const options = searchOptionsForScope(currentScope);
    if (pagefindReady) api.preload(term, options);
    const search = await api.debouncedSearch(term, options);
    if (search === null) return null;
    const page = await Promise.all(search.results.map((result) => result.data()));
    return page.map(mapResult);
}

function groupResults(results) {
    const groups = { posts: [], notes: [], pages: [] };
    results.forEach((result) => {
        const kind = resultKind(result);
        if (groups[kind]) groups[kind].push(result);
        else groups.pages.push(result);
    });
    return groups;
}

function emptySuggestionsHtml() {
    const others = VALID_SCOPES.filter((scope) => scope !== currentScope && scope !== 'all');
    if (currentScope === 'all' || !others.length) {
        return `<p class="search-message">${escapeHtml(labels.empty || 'No results found.')}</p>`;
    }

    const message = (labels.emptyIn || 'No results in %s.').replace('%s', scopeLabel(currentScope));
    const buttons = others.map((scope) => {
        const text = (labels.tryScope || 'Try %s').replace('%s', scopeLabel(scope));
        return `<button type="button" class="btn btn--page search-try-scope" data-scope="${escapeHtml(scope)}">${escapeHtml(text)}</button>`;
    }).join('');

    return `
        <div class="search-empty">
            <p class="search-message">${escapeHtml(message)}</p>
            <div class="search-empty-actions">${buttons}</div>
        </div>
    `;
}

function executeSearch(term) {
    const query = term.trim();
    activeQuery = query;

    if (!query) {
        allResults = [];
        groupedResults = null;
        resultsAvailable = false;
        currentPage = 1;
        syncUrl('');
        showIdle();
        return;
    }

    hideIdle();
    const generation = ++searchGeneration;
    showLoading(labels.loading || 'Loading search index…');

    searchIndex(query)
        .then((results) => {
            if (generation !== searchGeneration || results === null) return;
            hideLoading();
            allResults = results || [];
            groupedResults = currentScope === 'all' ? groupResults(allResults) : null;
            currentPage = 1;
            resultsAvailable = allResults.length !== 0;
            syncUrl(query);
            if (!resultsAvailable) {
                showResults(emptySuggestionsHtml());
                bindEmptyActions();
            } else {
                renderResults();
            }
        })
        .catch((error) => {
            if (generation !== searchGeneration) return;
            hideLoading();
            console.error(error);
            allResults = [];
            groupedResults = null;
            resultsAvailable = false;
            syncUrl(query);
            showResults(`<p class="search-message search-message--error">${escapeHtml(labels.unavailable || 'Search is unavailable. Build the site and run Pagefind indexing first.')}</p>`);
        });
}

function bindEmptyActions() {
    resList.querySelectorAll('.search-try-scope').forEach((btn) => {
        btn.addEventListener('click', () => {
            setScope(btn.getAttribute('data-scope'));
        });
    });
}

function reset() {
    resultsAvailable = false;
    allResults = [];
    groupedResults = null;
    currentPage = 1;
    activeQuery = '';
    sInput.value = '';
    syncUrl('');
    showIdle();
    sInput.focus();
}

function renderPostCard(result) {
    const titleHtml = highlightMatches(result.title || '', activeQuery);
    const titlePlain = prepareDisplayText(result.title || '');
    const permalink = result.permalink || '#';
    const categories = Array.isArray(result.categories) ? result.categories : [];
    const date = result.date || '';

    const categoryMeta = categories.length
        ? `<span class="meta-item"><span class="screen-reader-text">${escapeHtml(labels.categories || 'Categories')}:</span><i class="fas fa-folder" aria-hidden="true" role="img"></i><span>${escapeHtml(categories.map(prepareDisplayText).join(', '))}</span></span>`
        : '';

    let dateMeta = '';
    if (date) {
        const dateObj = new Date(date);
        if (!Number.isNaN(dateObj.getTime())) {
            dateMeta = `<span class="meta-item meta-date">
                <span class="screen-reader-text">${escapeHtml(labels.published || 'Published')}:</span>
                <i class="far fa-calendar-alt" aria-hidden="true" role="img"></i>
                <time datetime="${escapeHtml(date)}">${escapeHtml(dateFormatter.format(dateObj))}</time>
            </span>`;
        }
    }

    const summary = result.summary
        ? `<div class="entry-content"><p>${result.excerptHtml ? result.summary : escapeHtml(prepareDisplayText(result.summary))}</p></div>`
        : '';

    const metaBlock = (dateMeta || categoryMeta)
        ? `<footer class="entry-footer">${dateMeta}${categoryMeta}</footer>`
        : '';

    return `
        <article class="card card--interactive post-entry post-entry--list">
            <div class="post-entry-inner">
                <header class="entry-header">
                    <a aria-label="post link to ${escapeHtml(titlePlain)}" href="${escapeHtml(permalink)}">
                        <h2 class="entry-hint-parent">${titleHtml}</h2>
                    </a>
                </header>
                ${metaBlock}
                ${summary}
                <a class="entry-link entry-link--text" aria-label="post link to ${escapeHtml(titlePlain)}" href="${escapeHtml(permalink)}">
                    ${escapeHtml(labels.continueReading || 'Continue Reading')}
                    <i class="fa fa-angle-right" aria-hidden="true" role="img"></i>
                </a>
            </div>
        </article>
    `;
}

function renderNoteCard(result) {
    const permalink = result.permalink || '#';
    const date = result.date || '';
    const noteLabel = labels.notes || 'Notes';

    let dateMeta = '';
    if (date) {
        const dateObj = new Date(date);
        if (!Number.isNaN(dateObj.getTime())) {
            dateMeta = `<time datetime="${escapeHtml(date)}" class="note-search-date">${escapeHtml(dateFormatter.format(dateObj))}</time>`;
        }
    }

    const body = result.summary
        ? `<div class="note-search-body"><p>${result.excerptHtml ? result.summary : escapeHtml(prepareDisplayText(result.summary))}</p></div>`
        : '';

    return `
        <article class="card card--interactive note-search-entry">
            <a class="note-search-link" href="${escapeHtml(permalink)}" aria-label="${escapeHtml(noteLabel)}">
                <header class="note-search-header">
                    <span class="note-search-label">${escapeHtml(noteLabel)}</span>
                    ${dateMeta}
                </header>
                ${body}
            </a>
        </article>
    `;
}

function renderResultCard(result) {
    if (resultKind(result) === 'notes') return renderNoteCard(result);
    return renderPostCard(result);
}

function renderPagination(totalPages) {
    if (totalPages <= 1) return '';

    let html = `
        <footer class="page-footer pagination-rich">
            <nav class="pagination pagination-nav" aria-label="${escapeHtml(labels.pagination || 'Pagination')}">
    `;

    if (currentPage > 1) {
        html += `<button type="button" id="prevPage" class="btn btn--page page-btn page-prev">${escapeHtml(labels.prev || 'Previous')}</button>`;
    }

    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

    if (startPage > 1) {
        html += `<button type="button" class="btn btn--page page-btn page-num" data-page="1">1</button>`;
        if (startPage > 2) html += `<span class="page-ellipsis" aria-hidden="true">…</span>`;
    }

    for (let i = startPage; i <= endPage; i += 1) {
        if (i === currentPage) {
            html += `<span class="btn btn--page page-btn page-num current" aria-current="page">${i}</span>`;
        } else {
            html += `<button type="button" class="btn btn--page page-btn page-num" data-page="${i}">${i}</button>`;
        }
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) html += `<span class="page-ellipsis" aria-hidden="true">…</span>`;
        html += `<button type="button" class="btn btn--page page-btn page-num" data-page="${totalPages}">${totalPages}</button>`;
    }

    if (currentPage < totalPages) {
        html += `<button type="button" id="nextPage" class="btn btn--page page-btn page-next">${escapeHtml(labels.next || 'Next')}</button>`;
    }

    html += `</nav></footer>`;
    return html;
}

function bindPagination(totalPages) {
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');

    if (prevBtn) {
        prevBtn.onclick = () => {
            if (currentPage > 1) {
                currentPage -= 1;
                renderResults();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    }

    if (nextBtn) {
        nextBtn.onclick = () => {
            if (currentPage < totalPages) {
                currentPage += 1;
                renderResults();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    }

    resList.querySelectorAll('.page-num[data-page]').forEach((btn) => {
        btn.onclick = (e) => {
            const page = parseInt(e.currentTarget.getAttribute('data-page'), 10);
            if (page !== currentPage) {
                currentPage = page;
                renderResults();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };
    });

    resList.querySelectorAll('.search-more-scope').forEach((btn) => {
        btn.addEventListener('click', () => setScope(btn.getAttribute('data-scope')));
    });
}

function renderGroupedResults() {
    const parts = [];
    let total = 0;

    GROUP_ORDER.forEach((kind) => {
        const items = (groupedResults && groupedResults[kind]) || [];
        if (!items.length) return;
        total += items.length;
        const shown = items.slice(0, GROUP_LIMIT);
        const gridClass = kind === 'notes' ? 'search-notes-grid' : 'posts-grid search-post-grid';
        const more = items.length > GROUP_LIMIT
            ? `<button type="button" class="btn btn--page search-more-scope" data-scope="${kind}">${escapeHtml((labels.moreIn || 'More in %s').replace('%s', scopeLabel(kind)))} (${items.length})</button>`
            : '';

        parts.push(`
            <section class="search-group" aria-labelledby="search-group-${kind}">
                <div class="search-group-header">
                    <h2 id="search-group-${kind}" class="search-group-title">${escapeHtml(scopeLabel(kind))}</h2>
                    <span class="chip chip--stat">${items.length}</span>
                </div>
                <div class="${gridClass}">${shown.map((item) => renderResultCard(item)).join('')}</div>
                ${more}
            </section>
        `);
    });

    const summaryLabel = `${labels.showing || 'Showing'} ${total} ${labels.of || 'of'} ${total}`;
    showResults(`
        <div class="search-results-header">
            <span class="chip chip--stat search-results-count">${escapeHtml(summaryLabel)}</span>
        </div>
        ${parts.join('')}
    `);

    const articles = resList.querySelectorAll('.post-entry, .note-search-entry');
    resultsAvailable = articles.length > 0;
    if (resultsAvailable) {
        first = articles[0];
        last = articles[articles.length - 1];
    }
    bindPagination(1);
}

function renderResults() {
    if (allResults.length === 0) {
        hideResults();
        resultsAvailable = false;
        return;
    }

    if (currentScope === 'all') {
        renderGroupedResults();
        return;
    }

    const totalResults = allResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    const start = (currentPage - 1) * resultsPerPage;
    const end = Math.min(start + resultsPerPage, totalResults);
    const pageResults = allResults.slice(start, end);
    const summaryLabel = `${labels.showing || 'Showing'} ${start + 1}–${end} ${labels.of || 'of'} ${totalResults}`;
    const cards = pageResults.map((item) => renderResultCard(item)).join('');
    const gridClass = currentScope === 'notes' ? 'search-notes-grid' : 'posts-grid search-post-grid';

    showResults(`
        <div class="search-results-header">
            <span class="chip chip--stat search-results-count">${escapeHtml(summaryLabel)}</span>
        </div>
        <div class="${gridClass}">${cards}</div>
        ${renderPagination(totalPages)}
    `);

    const articles = resList.querySelectorAll('.post-entry, .note-search-entry');
    if (articles.length > 0) {
        first = articles[0];
        last = articles[articles.length - 1];
        resultsAvailable = true;
    } else {
        resultsAvailable = false;
    }

    bindPagination(totalPages);
}

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach((element) => element.classList.remove('focus'));
    if (ae) {
        ae.focus();
        document.activeElement = current_elem = ae;
        const card = ae.closest('.post-entry, .note-search-entry');
        if (card) card.classList.add('focus');
    }
}

function bindHints() {
    document.querySelectorAll('.search-hint-tag').forEach((btn) => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query') || '';
            sInput.value = query;
            executeSearch(query);
            sInput.focus();
        });
    });
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const scope = normalizeScope(urlParams.get('scope') || defaultScope);
    const sort = urlParams.get('sort') === 'date' ? 'date' : 'relevance';

    if (query) sInput.value = query;
    setSort(sort, { updateUrl: false, rerun: false });
    setScope(scope, { updateUrl: false, rerun: false });
    updateQueryChip(query || '');
    bindHints();

    if (!query) showIdle();

    loadPagefind()
        .then(() => {
            const currentQuery = sInput.value || query;
            if (currentQuery) executeSearch(currentQuery);
        })
        .catch((error) => {
            console.error(error);
            if (query || sInput.value.trim()) {
                showResults(`<p class="search-message search-message--error">${escapeHtml(labels.unavailable || 'Search is unavailable. Build the site and run Pagefind indexing first.')}</p>`);
            }
        });

    scopeInputs.forEach((input) => {
        input.addEventListener('change', () => {
            if (!input.checked) return;
            setScope(input.value);
        });
    });

    if (scopeSelect) {
        scopeSelect.addEventListener('change', () => setScope(scopeSelect.value));
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => setSort(sortSelect.value));
    }

    if (queryClear) {
        queryClear.addEventListener('click', () => reset());
    }
};

sInput.onkeyup = function () {
    if (searchTimeout) clearTimeout(searchTimeout);
    const value = this.value.trim();
    if (pagefindReady && value) {
        pagefindApi.preload(value, searchOptionsForScope(currentScope));
    }
    searchTimeout = setTimeout(() => {
        executeSearch(value);
    }, 300);
};

sInput.addEventListener('search', function () {
    if (!this.value) reset();
});

sInput.addEventListener('focus', () => {
    loadPagefind().catch((error) => console.error(error));
});

document.onkeydown = function (e) {
    const key = e.key;
    let ae = document.activeElement;
    const inbox = document.getElementById('searchbox').contains(ae) || (resList && resList.contains(ae));

    if (ae === sInput) {
        document.querySelectorAll('.focus').forEach((el) => el.classList.remove('focus'));
    } else if (current_elem) {
        ae = current_elem;
    }

    if (key === 'Escape') {
        reset();
    } else if (!resultsAvailable || !inbox) {
        return;
    } else if (key === 'ArrowDown') {
        e.preventDefault();
        if (ae === sInput) {
            const link = first && first.querySelector('.entry-link, .note-search-link');
            if (link) activeToggle(link);
        } else {
            const card = ae.closest('.post-entry, .note-search-entry');
            const nextCard = card && card.nextElementSibling;
            if (nextCard) activeToggle(nextCard.querySelector('.entry-link, .note-search-link'));
        }
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        const card = ae.closest('.post-entry, .note-search-entry');
        if (card === first) {
            activeToggle(sInput);
        } else if (card) {
            const prevCard = card.previousElementSibling;
            if (prevCard) activeToggle(prevCard.querySelector('.entry-link, .note-search-link'));
        }
    } else if (key === 'ArrowRight') {
        ae.click();
    }
};
