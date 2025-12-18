import * as params from '@params';

let fuse; // holds our search engine
let resList = document.getElementById('searchResults');
let sInput = document.getElementById('searchInput');
let first, last, current_elem = null
let resultsAvailable = false;
let searchTimeout = null; // for debouncing search

// load our search index
window.onload = function () {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
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
    resList.innerHTML = sInput.value = ''; // clear inputbox and searchResults
    sInput.focus(); // shift focus to input box
}

// execute search as each character is typed
sInput.onkeyup = function (e) {
    // Clear any existing timeout
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }
    
    // Set a new timeout to run search after 500ms of no typing
    searchTimeout = setTimeout(() => {
        // run a search query (for "term") every time a letter is typed
        // in the search box
        if (fuse) {
            let results;
            if (params.fuseOpts) {
                results = fuse.search(this.value.trim(), {limit: params.fuseOpts.limit}); // the actual query being run using fuse.js along with options
            } else {
                results = fuse.search(this.value.trim()); // the actual query being run using fuse.js
            }
            if (results.length !== 0) {
                // build our html if result exists
                let resultSet = ''; // our results bucket
                
                const totalResults = results.length;
                const displayCount = Math.min(totalResults, 20);
                
                // Add results count header
                resultSet += `<div class="search-results-count">
                    Found ${totalResults} result${totalResults !== 1 ? 's' : ''}${totalResults > 20 ? ' (showing first 20)' : ''}
                </div>`;

                if(results.length > 20) {
                    results = results.slice(0, 20); // limit to first 20 results
                }

                for (let item in results) {
                    const title = results[item].item.title;
                    const permalink = results[item].item.permalink;
                    const summary = results[item].item.summary || '';
                    const categories = results[item].item.categories || [];
                    const tags = results[item].item.tags || [];
                    const date = results[item].item.date || '';
                    
                    // Build meta information similar to post_meta.html
                    let metaItems = [];
                    
                    // Categories first (instead of author)
                    if (categories.length > 0) {
                        metaItems.push(`<li>
                            <span class="screen-reader-text">Categories:</span>
                            <i class="fas fa-folder" aria-hidden="true" role="img"></i>
                            ${categories.join(', ')}
                        </li>`);
                    }
                    
                    // Date
                    if (date) {
                        const dateObj = new Date(date);
                        const formattedDate = dateObj.toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        });
                        metaItems.push(`<li>
                            <span class="screen-reader-text">Post published:</span>
                            <i aria-hidden="true" role="img" class="far fa-calendar-alt"></i>
                            <span>${formattedDate}</span>
                        </li>`);
                    }
                    
                    const metaInfo = metaItems.length > 0 
                        ? `<ul class="meta">${metaItems.join('')}</ul>`
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

                resList.innerHTML = resultSet;
                resultsAvailable = true;
                first = resList.firstChild;
                last = resList.lastChild;
            } else {
                resultsAvailable = false;
                resList.innerHTML = '';
            }
        }
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
            // if the currently focused element is the search input, focus the <a> of first <li>
            activeToggle(resList.firstChild.querySelector('.entry-link'));
        } else if (ae.parentElement.parentElement != last) {
            // if the currently focused element's parent is last, do nothing
            // otherwise select the next search result
            activeToggle(ae.parentElement.parentElement.nextSibling.querySelector('.entry-link'));
        }
    } else if (key === "ArrowUp") {
        e.preventDefault();
        if (ae.parentElement.parentElement == first) {
            // if the currently focused element is first item, go to input box
            activeToggle(sInput);
        } else if (ae != sInput) {
            // if the currently focused element is input box, do nothing
            // otherwise select the previous search result
            activeToggle(ae.parentElement.parentElement.previousSibling.querySelector('.entry-link'));
        }
    } else if (key === "ArrowRight") {
        ae.click(); // click on active link
    }
}
