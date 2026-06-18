import * as params from '@params';
import Fuse from './fuse.basic.min.mjs';
import { escapeHtml, prepareDisplayText } from './text-utils.js';

const configEl = document.getElementById('search-config');
const config = (() => {
    if (!configEl) return { locale: 'en', labels: {} };
    try {
        let parsed = JSON.parse(configEl.textContent.trim());
        if (typeof parsed === 'string') parsed = JSON.parse(parsed);
        return parsed;
    } catch (error) {
        console.error(error);
        return { locale: 'en', labels: {} };
    }
})();
const labels = config.labels || {};
const locale = config.locale || document.documentElement.lang || 'en';

let fuse;
let searchData = [];
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let sLoading = document.getElementById('searchLoading');
let first, last, current_elem = null;
let resultsAvailable = false;
let searchTimeout = null;
let allResults = [];
let currentPage = 1;
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

function showLoading() {
    if (!sLoading) return;
    sLoading.hidden = false;
    sLoading.classList.remove('is-hidden');
}

function hideLoading() {
    if (!sLoading) return;
    sLoading.hidden = true;
    sLoading.classList.add('is-hidden');
}

// load our search index
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');

    if (query) {
        sInput.value = query;
    }

    showLoading();

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            hideLoading();
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    searchData = data;
                    const defaultKeys = [
                        { name: 'title', weight: 3 },
                        { name: 'tags', weight: 2 },
                        { name: 'summary', weight: 1 },
                    ];
                    let options = {
                        distance: 100,
                        threshold: 0.2,
                        ignoreLocation: true,
                        includeScore: true,
                        keys: defaultKeys,
                    };
                    if (params.fuseOpts) {
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: true,
                            includeMatches: params.fuseOpts.includematches ?? false,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 2,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? false,
                            keys: params.fuseOpts.keys ?? defaultKeys,
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.2,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        };
                    }
                    fuse = new Fuse(data, options);

                    const currentQuery = sInput.value || query;
                    if (currentQuery) {
                        executeSearch(currentQuery);
                    }
                }
            } else {
                console.log(xhr.responseText);
            }
        }
    };
    xhr.open('GET', '../index.json');
    xhr.send();
};

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (element) {
        element.classList.remove('focus');
    });
    if (ae) {
        ae.focus();
        document.activeElement = current_elem = ae;
        const card = ae.closest('.post-entry');
        if (card) card.classList.add('focus');
    }
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

function getSearchableText(item) {
    return [item.title, item.summary, ...(item.tags || [])]
        .join(' ')
        .toLowerCase();
}

function queryVariants(query) {
    const variants = new Set([query]);
    if (query.length < 3) return [...variants];

    if (query.endsWith('ies') && query.length > 4) {
        variants.add(`${query.slice(0, -3)}y`);
    } else if (query.endsWith('es') && query.length > 4) {
        variants.add(query.slice(0, -2));
        variants.add(query.slice(0, -1));
    } else if (query.endsWith('s') && !query.endsWith('ss') && query.length > 3) {
        variants.add(query.slice(0, -1));
    } else {
        variants.add(`${query}s`);
        if (query.endsWith('y') && query.length > 2) {
            variants.add(`${query.slice(0, -1)}ies`);
        } else if (/[sxz]$/.test(query) || /(?:ch|sh)$/.test(query)) {
            variants.add(`${query}es`);
        }
    }

    return [...variants];
}

function textIncludesVariant(text, variants) {
    return variants.some((variant) => text.includes(variant));
}

function rankMatch(item, variants) {
    const title = (item.title || '').toLowerCase();
    const tags = (item.tags || []).join(' ').toLowerCase();
    const summary = (item.summary || '').toLowerCase();
    let best = 3;

    for (const variant of variants) {
        if (title.includes(variant)) best = Math.min(best, 0);
        else if (tags.includes(variant)) best = Math.min(best, 1);
        else if (summary.includes(variant)) best = Math.min(best, 2);
    }

    return best;
}

function searchIndex(term) {
    const query = term.trim().toLowerCase();
    if (!query) return [];

    const variants = queryVariants(query);
    const variantMatches = searchData.filter((item) => textIncludesVariant(getSearchableText(item), variants));

    if (variantMatches.length > 0) {
        return variantMatches
            .map((item) => ({ item, score: rankMatch(item, variants) }))
            .sort((a, b) => a.score - b.score || a.item.title.localeCompare(b.item.title));
    }

    if (!fuse) return [];

    const fuzzyLimit = params.fuseOpts?.limit ?? 20;
    const maxScore = params.fuseOpts?.maxscore ?? 0.35;
    return fuse.search(term, { limit: fuzzyLimit }).filter((result) => result.score <= maxScore);
}

function executeSearch(term) {
    if (term.trim() === '') {
        allResults = [];
        resultsAvailable = false;
        hideResults();
        updateURL('');
        return;
    }

    if (searchData.length > 0) {
        allResults = searchIndex(term);
        currentPage = 1;
        resultsAvailable = allResults.length !== 0;
        renderResults();
        updateURL(term);
    } else {
        showLoading();
        updateURL(term);
    }
}

function updateURL(term) {
    const url = new URL(window.location);
    if (term) {
        url.searchParams.set('q', term);
    } else {
        url.searchParams.delete('q');
    }
    window.history.replaceState({}, '', url);
}

function renderPostCard(result) {
    const title = prepareDisplayText(result.title || '');
    const permalink = result.permalink || '#';
    const summaryText = prepareDisplayText(result.summary);
    const categories = Array.isArray(result.categories) ? result.categories : [];
    const date = result.date || '';

    const categoryMeta = categories.length
        ? `<span class="meta-item"><span class="screen-reader-text">${escapeHtml(labels.categories || 'Categories')}:</span><i class="fas fa-folder" aria-hidden="true" role="img"></i><span>${escapeHtml(categories.map(prepareDisplayText).join(', '))}</span></span>`
        : '';

    let dateMeta = '';
    if (date) {
        const dateObj = new Date(date);
        dateMeta = `<span class="meta-item meta-date">
            <span class="screen-reader-text">${escapeHtml(labels.published || 'Published')}:</span>
            <i class="far fa-calendar-alt" aria-hidden="true" role="img"></i>
            <time datetime="${escapeHtml(date)}">${escapeHtml(dateFormatter.format(dateObj))}</time>
        </span>`;
    }

    const summary = summaryText
        ? `<div class="entry-content"><p>${escapeHtml(summaryText)}</p></div>`
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
    const cards = pageResults.map((item) => renderPostCard(item.item)).join('');

    showResults(`
        <div class="search-results-header">
            <span class="chip chip--stat search-results-count">${escapeHtml(summaryLabel)}</span>
        </div>
        <div class="posts-grid search-post-grid">${cards}</div>
        ${renderPagination(totalPages)}
    `);

    const articles = resList.querySelectorAll('.post-entry');
    if (articles.length > 0) {
        first = articles[0];
        last = articles[articles.length - 1];
        resultsAvailable = true;
    } else {
        resultsAvailable = false;
    }

    bindPagination(totalPages);
}

// execute search as each character is typed
sInput.onkeyup = function () {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
        executeSearch(this.value.trim());
    }, 300);
};

sInput.addEventListener('search', function () {
    if (!this.value) reset();
});

// kb bindings
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
            activeToggle(first.querySelector('.entry-link'));
        } else {
            const card = ae.closest('.post-entry');
            const nextCard = card && card.nextElementSibling;
            if (nextCard) {
                activeToggle(nextCard.querySelector('.entry-link'));
            }
        }
    } else if (key === 'ArrowUp') {
        e.preventDefault();
        const card = ae.closest('.post-entry');
        if (card === first) {
            activeToggle(sInput);
        } else if (card) {
            const prevCard = card.previousElementSibling;
            if (prevCard) {
                activeToggle(prevCard.querySelector('.entry-link'));
            }
        }
    } else if (key === 'ArrowRight') {
        ae.click();
    }
};
