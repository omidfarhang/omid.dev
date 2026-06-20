(function () {
  const rtf = new Intl.RelativeTimeFormat(document.documentElement.lang || "en", { numeric: "auto" });

  function formatRelative(date) {
    const seconds = Math.round((date.getTime() - Date.now()) / 1000);
    const abs = Math.abs(seconds);
    const units = [
      ["year", 31536000],
      ["month", 2592000],
      ["week", 604800],
      ["day", 86400],
      ["hour", 3600],
      ["minute", 60],
      ["second", 1],
    ];

    for (const [unit, size] of units) {
      if (abs >= size || unit === "second") {
        const value = Math.round(seconds / size);
        return rtf.format(value, unit);
      }
    }
    return "";
  }

  function enhanceTimeElement(timeEl) {
    const iso = timeEl.getAttribute("datetime");
    if (!iso) return;

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return;

    if (!timeEl.hasAttribute("title")) {
      timeEl.setAttribute("title", timeEl.textContent.trim());
    }

    timeEl.textContent = formatRelative(date);
  }

  document.querySelectorAll("time.note-relative-time").forEach(enhanceTimeElement);
})();
