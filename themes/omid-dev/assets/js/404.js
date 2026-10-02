(() => {
  const root = document.getElementById("not-found");
  if (!root) return;

  const quoteEl = document.getElementById("not-found-quote");
  const surpriseBtn = document.getElementById("not-found-surprise");

  const parseJson = (value, fallback) => {
    if (!value) return fallback;
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : fallback;
    } catch {
      return fallback;
    }
  };

  const quotes = parseJson(root.dataset.quotes, []).filter(Boolean);
  if (quoteEl && quotes.length) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = quote;
    quoteEl.hidden = false;
  }

  const posts = parseJson(root.dataset.posts, []).filter(Boolean);
  if (surpriseBtn) {
    if (!posts.length) {
      surpriseBtn.disabled = true;
      return;
    }
    surpriseBtn.addEventListener("click", () => {
      const url = posts[Math.floor(Math.random() * posts.length)];
      if (url) window.location.href = url;
    });
  }
})();
