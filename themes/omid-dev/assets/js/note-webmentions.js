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

  const replyLabels = {
    x: container.dataset.labelReplyX || "Reply on X",
    mastodon: container.dataset.labelReplyMastodon || "Reply on Mastodon",
    bluesky: container.dataset.labelReplyBluesky || "Reply on Bluesky",
  };

  const listEl = container.querySelector("[data-webmentions-list]");
  const statsEl = container.querySelector("[data-webmentions-stats]");
  const facepileEl = container.querySelector("[data-webmentions-facepile]");

  const PLATFORM_PATTERNS = {
    bluesky: /https:\/\/bsky\.app\/profile\/[^/#?]+\/post\/[^/#?]+/,
    mastodon: /https:\/\/[^/]+\/@[^/#?]+\/\d+/,
    x: /https:\/\/(?:x|twitter)\.com\/[^/#?]+\/status\/\d+/,
  };

  const syndicationLabels = {
    x: "X",
    mastodon: "Mastodon",
    bluesky: "Bluesky",
    linkedin: "LinkedIn",
  };

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

  function parseBridgyMastodon(raw) {
    const match = raw.match(/brid\.gy\/(?:like|repost|publish)\/mastodon\/@([^@]+)@([^/]+)\/(\d+)/);
    if (!match) return null;
    return `https://${match[2]}/@${match[1]}/${match[3]}`;
  }

  function extractSyndicationUrls(mentions) {
    const found = {};
    const earliest = {};

    mentions.forEach(function (m) {
      const received = m["wm-received"] ? new Date(m["wm-received"]).getTime() : Infinity;
      const candidates = [
        m.url,
        m["wm-source"],
        m["mention-of"],
        m["in-reply-to"],
        m["repost-of"],
      ].filter(Boolean);

      if (Array.isArray(m.syndication)) {
        candidates.push.apply(candidates, m.syndication);
      }

      candidates.forEach(function (raw) {
        Object.keys(PLATFORM_PATTERNS).forEach(function (platform) {
          const match = raw.match(PLATFORM_PATTERNS[platform]);
          if (match && (!earliest[platform] || received < earliest[platform])) {
            found[platform] = match[0];
            earliest[platform] = received;
          }
        });

        const bridgyMastodon = parseBridgyMastodon(raw);
        if (bridgyMastodon && (!earliest.mastodon || received < earliest.mastodon)) {
          found.mastodon = bridgyMastodon;
          earliest.mastodon = received;
        }
      });
    });

    return found;
  }

  function syncSyndicationLinks(urls) {
    const syndicationContainer = document.getElementById("syndication-links");
    if (!syndicationContainer) return;

    Object.keys(urls).forEach(function (platform) {
      const url = urls[platform];
      if (!url) return;

      let link = syndicationContainer.querySelector('.u-syndication[data-platform="' + platform + '"]');
      if (link) return;

      link = document.createElement("a");
      link.className = "u-syndication";
      link.setAttribute("data-platform", platform);
      link.href = url;
      link.textContent = syndicationLabels[platform] || platform;
      syndicationContainer.appendChild(link);
    });
  }

  function applySyndicationLinks(urls) {
    document.querySelectorAll(".share-btn[data-platform]").forEach(function (chip) {
      if (chip.getAttribute("data-manual") === "true") return;

      const platform = chip.getAttribute("data-platform");
      const url = urls[platform];
      if (!url) return;

      chip.href = url;
      const label = chip.querySelector("span");
      if (label && replyLabels[platform]) {
        label.textContent = replyLabels[platform];
      }
    });

    syncSyndicationLinks(urls);
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
      applySyndicationLinks(extractSyndicationUrls(children));

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
