import * as params from '@params';

let fuse; // holds our search engine
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let sLoading = document.getElementById('searchLoading');
let first, last, current_elem = null
let resultsAvailable = false;
let searchTimeout = null; // for debouncing search
let allResults = [];
let currentPage = 1;
const resultsPerPage = 10;

// load our search index
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    
    if (query) {
        sInput.value = query;
        if (sLoading) sLoading.style.display = 'flex';
    }

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (sLoading) sLoading.style.display = 'none';
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                if (data) {
                    // fuse.js options; check fuse.js website for details
                    let options = {
                        distance: 100,
                        threshold: 0.4,
                        ignoreLocation: true,
                        keys: [
                            'title',
                            'permalink',
                            'summary',
                            'categories',
                            'date',
                            'tags'
                        ]
                    };
                    if (params.fuseOpts) {
                        options = {
                            isCaseSensitive: params.fuseOpts.iscasesensitive ?? false,
                            includeScore: params.fuseOpts.includescore ?? false,
                            includeMatches: params.fuseOpts.includematches ?? false,
                            minMatchCharLength: params.fuseOpts.minmatchcharlength ?? 1,
                            shouldSort: params.fuseOpts.shouldsort ?? true,
                            findAllMatches: params.fuseOpts.findallmatches ?? false,
                            keys: params.fuseOpts.keys ?? ['title', 'permalink', 'summary', 'categories', 'tags', 'date'],
                            location: params.fuseOpts.location ?? 0,
                            threshold: params.fuseOpts.threshold ?? 0.4,
                            distance: params.fuseOpts.distance ?? 100,
                            ignoreLocation: params.fuseOpts.ignorelocation ?? true
                        }
                    }
                    fuse = new Fuse(data, options); // build the index from the json file

                    // Check for query param or existing input value
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
    xhr.open('GET', "../index.json");
    xhr.send();
}

function activeToggle(ae) {
    document.querySelectorAll('.focus').forEach(function (element) {
        // rm focus class
        element.classList.remove("focus")
    });
    if (ae) {
        ae.focus()
        document.activeElement = current_elem = ae;
        ae.parentElement.classList.add("focus")
    } else {
        document.activeElement.parentElement.classList.add("focus")
    }
}

function reset() {
    resultsAvailable = false;
    allResults = [];
    currentPage = 1;
    resList.innerHTML = sInput.value = ''; // clear inputbox and searchResults
    updateURL('');
    sInput.focus(); // shift focus to input box
}

function executeSearch(term) {
    if (term.trim() === "") {
        allResults = [];
        resultsAvailable = false;
        resList.innerHTML = '';
        updateURL('');
        return;
    }

    if (fuse) {
        let results;
        if (params.fuseOpts) {
            results = fuse.search(term, { limit: params.fuseOpts.limit });
        } else {
            results = fuse.search(term);
        }

        allResults = results;
        currentPage = 1;
        resultsAvailable = allResults.length !== 0;
        renderResults();
        updateURL(term);
    } else {
        // If fuse isn't ready yet, show loading and it will be triggered by window.onload
        if (sLoading) sLoading.style.display = 'flex';
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

function renderResults() {
    if (allResults.length === 0) {
        resList.innerHTML = '';
        resultsAvailable = false;
        return;
    }

    let resultSet = '';
    const totalResults = allResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);
    
    const start = (currentPage - 1) * resultsPerPage;
    const end = Math.min(start + resultsPerPage, totalResults);
    const pageResults = allResults.slice(start, end);

    // Add results count header
    resultSet += `<div class="search-results-count">
        Found ${totalResults} result${totalResults !== 1 ? 's' : ''} (showing ${start + 1}-${end})
    </div>`;

    for (let item in pageResults) {
        const result = pageResults[item].item;
        const title = result.title;
        const permalink = result.permalink;
        const summary = result.summary || '';
        const categories = result.categories || [];
        const date = result.date || '';
        
        let metaItems = [];
        if (categories.length > 0) {
            metaItems.push(`<span class="meta-item">
                <span class="screen-reader-text">Categories:</span>
                <i class="fas fa-folder" aria-hidden="true" role="img"></i>
                ${categories.join(', ')}
            </span>`);
        }
        
        if (date) {
            const dateObj = new Date(date);
            const formattedDate = dateObj.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            metaItems.push(`<span class="meta-item">
                <span class="screen-reader-text">Post published:</span>
                <i aria-hidden="true" role="img" class="far fa-calendar-alt"></i>
                <span>${formattedDate}</span>
            </span>`);
        }
        
        const metaInfo = metaItems.length > 0 
            ? `<footer class="entry-footer">${metaItems.join('')}</footer>`
            : '';
        
        resultSet += `<article class="post-entry">
            <header class="entry-header">
                <a aria-label="post link to ${title}" href="${permalink}">
                    <h2 class="entry-hint-parent">
                        ${title}
                    </h2>
                </a>
            </header>
            ${metaInfo}
            ${summary ? `<div class="entry-content">
                <p>${summary.replace(/<[^>]*>/g, '')}</p>
            </div>` : ''}
            <a class="entry-link" aria-label="post link to ${title}" href="${permalink}">
                Continue Reading <i class="fa fa-angle-right" aria-hidden="true" role="img"></i>
            </a>
        </article>`;
    }

    // Add pagination controls
    if (totalPages > 1) {
        resultSet += `<div class="pagination">`;
        
        // Previous button
        resultSet += `<button id="prevPage" class="page-btn" ${currentPage === 1 ? 'disabled' : ''}>&laquo; Previous</button>`;
        
        // Page numbers
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        if (startPage > 1) {
            resultSet += `<button class="page-num" data-page="1">1</button>`;
            if (startPage > 2) resultSet += `<span class="page-dots">...</span>`;
        }

        for (let i = startPage; i <= endPage; i++) {
            resultSet += `<button class="page-num ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) resultSet += `<span class="page-dots">...</span>`;
            resultSet += `<button class="page-num" data-page="${totalPages}">${totalPages}</button>`;
        }
        
        // Next button
        resultSet += `<button id="nextPage" class="page-btn" ${currentPage === totalPages ? 'disabled' : ''}>Next &raquo;</button>`;
        
        resultSet += `</div>`;
    }

    resList.innerHTML = resultSet;

    // Set first and last for keyboard navigation
    const articles = resList.querySelectorAll('.post-entry');
    if (articles.length > 0) {
        first = articles[0];
        last = articles[articles.length - 1];
        resultsAvailable = true;
    } else {
        resultsAvailable = false;
    }

    // Add event listeners for pagination buttons
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    if (prevBtn && currentPage > 1) {
        prevBtn.onclick = () => {
            currentPage--;
            renderResults();
            window.scrollTo(0, 0);
        };
    }
    if (nextBtn && currentPage < totalPages) {
        nextBtn.onclick = () => {
            currentPage++;
            renderResults();
            window.scrollTo(0, 0);
        };
    }

    // Add event listeners for page numbers
    document.querySelectorAll('.page-num').forEach(btn => {
        btn.onclick = (e) => {
            const page = parseInt(e.target.getAttribute('data-page'));
            if (page !== currentPage) {
                currentPage = page;
                renderResults();
                window.scrollTo(0, 0);
            }
        };
    });
}

// execute search as each character is typed
sInput.onkeyup = function (e) {
    // Clear any existing timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Set a new timeout to run search after 300ms of no typing
    searchTimeout = setTimeout(() => {
        executeSearch(this.value.trim());
    }, 300);
}

sInput.addEventListener('search', function (e) {
    // clicked on x
    if (!this.value) reset()
})

// kb bindings
document.onkeydown = function (e) {
    let key = e.key;
    let ae = document.activeElement;

    let inbox = document.getElementById("searchbox").contains(ae)

    if (ae === sInput) {
        let elements = document.getElementsByClassName('focus');
        while (elements.length > 0) {
            elements[0].classList.remove('focus');
        }
    } else if (current_elem) ae = current_elem;

    if (key === "Escape") {
        reset()
    } else if (!resultsAvailable || !inbox) {
        return
    } else if (key === "ArrowDown") {
        e.preventDefault();
        if (ae == sInput) {
            // if the currently focused element is the search input, focus the <a> of first article
            activeToggle(first.querySelector('.entry-link'));
        } else if (ae.parentElement != last) {
            // if the currently focused element is not last, select the next search result
            activeToggle(ae.parentElement.nextElementSibling.querySelector('.entry-link'));
        }
    } else if (key === "ArrowUp") {
        e.preventDefault();
        if (ae.parentElement == first) {
            // if the currently focused element is first item, go to input box
            activeToggle(sInput);
        } else if (ae != sInput) {
            // if the currently focused element is not input box, select the previous search result
            activeToggle(ae.parentElement.previousElementSibling.querySelector('.entry-link'));
        }
    } else if (key === "ArrowRight") {
        ae.click(); // click on active link
    }
}
