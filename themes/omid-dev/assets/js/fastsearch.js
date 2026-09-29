import { escapeHtml, prepareDisplayText } from './text-utils.js';

const configEl = document.getElementById('search-config');
const config = (() => {
    if (!configEl) {
        return { locale: 'en', labels: {}, pagefindBundle: '/pagefind/', notesSection: 'notes' };
    }
    try {
        let parsed = JSON.parse(configEl.textContent.trim());
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        return parsed;
    } catch (error) {
        console.error(error);
        return { locale: 'en', labels: {}, pagefindBundle: '/pagefind/', notesSection: 'notes' };
    }
})();

const labels = config.labels || {};
const locale = config.locale || document.documentElement.lang || 'en';
const notesSection = config.notesSection || 'notes';
const pagefindBundle = config.pagefindBundle || '/pagefind/';

let pagefindApi = null;
let pagefindReady = false;
let pagefindLoading = null;
let pagefindFailed = false;

let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let sLoading = document.getElementById('searchLoading');
let sLoadingText = document.getElementById('searchLoadingText');
let scopeInputs = document.querySelectorAll('input[name="searchScope"]');
let first, last, current_elem = null;
let resultsAvailable = false;
let searchTimeout = null;
let searchGeneration = 0;
let allResults = [];
let currentPage = 1;
let currentScope = 'site';
const resultsPerPage = 10;

const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
});

function hideResults() {
    if (!resList) return;
    resList.hidden = true;
    resList.innerHTML = '';
}

function showResults(html) {
    if (!resList) return;
    resList.hidden = false;
    resList.innerHTML = html;
}

function showLoading(message) {
    if (!sLoading) return;
    if (sLoadingText && message) sLoadingText.textContent = message;
    sLoading.hidden = false;
    sLoading.classList.remove('is-hidden');
}

function hideLoading() {
    if (!sLoading) return;
    sLoading.hidden = true;
    sLoading.classList.add('is-hidden');
}

function showMessage(message, { isError = false } = {}) {
    const className = isError ? 'search-message search-message--error' : 'search-message';
    showResults(`<p class="${className}">${escapeHtml(message)}</p>`);
}

async function loadPagefind() {
    if (pagefindReady) return pagefindApi;
    if (pagefindFailed) throw new Error('Pagefind unavailable');
    if (pagefindLoading) return pagefindLoading;

    pagefindLoading = (async () => {
        showLoading(labels.loading || 'Loading search index…');
        const bundle = pagefindBundle.endsWith('/') ? pagefindBundle : `${pagefindBundle}/`;
        const moduleUrl = `${bundle}pagefind.js`;
        // Variable URL so Hugo/esbuild does not try to bundle Pagefind at build time.
        const api = await import(moduleUrl);
        await api.options({ bundlePath: bundle });
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

function setScope(scope, { updateUrl = true, rerun = true } = {}) {
    if (scope !== 'notes') scope = 'site';
    currentScope = scope;

    scopeInputs.forEach((input) => {
        input.checked = input.value === scope;
    });

    if (updateUrl) {
        const url = new URL(window.location);
        if (scope === 'notes') url.searchParams.set('scope', 'notes');
        else url.searchParams.delete('scope');
        window.history.replaceState({}, '', url);
    }

    if (rerun && sInput.value.trim()) {
        executeSearch(sInput.value.trim());
    }
}

function updateURL(term) {
    const url = new URL(window.location);
    if (term) url.searchParams.set('q', term);
    else url.searchParams.delete('q');
    if (currentScope === 'notes') url.searchParams.set('scope', 'notes');
    else url.searchParams.delete('scope');
    window.history.replaceState({}, '', url);
}

function mapResult(data) {
    const meta = data.meta || {};
    const categories = meta.categories
        ? String(meta.categories).split(',').map((part) => part.trim()).filter(Boolean)
        : [];
    const section = meta.section || '';
    const summary = data.excerpt || data.plain_excerpt || '';

    return {
        title: meta.title || '',
        permalink: data.url || '#',
        summary,
        categories,
        date: meta.date || '',
        section,
        excerptHtml: Boolean(data.excerpt),
    };
}

async function searchIndex(term) {
    const api = await loadPagefind();
    const search = await api.debouncedSearch(term, {
        filters: { scope: currentScope },
    });

    if (search === null) return null;

    const page = await Promise.all(search.results.map((result) => result.data()));
    return page.map(mapResult);
}

function executeSearch(term) {
    const query = term.trim();
    if (!query) {
        allResults = [];
        resultsAvailable = false;
        hideResults();
        updateURL('');
        return;
    }

    const generation = ++searchGeneration;
    const loadingMessage = currentScope === 'notes'
        ? (labels.loadingNotes || labels.loading || 'Loading notes index…')
        : (labels.loading || 'Loading search index…');

    if (!pagefindReady && !pagefindFailed) showLoading(loadingMessage);

    searchIndex(query)
        .then((results) => {
            if (generation !== searchGeneration || results === null) return;
            hideLoading();
            allResults = results || [];
            currentPage = 1;
            resultsAvailable = allResults.length !== 0;
            if (!resultsAvailable) {
                showMessage(labels.empty || 'No results found.');
            } else {
                renderResults();
            }
            updateURL(query);
        })
        .catch((error) => {
            if (generation !== searchGeneration) return;
            hideLoading();
            console.error(error);
            allResults = [];
            resultsAvailable = false;
            showMessage(
                labels.unavailable || 'Search is unavailable. Build the site and run Pagefind indexing first.',
                { isError: true },
            );
            updateURL(query);
        });
}

function reset() {
    resultsAvailable = false;
    allResults = [];
    currentPage = 1;
    hideResults();
    sInput.value = '';
    updateURL('');
    sInput.focus();
}

function renderPostCard(result) {
    const title = prepareDisplayText(result.title || '');
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
                    <a aria-label="post link to ${escapeHtml(title)}" href="${escapeHtml(permalink)}">
                        <h2 class="entry-hint-parent">${escapeHtml(title)}</h2>
                    </a>
                </header>
                ${metaBlock}
                ${summary}
                <a class="entry-link entry-link--text" aria-label="post link to ${escapeHtml(title)}" href="${escapeHtml(permalink)}">
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
    if (result.section === notesSection || currentScope === 'notes') return renderNoteCard(result);
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

    if (endPage - startPage < 4) {
        startPage = Math.max(1, endPage - 4);
    }

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

    html += `
            </nav>
        </footer>
    `;
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
}

function renderResults() {
    if (allResults.length === 0) {
        hideResults();
        resultsAvailable = false;
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
    document.querySelectorAll('.focus').forEach(function (element) {
        element.classList.remove('focus');
    });
    if (ae) {
        ae.focus();
        document.activeElement = current_elem = ae;
        const card = ae.closest('.post-entry, .note-search-entry');
        if (card) card.classList.add('focus');
    }
}

window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    const scope = urlParams.get('scope') === 'notes' ? 'notes' : 'site';

    if (query) sInput.value = query;
    if (scope === 'notes') setScope('notes', { updateUrl: false, rerun: false });

    loadPagefind()
        .then(() => {
            const currentQuery = sInput.value || query;
            if (currentQuery) executeSearch(currentQuery);
        })
        .catch((error) => {
            console.error(error);
            if (query || sInput.value.trim()) {
                showMessage(
                    labels.unavailable || 'Search is unavailable. Build the site and run Pagefind indexing first.',
                    { isError: true },
                );
            }
        });

    scopeInputs.forEach((input) => {
        input.addEventListener('change', () => {
            if (!input.checked) return;
            setScope(input.value);
        });
    });
};

sInput.onkeyup = function () {
    if (searchTimeout) clearTimeout(searchTimeout);
    const value = this.value.trim();
    if (pagefindReady && value) pagefindApi.preload(value, { filters: { scope: currentScope } });
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
    let key = e.key;
    let ae = document.activeElement;
    let inbox = document.getElementById('searchbox').contains(ae);

    if (ae === sInput) {
        let elements = document.getElementsByClassName('focus');
        while (elements.length > 0) {
            elements[0].classList.remove('focus');
        }
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
            const link = first.querySelector('.entry-link, .note-search-link');
            activeToggle(link);
        } else {
            const card = ae.closest('.post-entry, .note-search-entry');
            const nextCard = card && card.nextElementSibling;
            if (nextCard) {
                activeToggle(nextCard.querySelector('.entry-link, .note-search-link'));
            }
        }
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        const card = ae.closest('.post-entry, .note-search-entry');
        if (card === first) {
            activeToggle(sInput);
        } else if (card) {
            const prevCard = card.previousElementSibling;
            if (prevCard) {
                activeToggle(prevCard.querySelector('.entry-link, .note-search-link'));
            }
        }
    } else if (key === 'ArrowRight') {
        ae.click();
    }
};
