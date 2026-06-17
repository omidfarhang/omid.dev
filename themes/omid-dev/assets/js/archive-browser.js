import { escapeHtml, prepareDisplayText } from './text-utils.js';

const configEl = document.getElementById('archive-config');
const breadcrumbEl = document.getElementById('archiveBreadcrumb');
const loadingEl = document.getElementById('archiveLoading');
const pickerEl = document.getElementById('archivePicker');
const resultsEl = document.getElementById('archiveResults');

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

const POSTS_PER_PAGE = 15;
let allPosts = [];

const monthFormatter = new Intl.DateTimeFormat(locale, { month: 'long' });
const dayFormatter = new Intl.DateTimeFormat(locale, { month: 'short', day: 'numeric' });
const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function hideLoading() {
  if (!loadingEl) return;
  loadingEl.hidden = true;
  loadingEl.classList.add('is-hidden');
  loadingEl.setAttribute('aria-hidden', 'true');
}

function getState() {
  const params = new URLSearchParams(window.location.search);
  const year = params.get('year');
  const month = params.get('month');
  const day = params.get('day');
  const page = Math.max(1, parseInt(params.get('page') || '1', 10) || 1);

  return {
    year: year ? parseInt(year, 10) : null,
    month: month ? parseInt(month, 10) : null,
    day: day ? parseInt(day, 10) : null,
    page,
  };
}

function setState(next, replace = false) {
  const params = new URLSearchParams();
  if (next.year) params.set('year', String(next.year));
  if (next.month) params.set('month', String(next.month));
  if (next.day) params.set('day', String(next.day));
  if (next.page && next.page > 1) params.set('page', String(next.page));

  const query = params.toString();
  const url = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  if (replace) {
    window.history.replaceState({}, '', url);
  } else {
    window.history.pushState({}, '', url);
  }
}

function parsePosts(data) {
  return data
    .filter((item) => item.section === 'posts' && item.date)
    .map((item) => {
      const dateObj = new Date(item.date);
      if (Number.isNaN(dateObj.getTime())) return null;
      return {
        ...item,
        dateObj,
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1,
        day: dateObj.getDate(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => b.dateObj - a.dateObj);
}

function countBy(posts, key) {
  const map = new Map();
  for (const post of posts) {
    const value = post[key];
    map.set(value, (map.get(value) || 0) + 1);
  }
  return map;
}

function filterPosts(state) {
  return allPosts.filter((post) => {
    if (state.year && post.year !== state.year) return false;
    if (state.month && post.month !== state.month) return false;
    if (state.day && post.day !== state.day) return false;
    return true;
  });
}

function monthLabel(year, month) {
  return monthFormatter.format(new Date(year, month - 1, 1));
}

function renderBreadcrumb(state) {
  const items = [
    `<li><a href="${window.location.pathname}" data-reset="1">${escapeHtml(labels.home || 'Archives')}</a></li>`,
  ];

  if (state.year) {
    items.push(
      `<li><a href="?year=${state.year}" data-year="${state.year}">${state.year}</a></li>`
    );
  }

  if (state.year && state.month) {
    const monthUrl = `?year=${state.year}&month=${state.month}`;
    items.push(
      `<li><a href="${monthUrl}" data-year="${state.year}" data-month="${state.month}">${escapeHtml(monthLabel(state.year, state.month))}</a></li>`
    );
  }

  if (state.year && state.month && state.day) {
    items.push(
      `<li><span aria-current="page">${escapeHtml(dayFormatter.format(new Date(state.year, state.month - 1, state.day)))}</span></li>`
    );
  } else if (state.year && state.month) {
    items.push(`<li><span aria-current="page">${escapeHtml(labels.posts || 'posts')}</span></li>`);
  } else if (state.year) {
    items.push(`<li><span aria-current="page">${escapeHtml(labels.months || 'Months')}</span></li>`);
  }

  breadcrumbEl.className = 'breadcrumbs';
  breadcrumbEl.innerHTML = `<ol>${items.join('')}</ol>`;
}

function renderPicker(title, items) {
  pickerEl.hidden = false;
  pickerEl.innerHTML = `
    <div class="archive-picker-header">
      <h2 class="archive-picker-title">${escapeHtml(title)}</h2>
    </div>
    <div class="archive-grid">
      ${items.join('')}
    </div>
  `;
}

function renderYearPicker() {
  const counts = countBy(allPosts, 'year');
  const years = [...counts.keys()].sort((a, b) => b - a);
  const items = years.map((year) => {
    const count = counts.get(year);
    const postLabel = count === 1 ? (labels.post || 'post') : (labels.posts || 'posts');
    return `
      <a class="card card--interactive archive-card" href="?year=${year}" data-year="${year}">
        <span class="archive-card-value">${year}</span>
        <span class="archive-card-meta">${count} ${escapeHtml(postLabel)}</span>
      </a>
    `;
  });

  renderPicker(labels.years || 'Years', items);
  resultsEl.hidden = true;
  resultsEl.innerHTML = '';
}

function renderMonthPicker(state) {
  const posts = filterPosts({ year: state.year, month: null, day: null, page: 1 });
  const counts = countBy(posts, 'month');
  const months = [...counts.keys()].sort((a, b) => b - a);
  const items = months.map((month) => {
    const count = counts.get(month);
    const postLabel = count === 1 ? (labels.post || 'post') : (labels.posts || 'posts');
    return `
      <a class="card card--interactive archive-card" href="?year=${state.year}&month=${month}" data-year="${state.year}" data-month="${month}">
        <span class="archive-card-value">${escapeHtml(monthLabel(state.year, month))}</span>
        <span class="archive-card-meta">${count} ${escapeHtml(postLabel)}</span>
      </a>
    `;
  });

  renderPicker(String(state.year), items);
  resultsEl.hidden = true;
  resultsEl.innerHTML = '';
}

function renderDayPicker(state) {
  const posts = filterPosts({ year: state.year, month: state.month, day: null, page: 1 });
  const counts = countBy(posts, 'day');
  const days = [...counts.keys()].sort((a, b) => b - a);
  const total = posts.length;

  const items = [
    `<a class="chip chip--pill ${state.day ? '' : 'is-active'}" href="?year=${state.year}&month=${state.month}">${escapeHtml(labels.allDays || 'All days')} <span class="chip__count">${total}</span></a>`,
    ...days.map((day) => {
      const count = counts.get(day);
      const href = `?year=${state.year}&month=${state.month}&day=${day}`;
      const active = state.day === day ? 'is-active' : '';
      const label = dayFormatter.format(new Date(state.year, state.month - 1, day));
      return `<a class="chip chip--pill ${active}" href="${href}" data-day="${day}">${escapeHtml(label)} <span class="chip__count">${count}</span></a>`;
    }),
  ];

  pickerEl.hidden = false;
  pickerEl.innerHTML = `
    <div class="archive-picker-header">
      <h2 class="archive-picker-title">${escapeHtml(monthLabel(state.year, state.month))} ${state.year}</h2>
      <p class="archive-picker-subtitle">${escapeHtml(labels.days || 'Days')}</p>
    </div>
    <div class="archive-chip-row chip-group">${items.join('')}</div>
  `;
}

function renderPagination(totalPages, state) {
  if (totalPages <= 1) return '';

  const page = state.page;
  let html = `
    <footer class="page-footer pagination-rich">
      <nav class="pagination pagination-nav" aria-label="${escapeHtml(labels.pagination || 'Pagination')}">
  `;

  if (page > 1) {
    html += `<button type="button" class="btn btn--page page-btn page-prev" data-page="${page - 1}">${escapeHtml(labels.prev || 'Previous')}</button>`;
  }

  let startPage = Math.max(1, page - 2);
  let endPage = Math.min(totalPages, startPage + 4);
  if (endPage - startPage < 4) startPage = Math.max(1, endPage - 4);

  if (startPage > 1) {
    html += `<button type="button" class="btn btn--page page-btn page-num" data-page="1">1</button>`;
    if (startPage > 2) html += '<span class="page-ellipsis" aria-hidden="true">…</span>';
  }

  for (let i = startPage; i <= endPage; i += 1) {
    if (i === page) {
      html += `<span class="btn btn--page page-btn page-num current" aria-current="page">${i}</span>`;
    } else {
      html += `<button type="button" class="btn btn--page page-btn page-num" data-page="${i}">${i}</button>`;
    }
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) html += '<span class="page-ellipsis" aria-hidden="true">…</span>';
    html += `<button type="button" class="btn btn--page page-btn page-num" data-page="${totalPages}">${totalPages}</button>`;
  }

  if (page < totalPages) {
    html += `<button type="button" class="btn btn--page page-btn page-next" data-page="${page + 1}">${escapeHtml(labels.next || 'Next')}</button>`;
  }

  html += `
      </nav>
    </footer>
  `;
  return html;
}

function renderPostCard(post) {
  const title = prepareDisplayText(post.title);
  const categories = Array.isArray(post.categories) ? post.categories : [];
  const categoryMeta = categories.length
    ? `<span class="meta-item"><span class="screen-reader-text">${escapeHtml(labels.categories)}:</span><i class="fas fa-folder" aria-hidden="true"></i><span>${escapeHtml(categories.map(prepareDisplayText).join(', '))}</span></span>`
    : '';
  const readingMeta = post.readingTime
    ? `<span class="meta-item meta-reading-time"><span class="screen-reader-text">Reading time:</span><i class="fa-solid fa-stopwatch" aria-hidden="true"></i><span>${post.readingTime} min</span></span>`
    : '';
  const summaryText = prepareDisplayText(post.summary);
  const summary = summaryText
    ? `<div class="entry-content"><p>${escapeHtml(summaryText)}</p></div>`
    : '';

  return `
    <article class="card card--interactive post-entry post-entry--list">
      <div class="post-entry-inner">
        <header class="entry-header">
          <a aria-label="post link to ${escapeHtml(title)}" href="${escapeHtml(post.permalink)}">
            <h2 class="entry-hint-parent">${escapeHtml(title)}</h2>
          </a>
        </header>
        <footer class="entry-footer">
          <span class="meta-item meta-date">
            <span class="screen-reader-text">${escapeHtml(labels.published)}:</span>
            <i class="far fa-calendar-alt" aria-hidden="true"></i>
            <time datetime="${escapeHtml(post.date)}">${escapeHtml(dateFormatter.format(post.dateObj))}</time>
          </span>
          ${categoryMeta}
          ${readingMeta}
        </footer>
        ${summary}
        <a class="entry-link entry-link--text" aria-label="post link to ${escapeHtml(title)}" href="${escapeHtml(post.permalink)}">
          ${escapeHtml(labels.continueReading || 'Continue Reading')}
          <i class="fa fa-angle-right" aria-hidden="true" role="img"></i>
        </a>
      </div>
    </article>
  `;
}

function renderPosts(state) {
  const posts = filterPosts(state);
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const page = Math.min(state.page, totalPages);
  const start = (page - 1) * POSTS_PER_PAGE;
  const end = Math.min(start + POSTS_PER_PAGE, posts.length);
  const pagePosts = posts.slice(start, end);

  if (state.year && state.month) {
    renderDayPicker({ ...state, day: state.day, page });
  } else {
    pickerEl.hidden = true;
    pickerEl.innerHTML = '';
  }

  if (pagePosts.length === 0) {
    resultsEl.hidden = false;
    resultsEl.innerHTML = `<p class="archive-empty">${escapeHtml(labels.empty || 'No posts found for this period.')}</p>`;
    return;
  }

  const summaryLabel = `${labels.showing || 'Showing'} ${start + 1}–${end} ${labels.of || 'of'} ${posts.length}`;
  const cards = pagePosts.map(renderPostCard).join('');

  resultsEl.hidden = false;
  resultsEl.innerHTML = `
    <div class="archive-results-header">
      <span class="chip chip--stat archive-results-count">${escapeHtml(summaryLabel)}</span>
    </div>
    <div class="posts-grid archive-post-grid">${cards}</div>
    ${renderPagination(totalPages, { ...state, page })}
  `;
}

function render(state) {
  hideLoading();
  renderBreadcrumb(state);

  if (!state.year) {
    renderYearPicker();
    return;
  }

  if (!state.month) {
    renderMonthPicker(state);
    return;
  }

  renderPosts(state);
}

function navigate(next, replace = false) {
  setState(next, replace);
  render(next);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindEvents() {
  document.addEventListener('click', (event) => {
    const pageButton = event.target.closest('[data-page]');
    if (pageButton && pageButton.closest('#archiveResults')) {
      event.preventDefault();
      if (pageButton.disabled) return;
      const page = parseInt(pageButton.dataset.page, 10);
      if (!page || page < 1) return;
      navigate({ ...getState(), page });
      return;
    }

    const link = event.target.closest('.archive-card, .chip, .breadcrumbs a');
    if (link && link.href) {
      event.preventDefault();
      const url = new URL(link.href, window.location.origin);
      navigate({
        year: url.searchParams.get('year') ? parseInt(url.searchParams.get('year'), 10) : null,
        month: url.searchParams.get('month') ? parseInt(url.searchParams.get('month'), 10) : null,
        day: url.searchParams.get('day') ? parseInt(url.searchParams.get('day'), 10) : null,
        page: 1,
      });
    }
  });

  window.addEventListener('popstate', () => {
    render(getState());
  });
}

window.addEventListener('DOMContentLoaded', () => {
  bindEvents();

  const xhr = new XMLHttpRequest();
  xhr.open('GET', '../index.json');
  xhr.onload = () => {
    if (xhr.status !== 200) {
      hideLoading();
      resultsEl.hidden = false;
      resultsEl.innerHTML = `<p class="archive-empty">${escapeHtml(labels.empty || 'No posts found for this period.')}</p>`;
      return;
    }

    try {
      allPosts = parsePosts(JSON.parse(xhr.responseText));
      render(getState());
    } catch (error) {
      console.error(error);
      hideLoading();
      resultsEl.hidden = false;
      resultsEl.innerHTML = `<p class="archive-empty">${escapeHtml(labels.empty || 'No posts found for this period.')}</p>`;
    }
  };
  xhr.onerror = () => {
    hideLoading();
    resultsEl.hidden = false;
    resultsEl.innerHTML = `<p class="archive-empty">${escapeHtml(labels.empty || 'No posts found for this period.')}</p>`;
  };
  xhr.send();
});
