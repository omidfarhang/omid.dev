const FLOATING_MQ = "(min-width: 1120px)";
const FLOATING_CLASS = "article-toc--floating";
const ACTIVE_ATTR = "aria-current";

function getTocRoots() {
  return Array.from(document.querySelectorAll("[data-toc]"));
}

function getDetails(toc) {
  return toc.querySelector("[data-toc-details]") || toc.querySelector("details");
}

function getLinks(toc) {
  return Array.from(toc.querySelectorAll('a[href^="#"]')).filter((link) => {
    const id = decodeURIComponent(link.hash.slice(1));
    return id && document.getElementById(id);
  });
}

function setActiveLink(toc, activeLink) {
  getLinks(toc).forEach((link) => {
    if (link === activeLink) {
      link.setAttribute(ACTIVE_ATTR, "location");
      link.classList.add("is-active");
    } else {
      link.removeAttribute(ACTIVE_ATTR);
      link.classList.remove("is-active");
    }
  });
}

function enableFloating(toc) {
  const details = getDetails(toc);
  if (!details) return;

  if (!Object.prototype.hasOwnProperty.call(details.dataset, "tocWasOpen")) {
    details.dataset.tocWasOpen = details.open ? "1" : "0";
  }

  details.open = true;
  toc.classList.add(FLOATING_CLASS);
}

function disableFloating(toc) {
  const details = getDetails(toc);
  toc.classList.remove(FLOATING_CLASS);

  if (!details) return;

  if (Object.prototype.hasOwnProperty.call(details.dataset, "tocWasOpen")) {
    details.open = details.dataset.tocWasOpen === "1";
  }
}

function syncFloatingMode() {
  const floating = window.matchMedia(FLOATING_MQ).matches;
  getTocRoots().forEach((toc) => {
    if (floating) {
      enableFloating(toc);
    } else {
      disableFloating(toc);
    }
  });
  return floating;
}

function createScrollspy(toc) {
  const links = getLinks(toc);
  if (!links.length) return null;

  const headings = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter(Boolean);

  const linkById = new Map(
    links.map((link) => [decodeURIComponent(link.hash.slice(1)), link]),
  );

  let activeId = "";

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      let nextId = activeId;

      if (visible.length) {
        nextId = visible[0].target.id;
      } else {
        const above = headings
          .filter((heading) => heading.getBoundingClientRect().top < 120)
          .at(-1);
        if (above) nextId = above.id;
      }

      if (!nextId || nextId === activeId) return;
      activeId = nextId;
      setActiveLink(toc, linkById.get(activeId) || null);
    },
    {
      rootMargin: "-15% 0px -70% 0px",
      threshold: [0, 1],
    },
  );

  headings.forEach((heading) => observer.observe(heading));

  const firstLink = links[0];
  if (firstLink) setActiveLink(toc, firstLink);

  return () => {
    observer.disconnect();
    setActiveLink(toc, null);
  };
}

function init() {
  const tocs = getTocRoots();
  if (!tocs.length) return;

  let stopSpies = [];

  const restartSpies = () => {
    stopSpies.forEach((stop) => stop?.());
    stopSpies = [];

    if (!window.matchMedia(FLOATING_MQ).matches) return;

    stopSpies = tocs.map((toc) => createScrollspy(toc)).filter(Boolean);
  };

  const onModeChange = () => {
    syncFloatingMode();
    restartSpies();
  };

  onModeChange();

  const media = window.matchMedia(FLOATING_MQ);
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", onModeChange);
  } else if (typeof media.addListener === "function") {
    media.addListener(onModeChange);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
