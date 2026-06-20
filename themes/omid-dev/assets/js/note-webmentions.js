(function () {
  const container = document.querySelector("[data-webmentions]");
  if (!container) return;

  const target = container.dataset.webmentions;
  const labels = {
    likes: container.dataset.labelLikes || "likes",
    reposts: container.dataset.labelReposts || "reposts",
    mentions: container.dataset.labelMentions || "mentions",
    empty: container.dataset.labelEmpty || "No replies yet.",
    loading: container.dataset.labelLoading || "Loading replies…",
  };

  const listEl = container.querySelector("[data-webmentions-list]");
  const statsEl = container.querySelector("[data-webmentions-stats]");
  const facepileEl = container.querySelector("[data-webmentions-facepile]");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
  }

  function mentionType(entry) {
    const type = entry["wm-property"] || entry.type || "mention";
    if (type === "like-of") return "like";
    if (type === "repost-of") return "repost";
    if (type === "in-reply-to") return "reply";
    return "mention";
  }

  function renderStats(groups) {
    if (!statsEl) return;
    const parts = [];
    if (groups.like.length) parts.push(`<span><strong>${groups.like.length}</strong> ${escapeHtml(labels.likes)}</span>`);
    if (groups.repost.length) parts.push(`<span><strong>${groups.repost.length}</strong> ${escapeHtml(labels.reposts)}</span>`);
    if (groups.reply.length + groups.mention.length) {
      parts.push(`<span><strong>${groups.reply.length + groups.mention.length}</strong> ${escapeHtml(labels.mentions)}</span>`);
    }
    statsEl.innerHTML = parts.join("");
  }

  function renderFacepile(entries) {
    if (!facepileEl) return;
    const seen = new Set();
    const authors = [];
    for (const entry of entries) {
      const url = entry.author && entry.author.url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      authors.push(entry.author);
      if (authors.length >= 12) break;
    }
    facepileEl.innerHTML = authors
      .map((author) => {
        const photo = author.photo || author.avatar;
        const name = escapeHtml(author.name || author.url || "Guest");
        const href = escapeHtml(author.url || "#");
        if (photo) {
          return `<a href="${href}" rel="noopener noreferrer" target="_blank"><img src="${escapeHtml(photo)}" alt="${name}" loading="lazy" width="42" height="42"></a>`;
        }
        return `<a href="${href}" rel="noopener noreferrer" target="_blank" class="webmention-facepile-fallback" aria-label="${name}">${name.charAt(0)}</a>`;
      })
      .join("");
  }

  function renderList(entries) {
    if (!listEl) return;
    const conversational = entries.filter((entry) => {
      const kind = mentionType(entry);
      return kind === "reply" || kind === "mention";
    });

    if (!conversational.length) {
      listEl.innerHTML = `<p class="no-mentions">${escapeHtml(labels.empty)}</p>`;
      return;
    }

    listEl.innerHTML = conversational
      .map((entry) => {
        const author = entry.author || {};
        const name = escapeHtml(author.name || author.url || "Guest");
        const href = escapeHtml(author.url || entry.url || "#");
        const photo = author.photo || author.avatar;
        const published = entry.published || entry["wm-received"];
        const dateLabel = published ? escapeHtml(new Date(published).toLocaleString()) : "";
        const text = escapeHtml((entry.content && (entry.content.text || entry.content.html)) || entry.summary || "");
        const avatar = photo
          ? `<img src="${escapeHtml(photo)}" alt="" width="28" height="28" loading="lazy">`
          : `<span class="webmention-avatar-fallback" aria-hidden="true">${name.charAt(0)}</span>`;

        return `<article class="webmention-item">
          <header class="webmention-author">
            <a href="${href}" rel="noopener noreferrer" target="_blank">${avatar}<span>${name}</span></a>
            ${dateLabel ? `<time datetime="${escapeHtml(published)}">${dateLabel}</time>` : ""}
          </header>
          ${text ? `<div class="webmention-content"><p>${text}</p></div>` : ""}
        </article>`;
      })
      .join("");
  }

  if (listEl) listEl.innerHTML = `<p class="no-mentions">${escapeHtml(labels.loading)}</p>`;

  fetch(`https://webmention.io/api/mentions.jf2?target=${encodeURIComponent(target)}`)
    .then((response) => {
      if (!response.ok) throw new Error("webmentions request failed");
      return response.json();
    })
    .then((payload) => {
      const children = payload.children || [];
      const groups = { like: [], repost: [], reply: [], mention: [] };
      children.forEach((entry) => groups[mentionType(entry)].push(entry));
      renderStats(groups);
      renderFacepile(children);
      renderList(children);
    })
    .catch(() => {
      if (statsEl) statsEl.innerHTML = "";
      if (facepileEl) facepileEl.innerHTML = "";
      if (listEl) listEl.innerHTML = `<p class="no-mentions">${escapeHtml(labels.empty)}</p>`;
    });
})();
